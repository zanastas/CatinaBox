import { PushAPI } from '@pushprotocol/restapi';
import { ethers } from 'ethers';
import { initializePushUser, createExperimentChat } from '../utils/push';

interface Experiment {
  id: string;
  name: string;
  organization: string;
  description: string;
  fullDescription: string;
  participants: number;
  requiredData: string[];
  payment: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'upcoming';
  chatId?: string;
}

// Hardcoded experiments data based on the experiments page
const EXPERIMENTS: Experiment[] = [
  {
    id: "hair-loss-study",
    name: "Hair Loss Treatment Study",
    organization: "Hair DAO",
    description: "Study for treatment efficacy in people with specific genetic markers",
    fullDescription: "This comprehensive study aims to understand the relationship between specific genetic markers and the effectiveness of various hair loss treatments. Participants will contribute their genetic data and regular progress updates.",
    participants: 150,
    requiredData: ["DNA Data", "Medical History", "Progress Photos"],
    payment: 50,
    startDate: "2024-03-01",
    endDate: "2024-09-01",
    status: 'active'
  },
  {
    id: "sleep-study",
    name: "Sleep Pattern Analysis",
    organization: "Sleep Research DAO",
    description: "Analysis of sleep patterns and genetic predisposition",
    fullDescription: "A comprehensive study analyzing the relationship between genetic markers and sleep patterns using wearable data.",
    participants: 200,
    requiredData: ["DNA Data", "Sleep Data", "Activity Data"],
    payment: 75,
    startDate: "2024-04-01",
    endDate: "2024-10-01",
    status: 'upcoming'
  }
];

// Get experiments without chat IDs
async function getAllExperimentsWithoutChat(): Promise<Experiment[]> {
  return EXPERIMENTS.filter(exp => !exp.chatId);
}

// Update experiment with chat ID (in memory since we're using hardcoded data)
async function updateExperimentWithChatId(experimentId: string, chatId: string) {
  const experiment = EXPERIMENTS.find(exp => exp.id === experimentId);
  if (experiment) {
    experiment.chatId = chatId;
    console.log(`Updated experiment ${experimentId} with chat ${chatId}`);
    console.log('Updated experiment data:', experiment);
  }
}

async function createChatsForExistingExperiments() {
  try {
    // You'll need to set up your wallet/signer here
    const privateKey = process.env.ADMIN_PRIVATE_KEY;
    if (!privateKey) {
      throw new Error('ADMIN_PRIVATE_KEY not found in environment variables');
    }

    // Create a wallet instance
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(privateKey, provider);

    // Initialize Push user
    const pushUser = await initializePushUser(wallet);

    // Get all experiments without chat
    const experiments = await getAllExperimentsWithoutChat();
    console.log(`Found ${experiments.length} experiments without chat`);

    // Create chat for each experiment
    for (const experiment of experiments) {
      try {
        console.log(`Creating chat for experiment: ${experiment.name}`);
        const chatGroup = await createExperimentChat(
          pushUser,
          experiment.id,
          experiment.name
        );

        // Update experiment with chat ID
        await updateExperimentWithChatId(experiment.id, chatGroup.chatId);
        console.log(`Successfully created chat for ${experiment.name}`);
      } catch (error) {
        console.error(`Failed to create chat for experiment ${experiment.name}:`, error);
      }
    }

    // Log final state of experiments
    console.log('\nFinal state of experiments:');
    EXPERIMENTS.forEach(exp => {
      console.log(`${exp.name}: ${exp.chatId ? `Chat ID: ${exp.chatId}` : 'No chat'}`);
    });

    console.log('\nFinished creating chats for existing experiments');
  } catch (error) {
    console.error('Error in createChatsForExistingExperiments:', error);
  }
}

// Run the script
createChatsForExistingExperiments(); 