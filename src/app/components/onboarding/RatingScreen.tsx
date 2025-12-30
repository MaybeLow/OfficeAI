import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Sparkles, TrendingUp, Activity, Coffee, HelpCircle } from 'lucide-react';

interface RatingScreenProps {
  recommendations: string[];
  dataTracking: string[];
  personalInfo: string;
  onComplete: () => void;
}

interface GeneratedRecommendation {
  id: string;
  title: string;
  description: string;
  icon: 'trending' | 'activity' | 'coffee';
  rating: 'positive' | 'negative' | null;
}

export function RatingScreen({ recommendations, dataTracking, personalInfo, onComplete }: RatingScreenProps) {
  const [generatedRecommendations, setGeneratedRecommendations] = useState<GeneratedRecommendation[]>([
    {
      id: '1',
      title: 'Take regular breaks',
      description: 'Based on your work schedule, we recommend taking a 5-minute break every 90 minutes to maintain focus and reduce eye strain.',
      icon: 'activity',
      rating: null
    },
    {
      id: '2',
      title: 'Optimize your workspace ergonomics',
      description: 'Your dual monitor setup should be positioned at eye level, about an arm\'s length away. Consider adjusting your chair height for better posture.',
      icon: 'trending',
      rating: null
    },
    {
      id: '3',
      title: 'Stay hydrated throughout the day',
      description: 'Set up automatic reminders to drink water every hour. Aim for 8 glasses per day to maintain energy and cognitive performance.',
      icon: 'coffee',
      rating: null
    }
  ]);
  const [showHelp, setShowHelp] = useState(false);

  const handleRating = (id: string, rating: 'positive' | 'negative') => {
    setGeneratedRecommendations(prev =>
      prev.map(rec =>
        rec.id === id ? { ...rec, rating: rec.rating === rating ? null : rating } : rec
      )
    );
  };

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'trending':
        return <TrendingUp className="w-5 h-5" />;
      case 'activity':
        return <Activity className="w-5 h-5" />;
      case 'coffee':
        return <Coffee className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header with Help Tooltip */}
        <div className="flex items-start justify-between mb-8 relative">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Your first recommendations</h2>
            <p className="text-gray-600">We've generated personalized recommendations based on your preferences. Help us improve by rating these suggestions</p>
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
                  <h3 className="font-semibold mb-1 text-blue-200">Recommendations tool tip</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Thumb up indicates that the recommendation is relevant, hence will be used as a reference for future suggestions. 
                    
                    <br /><br />Thumb down indicates that the recommendation is not relevant, hence will be avoided in future suggestions.
                  </p>
                  <div className="absolute -top-6 right-2 w-4 h-4 bg-gray-900 rotate-45 transform translate-y-1/2" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Summary Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-blue-900">
            <span className="font-medium">Generated using:</span>{' '}
            {recommendations.length > 0 ? `${recommendations.length} recommendation types` : 'No recommendation types'},{' '}
            {dataTracking.length > 0 ? `${dataTracking.length} data sources` : 'no data tracking'},{' '}
            {personalInfo ? 'your personal information' : 'no personal information'}
          </p>
        </div>

        {/* Recommendations */}
        <div className="space-y-4 mb-8">
          {generatedRecommendations.map((rec) => (
            <div
              key={rec.id}
              className="bg-white border-2 border-gray-200 rounded-xl p-6 transition-all hover:shadow-md"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-blue-100 text-blue-700">
                  {getIcon(rec.icon)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{rec.title}</h3>
                  <p className="text-gray-700">{rec.description}</p>
                </div>
              </div>

              {/* Rating Buttons */}
              <div className="flex items-center gap-3 pl-16">
                <p className="text-sm text-gray-600">Was this helpful?</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRating(rec.id, 'positive')}
                    className={`p-2 rounded-lg border-2 transition-all ${
                      rec.rating === 'positive'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-300 text-gray-600 hover:border-green-300 hover:bg-green-50'
                    }`}
                  >
                    <ThumbsUp className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleRating(rec.id, 'negative')}
                    className={`p-2 rounded-lg border-2 transition-all ${
                      rec.rating === 'negative'
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-300 text-gray-600 hover:border-red-300 hover:bg-red-50'
                    }`}
                  >
                    <ThumbsDown className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="flex justify-end">
          <button
            onClick={onComplete}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {'Get Started'}
          </button>
        </div>
      </div>
    </div>
  );
}
