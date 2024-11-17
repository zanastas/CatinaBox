"use client";

import Header from "@components/header";
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
      name: "30-Day Fitness Challenge",
      organization: "Stake & Run",
      description: "Study correlating exercise intensity, recovery patterns, and fitness outcomes",
      icon: <FaRunning size={40} className="text-[#2b7e21]" />,
      requiredData: [
        "Heart Rate Zones & HRV",
        "Sleep Quality Metrics",
        "Daily Activity Levels",
        "Recovery Scores",
        "Body Composition Data"
      ],
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
            <h1 className="text-4xl font-medium mb-2">Ongoing Experiments</h1>
            <p className="text-gray-600">Join research studies and earn rewards</p>
          </div>
          <Link 
            href="/experiments/create"
            className="flex items-center gap-2 px-6 py-3 bg-[#2b7e21] hover:bg-[#236b1a] text-white rounded-xl transition-colors"
          >
            <FaPlus className="text-lg" />
            <span>Create Experiment</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiments.map((experiment) => (
            <Link href={`/experiments/${experiment.id}`} key={experiment.id} className="block">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#2b7e21] transition-all duration-200 hover:shadow-lg">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-[#ebf7eb] rounded-xl flex items-center justify-center">
                      {experiment.icon}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaUsers className="text-[#2b7e21]" />
                      <span className="font-medium">{experiment.participants}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-medium mb-2 group-hover:text-[#2b7e21] transition-colors">
                      {experiment.name}
                    </h2>
                    <p className="text-sm text-gray-600 mb-2">by {experiment.organization}</p>
                    <p className="text-gray-600 mb-4">{experiment.description}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-3 text-gray-700">Required Data:</p>
                    <div className="flex flex-wrap gap-2">
                      {experiment.requiredData.map((data) => (
                        <span 
                          key={data}
                          className="px-3 py-1 bg-[#ebf7eb] text-[#2b7e21] rounded-full text-sm font-medium"
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
    </div>
  );
} 