'use client';

import { useState } from 'react';
import Header from "@components/header";
import { FaChartLine, FaUsers, FaCalendar, FaTwitter, FaShare } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { SiLens, SiFarcaster } from 'react-icons/si';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Results() {
  // Mock data for the chart
  const chartData = {
    labels: Array.from({ length: 16 }, (_, i) => `Nov ${i + 1}`),
    datasets: [
      {
        label: 'Your Hair Loss Count',
        data: [125, 118, 121, 115, 108, 112, 105, 98, 95, 92, 88, 85, 82, 78, 75, 72],
        borderColor: '#2b7e21',
        backgroundColor: '#ebf7eb',
        tension: 0.4,
      },
      {
        label: 'Average Hair Loss Count (All Participants)',
        data: [130, 125, 120, 118, 115, 110, 108, 105, 102, 98, 95, 92, 88, 85, 82, 80],
        borderColor: '#666',
        backgroundColor: '#f5f5f5',
        tension: 0.4,
        borderDash: [5, 5],
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 0,
        title: {
          display: true,
          text: 'Hair Loss Count'
        }
      }
    }
  };

  const shareText = `🧬 Just reduced my hair loss by 42% in the HairDAO experiment! Loving the data-driven approach to hair care. Check it out on @CatinaBox! 🔬 #DeSci #Web3`;

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#f8f3ea]">
      <Header />
      <div className="container-wide pt-32 pb-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-medium">Your Experiment Results</h1>
          
          {/* Share Results Button */}
          <div className="relative group">
            <button 
              className="flex items-center gap-2 px-6 py-3 bg-[#2b7e21] hover:bg-[#236b1a] text-white rounded-xl transition-colors"
            >
              <FaShare />
              <span>Share Results</span>
            </button>
            
            {/* Share Options Dropdown */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={shareOnTwitter}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#ebf7eb] transition-colors text-left"
              >
                <FaTwitter className="text-[#1DA1F2]" />
                <span>Share on Twitter</span>
              </button>
              <button 
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#ebf7eb] transition-colors text-left"
              >
                <SiFarcaster className="text-[#855DCD]" />
                <span>Share on Farcaster</span>
              </button>
              <button 
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#ebf7eb] transition-colors text-left"
              >
                <SiLens className="text-[#00501E]" />
                <span>Share on Lens</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 bg-[#ebf7eb] rounded-lg flex items-center justify-center">
                <FaChartLine className="text-[#2b7e21] text-xl" />
              </div>
              <h3 className="text-lg font-medium">Progress</h3>
            </div>
            <p className="text-3xl font-medium text-[#2b7e21]">-42%</p>
            <p className="text-sm text-gray-600">Hair loss reduction</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 bg-[#ebf7eb] rounded-lg flex items-center justify-center">
                <FaUsers className="text-[#2b7e21] text-xl" />
              </div>
              <h3 className="text-lg font-medium">Participants</h3>
            </div>
            <p className="text-3xl font-medium text-[#2b7e21]">150</p>
            <p className="text-sm text-gray-600">Active participants</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 bg-[#ebf7eb] rounded-lg flex items-center justify-center">
                <FaCalendar className="text-[#2b7e21] text-xl" />
              </div>
              <h3 className="text-lg font-medium">Days Remaining</h3>
            </div>
            <p className="text-3xl font-medium text-[#2b7e21]">14</p>
            <p className="text-sm text-gray-600">Until experiment ends</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-medium mb-6">Hair Loss Trend</h2>
          <Line options={chartOptions} data={chartData} />
        </div>

        {/* Analysis */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 mt-8">
          <h2 className="text-2xl font-medium mb-4">Analysis</h2>
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-4">
              Your results show a consistent decrease in hair loss count over the past 16 days. 
              The trend indicates a 42% reduction in hair loss, which is better than the group average of 38%.
            </p>
            <p className="text-gray-600">
              Key observations:
            </p>
            <ul className="text-gray-600 list-disc pl-6 space-y-2">
              <li>Initial hair loss count was higher than average but showed faster improvement</li>
              <li>Most significant improvements were seen between days 7-10</li>
              <li>Current trajectory suggests continued improvement</li>
              <li>Results are consistent with expected outcomes for your genetic profile</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 