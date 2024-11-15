'use client';

import { useState } from 'react';
import { FaUpload, FaChevronDown } from 'react-icons/fa';
import Header from '../../../components/header';
import Footer from '../../../components/footer';
import { createExperimentChat } from '@/utils/push';

interface DataType {
  id: string;
  name: string;
  subTypes: {
    id: string;
    name: string;
    description: string;
  }[];
}

const availableDataTypes: DataType[] = [
  {
    id: 'dna',
    name: 'DNA Data',
    subTypes: [
      { id: 'full_genome', name: 'Full Genome Sequence', description: 'Complete DNA sequence' },
      { id: 'snp_health', name: 'Health-related SNPs', description: 'Specific genetic markers related to health conditions' },
      { id: 'ancestry', name: 'Ancestry Information', description: 'Genetic markers related to ancestry' },
      { id: 'traits', name: 'Genetic Traits', description: 'Genes related to physical traits' }
    ]
  },
  {
    id: 'demographics',
    name: 'Age & Demographics',
    subTypes: [
      { id: 'age', name: 'Age', description: 'Participant age' },
      { id: 'gender', name: 'Gender', description: 'Gender information' },
      { id: 'ethnicity', name: 'Ethnicity', description: 'Ethnic background' },
      { id: 'location', name: 'Geographic Location', description: 'Current residence location' }
    ]
  },
  {
    id: 'wearable',
    name: 'Wearable Data',
    subTypes: [
      { id: 'heart_rate', name: 'Heart Rate', description: 'Continuous heart rate data, RHR, HRV' },
      { id: 'sleep', name: 'Sleep Metrics', description: 'Sleep duration, sleep quality scores, sleep stages' },
      { id: 'activity', name: 'Activity Level', description: 'Steps, distance, calories burned, active minutes' },
      { id: 'temperature', name: 'Body Temperature', description: 'Continuous body temperature measurements' }
    ]
  },
  {
    id: 'baseline_health',
    name: 'Baseline Health Data',
    subTypes: [
      { id: 'cholesterol', name: 'Cholesterol Levels', description: 'HDL, LDL, total cholesterol and triglycerides' },
      { id: 'glucose', name: 'Blood Glucose', description: 'Blood glucose levels' },
      { id: 'hormones', name: 'Hormone Levels', description: 'Cortisol, testosterone, estrogen, thyroid hormones' },
      { id: 'weight', name: 'Body Weight', description: 'Body weight measurements' }
    ]
  },
  {
    id: 'vaccine',
    name: 'Vaccine Records',
    subTypes: [
      { id: 'covid', name: 'COVID-19 Vaccines', description: 'COVID-19 vaccination history' },
      { id: 'flu', name: 'Flu Vaccines', description: 'Influenza vaccination history' },
      { id: 'childhood', name: 'Childhood Vaccines', description: 'Standard childhood vaccination records' },
      { id: 'other', name: 'Other Vaccines', description: 'Other vaccination records' }
    ]
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle Data',
    subTypes: [
      { 
        id: 'dietary_habits', 
        name: 'Dietary Habits', 
        description: 'Meal frequency, timing, macronutrients, and dietary preferences' 
      },
      { 
        id: 'nutrition_intake', 
        name: 'Nutrition Intake', 
        description: 'Caffeine and water intake, supplements' 
      },
      { 
        id: 'sleep_patterns', 
        name: 'Sleep Patterns', 
        description: 'Sleep/wake schedule, napping habits, sleep environment' 
      },
      { 
        id: 'mental_health', 
        name: 'Mental Health & Stress', 
        description: 'Mood tracking, stress levels, meditation practice' 
      }
    ]
  }
];

export default function CreateExperiment() {
  const [stakeEnabled, setStakeEnabled] = useState(false);
  const [selectedData, setSelectedData] = useState<{[key: string]: {all: boolean, specific: string[]}}>(
    Object.fromEntries(availableDataTypes.map(type => [type.id, {all: false, specific: []}]))
  );
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});

  const toggleDataType = (typeId: string, all: boolean) => {
    setSelectedData(prev => ({
      ...prev,
      [typeId]: {
        all,
        specific: all ? [] : prev[typeId].specific
      }
    }));
  };

  const toggleSpecificData = (typeId: string, subTypeId: string) => {
    setSelectedData(prev => {
      const currentSpecific = prev[typeId].specific;
      const newSpecific = currentSpecific.includes(subTypeId)
        ? currentSpecific.filter(id => id !== subTypeId)
        : [...currentSpecific, subTypeId];
      
      return {
        ...prev,
        [typeId]: {
          all: false,
          specific: newSpecific
        }
      };
    });
  };

  const toggleSection = (typeId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [typeId]: !prev[typeId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Your existing experiment creation logic...
      
      // Create a Push chat group for the experiment
      const pushUser = await initializePushUser(signer);
      const chatGroup = await createExperimentChat(
        pushUser,
        experimentId, // Your experiment ID
        experimentName // Your experiment name
      );
      
      // Save the chatGroup.chatId along with your experiment data
      // ... your storage logic ...
      
    } catch (error) {
      console.error('Error creating experiment:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Experiment</h1>
        
        <form className="space-y-6 bg-white p-8 rounded-xl shadow" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Organization Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter organization name"
            />
          </div>

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

          <div className="space-y-4">
            <label className="block text-lg font-medium text-gray-900">Required Data from Users</label>
            
            {availableDataTypes.map((dataType) => (
              <div key={dataType.id} className="border rounded-lg overflow-hidden">
                <div 
                  className="bg-gray-50 p-4 flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection(dataType.id)}
                >
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedData[dataType.id].all}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleDataType(dataType.id, e.target.checked);
                      }}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                    <span className="font-medium text-gray-900">{dataType.name}</span>
                  </div>
                  <FaChevronDown
                    className={`transform transition-transform text-gray-500 ${
                      expandedSections[dataType.id] ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                
                {expandedSections[dataType.id] && !selectedData[dataType.id].all && (
                  <div className="p-4 border-t bg-white">
                    <div className="space-y-2">
                      {dataType.subTypes.map((subType) => (
                        <div key={subType.id} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={selectedData[dataType.id].specific.includes(subType.id)}
                            onChange={() => toggleSpecificData(dataType.id, subType.id)}
                            className="h-4 w-4 text-blue-600 rounded border-gray-300"
                          />
                          <div>
                            <label className="font-medium text-sm text-gray-900">{subType.name}</label>
                            <p className="text-xs text-gray-500">{subType.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
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