'use client';

import { useState } from 'react';
import { FaUpload, FaChevronDown, FaImage, FaTimes } from 'react-icons/fa';
import Header from '@components/header';
import Footer from '@components/footer';
import Image from 'next/image';

interface DataType {
  id: string;
  name: string;
  subTypes: {
    id: string;
    name: string;
    description: string;
  }[];
}

interface UploadedImage {
  url: string;
  file: File;
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
  const [selectedData, setSelectedData] = useState<{ [key: string]: { all: boolean, specific: string[] } }>(
    Object.fromEntries(availableDataTypes.map(type => [type.id, { all: false, specific: [] }]))
  );
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);

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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage({
        url: imageUrl,
        file: file
      });
    }
  };

  const removeImage = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage.url);
      setUploadedImage(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f3ea]">
      <Header />
      <div className="container-wide pt-32 pb-20">
        <h1 className="text-4xl font-medium mb-2">Create New Experiment</h1>
        <p className="text-gray-600 mb-12">Set up a new research study and define data requirements</p>

        <form className="space-y-8">
          {/* Basic Information Card */}
          <div className="card">
            <h2 className="text-xl font-medium mb-6">Basic Information</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                  placeholder="Your organization's name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experiment Name</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                  placeholder="Name of your research study"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                  placeholder="Brief overview of your experiment"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Description</label>
                <textarea
                  rows={4}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                  placeholder="Detailed description of your experiment"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl">
                  {!uploadedImage ? (
                    <div className="space-y-2 text-center">
                      <div className="flex flex-col items-center">
                        <FaImage className="h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label htmlFor="image-upload" className="relative cursor-pointer rounded-md font-medium text-[#2b7e21] hover:text-[#236b1a] focus-within:outline-none">
                            <span>Upload an image</span>
                            <input
                              id="image-upload"
                              name="image-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleImageUpload}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full">
                      <button
                        onClick={removeImage}
                        className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        style={{ transform: 'translate(50%, -50%)' }}
                      >
                        <FaTimes size={14} />
                      </button>
                      <div className="relative w-full h-48">
                        <Image
                          src={uploadedImage.url}
                          alt="Uploaded experiment cover"
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Required Data Card */}
          <div className="card">
            <h2 className="text-xl font-medium mb-6">Required Data</h2>
            <div className="space-y-4">
              {availableDataTypes.map((dataType) => (
                <div key={dataType.id} className="border border-gray-200 rounded-xl overflow-hidden">
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
                        className="h-4 w-4 text-[#2b7e21] rounded border-gray-300 focus:ring-[#2b7e21]"
                      />
                      <span className="font-medium text-gray-900">{dataType.name}</span>
                    </div>
                    <FaChevronDown
                      className={`transform transition-transform text-gray-500 ${expandedSections[dataType.id] ? 'rotate-180' : ''
                        }`}
                    />
                  </div>

                  {expandedSections[dataType.id] && !selectedData[dataType.id].all && (
                    <div className="p-4 border-t bg-white">
                      <div className="space-y-3">
                        {dataType.subTypes.map((subType) => (
                          <div key={subType.id} className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={selectedData[dataType.id].specific.includes(subType.id)}
                              onChange={() => toggleSpecificData(dataType.id, subType.id)}
                              className="h-4 w-4 text-[#2b7e21] rounded border-gray-300 focus:ring-[#2b7e21]"
                            />
                            <div>
                              <label className="font-medium text-sm text-gray-900">{subType.name}</label>
                              <p className="text-sm text-gray-500">{subType.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Reward Settings Card */}
          <div className="card">
            <h2 className="text-xl font-medium mb-6">Reward Settings</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment per User (FIL)</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                  placeholder="0.00"
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={stakeEnabled}
                  onChange={(e) => setStakeEnabled(e.target.checked)}
                  className="h-4 w-4 text-[#2b7e21] rounded border-gray-300 focus:ring-[#2b7e21]"
                />
                <label className="text-sm font-medium text-gray-900">Enable staking requirement</label>
              </div>

              {stakeEnabled && (
                <div className="space-y-4 pl-7">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stake Amount (FIL)</label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stake Duration</label>
                    <select className="w-full rounded-xl border border-gray-300 px-4 py-3">
                      <option>1 month</option>
                      <option>2 months</option>
                      <option>3 months</option>
                      <option>6 months</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="btn-primary px-8">
              Create Experiment
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
} 