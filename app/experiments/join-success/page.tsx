'use client';

import { useState } from 'react';
import Header from "@components/header";
import { FaCalendar, FaCheck, FaChevronDown, FaChartLine } from 'react-icons/fa';
import Link from 'next/link';

interface DayLog {
  date: string;
  hairCount: number | null;
}

type ShampooType = '💪 DHT Fighters' | '🌞 Vitamin D Boosters';

export default function JoinSuccess() {
  const [selectedShampoo, setSelectedShampoo] = useState<ShampooType | null>(null);
  const [logs, setLogs] = useState<Record<string, DayLog>>({
    '2024-11-01': { date: '2024-11-01', hairCount: 125 },
    '2024-11-02': { date: '2024-11-02', hairCount: 118 },
    '2024-11-03': { date: '2024-11-03', hairCount: 121 },
    '2024-11-04': { date: '2024-11-04', hairCount: 115 },
    '2024-11-05': { date: '2024-11-05', hairCount: 108 },
    '2024-11-06': { date: '2024-11-06', hairCount: 112 },
    '2024-11-07': { date: '2024-11-07', hairCount: 105 },
    '2024-11-08': { date: '2024-11-08', hairCount: 98 },
    '2024-11-09': { date: '2024-11-09', hairCount: 95 },
    '2024-11-10': { date: '2024-11-10', hairCount: 92 },
    '2024-11-11': { date: '2024-11-11', hairCount: 88 },
    '2024-11-12': { date: '2024-11-12', hairCount: 85 },
    '2024-11-13': { date: '2024-11-13', hairCount: 82 },
    '2024-11-14': { date: '2024-11-14', hairCount: 78 },
    '2024-11-15': { date: '2024-11-15', hairCount: 75 },
    '2024-11-16': { date: '2024-11-16', hairCount: 72 }
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Generate November 2024 calendar days
  const november2024 = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(2024, 10, i + 1);
    return {
      date: date.toISOString().split('T')[0],
      dayOfWeek: date.getDay(),
      dayOfMonth: date.getDate()
    };
  });

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleLogUpdate = (date: string, hairCount: number) => {
    setLogs(prev => ({
      ...prev,
      [date]: {
        date,
        hairCount
      }
    }));
  };

  return (
    <div className="min-h-screen bg-[#f8f3ea]">
      <Header />
      <div className="container-wide pt-32 pb-20">
        {/* Success Message */}
        <div className="bg-white rounded-2xl p-8 border border-[#2b7e21] mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-[#ebf7eb] rounded-full flex items-center justify-center">
              <FaCheck className="w-6 h-6 text-[#2b7e21]" />
            </div>
            <div>
              <h1 className="text-3xl font-medium mb-2">Congratulations! You're IN!</h1>
              <p className="text-gray-600">Check your wallet for immediate rewards. Let's start tracking your progress!</p>
            </div>
          </div>
        </div>

        {/* Shampoo Selection */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
          <h2 className="text-2xl font-medium mb-6">Your Treatment</h2>
          <div className="relative w-full max-w-md">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-[#ebf7eb] text-[#2b7e21] rounded-xl hover:bg-[#d9f0d9] transition-colors"
            >
              <span>{selectedShampoo || 'Select your shampoo type'}</span>
              <FaChevronDown className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-10">
                {(['💪 DHT Fighters', '🌞 Vitamin D Boosters'] as ShampooType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedShampoo(type);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-[#ebf7eb] transition-colors"
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-medium mb-6">Daily Hair Loss Count</h2>
          <div className="max-w-4xl mx-auto">
            {/* Week days header */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {weekDays.map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before November 1st (Wednesday) */}
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square bg-gray-50 rounded-lg" />
              ))}
              
              {/* November days */}
              {november2024.map(({ date, dayOfMonth }) => (
                <div
                  key={date}
                  className="aspect-square bg-white border border-gray-200 rounded-lg p-2 hover:border-[#2b7e21] transition-colors"
                >
                  <div className="flex flex-col h-full">
                    <span className="text-xs text-gray-500 mb-1">{dayOfMonth}</span>
                    <input
                      type="number"
                      min="0"
                      value={logs[date]?.hairCount || ''}
                      onChange={(e) => handleLogUpdate(date, parseInt(e.target.value))}
                      className="w-full h-full text-center text-sm border-none focus:ring-1 focus:ring-[#2b7e21] rounded-md"
                      placeholder="#"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex justify-end gap-4">
            <Link href="/experiments/results">
              <button className="flex items-center gap-2 px-6 py-3 border border-[#2b7e21] text-[#2b7e21] hover:bg-[#ebf7eb] rounded-xl transition-colors">
                <FaChartLine className="text-lg" />
                <span>View Results</span>
              </button>
            </Link>
            <button className="flex items-center gap-2 px-6 py-3 bg-[#2b7e21] hover:bg-[#236b1a] text-white rounded-xl transition-colors">
              <FaCheck />
              <span>Save Progress</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 