import { useState } from 'react';
import { Reminders } from './components/Reminders';
import { Chat } from './components/Chat';
import { Profile } from './components/Profile';
import { Onboarding } from './components/Onboarding';
import { Bell, MessageSquare, User } from 'lucide-react';

type Tab = 'reminders' | 'chat' | 'profile';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('reminders');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [, setIsOfflineMode] = useState(false);

  if (!hasCompletedOnboarding) {
    return (
      <Onboarding 
        onComplete={(offlineMode) => {
          setHasCompletedOnboarding(true);
          setIsOfflineMode(offlineMode);
        }} 
      />
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col overflow-hidden">
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            OfficeAI
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Your AI-powered office assistant
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 overflow-hidden">
        
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full">
          
          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
            {activeTab === 'reminders' && <Reminders />}
            {activeTab === 'chat' && <Chat />}
            {activeTab === 'profile' && <Profile />}
          </div>

          {/* Bottom Navigation */}
          <nav className="border-t border-gray-200 bg-gray-50 flex-shrink-0">
            <div className="flex">
              <button
                onClick={() => setActiveTab('reminders')}
                className={`flex-1 flex flex-col items-center gap-1 py-4 transition-colors ${
                  activeTab === 'reminders'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Bell className="w-6 h-6" />
                <span className="text-sm">Reminders</span>
              </button>

              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 flex flex-col items-center gap-1 py-4 transition-colors ${
                  activeTab === 'chat'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <MessageSquare className="w-6 h-6" />
                <span className="text-sm">Chat</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 flex flex-col items-center gap-1 py-4 transition-colors ${
                  activeTab === 'profile'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <User className="w-6 h-6" />
                <span className="text-sm">Profile</span>
              </button>
            </div>
          </nav>
        </div>
      </main>
    </div>
  );
}