'use client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import ApplicationScreen from './screens/ApplicationScreen';
import ExtractorScreen from './screens/ExtractorScreen';
import SchedulerScreen from './screens/SchedulerScreen';
import UserResearchScreen from './screens/UserResearchScreen';
import RevenueScreen from './screens/RevenueScreen';

// Define types for our screens
type Screen = {
  id: number;
  type: 'application' | 'document' | 'meeting' | 'revenue' | 'userResearch';
};

const screens: Screen[] = [
  { id: 1, type: 'application' },
  { id: 2, type: 'document' },
  { id: 3, type: 'meeting' },
  { id: 4, type: 'revenue' },
  { id: 5, type: 'userResearch' },
];

const renderScreen = (screen: Screen, isVisible: boolean, onComplete: () => void) => {
  if (!isVisible) return null;
  
  const screenKey = `${screen.type}-${screen.id}`;
  
  switch (screen.type) {
    case 'application':
      return <ApplicationScreen key={screenKey} onComplete={onComplete} />;
    case 'document':
      return <ExtractorScreen key={screenKey} onComplete={onComplete} />;
    case 'meeting':
      return <SchedulerScreen key={screenKey} onComplete={onComplete} />;
    case 'revenue':
      return <RevenueScreen key={screenKey} onComplete={onComplete} />;
    case 'userResearch':
      return <UserResearchScreen key={screenKey} onComplete={onComplete} />;
    default:
      return (
        <div className="h-[400px] flex items-center justify-center text-white">
          Screen Content Coming Soon
        </div>
      );
  }
};

export function DemoCarousel() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isScreenComplete, setIsScreenComplete] = useState(false);

  // Reset screen complete state when screen changes
  useEffect(() => {
    setIsScreenComplete(false);
  }, [currentScreen]);

  // Auto-advance timer
  useEffect(() => {
    if (!isScreenComplete) return;

    const timer = setTimeout(() => {
      setCurrentScreen((prev) => (prev + 1) % screens.length);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isScreenComplete]);

  const handleDotClick = (index: number) => {
    if (index === currentScreen) return;
    setCurrentScreen(index);
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Screens Container */}
      <div 
        className="relative w-full h-full flex transition-transform duration-500"
        style={{
          transform: `translateX(-${currentScreen * 100}%)`
        }}
      >
        {screens.map((screen, index) => (
          <div 
            key={screen.id}
            className="min-w-full h-full flex items-center justify-center"
          >
            <div className="w-full max-w-[500px]">
              <div className="rounded-xl backdrop-blur-2xl bg-white/15 shadow-[0px_-1px_1px_0px_rgba(255,255,255,0.10)inset,0px_1px_1px_0px_rgba(255,255,255,0.25)inset,0px_8px_6px_0px_rgba(0,0,0,0.05)] p-6">
                {renderScreen(screen, index === currentScreen, () => setIsScreenComplete(true))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {screens.map((_, index) => (
          <button
            key={index}
            className={clsx(
              "w-2 h-2 rounded-full transition-all duration-300",
              currentScreen === index 
                ? "bg-white w-4" 
                : "bg-white/50 hover:bg-white/70"
            )}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
} 