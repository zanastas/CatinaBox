"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const sdk_1 = __importDefault(require("@lighthouse-web3/sdk"));
const fs = __importStar(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Contract ABI snippet for the events we care about
const CONTRACT_ABI = [
    "event DataShareInitiated(uint256 indexed experimentId, address indexed sharer, string dataCid, bool isFullAccess)",
    "function finalizeDataSharing(uint256 experimentId, string calldata originalCid, string calldata processedCid, address sharer, bool valid, bool accepted)"
];
async function signAuthMessage(publicKey, privateKey) {
    const provider = new ethers_1.ethers.JsonRpcProvider();
    const signer = new ethers_1.ethers.Wallet(privateKey, provider);
    const authMessage = await sdk_1.default.getAuthMessage(publicKey);
    const messageRequested = authMessage.data.message;
    if (!messageRequested) {
        throw new Error('Failed to get auth message');
    }
    const signedMessage = await signer.signMessage(messageRequested);
    return signedMessage;
}
async function processData(dataCid) {
    try {
        // Get wallet info for decryption
        const wallet = new ethers_1.ethers.Wallet(process.env.PRIVATE_KEY);
        const publicKey = wallet.address;
        // Get file encryption key
        const signedMessage = await signAuthMessage(publicKey, process.env.PRIVATE_KEY);
        const fileEncryptionKey = await sdk_1.default.fetchEncryptionKey(dataCid, publicKey, signedMessage);
        if (!fileEncryptionKey.data.key) {
            throw new Error('Failed to get encryption key');
        }
        // Decrypt the file
        const decrypted = await sdk_1.default.decryptFile(dataCid, fileEncryptionKey.data.key // Type assertion since we checked for null above
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
        // Get message signature for encryption
        const message = "Signing message for Lighthouse";
        const encryptionSignedMessage = await wallet.signMessage(message);
        // Upload the new file encrypted
        const uploadResponse = await sdk_1.default.uploadEncrypted(tempFile, process.env.LIGHTHOUSE_API_KEY, publicKey, encryptionSignedMessage);
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
    }
    catch (error) {
        console.error('Error processing data:', error);
        return { valid: false, processedCid: null };
    }
}
async function main() {
    // Connect to the blockchain
    const provider = new ethers_1.ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers_1.ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contract = new ethers_1.ethers.Contract(process.env.CONTRACT_ADDRESS, CONTRACT_ABI, wallet);
    // Listen for DataShareInitiated events
    contract.on("DataShareInitiated", async (experimentId, sharer, dataCid, isFullAccess, event) => {
        console.log(`New data share initiated: ${dataCid}`);
        const { valid, processedCid } = await processData(dataCid);
        // Call finalizeDataSharing
        try {
            const tx = await contract.finalizeDataSharing(experimentId, dataCid, processedCid || dataCid, // Use original CID if processing failed
            sharer, valid, valid // accept if valid
            );
            await tx.wait();
            console.log(`Finalized data sharing for experiment ${experimentId}`);
        }
        catch (error) {
            console.error('Error finalizing data share:', error);
        }
    });
    console.log('Listening for DataShareInitiated events...');
}
main().catch(console.error);
