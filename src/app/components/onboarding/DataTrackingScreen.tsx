import { useState, useEffect } from 'react';
import { MapPin, Activity, Monitor, Check, Shield, AlertTriangle } from 'lucide-react';
import type { OnboardingStep } from '../Onboarding';

interface DataTrackingScreenProps {
  onComplete: (selected: string[], nextStep: OnboardingStep) => void;
}

const trackingOptions = [
  { 
    id: 'location', 
    label: 'Location', 
    icon: MapPin, 
    description: 'Track your location for commute optimization and nearby recommendations',
    details: 'Used for: Traffic alerts, route suggestions, nearby amenities'
  },
  { 
    id: 'health', 
    label: 'Health Data', 
    icon: Activity, 
    description: 'Monitor activity levels, hydration, and posture for health recommendations',
    details: 'Used for: Break reminders, hydration alerts, posture tracking'
  },
  { 
    id: 'screen', 
    label: 'Screen Usage', 
    icon: Monitor, 
    description: 'Track screen time and focus patterns for productivity insights',
    details: 'Used for: Eye strain prevention, focus time optimization, productivity tips'
  },
];

export function DataTrackingScreen({ onComplete }: DataTrackingScreenProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [showWarning, setShowWarning] = useState(true);

  const toggleSelection = (id: string) => {
    setSelected(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleContinue = (nextStep: OnboardingStep) => {
    onComplete(selected, nextStep);
  };

  useEffect(() => {
  if (selected.length === 0) {
    setShowWarning(true);
  } else {
    setShowWarning(false);
  }
}, [selected]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Data tracking preferences</h2>
          <p className="text-gray-600">Choose what data you'd like to share for personalized recommendations</p>
        </div>

        {/* Privacy Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-900">
                <span className="font-medium">Your privacy matters.</span> All data is encrypted and used only to generate your personalized recommendations. You can change these settings anytime.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {trackingOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = selected.includes(option.id);
            
            return (
              <button
                key={option.id}
                onClick={() => toggleSelection(option.id)}
                className={`w-full p-6 rounded-xl border-2 transition-all text-left relative ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    isSelected ? 'bg-blue-600' : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      isSelected ? 'text-white' : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="flex-1 pr-8">
                    <h3 className="font-semibold text-gray-900 mb-1">{option.label}</h3>
                    <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                    <p className="text-xs text-gray-500 italic">{option.details}</p>
                  </div>
                  {isSelected && (
                    <div className="absolute top-6 right-6">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {showWarning && (
          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-amber-900 font-medium mb-2">
                  No data tracking method selected
                </p>
                <p className="text-sm text-amber-800 mb-3">
                  You can safely proceed without selecting any data tracking methods. You can enable them later in the settings menu.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <button
            onClick={() => handleContinue('recommendations')}
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Back
          </button>

          <button
            onClick={() => handleContinue('personalInfo')}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Continue
          </button>
      </div>
    </div>
  </div>
  );
}
