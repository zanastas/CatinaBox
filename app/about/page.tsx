'use client';

import Header from "@components/header";
import { FaLock, FaUsers, FaFlask, FaBrain, FaChartLine } from 'react-icons/fa';
import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen bg-[#f8f3ea]">
      <Header />
      <div className="container-wide pt-40 pb-20">
        {/* Hero Section - Updated */}
        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl font-bold mb-8 flex items-center gap-4">
            <span className="leading-tight">Empowering Community Science Through Data</span>
            <Image 
              src="/zurcuit_cat.png"
              alt="Zircuit Cat"
              width={48}
              height={48}
              className="inline-block"
            />
          </h1>
          <p className="text-xl text-gray-600">
            <span className="font-bold">Cat In A Box</span> is a DeSci and SocialFi platform empowering anyone to participate in community science and decentralized experiments. We incentivize users to share private health data securely and engage in citizen science projects tailored to their interests.
          </p>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <div className="w-12 h-12 bg-[#ebf7eb] rounded-xl flex items-center justify-center mb-4">
              <FaLock className="text-[#2b7e21] text-2xl" />
            </div>
            <h3 className="text-xl font-medium mb-3">100% User-Owned Data</h3>
            <p className="text-gray-600">
              Health data encrypted and stored on-chain in decentralized storage, under a single user wallet.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <div className="w-12 h-12 bg-[#ebf7eb] rounded-xl flex items-center justify-center mb-4">
              <FaUsers className="text-[#2b7e21] text-2xl" />
            </div>
            <h3 className="text-xl font-medium mb-3">Community-Driven Science</h3>
            <p className="text-gray-600">
              Participate in scientific studies with minimal cost and earn rewards in crypto while contributing to collective knowledge.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <div className="w-12 h-12 bg-[#ebf7eb] rounded-xl flex items-center justify-center mb-4">
              <FaBrain className="text-[#2b7e21] text-2xl" />
            </div>
            <h3 className="text-xl font-medium mb-3">AI-Powered Assistance</h3>
            <p className="text-gray-600">
              AI agent assists users in understanding their participation and results, making science accessible to everyone.
            </p>
          </div>
        </div>

        {/* For Users & Scientists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-medium mb-4">For Users</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#2b7e21] rounded-full"></div>
                <span>Participate in studies and earn crypto rewards</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#2b7e21] rounded-full"></div>
                <span>Own and control your health data</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#2b7e21] rounded-full"></div>
                <span>Engage in personalized healthcare experiments</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-medium mb-4">For BioDAOs & Scientists</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#2b7e21] rounded-full"></div>
                <span>Easily set up citizen science projects</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#2b7e21] rounded-full"></div>
                <span>Foster transparent experimentation</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#2b7e21] rounded-full"></div>
                <span>Privately store and analyze data</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Technical Stack - Updated */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h3 className="text-2xl font-medium mb-6">Technologies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-[#ebf7eb] rounded-xl">
              <h4 className="font-medium mb-2">Data Storage</h4>
              <p className="text-sm text-gray-600">Filecoin and Lighthouse for encrypted and decentralized data storage</p>
            </div>
            <div className="p-4 bg-[#ebf7eb] rounded-xl">
              <h4 className="font-medium mb-2">Private Computation</h4>
              <p className="text-sm text-gray-600">Phala for TEE (Trusted Execution Environment) computation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 