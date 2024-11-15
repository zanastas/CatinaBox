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
      icon: <FaDna size={60} className="text-blue-600" />, 
      shared: false,
      description: "Upload and share your genetic information securely"
    },
    { 
      id: "age", 
      name: "Age & Demographics", 
      icon: <FaUserAlt size={60} className="text-blue-600" />, 
      shared: false,
      description: "Manage your demographic information"
    },
    { 
      id: "wearable", 
      name: "Wearable Data", 
      icon: <MdWatch size={60} className="text-blue-600" />,
      shared: false,
      description: "Connect and share data from your wearable devices"
    },
    { 
      id: "baseline_health", 
      name: "Baseline Health Data", 
      icon: <FaHeartbeat size={60} className="text-blue-600" />,
      shared: false,
      description: "Manage your basic health metrics and lab results"
    },
    { 
      id: "vaccine", 
      name: "Vaccine Record", 
      icon: <FaSyringe size={60} className="text-blue-600" />,
      shared: false,
      description: "Manage and share your vaccination history and records"
    },
    { 
      id: "lifestyle", 
      name: "Lifestyle Data", 
      icon: <FaLeaf size={60} className="text-blue-600" />,
      shared: false,
      description: "Track your dietary habits, sleep patterns, and mental wellness"
    },
  ]);

  const [uploading, setUploading] = useState<string | null>(null);
  const [sharing, setSharing] = useState<string | null>(null);

  const handleUpload = async (dataType: string) => {
    setUploading(dataType);
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Uploading ${dataType}`);
    } catch (error) {
      console.error(`Error uploading ${dataType}:`, error);
    } finally {
      setUploading(null);
    }
  };

  const handleShare = async (dataType: string) => {
    setSharing(dataType);
    try {
      // Simulate share delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Sharing ${dataType}`);
    } catch (error) {
      console.error(`Error sharing ${dataType}:`, error);
    } finally {
      setSharing(null);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-blue-600 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="w-full min-h-screen bg-blue-600 flex items-center justify-center">
        <div className="text-white text-xl">Please connect your wallet to view health data</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-blue-600">
      <Header />
      <div className="pt-24 px-4 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">My Health Data</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {healthData.map((data) => (
            <div 
              key={data.id} 
              className="bg-white rounded-xl p-6 shadow-lg border-2 border-black hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="text-blue-600 mb-2">{data.icon}</div>
                <h2 className="text-2xl font-bold text-center mb-2 text-blue-600">{data.name}</h2>
                <p className="text-gray-600 text-center text-base">{data.description}</p>
                
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => handleUpload(data.id)}
                    disabled={uploading === data.id}
                    className="flex items-center gap-2 bg-yellow-300 px-6 py-3 rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                  >
                    <FaUpload /> 
                    {uploading === data.id ? 'Uploading...' : 'Upload'}
                  </button>
                  
                  <button
                    onClick={() => handleShare(data.id)}
                    disabled={sharing === data.id}
                    className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                  >
                    <FaShare /> 
                    {sharing === data.id ? 'Sharing...' : 'Share'}
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