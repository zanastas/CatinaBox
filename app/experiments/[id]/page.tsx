'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@components/header';
import Footer from '@components/footer';
import { FaUsers, FaDna, FaCalendar, FaCoins, FaLock, FaCheck, FaBrain, FaAppleAlt, FaDumbbell, FaRunning, FaMoon } from 'react-icons/fa';
import ExperimentChat from '@/components/experiment-chat';

interface ExperimentDetails {
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
  chatId?: string;
}

export default function ExperimentDetails() {
  const params = useParams();
  const [experiment] = useState<ExperimentDetails>({
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
  });

export default function ExperimentDetails() {
  const params = useParams();
  const [experiment] = useState<ExperimentDetails>(experiments[params.id as keyof typeof experiments]);

  const getStatusBadge = (status: string) => {
    const styles = {
      active: "bg-green-100 text-green-800",
      completed: "bg-gray-100 text-gray-800",
      upcoming: "bg-blue-100 text-blue-800"
    }[status];

    return (
      <span className={`status-badge ${styles}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
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
                {experiment.requiredData.map((data) => (
                  <div key={data} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <FaCheck className="text-[#2b7e21]" />
                    <span>{data}</span>
                  </div>
                ))}
              </div>
            </div>

            {experiment.chatId && (
              <ExperimentChat
                experimentId={params.id as string}
                chatId={experiment.chatId}
              />
            )}
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
} 