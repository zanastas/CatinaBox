"use client";

import Header from "@components/header";
import Footer from "@components/footer";
import { useState } from "react";
import { FaUsers, FaDna, FaRunning, FaMoon, FaPlus } from "react-icons/fa";
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
      icon: <FaDna size={40} className="text-[#2b7e21]" />,
      requiredData: ["DNA", "Medical History"],
      participants: 150
    },
    {
      id: "running",
      name: "Stake & Run Challenge",
      organization: "Stake & Run DAO",
      description: "Fitness study correlating staking rewards with running performance",
      icon: <FaRunning size={40} className="text-[#2b7e21]" />,
      requiredData: ["Wearable Data", "Fitness Metrics"],
      participants: 300
    },
    {
      id: "sleep",
      name: "Sleep Quality Research",
      organization: "Sleep Labs",
      description: "Research on sleep patterns and genetic predisposition",
      icon: <FaMoon size={40} className="text-[#2b7e21]" />,
      requiredData: ["Sleep Data", "DNA", "Lifestyle Data"],
      participants: 200
    }
  ]);

  return (
    <div className="min-h-screen bg-[#f8f3ea]">
      <Header />
      <div className="container-wide pt-32 pb-20">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-medium mb-2">Experiments</h1>
            <p className="text-gray-600">Join research studies and earn rewards</p>
          </div>
          <Link href="/experiments/create">
            <button className="btn-primary">
              <FaPlus className="mr-2" /> Create Experiment
            </button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiments.map((experiment) => (
            <Link href={`/experiments/${experiment.id}`} key={experiment.id}>
              <div className="card hover:scale-[1.02]">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-green-50 rounded-2xl">
                      {experiment.icon}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaUsers />
                      <span>{experiment.participants}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-medium mb-1">{experiment.name}</h2>
                    <p className="text-sm text-gray-600">by {experiment.organization}</p>
                  </div>
                  
                  <p className="text-gray-600">{experiment.description}</p>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Required Data:</p>
                    <div className="flex flex-wrap gap-2">
                      {experiment.requiredData.map((data) => (
                        <span 
                          key={data}
                          className="status-badge"
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