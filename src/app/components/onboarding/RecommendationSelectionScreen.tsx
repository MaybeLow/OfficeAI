import { useState, useEffect } from 'react';
import { Heart, Sprout, Dumbbell, Coffee, AlertTriangle, Check, HelpCircle } from 'lucide-react';
import type { OnboardingStep } from '../Onboarding';

interface RecommendationSelectionScreenProps {
  onComplete: (selected: string[], nextStep: OnboardingStep) => void;
}

const recommendationOptions = [
  { id: 'health', label: 'Health Advice', icon: Heart, description: 'Tips for posture, hydration, and wellness' },
  { id: 'environment', label: 'Environment', icon: Sprout, description: 'Office setup and air quality recommendations' },
  { id: 'hobbies', label: 'Hobbies', icon: Coffee, description: 'Suggestions for work-life balance activities' },
  { id: 'exercises', label: 'Exercises', icon: Dumbbell, description: 'Quick desk exercises and stretches' },
  { id: 'breaks', label: 'Break Reminders', icon: AlertTriangle, description: 'Smart reminders to take regular breaks' },
];

export function RecommendationSelectionScreen({ onComplete }: RecommendationSelectionScreenProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [showWarning, setShowWarning] = useState(true);
  const [showHelp, setShowHelp] = useState(false);

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
        {/* Header with Help Tooltip */}
        <div className="flex items-start justify-between mb-8 relative">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose your recommendations</h2>
            <p className="text-gray-600">Select the types of recommendations you'd like to receive</p>
          </div>

        {/* Help Button */}
          <div className="relative">
            <button
              onMouseEnter={() => setShowHelp(true)}
              onMouseLeave={() => setShowHelp(false)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              aria-label="Help"
            >
              <HelpCircle className="w-6 h-6" />
            </button>

            {/* Tooltip */}
            {showHelp && (
              <div className="absolute right-0 top-full mt-2 w-72 p-4 bg-gray-900 text-white text-sm rounded-xl shadow-xl z-20 animate-in fade-in zoom-in-95 duration-200">
                <div className="relative">
                  <h3 className="font-semibold mb-1 text-blue-200">Why choose?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    This helps OfficeAI filter out advice you don't need. For example, if you uncheck <strong>Exercises</strong>, we won't send you stretching notifications.
                  </p>
                  <div className="absolute -top-6 right-2 w-4 h-4 bg-gray-900 rotate-45 transform translate-y-1/2" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {recommendationOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = selected.includes(option.id);
            
            return (
              <button
                key={option.id}
                onClick={() => {
                  toggleSelection(option.id);
                }}
                className={`p-6 rounded-xl border-2 transition-all text-left relative ${
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
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{option.label}</h3>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                  {isSelected && (
                    <div className="absolute top-4 right-4">
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
                  No recommendations selected
                </p>
                <p className="text-sm text-amber-800 mb-3">
                  If you continue without selecting any recommendations, you won't receive personalized suggestions. Are you sure you want to proceed?
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <button
            onClick={() => handleContinue('welcome')}
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Back
          </button>

          <button
            onClick={() => handleContinue('dataTracking')}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Continue
          </button>
      </div>
      </div>
    </div>
  );
}
