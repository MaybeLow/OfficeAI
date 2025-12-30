import { useState } from 'react';
import { Clock, TrendingUp, Activity, Coffee, AlertCircle, Sparkles, HeartPulse, ChevronRight, HelpCircle } from 'lucide-react';
import { ReminderModal } from './ReminderModal';

export interface Reminder {
  id: string;
  title: string;
  triggerTime: string;
  description: string;
  dataUsed: string[];
  icon: 'trending' | 'activity' | 'coffee' | 'alert';
  priority: 'high' | 'medium' | 'low';
  isAiGenerated: boolean;
  isHealthRelated: boolean;
}

const mockReminders: Reminder[] = [
  {
    id: '1',
    title: 'Take a break - prolonged sitting detected',
    triggerTime: '2:30 PM',
    description: 'Based on your activity patterns, you\'ve been sitting for over 2 hours. Research shows that taking regular breaks improves focus and reduces health risks. Consider a 5-minute walk or some stretching exercises.',
    dataUsed: [
      'Activity tracker: No movement detected for 127 minutes',
      'Calendar: No meetings scheduled for the next 30 minutes',
      'Productivity metrics: Focus session started at 12:15 PM'
    ],
    icon: 'activity',
    priority: 'high',
    isAiGenerated: true,
    isHealthRelated: true
  },
  {
    id: '2',
    title: 'Hydration reminder',
    triggerTime: '3:00 PM',
    description: 'You haven\'t logged any water intake in the past 90 minutes. Staying hydrated is crucial for maintaining cognitive performance and energy levels throughout the afternoon.',
    dataUsed: [
      'Last water log: 1:30 PM (250ml)',
      'Daily water intake: 1.2L / 2.5L goal',
      'Room temperature: 72°F (slightly warm)'
    ],
    icon: 'coffee',
    priority: 'medium',
    isAiGenerated: false,
    isHealthRelated: true
  },
  {
    id: '3',
    title: 'Optimize your commute route',
    triggerTime: '4:45 PM',
    description: 'Traffic patterns suggest leaving 15 minutes earlier today. There\'s a reported accident on your usual route. Alternative route via Oak Street will save approximately 12 minutes.',
    dataUsed: [
      'Usual departure time: 5:00 PM',
      'Traffic API: Heavy congestion on Main Street',
      'Historical data: Wednesday traffic 23% heavier than average',
      'Weather: Clear conditions, no delays expected'
    ],
    icon: 'trending',
    priority: 'high',
    isAiGenerated: true,
    isHealthRelated: false
  },
  {
    id: '4',
    title: 'Posture check',
    triggerTime: '5:15 PM',
    description: 'Your desk setup analysis indicates you may be experiencing neck strain. Consider adjusting your monitor height and taking a moment to perform recommended neck stretches.',
    dataUsed: [
      'Desk camera analysis: Monitor positioned 3 inches below eye level',
      'Usage time: 6 hours 42 minutes today',
      'Previous posture alerts: 3 this week'
    ],
    icon: 'alert',
    priority: 'medium',
    isAiGenerated: true,
    isHealthRelated: true
  },
  {
    id: '5',
    title: 'Peak productivity window approaching',
    triggerTime: 'Tomorrow, 9:30 AM',
    description: 'Based on your work patterns, you\'re most productive between 9:30 AM and 11:30 AM. Consider scheduling your most important tasks during this window tomorrow.',
    dataUsed: [
      'Productivity tracking: Average focus score of 8.4/10 during morning hours',
      'Task completion rate: 76% higher before lunch',
      'Calendar analysis: 47 days of historical data',
      'Energy level logs: Consistently high ratings 9-11 AM'
    ],
    icon: 'trending',
    priority: 'low',
    isAiGenerated: true,
    isHealthRelated: false
  }
];

export function Reminders() {
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(null);
  const [showHelp, setShowHelp] = useState(false);

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'trending':
        return <TrendingUp className="w-5 h-5" />;
      case 'activity':
        return <Activity className="w-5 h-5" />;
      case 'coffee':
        return <Coffee className="w-5 h-5" />;
      case 'alert':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <>
      <div>
        {/* Header */}
        <div className="flex items-start justify-between mb-6 relative">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Your Reminders</h2>
            <p className="text-gray-600 mt-1">AI-generated recommendations based on your data</p>
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
                  <h3 className="font-semibold mb-2 text-blue-200">What do these icons mean?</h3>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                      <span><strong>AI Generated:</strong> Created by OfficeAI based on patterns.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HeartPulse className="w-4 h-4 text-rose-400" />
                      <span><strong>Health Related:</strong> Advice for your physical wellbeing.</span>
                    </div>
                  </div>
                  {/* Decorative arrow */}
                  <div className="absolute -top-6 right-2 w-4 h-4 bg-gray-900 rotate-45 transform translate-y-1/2" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {mockReminders.map((reminder) => (
            <button
              key={reminder.id}
              onClick={() => setSelectedReminder(reminder)}
              className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all bg-white group"
            >
              <div className="flex items-start gap-4">
                {/* Left: Icon */}
                <div className={`p-3 rounded-lg ${getPriorityColor(reminder.priority)} border`}>
                  {getIcon(reminder.icon)}
                </div>
                
                {/* Center: Title and Time */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {reminder.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{reminder.triggerTime}</span>
                  </div>
                </div>

                {/* Right: Badges and Arrow */}
                <div className="flex items-center gap-3 self-center">
                  {/* Health Badge */}
                  {reminder.isHealthRelated && (
                    <span 
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-medium border border-rose-100"
                      title="This reminder relates to physical health"
                    >
                      <HeartPulse className="w-3.5 h-3.5" />
                      
                    </span>
                  )}

                  {/* AI Disclosure Badge */}
                  {reminder.isAiGenerated && (
                    <span 
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium border border-indigo-100"
                      title="Generated by AI based on your data patterns"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      
                    </span>
                  )}

                  {/* Chevron Arrow */}
                  <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity pl-1">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {mockReminders.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <AlertCircle className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600">No reminders at the moment</p>
          </div>
        )}
      </div>

      {selectedReminder && (
        <ReminderModal
          reminder={selectedReminder}
          onClose={() => setSelectedReminder(null)}
        />
      )}
    </>
  );
}