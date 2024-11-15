'use client';

import { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import Header from '../../../components/header';
import Footer from '../../../components/footer';

export default function CreateExperiment() {
  const [stakeEnabled, setStakeEnabled] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Experiment</h1>
        
        <form className="space-y-6 bg-white p-8 rounded-xl shadow">
          <div>
            <label className="block text-sm font-medium text-gray-700">Experiment Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter experiment name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                    <span>Upload a file</span>
                    <input type="file" className="sr-only" accept="image/*" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Short Description</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="Brief overview of your experiment"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Full Description</label>
            <textarea
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="Detailed description of your experiment"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Required Data from Users</label>
            <textarea
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="List the types of data needed from participants"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Payment per User (FIL)</label>
            <input
              type="number"
              step="0.01"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="0.00"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
              checked={stakeEnabled}
              onChange={(e) => setStakeEnabled(e.target.checked)}
            />
            <label className="ml-2 block text-sm text-gray-900">Enable Staking</label>
          </div>

          {stakeEnabled && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Required Stake Amount (FIL)</label>
              <input
                type="number"
                step="0.01"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="0.00"
              />
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Experiment
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
} 