import { ShieldOff, Check } from 'lucide-react';

interface OfflineModeNoticeProps {
  onComplete: () => void;
}

export function OfflineModeNotice({ onComplete }: OfflineModeNoticeProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
            <ShieldOff className="w-10 h-10 text-gray-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">You're in Offline Mode</h2>
          <p className="text-gray-600 text-lg">
            Your privacy is protected
          </p>
        </div>

        {/* Main Notice */}
        <div className="bg-gray-50 border-2 border-gray-300 rounded-2xl p-8 mb-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">No data collection</h3>
                <p className="text-gray-700">
                  None of your information, activities, or preferences will be stored or tracked.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Complete privacy</h3>
                <p className="text-gray-700">
                  All interactions remain local to your device and are not sent to any servers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-amber-700 font-bold">!</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Limited personalization</h3>
                <p className="text-gray-700">
                  Recommendations will be generic and not tailored to your specific needs or environment.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-amber-700 font-bold">!</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">No sync across devices</h3>
                <p className="text-gray-700">
                  Your settings and preferences won't be available on other devices.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
          <p className="text-sm text-blue-900">
            <span className="font-medium">Note:</span> You can always switch to an online account later from the Profile settings to enable personalized features.
          </p>
        </div>

        {/* Continue Button */}
        <button
          onClick={onComplete}
          className="w-full px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-lg"
        >
          Continue to OfficeAI
        </button>
      </div>
    </div>
  );
}
