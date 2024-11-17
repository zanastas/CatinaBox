'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@components/header';
import { FaUsers, FaDna, FaCalendar, FaCoins, FaLock, FaCheck, FaBrain, FaAppleAlt, FaDumbbell, FaRunning } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import type { JSX } from 'react';
import Link from 'next/link';
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { isEthereumWallet } from "@dynamic-labs/ethereum";
import { CatinaBoxABI } from '../../constants/contracts';

interface ExperimentData {
  index: number;
  name: string;
  organization: string;
  description: string;
  fullDescription: string;
  participants: number;
  requiredData: string[];
  payment: number;
  startDate: string;
  endDate: string;
  status?: 'active' | 'completed' | 'upcoming';
  chatId?: string;
  icon?: JSX.Element;
  targetParticipants?: number;
  stakingRequired?: {
    amount: number;
    duration: string;
  };
}

const experiments: Record<string, ExperimentData> = {
  'hair-loss': {
    index: 0,
    name: "Personalized Shampoo Treatment Based on Your Genetic Markers",
    organization: "HairDAO",
    description: "Crack the Code. Save the Strand.",
    fullDescription: `HairDAO is on a mission to outsmart baldness with science! We've designed two cutting-edge personalized shampoos based on your genetic data to tackle hair loss at the root. Now, we need YOU to help us test them in this first-of-its-kind, decentralized science experiment.

**WHO'S THIS FOR:**

• Baldness warriors ready to fight hair loss

• Those with genetic data (23andMe, AncestryDNA)

• Willing to wash your hair, count strands, and join the movement for 30 days

**HOW IT WORKS:**

1. Get Matched 🧬
Share your DNA profile, and we'll pair you with the shampoo that's genetically tailored to YOU.
- **💪 DHT Fighters:** Designed for those with high DHT activity (CC or GC at rs523349)
- **🌞 Vitamin D Boosters:** Perfect for those with low VDR activity (AA or AG at rs731236)

2. 30-Day Challenge 🕒
Use your shampoo daily and log hair loss (number of hairs) in the platform.

3. Discover the Truth 📊
- See if the shampoo works for YOU
- Get personalized insights
- Compare your results with the entire HairDAO community

**WHY JOIN:**

• Help advance decentralized science (DeSci) while getting paid

• Fight hair loss with cutting-edge genetics and data

• Your data is always yours, private and encrypted`,
    participants: 150,
    requiredData: [
      "Genetic Data (rs523349, rs731236)",
      "Age & Sex",
      "Daily Hair Loss Count",
      "Blood Vitamin D (optional)"
    ],
    payment: 50,
    startDate: "2024-11-01",
    endDate: "2024-11-30",
    status: 'active',
    chatId: "hairdao-experiment-chat",
    icon: <FaDna size={40} />,
    targetParticipants: 500,
    stakingRequired: {
      amount: 25,
      duration: '1 month'
    }
  },
  'running': {
    index: 1,
    name: "30-Day Fitness Challenge",
    organization: "Stake & Run",
    description: "Study correlating exercise intensity, recovery patterns, and fitness outcomes",
    fullDescription: `Join our comprehensive 30-day fitness study to understand how different exercise intensities affect recovery and body composition. This experiment uses wearable data to optimize workout routines and recovery periods.

**WHO'S THIS FOR:**
• Active individuals with fitness wearables (Apple Watch, Fitbit, Oura, etc.)
• Interested in optimizing workout recovery
• Willing to follow a structured 30-day exercise program

**WHAT WE'RE STUDYING:**
• Relationship between exercise intensity and recovery time
• Impact of sleep quality on performance
• Changes in resting heart rate and HRV
• Body composition changes over 30 days

**HOW IT WORKS:**
1. Initial Assessment 📊
- Share your baseline fitness metrics
- Connect your wearable device
- Record starting measurements

2. 30-Day Program 💪
- Follow provided workout templates
- Track daily activities and recovery
- Monitor sleep and stress levels

3. Data Analysis 📈
- Get personalized insights about your recovery patterns
- Learn your optimal training intensity
- Compare your results with other participants

**WHY JOIN:**
• Receive personalized exercise recommendations
• Understand your body's recovery patterns
• Earn rewards while contributing to fitness science
• Keep full control of your health data`,
    participants: 300,
    requiredData: [
      "Heart Rate Zones & HRV",
      "Sleep Quality Metrics",
      "Daily Activity Levels",
      "Recovery Scores",
      "Body Composition Data"
    ],
    payment: 70,
    startDate: "2024-11-01",
    endDate: "2024-11-30",
    status: 'active',
    chatId: "fitness-chat-id",
    icon: <FaRunning size={40} />,
    targetParticipants: 500,
    stakingRequired: {
      amount: 30,
      duration: '1 month'
    }
  },
  'sleep': {
    name: "Sleep Quality Study",
    organization: "Sleep Health Research",
    description: "Study on the impact of sleep on cognitive function",
    fullDescription: "This study aims to understand the relationship between sleep duration and cognitive function outcomes. Participants will contribute their sleep data and regular cognitive tests.",
    participants: 180,
    requiredData: ["Sleep Data", "Cognitive Test Scores", "Health Check-ups"],
    payment: 60,
    startDate: "2024-11-01",
    endDate: "2024-11-30",
    status: 'active',
    chatId: "sleep-chat-id-here"
  },
  'mental-health': {
    index: 1,
    name: 'Mental Wellness Study',
    organization: 'MindCare Research',
    description: 'Impact of daily habits on mental well-being',
    fullDescription: `This comprehensive mental wellness study examines the relationship between daily habits, lifestyle choices, and mental health outcomes. By collecting data on daily routines, stress levels, and emotional well-being, we aim to identify patterns that contribute to better mental health.

The study utilizes advanced analytics to understand how different lifestyle factors interact with mental wellness, helping to develop personalized recommendations for maintaining optimal mental health.`,
    icon: <FaBrain size={40} />,
    requiredData: ['Daily Logs', 'Mood Tracking', 'Activity Data'],
    participants: 175,
    targetParticipants: 600,
    payment: 65,
    startDate: '2024-11-01',
    endDate: '2024-11-30'
  },
  'nutrition': {
    index: 2,
    name: 'Personalized Nutrition Study',
    organization: 'NutriGenetics',
    description: 'Genetic influence on dietary needs and metabolism',
    fullDescription: `This innovative nutrition study investigates how genetic variations affect individual dietary needs and metabolic responses. By analyzing genetic markers alongside detailed dietary logs and metabolic data, we aim to develop personalized nutrition recommendations.

Participants will contribute to groundbreaking research while receiving insights about their own genetic predispositions to various nutritional factors and metabolism patterns.`,
    icon: <FaAppleAlt size={40} />,
    requiredData: ['DNA', 'Dietary Logs', 'Metabolic Data'],
    participants: 300,
    targetParticipants: 800,
    payment: 70,
    startDate: '2024-11-01',
    endDate: '2024-11-30'
  },
  'fitness-tracking': {
    index: 3,
    name: 'Smart Fitness Analysis',
    organization: 'FitTech Research',
    description: 'AI-powered personalized fitness optimization',
    fullDescription: `Join our cutting-edge fitness study that uses AI to analyze and optimize personal fitness routines. This research combines wearable technology data with machine learning to understand individual response patterns to different types of exercise.

The study aims to develop AI models that can predict optimal workout patterns and recovery needs based on individual physiological responses and fitness goals.`,
    icon: <FaDumbbell size={40} />,
    requiredData: ['Fitness Metrics', 'Heart Rate Data', 'Activity Logs'],
    participants: 250,
    targetParticipants: 700,
    payment: 55,
    startDate: '2024-11-01',
    endDate: '2024-11-30',
    stakingRequired: {
      amount: 50,
      duration: '2 months'
    }
  }
}

const ExperimentDetails = ({ experiment }: { experiment: ExperimentData }) => {
  const { primaryWallet } = useDynamicContext();
  const [txnHash, setTxnHash] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { color: string; text: string }> = {
      active: { color: 'bg-green-100 text-green-800', text: 'Active' },
      completed: { color: 'bg-gray-100 text-gray-800', text: 'Completed' },
      upcoming: { color: 'bg-blue-100 text-blue-800', text: 'Upcoming' },
    };

    const statusInfo = statusMap[status.toLowerCase()] || statusMap.active;

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
        {statusInfo.text}
      </span>
    );
  };

  const handleJoinExperiment = async () => {
    if (!primaryWallet || !isEthereumWallet(primaryWallet)) {
      alert("Please connect your wallet first");
      return;
    }

    setIsLoading(true);
    try {
      const walletClient = await primaryWallet.getWalletClient();
      const publicClient = await primaryWallet.getPublicClient();

      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

      const transaction = {
        address: contractAddress as `0x${string}`,
        abi: CatinaBoxABI,
        functionName: 'initiateDataSharing',
        args: [
          0,
          "bafybeieroo27zktvpsw6zn3exqwz23tgckqkkic3xp67dxzoqoy3v7oob4",
          true
        ],
      };

      const hash = await walletClient.writeContract(transaction);
      setTxnHash(hash);

      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      console.log("Transaction completed:", receipt);

      window.location.href = "/experiments/join-success";
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Failed to join experiment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f3ea]">
      <Header />
      <div className="container-wide pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-medium mb-2">{experiment.name}</h1>
                  <p className="text-gray-600">by {experiment.organization}</p>
                </div>
                {getStatusBadge(experiment.status || 'active')}
              </div>

              <div className="prose prose-green max-w-none mb-6">
                <ReactMarkdown>{experiment.fullDescription}</ReactMarkdown>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-green-50 rounded-2xl">
                  <div className="flex items-center gap-2 text-[#2b7e21] mb-2">
                    <FaUsers />
                    <span className="font-medium">Participants</span>
                  </div>
                  <p className="text-2xl font-medium">{experiment.participants}</p>
                </div>

                <div className="p-4 bg-green-50 rounded-2xl">
                  <div className="flex items-center gap-2 text-[#2b7e21] mb-2">
                    <FaCoins />
                    <span className="font-medium">Reward</span>
                  </div>
                  <p className="text-2xl font-medium">🐱 {experiment.payment} CBOX</p>
                </div>

                <div className="p-4 bg-green-50 rounded-2xl">
                  <div className="flex items-center gap-2 text-[#2b7e21] mb-2">
                    <FaCalendar />
                    <span className="font-medium">Start Date</span>
                  </div>
                  <p className="text-lg font-medium">{experiment.startDate}</p>
                </div>

                <div className="p-4 bg-green-50 rounded-2xl">
                  <div className="flex items-center gap-2 text-[#2b7e21] mb-2">
                    <FaCalendar />
                    <span className="font-medium">End Date</span>
                  </div>
                  <p className="text-lg font-medium">{experiment.endDate}</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="text-xl font-medium mb-4">Required Data</h2>
              <div className="space-y-3">
                {experiment.requiredData.map((data: string) => (
                  <div key={data} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <FaCheck className="text-[#2b7e21]" />
                    <span>{data}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-medium mb-4">Join Experiment</h2>
              <p className="text-gray-600 mb-6">
                Share your data securely and earn rewards for contributing to research.
                {experiment.stakingRequired && (
                  <span className="block mt-2">
                    Requires staking 🐱 {experiment.stakingRequired.amount} CBOX for {experiment.stakingRequired.duration}
                  </span>
                )}
              </p>
              <button
                onClick={handleJoinExperiment}
                disabled={isLoading}
                className="flex items-center justify-center w-full px-4 py-3 bg-[#2b7e21] hover:bg-[#236b1a] text-white rounded-xl transition-colors disabled:bg-gray-400"
              >
                <FaLock className="mr-2" />
                <span>{isLoading ? "Processing..." : "Join Securely"}</span>
              </button>
              {txnHash && (
                <p className="mt-4 text-sm text-gray-600">
                  Transaction: {txnHash.slice(0, 6)}...{txnHash.slice(-4)}
                </p>
              )}
            </div>

            <div className="card">
              <h2 className="text-xl font-medium mb-4">Data Protection</h2>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center gap-2">
                  <FaLock className="text-[#2b7e21]" />
                  <span>End-to-end encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaLock className="text-[#2b7e21]" />
                  <span>Decentralized storage</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaLock className="text-[#2b7e21]" />
                  <span>User-controlled sharing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default async function ExperimentPage({ params }: { params: { id: string } }) {
  const experiment = experiments[params.id];

  if (!experiment) {
    return (
      <div className="min-h-screen bg-[#f8f3ea] flex items-center justify-center">
        <div className="card p-8">
          <h1 className="text-2xl font-medium mb-2">Experiment not found</h1>
          <p className="text-gray-600">The experiment you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const experimentData: ExperimentData = {
    index: experiment.index,
    name: experiment.name,
    organization: experiment.organization,
    description: experiment.description,
    status: experiment.status || 'active',
    fullDescription: experiment.fullDescription,
    participants: experiment.participants,
    payment: experiment.payment,
    startDate: experiment.startDate,
    endDate: experiment.endDate,
    requiredData: experiment.requiredData,
    ...(experiment.chatId && { chatId: experiment.chatId }),
    ...(experiment.icon && { icon: experiment.icon }),
    ...(experiment.targetParticipants && { targetParticipants: experiment.targetParticipants }),
    ...(experiment.stakingRequired && { stakingRequired: experiment.stakingRequired }),
  };

  return <ExperimentDetails experiment={experimentData} />;
} 