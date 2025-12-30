import { useState } from 'react';
import { Settings, User, Mail, Phone, Briefcase, MapPin, Clock, Car } from 'lucide-react';
import { ProfileSettings } from './ProfileSettings';

const profileData = {
  name: 'Bob Johnson',
  email: 'bob.johnson@gmail.com',
  phone: '+358 50 123 4567',
  officeLocation: 'Gustaf Hällströmin katu 2, 00560 Helsinki, Finland',
  workHoursStart: '09:00',
  workHoursEnd: '17:00',
  commuteMethod: 'Public Transport',
  homeAddress: 'Kaivokatu 2, 00100 Helsinki, Finland',
  memberSince: 'December 2024'
};

const activityStats = [
  { label: 'Recommendations Received', value: '127' },
  { label: 'Breaks Taken', value: '89' },
  { label: 'Average Focus Time', value: '2.4 hrs' },
  { label: 'Days Active', value: '23' }
];

export function Profile() {
  const [showSettings, setShowSettings] = useState(false);

  if (showSettings) {
    return <ProfileSettings onBack={() => setShowSettings(false)} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
            <p className="text-gray-600">Member since {profileData.memberSince}</p>
          </div>
        </div>
        <button
          onClick={() => setShowSettings(true)}
          className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
          aria-label="Settings"
        >
          <Settings className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-gray-900">{profileData.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="text-gray-900">{profileData.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Home Address</p>
              <p className="text-gray-900">{profileData.homeAddress}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Work Information */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Work Information</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Briefcase className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Office Location</p>
              <p className="text-gray-900">{profileData.officeLocation}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Work Hours</p>
              <p className="text-gray-900">{profileData.workHoursStart} - {profileData.workHoursEnd}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Car className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Commute Method</p>
              <p className="text-gray-900">{profileData.commuteMethod}</p>
            </div>
          </div>
          
        </div>
      </div>

      {/* Activity Stats */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-4">Your Activity</h3>
        <div className="grid grid-cols-2 gap-4">
          {activityStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-blue-100">
              <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
              <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
