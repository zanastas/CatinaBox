import { ethers } from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';
import kavach from "@lighthouse-web3/kavach";
import * as fs from 'fs';
import dotenv from 'dotenv';
import { TappdClient } from '@phala/dstack-sdk';
import { keccak256 } from 'ethers';

dotenv.config();

const DSTACK_ENDPOINT = process.env.DSTACK_SIMULATOR_ENDPOINT || 'http://localhost:8090';

// Contract ABI snippet for the events we care about
const CONTRACT_ABI = [
    "event DataShareInitiated(uint256 indexed experimentId, address indexed sharer, string dataCid, bool isFullAccess)",
    "function finalizeDataSharing(uint256 experimentId, string calldata originalCid, string calldata processedCid, address sharer, bool valid, bool accepted)",
    "function getExperimentDetails(uint256 experimentId) external view returns (address owner, string memory requestedDataSpec, uint256 reward, bool active, address paymentToken, uint64 endDate)"
];

// Add these types at the top of the file
interface GeneticMarker {
    marker: string;
    gene: string;
    include: string[];
    exclude: string[];
}

interface StudyRequirements {
    geneticMarkers: GeneticMarker[];
    demographicCriteria: {
        minAge: number;
        maxAge: number;
        sex: string[];
    };
}

interface RequiredData {
    required: string[];
    optional: string[];
}

interface StudySpec {
    studyRequirements: StudyRequirements;
    requiredData: RequiredData;
}

async function deriveKey(): Promise<{ address: string, privateKey: string }> {
    const client = new TappdClient(DSTACK_ENDPOINT);

    // Derive key using Phala
    const randomDeriveKey = await client.deriveKey('/CatinaBox', '/phala');
    // console.log("randomDeriveKey", randomDeriveKey);

    // Hash the derived key
    const keccakPrivateKey = keccak256(randomDeriveKey.asUint8Array());
    // console.log("keccakPrivateKey", keccakPrivateKey);

    // Create wallet from private key
    const wallet = new ethers.Wallet(keccakPrivateKey);

    return {
        address: wallet.address,
        privateKey: keccakPrivateKey
    };
}

async function signAuthMessage(privateKey: string): Promise<string> {
    const signer = new ethers.Wallet(privateKey);
    const authMessage = await kavach.getAuthMessage(signer.address);
    if (!authMessage.message) {
        throw new Error('Failed to get auth message');
    }
    const signedMessage = await signer.signMessage(authMessage.message);
    const { JWT, error } = await kavach.getJWT(signer.address, signedMessage);

    if (error || !JWT) {
        throw new Error('Failed to get JWT token');
    }

    return JWT;
}

// Add this function to process the genetic data
function processGeneticData(fileContent: string, specString: string): {
    valid: boolean;
    accepted: boolean;
    extractedData: Record<string, string>;
} {
    try {
        const spec: StudySpec = JSON.parse(specString);
        const lines = fileContent.split('\n');
        const extractedData: Record<string, string> = {};
        const requiredMarkers = new Set(
            spec.studyRequirements.geneticMarkers.map(m => m.marker)
        );

        // Process the genetic data file
        for (const line of lines) {
            if (line.startsWith('#') || !line.trim()) continue;

            const [rsid, , , genotype] = line.split('\t');
            if (requiredMarkers.has(rsid)) {
                extractedData[rsid] = genotype;
            }
        }

        // Validate all required markers are present
        const foundAllMarkers = spec.studyRequirements.geneticMarkers.every(
            marker => marker.marker in extractedData
        );

        if (!foundAllMarkers) {
            return { valid: false, accepted: false, extractedData: {} };
        }

        // Check if genotypes match requirements
        let accepted = true;
        for (const marker of spec.studyRequirements.geneticMarkers) {
            const genotype = extractedData[marker.marker];

            if (marker.exclude.includes(genotype)) {
                accepted = false;
                break;
            }

            if (!marker.include.includes(genotype)) {
                accepted = false;
                break;
            }
        }

        return {
            valid: true,
            accepted,
            extractedData
        };

    } catch (error) {
        console.error('Error processing genetic data:', error);
        return {
            valid: false,
            accepted: false,
            extractedData: {}
        };
    }
}

// Modify the processData function to use the new genetic data processor
async function processData(dataCid: string, experimentId: string): Promise<{ valid: boolean, processedCid: string | null }> {
    try {
        // Get derived key pair from Phala
        const { address, privateKey } = await deriveKey();
        console.log("address", address);
        console.log("privateKey", privateKey);
        const publicKey = address;

        // Get experiment details
        const contract = new ethers.Contract(
            process.env.CONTRACT_ADDRESS!,
            CONTRACT_ABI,
            new ethers.Wallet(privateKey, new ethers.JsonRpcProvider(process.env.RPC_URL))
        );

        const experimentDetails = await contract.getExperimentDetails(experimentId);
        const experimentOwner = experimentDetails[0]; // owner address
        const requestedDataSpec = experimentDetails[1]; // data specification

        console.log("Experiment owner:", experimentOwner);
        console.log("Requested data spec:", requestedDataSpec);

        // Get file encryption key        
        const signedMessage = await signAuthMessage(privateKey);
        console.log("signedMessage", signedMessage);
        const fileEncryptionKey = await lighthouse.fetchEncryptionKey(
            dataCid,
            publicKey,
            signedMessage
        );
        console.log("fileEncryptionKey", fileEncryptionKey);
        if (!fileEncryptionKey.data.key) {
            throw new Error('Failed to get encryption key');
        }

        // Decrypt the file
        const decrypted = await lighthouse.decryptFile(
            dataCid,
            fileEncryptionKey.data.key
        );
        console.log("Data downloaded");

        // Convert decrypted data to string and get first line
        const content = Buffer.from(decrypted).toString();
        const firstLine = content.split('\n')[0];

        if (!firstLine) {
            return { valid: false, processedCid: null };
        }

        // Process the genetic data
        const { valid, accepted, extractedData } = processGeneticData(content, requestedDataSpec);

        if (!valid) {
            return { valid: false, processedCid: null };
        }

        // Create processed data file
        const processedContent = JSON.stringify(extractedData, null, 2);
        const tempFile = 'sharedData.json';
        fs.writeFileSync(tempFile, processedContent);
        console.log('Wrote processed data to temp file:', tempFile);

        // Upload the processed file with encryption
        const jwt = await signAuthMessage(privateKey);
        const uploadResponse = await lighthouse.uploadEncrypted(
            tempFile,
            process.env.LIGHTHOUSE_API_KEY!,
            publicKey,
            jwt
        );
        console.log('uploadResponse', uploadResponse);

        // Share the file with experiment owner
        const shareResponse = await lighthouse.shareFile(
            publicKey,
            [experimentOwner],
            firstLine,
            jwt
        );
        console.log('File shared with owner:', shareResponse);

        // Clean up temp file
        fs.unlinkSync(tempFile);

        // Handle upload response
        const responseData = Array.isArray(uploadResponse.data) ? uploadResponse.data[0] : uploadResponse.data;
        const cid = responseData?.Hash;

        if (!cid) {
            throw new Error('Failed to get CID from upload response');
        }

        return {
            valid: true,
            processedCid: cid
        };

    } catch (error) {
        console.error('Error processing data:', error);
        return { valid: false, processedCid: null };
    }
}

async function main() {
    // Get derived key pair for contract interaction
    const { privateKey, address } = await deriveKey();
    console.log("address", address);
    console.log("privateKey", privateKey);

    // Connect to the blockchain
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    console.log(process.env.RPC_URL);
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(
        process.env.CONTRACT_ADDRESS!,
        CONTRACT_ABI,
        wallet
    );

    // Listen for DataShareInitiated events
    contract.on("DataShareInitiated", async (experimentId, sharer, dataCid, isFullAccess, event) => {
        console.log(`New data share initiated: ${dataCid}`);

        const { valid, processedCid } = await processData(dataCid, experimentId.toString());

        // Call finalizeDataSharing
        try {
            const tx = await contract.finalizeDataSharing(
                experimentId,
                dataCid,
                processedCid || dataCid,
                sharer,
                valid,
                valid
            );
            await tx.wait();
            console.log(`Finalized data sharing for experiment ${experimentId}`);
        } catch (error) {
            console.error('Error finalizing data share:', error);
        }
    });

    console.log('Listening for DataShareInitiated events...');
}

main().catch(console.error);