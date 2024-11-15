"use client";

import Header from "@components/header";
import Footer from "@components/footer";
import { useState } from "react";
import { FaDna, FaUserAlt, FaShare, FaUpload, FaHeartbeat, FaRunning, FaSyringe, FaNotesMedical, FaLeaf } from "react-icons/fa";
import { MdWatch } from "react-icons/md";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

interface HealthDataType {
  id: string;
  name: string;
  icon: JSX.Element;
  shared: boolean;
  description: string;
}

export default function HealthData() {
  const { user, isLoading } = useDynamicContext();
  const isConnected = !!user;
  
  const [healthData] = useState<HealthDataType[]>([
    { 
      id: "dna", 
      name: "DNA Data", 
      icon: <FaDna size={60} className="text-[#2b7e21]" />, 
      shared: false,
      description: "Upload and share your genetic information securely"
    },
    { 
      id: "age", 
      name: "Age & Demographics", 
      icon: <FaUserAlt size={60} className="text-[#2b7e21]" />, 
      shared: false,
      description: "Manage your demographic information"
    },
    { 
      id: "wearable", 
      name: "Wearable Data", 
      icon: <MdWatch size={60} className="text-[#2b7e21]" />,
      shared: false,
      description: "Connect and share data from your wearable devices"
    },
    { 
      id: "baseline_health", 
      name: "Baseline Health Data", 
      icon: <FaHeartbeat size={60} className="text-[#2b7e21]" />,
      shared: false,
      description: "Manage your basic health metrics and lab results"
    },
    { 
      id: "medical_history", 
      name: "Medical History", 
      icon: <FaNotesMedical size={60} className="text-[#2b7e21]" />,
      shared: false,
      description: "Share your medical conditions and treatments history"
    },
    { 
      id: "lifestyle", 
      name: "Lifestyle Data", 
      icon: <FaLeaf size={60} className="text-[#2b7e21]" />,
      shared: false,
      description: "Track your dietary habits, sleep patterns, and mental wellness"
    },
  ]);

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
      <div className="container-wide pt-32 pb-20">
        <div className="mb-12">
          <h1 className="text-4xl font-medium mb-2">My Health Data</h1>
          <p className="text-gray-600">Manage and share your health information securely</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {healthData.map((data) => (
            <div 
              key={data.id} 
              className="card hover:scale-[1.02]"
            >
              <div className="flex flex-col gap-4">
                <div className="p-3 bg-green-50 rounded-2xl w-fit">
                  {data.icon}
                </div>
                <h2 className="text-2xl font-medium">{data.name}</h2>
                <p className="text-gray-600">{data.description}</p>
                
                <div className="flex gap-4 mt-2">
                  <button className="btn-primary flex-1">
                    <FaUpload className="mr-2" /> Upload
                  </button>
                  <button className="btn-outline flex-1">
                    <FaShare className="mr-2" /> Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}