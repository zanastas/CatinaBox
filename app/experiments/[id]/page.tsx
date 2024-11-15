'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@components/header';
import Footer from '@components/footer';
import { FaUsers, FaDna, FaRunning, FaMoon, FaLock, FaCheckCircle } from 'react-icons/fa';

interface ExperimentDetails {
  id: string;
  name: string;
  organization: string;
  description: string;
  fullDescription: string;
  icon: JSX.Element;
  requiredData: string[];
  participants: number;
  targetParticipants: number;
  payment: number;
  startDate: string;
  endDate: string;
  stakingRequired?: {
    amount: number;
    duration: string;
  };
}

const experimentsData: { [key: string]: ExperimentDetails } = {
  'hair-loss': {
    id: 'hair-loss',
    name: 'Hair Loss Treatment Study',
    organization: 'Hair DAO',
    description: 'Study for treatment efficacy in people with specific genetic markers',
    fullDescription: `This comprehensive study aims to understand the relationship between specific genetic markers and the effectiveness of various hair loss treatments. By analyzing participant DNA and medical history, we hope to develop more targeted and effective treatments for different types of hair loss.

The study will analyze various genetic markers known to be associated with hair loss patterns and treatment response. This data will be combined with detailed medical histories to identify patterns that could predict treatment success.`,
    icon: <FaDna size={40} />,
    requiredData: ['DNA', 'Medical History'],
    participants: 150,
    targetParticipants: 500,
    payment: 50,
    startDate: '2024-03-01',
    endDate: '2024-09-01'
  },
  'running': {
    id: 'running',
    name: 'Stake & Run Challenge',
    organization: 'Stake & Run Community',
    description: 'Put your money on the line and run',
    fullDescription: `Struggling to stay motivated on your fitness journey?
Join the 30-day running challenge with Stake & Run—the perfect blend of fitness, motivation, and rewards, all powered by crypto.With Stake & Run, reaching your fitness goals is not only fun but rewarding. Stake your ETH, join the challenge, and let our AI coach keep you on track. Simply run, upload your screenshot, earn back your stake and win rewards. Whether you're training for a marathon or just staying fit, we've made it easy.`,
    icon: <FaRunning size={40} />,
    requiredData: ['Wearable Data', 'Fitness Metrics'],
    participants: 226,
    targetParticipants: 500,
    payment: 75,
    startDate: '2024-12-01',
    endDate: '2024-12-30',
    stakingRequired: {
      amount: 100,
      duration: '1 months'
    }
  },
  'sleep': {
    id: 'sleep',
    name: 'Sleep Quality Research',
    organization: 'Sleep Labs',
    description: 'Research on sleep patterns and genetic predisposition',
    fullDescription: `This groundbreaking sleep study investigates the relationship between genetic factors and sleep quality. By combining DNA analysis with detailed sleep metrics and lifestyle data, we aim to understand how genetic predisposition influences sleep patterns.

The research will help develop personalized recommendations for improving sleep quality based on individual genetic profiles. Participants will receive detailed insights about their sleep patterns and genetic factors affecting their rest.`,
    icon: <FaMoon size={40} />,
    requiredData: ['Sleep Data', 'DNA', 'Lifestyle Data'],
    participants: 200,
    targetParticipants: 750,
    payment: 60,
    startDate: '2024-04-01',
    endDate: '2024-10-01'
  }
};

export default function ExperimentDetail() {
  const params = useParams();
  const experimentId = params.id as string;
  const [experiment, setExperiment] = useState<ExperimentDetails | null>(null);
  const [isJoining, setIsJoining] = useState(false);
  const [joinStatus, setJoinStatus] = useState<'none' | 'pending' | 'approved'>('none');

  useEffect(() => {
    setExperiment(experimentsData[experimentId]);
  }, [experimentId]);

  if (!experiment) {
    return <div>Loading...</div>;
  }

  const progress = (experiment.participants / experiment.targetParticipants) * 100;

  const handleJoin = () => {
    setIsJoining(true);
    // Simulate API call
    setTimeout(() => {
      setJoinStatus('pending');
      setIsJoining(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-black">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-blue-600">{experiment.icon}</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{experiment.name}</h1>
              <p className="text-lg text-gray-600">by {experiment.organization}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">About this Experiment</h2>
            <p className="text-gray-700 whitespace-pre-line">{experiment.fullDescription}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Required Data</h3>
              <div className="flex flex-wrap gap-2">
                {experiment.requiredData.map((data) => (
                  <span 
                    key={data}
                    className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                  >
                    <FaLock className="inline-block mr-1 text-xs" /> {data}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Reward</h3>
              <p className="text-2xl font-bold text-blue-600">{experiment.payment} FIL</p>
              <p className="text-sm text-gray-500">per participant</p>
            </div>
          </div>

          {experiment.stakingRequired && (
            <div className="mb-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h3 className="text-lg font-semibold mb-2">Staking Required</h3>
              <p className="text-gray-700">
                This experiment requires a stake of {experiment.stakingRequired.amount} FIL for {experiment.stakingRequired.duration}
              </p>
            </div>
          )}

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Progress</h3>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-blue-600 rounded-full h-4 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>{experiment.participants} participants</span>
              <span>Target: {experiment.targetParticipants}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <p>Start Date: {new Date(experiment.startDate).toLocaleDateString()}</p>
              <p>End Date: {new Date(experiment.endDate).toLocaleDateString()}</p>
            </div>
            
            {joinStatus === 'none' ? (
              <button
                onClick={handleJoin}
                disabled={isJoining}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400"
              >
                {isJoining ? 'Processing...' : 'Join Experiment'}
              </button>
            ) : (
              <div className="flex items-center gap-2 text-green-600">
                <FaCheckCircle />
                <span>{joinStatus === 'pending' ? 'Application Pending' : 'Approved'}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 