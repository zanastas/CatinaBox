import { ethers } from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';
import * as fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

// Contract ABI snippet for the events we care about
const CONTRACT_ABI = [
    "event DataShareInitiated(uint256 indexed experimentId, address indexed sharer, string dataCid, bool isFullAccess)",
    "function finalizeDataSharing(uint256 experimentId, string calldata originalCid, string calldata processedCid, address sharer, bool valid, bool accepted)"
];

async function signAuthMessage(publicKey: string, privateKey: string): Promise<string> {
    const provider = new ethers.JsonRpcProvider();
    const signer = new ethers.Wallet(privateKey, provider);
    const authMessage = await lighthouse.getAuthMessage(publicKey);
    const messageRequested = authMessage.data.message;

    if (!messageRequested) {
        throw new Error('Failed to get auth message');
    }

    const signedMessage = await signer.signMessage(messageRequested);
    return signedMessage;
}

async function processData(dataCid: string): Promise<{ valid: boolean, processedCid: string | null }> {
    try {
        // Get wallet info for decryption
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!);
        const publicKey = wallet.address;

        // Get file encryption key
        const signedMessage = await signAuthMessage(publicKey, process.env.PRIVATE_KEY!);
        console.log('publicKey', publicKey);
        console.log('signedMessage', signedMessage);
        const fileEncryptionKey = await lighthouse.fetchEncryptionKey(
            dataCid,
            publicKey,
            signedMessage
        );
        console.log(fileEncryptionKey);
        if (!fileEncryptionKey.data.key) {
            throw new Error('Failed to get encryption key');
        }

        // Decrypt the file
        const decrypted = await lighthouse.decryptFile(
            dataCid,
            fileEncryptionKey.data.key as string // Type assertion since we checked for null above
        );

        // Convert decrypted data to string and get first line
        const content = Buffer.from(decrypted).toString();
        const firstLine = content.split('\n')[0];

        if (!firstLine) {
            return { valid: false, processedCid: null };
        }

        // Create temp file with first line
        const tempFile = 'temp.txt';
        fs.writeFileSync(tempFile, firstLine);
        console.log('Wrote to temp file:', tempFile);

        // Get message signature for encryption
        const message = "Signing message for Lighthouse";
        const encryptionSignedMessage = await wallet.signMessage(message);
        console.log("encryptionSignedMessage", encryptionSignedMessage);

        // Upload the new file encrypted
        const uploadResponse = await lighthouse.uploadEncrypted(
            tempFile,
            process.env.LIGHTHOUSE_API_KEY!,
            publicKey,
            encryptionSignedMessage
        );
        console.log('uploadResponse', uploadResponse);

        // Clean up temp file
        fs.unlinkSync(tempFile);

        // Check if uploadResponse is an array and handle accordingly
        const responseData = Array.isArray(uploadResponse) ? uploadResponse[0] : uploadResponse;
        const cid = responseData.data?.Hash;

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
    // Connect to the blockchain
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    console.log(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
    const contract = new ethers.Contract(
        process.env.CONTRACT_ADDRESS!,
        CONTRACT_ABI,
        wallet
    );

    // Listen for DataShareInitiated events
    contract.on("DataShareInitiated", async (experimentId, sharer, dataCid, isFullAccess, event) => {
        console.log(`New data share initiated: ${dataCid}`);

        const { valid, processedCid } = await processData(dataCid);

        // Call finalizeDataSharing
        try {
            const tx = await contract.finalizeDataSharing(
                experimentId,
                dataCid,
                processedCid || dataCid, // Use original CID if processing failed
                sharer,
                valid,
                valid // accept if valid
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