import { useState } from 'react';
import { Info, AlertCircle, HelpCircle } from 'lucide-react';
import type { OnboardingStep } from '../Onboarding';

interface PersonalInfoScreenProps {
  onComplete: (info: string, nextStep: OnboardingStep) => void;
}

export function PersonalInfoScreen({ onComplete }: PersonalInfoScreenProps) {
  const [info, setInfo] = useState('');
  const [showWarning, setShowWarning] = useState(true);
  const [showHelp, setShowHelp] = useState(false);

  const handleContinue = (nextStep: OnboardingStep) => {
    onComplete(info, nextStep);
  };

    const handleTextInput = (inputValue: string) => {
    if (inputValue.trim().length === 0) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header with Help Tooltip */}
        <div className="flex items-start justify-between mb-8 relative">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Provide personal information</h2>
            <p className="text-gray-600">Enter anything you think is relevant to your work environment</p>
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
                  <h3 className="font-semibold mb-1 text-blue-200">Why provide this information?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    The input field is the primary source for collecting personal information. This helps OfficeAI tailor recommendations 
                    specifically for you. If left blank, recommendations will be more generic. 
                    Please, provide as much detail as you feel comfortable with.
                  </p>
                  <div className="absolute -top-6 right-2 w-4 h-4 bg-gray-900 rotate-45 transform translate-y-1/2" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-900 mb-2">
                <span className="font-medium">Examples of helpful information:</span>
              </p>
              <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                <li>Your typical work schedule and break preferences</li>
                <li>Office setup details (standing desk, dual monitors, etc.)</li>
                <li>Health considerations or physical activities you do</li>
                <li>Your commute method and typical route</li>
                <li>Any specific goals (better posture, more hydration, etc.)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Text Area */}
        <div className="mb-6">
          <textarea
            value={info}
            onChange={(e) => {
              setInfo(e.target.value);
              handleTextInput(e.target.value);
            }}
            placeholder="Example: My name is Bob Anderson, I work from 9am to 5pm, prefer standing breaks every hour, use a standing desk, have back issues, commute by public transport, and want to improve my hydration and posture."
            className="w-full h-48 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <p className="text-sm text-gray-500 mt-2">
            {info.length} characters • This information will be used to set up your profile. The data can be deleted or changed at any point in the settings menu.
          </p>
        </div>

        {showWarning && (
          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-amber-900 font-medium mb-2">
                  No personal information provided
                </p>
                <p className="text-sm text-amber-800 mb-3">
                  The app won't have any of the requested personal data. Recommendations will be more generic. It is safe to proceed if you prefer not to share this information.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <button
            onClick={() => handleContinue('dataTracking')}
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Back
          </button>

          <button
            onClick={() => handleContinue('rating')}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
