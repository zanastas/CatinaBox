"use client";

import Header from "@components/header";
import Footer from "@components/footer";
import { useState } from "react";
import { FaUsers, FaDna, FaRunning, FaMoon } from "react-icons/fa";
import Link from "next/link";

interface ExperimentType {
  id: string;
  name: string;
  organization: string;
  description: string;
  icon: JSX.Element;
  requiredData: string[];
  participants: number;
}

export default function Experiments() {
  const [experiments] = useState<ExperimentType[]>([
    {
      id: "hair-loss",
      name: "Hair Loss Treatment Study",
      organization: "Hair DAO",
      description: "Study for treatment efficacy in people with specific genetic markers",
      icon: <FaDna size={40} />,
      requiredData: ["DNA", "Medical History"],
      participants: 150
    },
    {
      id: "running",
      name: "Stake & Run Challenge",
      organization: "Stake & Run DAO",
      description: "Fitness study correlating staking rewards with running performance",
      icon: <FaRunning size={40} />,
      requiredData: ["Wearable Data", "Fitness Metrics"],
      participants: 300
    },
    {
      id: "sleep",
      name: "Sleep Quality Research",
      organization: "Sleep Labs",
      description: "Research on sleep patterns and genetic predisposition",
      icon: <FaMoon size={40} />,
      requiredData: ["Sleep Data", "DNA", "Lifestyle Data"],
      participants: 200
    }
  ]);

  return (
    <div className="w-full min-h-screen bg-blue-600">
      <Header />
      <div className="pt-24 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Ongoing Experiments</h1>
          <button className="bg-yellow-300 text-black px-6 py-3 rounded-xl border-2 border-black hover:bg-yellow-400 transition-colors">
            Create Experiment
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiments.map((experiment) => (
            <Link href={`/experiments/${experiment.id}`} key={experiment.id}>
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-black hover:shadow-xl transition-shadow cursor-pointer">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="text-blue-600">{experiment.icon}</div>
                    <div className="flex items-center gap-2">
                      <FaUsers />
                      <span>{experiment.participants}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold">{experiment.name}</h2>
                    <p className="text-sm text-gray-600">by {experiment.organization}</p>
                  </div>
                  
                  <p className="text-gray-600">{experiment.description}</p>
                  
                  <div className="mt-4">
                    <p className="text-sm font-semibold mb-2">Required Data:</p>
                    <div className="flex flex-wrap gap-2">
                      {experiment.requiredData.map((data) => (
                        <span 
                          key={data}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {data}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
} 