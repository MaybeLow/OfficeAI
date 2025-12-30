import { useState } from 'react';
import { Sparkles, HelpCircle } from 'lucide-react';

interface WelcomeScreenProps {
  onChoice: (choice: 'login' | 'signup' | 'offline') => void;
}

export function WelcomeScreen({ onChoice }: WelcomeScreenProps) {
  const [showOfflineTooltip, setShowOfflineTooltip] = useState(false);
  const [showGeneralHelp, setShowGeneralHelp] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute top-6 right-6 z-20">
        <div className="relative">
          <button
            onMouseEnter={() => setShowGeneralHelp(true)}
            onMouseLeave={() => setShowGeneralHelp(false)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            aria-label="Help"
          >
            <HelpCircle className="w-6 h-6" />
          </button>

          {/* General Help Tooltip */}
          {showGeneralHelp && (
            <div className="absolute top-full right-0 mt-2 w-72 p-4 bg-gray-900 text-white text-sm rounded-xl shadow-xl z-30 animate-in fade-in zoom-in-95 duration-200">
              <div className="relative">
                <h3 className="font-semibold mb-1 text-blue-200">About OfficeAI</h3>
                <p className="text-gray-300 leading-relaxed">
                  OfficeAI is your personal assistant for wellness and productivity. You can choose to <strong>Sign Up</strong> for cloud sync or <strong>Stay Offline</strong> to keep all data strictly on this device.
                </p>
                {/* Decorative arrow pointing up */}
                <div className="absolute -top-6 right-2 w-4 h-4 bg-gray-900 rotate-45 transform translate-y-1/2" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl mb-6 shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Welcome to OfficeAI
          </h1>
          <p className="text-gray-600">
            Your intelligent office assistant powered by AI
          </p>
        </div>

        {/* Options */}
        <div className="space-y-4">
          <button
            onClick={() => onChoice('login')}
            className="w-full px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl font-medium"
          >
            Log In
          </button>

          <button
            onClick={() => onChoice('signup')}
            className="w-full px-6 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-medium"
          >
            Sign Up
          </button>

          {/* Offline Option with Specific Tooltip */}
          <div className="relative group">
            <button
              onClick={() => onChoice('offline')}
              className="w-full px-6 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <span>Stay Offline</span>
              <div 
                className="relative"
                onMouseEnter={() => setShowOfflineTooltip(true)}
                onMouseLeave={() => setShowOfflineTooltip(false)}
              >
                <HelpCircle className="w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors" />
              </div>
            </button>

            {/* Offline Specific Tooltip */}
            {showOfflineTooltip && (
              <div className="absolute bottom-full left-0 right-0 mb-3 p-4 bg-gray-800 text-white text-sm rounded-xl shadow-xl z-10 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-start gap-2 relative">
                  <p className="leading-relaxed">
                    No information will be sent to the cloud. AI features will be limited to generic, rule-based responses for maximum privacy.
                  </p>
                  {/* Arrow pointing down */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-800 rotate-45" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}