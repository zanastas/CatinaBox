'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface UserLeaderboardEntry {
  username: string
  experimentsParticipated: number
  dataPointsShared: number
  rewardAmount: number
}

interface CommunityLeaderboardEntry {
  name: string
  experimentsCount: number
  userCount: number
  scientistCount: number
  totalUSDCDistributed: number
}

interface ScientistLeaderboardEntry {
  username: string
  community: string
  papersPublished: number
  experimentsRun: number
  reputationScore: number
}

export default function LeaderboardPage() {
  const [userLeaderboard, setUserLeaderboard] = useState<UserLeaderboardEntry[]>([
    { username: "ava", experimentsParticipated: 28, dataPointsShared: 280, rewardAmount: 1050.50 },
    { username: "cab", experimentsParticipated: 25, dataPointsShared: 250, rewardAmount: 820.75 },
    { username: "hannah", experimentsParticipated: 20, dataPointsShared: 200, rewardAmount: 550.25 },
    { username: "mushroom210", experimentsParticipated: 18, dataPointsShared: 180, rewardAmount: 300.00 },
    { username: "carrot", experimentsParticipated: 15, dataPointsShared: 150, rewardAmount: 250.50 },
    { username: "david234", experimentsParticipated: 12, dataPointsShared: 120, rewardAmount: 200.75 },
    { username: "emma", experimentsParticipated: 10, dataPointsShared: 100, rewardAmount: 180.25 },
    { username: "frank", experimentsParticipated: 8, dataPointsShared: 80, rewardAmount: 150.00 },
    { username: "biogeek", experimentsParticipated: 6, dataPointsShared: 60, rewardAmount: 120.50 },
    { username: "hungrybunny", experimentsParticipated: 5, dataPointsShared: 50, rewardAmount: 100.75 }
  ]);

  const [communityLeaderboard, setCommunityLeaderboard] = useState<CommunityLeaderboardEntry[]>([
    { name: "HairDAO", experimentsCount: 45, userCount: 1200, scientistCount: 15, totalUSDCDistributed: 25000 },
    { name: "VitaminDAO", experimentsCount: 40, userCount: 1000, scientistCount: 12, totalUSDCDistributed: 22000 },
    { name: "Stake & Run Community", experimentsCount: 35, userCount: 800, scientistCount: 10, totalUSDCDistributed: 20000 },
    { name: "Biohacker Guild", experimentsCount: 30, userCount: 600, scientistCount: 8, totalUSDCDistributed: 18000 },
    { name: "Sleep Labs", experimentsCount: 25, userCount: 500, scientistCount: 6, totalUSDCDistributed: 15000 },
    { name: "CryoDAO", experimentsCount: 20, userCount: 400, scientistCount: 5, totalUSDCDistributed: 12000 },
    { name: "Longevity Hackers", experimentsCount: 18, userCount: 350, scientistCount: 4, totalUSDCDistributed: 10000 },
    { name: "Mushroom Lovers", experimentsCount: 15, userCount: 300, scientistCount: 4, totalUSDCDistributed: 8000 }
  ]);

  const [scientistLeaderboard, setScientistLeaderboard] = useState<ScientistLeaderboardEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        // Mock data for scientists
        const mockScientistData: ScientistLeaderboardEntry[] = [
          { username: "Dr_Quantum_Brain", community: "Sleep Labs", papersPublished: 15, experimentsRun: 42, reputationScore: 98 },
          { username: "BioHacker42", community: "Biohacker Guild", papersPublished: 12, experimentsRun: 38, reputationScore: 95 },
          { username: "CryoMaster", community: "CryoDAO", papersPublished: 10, experimentsRun: 35, reputationScore: 92 },
          { username: "anon_scientist_x", community: "VitaminDAO", papersPublished: 9, experimentsRun: 32, reputationScore: 90 },
          { username: "MushRoom_PhD", community: "Mushroom Lovers", papersPublished: 8, experimentsRun: 30, reputationScore: 88 },
          { username: "NeuroPunk2077", community: "Sleep Labs", papersPublished: 7, experimentsRun: 28, reputationScore: 85 },
          { username: "DataAlchemist", community: "HairDAO", papersPublished: 6, experimentsRun: 25, reputationScore: 82 },
          { username: "0xResearcher", community: "Longevity Hackers", papersPublished: 5, experimentsRun: 22, reputationScore: 80 },
          { username: "ChaosTheory_Doc", community: "Stake & Run Community", papersPublished: 4, experimentsRun: 20, reputationScore: 78 },
          { username: "anonymous_genius", community: "VitaminDAO", papersPublished: 3, experimentsRun: 18, reputationScore: 75 }
        ]

        setScientistLeaderboard(mockScientistData)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching leaderboard data:', error)
        setIsLoading(false)
      }
    }

    fetchLeaderboardData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16 mt-20">
      <div className="max-w-7xl mx-auto">
        {/* User Leaderboard */}
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2 pt-4">
          Individual Contributors
          <Image 
            src="/zurcuit_cat.png"
            alt="Contributors Icon"
            width={32}
            height={32}
            className="inline-block"
          />
        </h1>
        <div className="bg-white rounded-lg shadow overflow-hidden mb-16">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experiments</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Points</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rewards (🐱 CBOX)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userLeaderboard.map((entry, index) => (
                <tr key={entry.username} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.experimentsParticipated}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.dataPointsShared}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">🐱 {entry.rewardAmount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Community Leaderboard */}
        <h1 className="text-3xl font-bold mb-8">DeSci Communities 🧬</h1>
        <div className="bg-white rounded-lg shadow overflow-hidden mb-16">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Community</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experiments</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scientists</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CBOX Distributed</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {communityLeaderboard.map((entry, index) => (
                <tr key={entry.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.experimentsCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.userCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.scientistCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">🐱 {entry.totalUSDCDistributed.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Scientists Leaderboard */}
        <h1 className="text-3xl font-bold mb-8">Leading Scientists 🧪</h1>
        <div className="bg-white rounded-lg shadow overflow-hidden mb-16">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scientist</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Community</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Papers</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experiments</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reputation</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {scientistLeaderboard.map((entry, index) => (
                <tr key={entry.username} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.community}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.papersPublished}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.experimentsRun}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                        entry.reputationScore >= 90 ? 'bg-green-500' :
                        entry.reputationScore >= 80 ? 'bg-blue-500' :
                        'bg-gray-500'
                      }`}></span>
                      {entry.reputationScore}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 