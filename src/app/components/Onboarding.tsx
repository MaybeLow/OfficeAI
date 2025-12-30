import { useState } from 'react';
import { WelcomeScreen } from './onboarding/WelcomeScreen';
import { SignUpScreen } from './onboarding/SignUpScreen';
import { RecommendationSelectionScreen } from './onboarding/RecommendationSelectionScreen';
import { DataTrackingScreen } from './onboarding/DataTrackingScreen';
import { PersonalInfoScreen } from './onboarding/PersonalInfoScreen';
import { RatingScreen } from './onboarding/RatingScreen';
import { OfflineModeNotice } from './onboarding/OfflineModeNotice';

export type OnboardingStep = 
  | 'welcome' 
  | 'signup' 
  | 'recommendations' 
  | 'dataTracking' 
  | 'personalInfo' 
  | 'rating'
  | 'offlineNotice';

interface OnboardingProps {
  onComplete: (isOfflineMode: boolean) => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [selectedRecommendations, setSelectedRecommendations] = useState<string[]>([]);
  const [selectedDataTracking, setSelectedDataTracking] = useState<string[]>([]);
  const [personalInfo, setPersonalInfo] = useState('');

  // Dynamic Progress Calculation
  const getProgress = () => {
    if (currentStep === 'welcome') return 0;
    
    // Short Path for the offline Mode
    if (isOfflineMode) {
       // Path: Welcome -> Recommendations -> OfflineNotice
       if (currentStep === 'recommendations') return 50;
       if (currentStep === 'offlineNotice') return 90;
       return 0;
    }

    // Long Path for the online Mode
    // Path: Welcome -> Signup -> Recommendations -> Data -> Personal -> Rating
    switch(currentStep) {
      case 'signup': return 15;
      case 'recommendations': return 30;
      case 'dataTracking': return 50;
      case 'personalInfo': return 70;
      case 'rating': return 100;
      case 'offlineNotice': return 100;
      default: return 0;
    }
  };

  const handleWelcomeChoice = (choice: 'login' | 'signup' | 'offline') => {
    if (choice === 'offline') {
      setIsOfflineMode(true);
      setCurrentStep('recommendations');
    } else if (choice === 'signup') {
      setCurrentStep('signup');
    } else {
      setCurrentStep('recommendations');
    }
  };

  const handleSignUpComplete = () => {
    setCurrentStep('recommendations');
  };

  const handleRecommendationsComplete = (recommendations: string[], nextStep: OnboardingStep) => {
    setSelectedRecommendations(recommendations);
    if (isOfflineMode && nextStep === 'dataTracking') {
      setCurrentStep('offlineNotice');
    } else {
      setIsOfflineMode(false);
      setCurrentStep(nextStep);
    }
  };

  const handleDataTrackingComplete = (tracking: string[], nextStep: OnboardingStep) => {
    setSelectedDataTracking(tracking);
    setCurrentStep(nextStep);
  };

  const handlePersonalInfoComplete = (info: string, nextStep: OnboardingStep) => {
    setPersonalInfo(info);
    setCurrentStep(nextStep);
  };

  const handleRatingComplete = () => {
    onComplete(false);
  };

  const handleOfflineNoticeComplete = () => {
    onComplete(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
      {/* Progress Bar */}
      {currentStep !== 'welcome' && (
        <div className="w-full max-w-2xl mx-auto pt-8 px-4">
          <div className="flex justify-between mb-2 text-sm font-medium text-gray-500">
            <span>Setup Progress</span>
            <span>{getProgress()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${getProgress()}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Screen Content */}
      <div className="flex-1">
        {currentStep === 'welcome' && (
          <WelcomeScreen onChoice={handleWelcomeChoice} />
        )}
        {currentStep === 'signup' && (
          <SignUpScreen onComplete={handleSignUpComplete} />
        )}
        {currentStep === 'recommendations' && (
          <RecommendationSelectionScreen 
            onComplete={handleRecommendationsComplete}
          />
        )}
        {currentStep === 'dataTracking' && (
          <DataTrackingScreen onComplete={handleDataTrackingComplete} />
        )}
        {currentStep === 'personalInfo' && (
          <PersonalInfoScreen onComplete={handlePersonalInfoComplete} />
        )}
        {currentStep === 'rating' && (
          <RatingScreen 
            recommendations={selectedRecommendations}
            dataTracking={selectedDataTracking}
            personalInfo={personalInfo}
            onComplete={handleRatingComplete} 
          />
        )}
        {currentStep === 'offlineNotice' && (
          <OfflineModeNotice onComplete={handleOfflineNoticeComplete} />
        )}
      </div>
    </div>
  );
}