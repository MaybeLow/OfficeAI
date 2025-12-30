import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, HelpCircle } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hello! I\'m your OfficeAI assistant. I can help you with health tips, routing suggestions, and optimizing your office environment. What would you like to know?',
    timestamp: new Date()
  }
];

const sampleResponses = [
  'Based on your office setup, I recommend adjusting your monitor to eye level and ensuring your chair provides proper lumbar support. This can help reduce strain during long work sessions.',
  'For optimal health, try the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds. This helps reduce eye strain from screen time.',
  'Your current commute route shows heavy traffic during peak hours. I\'d suggest leaving 15 minutes earlier or considering the alternate route via Oak Street, which typically saves 10-12 minutes.',
  'Based on your activity data, you\'re sitting for extended periods. I recommend setting up walking reminders every hour and aiming for at least 250 steps per hour during work.',
  'The air quality in your office area is good today, but consider opening windows for fresh air circulation. Natural ventilation can improve focus and reduce fatigue.',
  'For better productivity, try scheduling your most demanding tasks during your peak focus hours, which based on your patterns appear to be between 9:30 AM and 11:30 AM.'
];

export function Chat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[600px]">
      {/* Header with Top-Right Tooltip */}
      <div className="mb-4 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Chat with OfficeAI</h2>
          <p className="text-gray-600 mt-1">Ask about health, routing, and office optimization</p>
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
                  <h3 className="font-semibold mb-2 text-blue-200">What is this chat used for?</h3>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-center gap-2">
                      <span>The chat is primarily used to obtain more context about the user. You can tell it about your problems or your office environemnt and it will add this information to your profile. </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>All the data is stored locally on your device. When a new response is generated the data is sent to an external server for processing. </span>
                    </div>
                  </div>
                  {/* Decorative arrow */}
                  <div className="absolute -top-6 right-2 w-4 h-4 bg-gray-900 rotate-45 transform translate-y-1/2" />
                </div>
              </div>
            )}
          </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.role === 'user' 
                ? 'bg-blue-600' 
                : 'bg-gradient-to-br from-indigo-500 to-purple-600'
            }`}>
              {message.role === 'user' ? (
                <User className="w-5 h-5 text-white" />
              ) : (
                <Bot className="w-5 h-5 text-white" />
              )}
            </div>

            {/* Message Bubble */}
            <div className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block px-4 py-3 rounded-2xl ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1 px-2">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-gray-100 px-4 py-3 rounded-2xl">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about health tips, routing, or office setup..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}