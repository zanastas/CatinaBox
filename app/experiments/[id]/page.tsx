'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@components/header';
import Footer from '@components/footer';
import { FaUsers, FaDna, FaCalendar, FaCoins, FaLock, FaCheck, FaBrain, FaAppleAlt, FaDumbbell } from 'react-icons/fa';

interface Experiment {
  id: string;
  name: string;
  organization: string;
  status: 'active' | 'completed' | 'upcoming';
  fullDescription: string;
  participants: number;
  payment: number;
  startDate: string;
  endDate: string;
  requiredData: string[];
}

const experiments = {
  'hair-loss': {
    name: "Hair Loss Treatment Study",
    organization: "Hair DAO",
    description: "Study for treatment efficacy in people with specific genetic markers",
    fullDescription: "This comprehensive study aims to understand the relationship between specific genetic markers and the effectiveness of various hair loss treatments. Participants will contribute their genetic data and regular progress updates.",
    participants: 150,
    requiredData: ["DNA Data", "Medical History", "Progress Photos"],
    payment: 50,
    startDate: "2024-03-01",
    endDate: "2024-09-01",
    status: 'active',
    chatId: "your-chat-id-here"
  },
  'running': {
    name: "Running Performance Study",
    organization: "Athlete Health Research",
    description: "Study on the impact of running on cardiovascular health",
    fullDescription: "This study aims to understand the relationship between running frequency and cardiovascular health outcomes. Participants will contribute their running data and regular health check-ups.",
    participants: 200,
    requiredData: ["Running Data", "Heart Rate Data", "Health Check-ups"],
    payment: 70,
    startDate: "2024-04-01",
    endDate: "2024-10-01",
    status: 'active',
    chatId: "running-chat-id-here"
  },
  'sleep': {
    name: "Sleep Quality Study",
    organization: "Sleep Health Research",
    description: "Study on the impact of sleep on cognitive function",
    fullDescription: "This study aims to understand the relationship between sleep duration and cognitive function outcomes. Participants will contribute their sleep data and regular cognitive tests.",
    participants: 180,
    requiredData: ["Sleep Data", "Cognitive Test Scores", "Health Check-ups"],
    payment: 60,
    startDate: "2024-05-01",
    endDate: "2024-11-01",
    status: 'active',
    chatId: "sleep-chat-id-here"
  },
  'mental-health': {
    id: 'mental-health',
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
    startDate: '2024-05-01',
    endDate: '2024-11-01'
  },
  'nutrition': {
    id: 'nutrition',
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
    startDate: '2024-06-01',
    endDate: '2024-12-01'
  },
  'fitness-tracking': {
    id: 'fitness-tracking',
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
    startDate: '2024-07-01',
    endDate: '2024-12-31',
    stakingRequired: {
      amount: 50,
      duration: '2 months'
    }
  }
}

const ExperimentDetails = ({ experiment }: { experiment: Experiment }) => {
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
                {getStatusBadge(experiment.status)}
              </div>

              <p className="text-gray-600 mb-6">
                {experiment.fullDescription}
              </p>

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
                  <p className="text-2xl font-medium">{experiment.payment} FIL</p>
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
              </p>
              <button className="btn-primary w-full">
                <FaLock className="mr-2" /> Join Securely
              </button>
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
      <Footer />
    </div>
  );
};

export default async function ExperimentPage({ params }: { params: { id: string } }) {
  // Get the experiment data from our experiments object
  const experiment = experiments[params.id as keyof typeof experiments];

  // If experiment doesn't exist, you might want to handle that case
  if (!experiment) {
    // You could redirect to 404 or show an error message
    return (
      <div className="min-h-screen bg-[#f8f3ea] flex items-center justify-center">
        <div className="card p-8">
          <h1 className="text-2xl font-medium mb-2">Experiment not found</h1>
          <p className="text-gray-600">The experiment you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  // Convert the experiment data to match the Experiment interface
  const experimentData: Experiment = {
    id: params.id,
    name: experiment.name,
    organization: experiment.organization,
    status: experiment.status || 'active', // Provide a default if status is missing
    fullDescription: experiment.fullDescription,
    participants: experiment.participants,
    payment: experiment.payment,
    startDate: experiment.startDate,
    endDate: experiment.endDate,
    requiredData: experiment.requiredData,
  };

  return <ExperimentDetails experiment={experimentData} />;
} 