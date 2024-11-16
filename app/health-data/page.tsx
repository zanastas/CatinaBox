"use client";

import Header from "@components/header";
import { useState } from "react";
import { FaDna, FaUserAlt, FaShare, FaUpload, FaHeartbeat, FaRunning, FaSyringe, FaNotesMedical, FaLeaf, FaChevronDown } from "react-icons/fa";
import { MdWatch } from "react-icons/md";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

interface ExperimentOffer {
  organization: string;
  dataRequired: string;
  reward: number;
  description: string;
}

interface HealthDataType {
  id: string;
  name: string;
  icon: JSX.Element;
  shared: boolean;
  description: string;
  offers: ExperimentOffer[];
}

export default function HealthData() {
  const { user, isLoading } = useDynamicContext();
  const isConnected = !!user;
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const [healthData] = useState<HealthDataType[]>([
    { 
      id: "dna", 
      name: "DNA Data", 
      icon: <FaDna size={60} className="text-[#2b7e21]" />, 
      shared: false,
      description: "Upload and share your genetic information securely",
      offers: [
        {
          organization: "HairDAO",
          dataRequired: "23andMe (2 SNPs)",
          reward: 20,
          description: "rs523349, rs731236 SNPs for hair loss study"
        },
        {
          organization: "Sleep Labs",
          dataRequired: "23andMe (5 SNPs)",
          reward: 50,
          description: "Sleep-related genetic markers"
        },
        {
          organization: "NutriGenetics",
          dataRequired: "23andMe (Full Profile)",
          reward: 100,
          description: "Complete genetic profile for nutrition study"
        }
      ]
    },
    { 
      id: "age", 
      name: "Age & Demographics", 
      icon: <FaUserAlt size={60} className="text-[#2b7e21]" />, 
      shared: false,
      description: "Manage your demographic information",
      offers: [
        {
          organization: "HairDAO",
          dataRequired: "Age, Sex",
          reward: 5,
          description: "Basic demographic data for hair loss study"
        },
        {
          organization: "Sleep Labs",
          dataRequired: "Age, Sex, Location",
          reward: 10,
          description: "Demographics for sleep pattern analysis"
        }
      ]
    },
    { 
      id: "wearable", 
      name: "Wearable Data", 
      icon: <MdWatch size={60} className="text-[#2b7e21]" />,
      shared: false,
      description: "Connect and share data from your wearable devices",
      offers: []
    },
    { 
      id: "baseline_health", 
      name: "Baseline Health Data", 
      icon: <FaHeartbeat size={60} className="text-[#2b7e21]" />,
      shared: false,
      description: "Manage your basic health metrics and lab results",
      offers: []
    },
    { 
      id: "medical_history", 
      name: "Medical History", 
      icon: <FaNotesMedical size={60} className="text-[#2b7e21]" />,
      shared: false,
      description: "Share your medical conditions and treatments history",
      offers: []
    },
    { 
      id: "lifestyle", 
      name: "Lifestyle Data", 
      icon: <FaLeaf size={60} className="text-[#2b7e21]" />,
      shared: false,
      description: "Track your dietary habits, sleep patterns, and mental wellness",
      offers: []
    },
  ]);

  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f3ea] flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-[#f8f3ea] flex items-center justify-center">
        <div className="text-xl">Please connect your wallet to view health data</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f3ea]">
      <Header />
      <div className="container-wide pt-40 pb-20">
        <div className="mb-12">
          <h1 className="text-4xl font-medium mb-2">My Health Data</h1>
          <p className="text-gray-600">Manage and share your health information securely</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {healthData.map((data) => (
            <div 
              key={data.id} 
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#2b7e21] transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex flex-col gap-6">
                <div className="p-4 bg-[#ebf7eb] rounded-2xl w-fit">
                  {data.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-medium mb-2">{data.name}</h2>
                  <p className="text-gray-600 mb-6">{data.description}</p>
                </div>
                
                <div className="flex gap-4">
                  <button className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-[#2b7e21] hover:bg-[#236b1a] text-white rounded-xl transition-colors">
                    <FaUpload /> 
                    <span>Upload</span>
                  </button>
                  <div className="relative flex-1">
                    <button 
                      onClick={() => toggleDropdown(data.id)}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-gray-200 hover:border-[#2b7e21] hover:text-[#2b7e21] rounded-xl transition-colors"
                    >
                      <FaShare /> 
                      <span>Share</span>
                      <FaChevronDown className={`ml-1 transform transition-transform ${activeDropdown === data.id ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {activeDropdown === data.id && data.offers.length > 0 && (
                      <div className="absolute bottom-full mb-2 -left-1/4 w-[150%] bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                        <div className="p-3">
                          {data.offers.map((offer, index) => (
                            <div 
                              key={index}
                              className="p-4 hover:bg-[#ebf7eb] rounded-lg cursor-pointer transition-colors mb-1 last:mb-0"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <span className="font-medium text-[#2b7e21] text-lg">{offer.organization}</span>
                                <span className="font-medium bg-[#ebf7eb] text-[#2b7e21] px-3 py-1 rounded-full">
                                  ${offer.reward}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{offer.dataRequired}</p>
                              <p className="text-sm text-gray-500">{offer.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}