import { useState } from 'react';
import { Save, ArrowLeft, Eye, EyeOff, Shield, Trash2 } from 'lucide-react';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  officeLocation: string;
  workHoursStart: string;
  workHoursEnd: string;
  commuteMethod: string;
  homeAddress: string;
}

const initialProfile: ProfileData = {
  name: 'Bob Johnson',
  email: 'bob.johnson@gmail.com',
  phone: '+358 50 123 4567',
  officeLocation: 'Gustaf Hällströmin katu 2, 00560 Helsinki, Finland',
  workHoursStart: '09:00',
  workHoursEnd: '17:00',
  commuteMethod: 'Public Transport',
  homeAddress: 'Kaivokatu 2, 00100 Helsinki, Finland'
};

const dataCollected = [
  { category: 'Activity Data', description: 'Movement patterns, sitting time, break frequency' },
  { category: 'Calendar Information', description: 'Meeting schedules, free time blocks' },
  { category: 'Location Data', description: 'Office and home locations for commute optimization' },
  { category: 'Productivity Metrics', description: 'Focus patterns, peak performance times' },
  { category: 'Environmental Data', description: 'Desk setup, monitor position, room temperature' },
  { category: 'Health Logs', description: 'Water intake, break activities, posture notes' }
];

interface ProfileSettingsProps {
  onBack: () => void;
}

export function ProfileSettings({ onBack }: ProfileSettingsProps) {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [showDataSection, setShowDataSection] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleChange = (field: keyof ProfileData, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setSaveMessage('Profile updated successfully!');
    setTimeout(() => {
      setSaveMessage('');
      onBack();
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
            <p className="text-gray-600 mt-1">Manage your personal information</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      {saveMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          {saveMessage}
        </div>
      )}

      {/* Personal Information */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="font-medium text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Home Address
            </label>
            <input
              type="text"
              value={profile.homeAddress}
              onChange={(e) => handleChange('homeAddress', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          
        </div>
      </div>

      {/* Work Information */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="font-medium text-gray-900 mb-4">Work Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Office Location
            </label>
            <input
              type="text"
              value={profile.officeLocation}
              onChange={(e) => handleChange('officeLocation', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Work Hours Start
            </label>
            <input
              type="time"
              value={profile.workHoursStart}
              onChange={(e) => handleChange('workHoursStart', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Work Hours End
            </label>
            <input
              type="time"
              value={profile.workHoursEnd}
              onChange={(e) => handleChange('workHoursEnd', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Commute Method
            </label>
            <input
              type="text"
              value={profile.commuteMethod}
              onChange={(e) => handleChange('commuteMethod', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>
      </div>

      {/* Data Privacy Section */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-start gap-3 mb-4">
          <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 mb-1">Data Privacy & Storage</h3>
            <p className="text-sm text-gray-600">
              View what data OfficeAI collects and stores about you
            </p>
          </div>
          <button
            onClick={() => setShowDataSection(!showDataSection)}
            className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
          >
            {showDataSection ? (
              <EyeOff className="w-5 h-5 text-blue-600" />
            ) : (
              <Eye className="w-5 h-5 text-blue-600" />
            )}
          </button>
        </div>

        {showDataSection && (
          <div className="space-y-3 mt-4">
            {dataCollected.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-4 border border-blue-100 flex justify-between items-start group"
              >
                {/* Text Content */}
                <div className="pr-4">
                  <h4 className="font-medium text-gray-900 text-sm mb-1">{item.category}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>

                {/* Delete Button */}
                <button 
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-blue-200">
              <p className="text-sm text-gray-600">
                All data is encrypted and used solely to generate personalized recommendations. 
                <br />You can add more data here using the chat bot.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
