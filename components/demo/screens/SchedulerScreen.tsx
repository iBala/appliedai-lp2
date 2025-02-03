'use client';

import { useState, useEffect, useRef } from 'react';

type ProcessingState = 'reading' | 'checking' | 'scheduling' | 'complete';

const SchedulerScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [processingState, setProcessingState] = useState<ProcessingState>('reading');
  const [showResponse, setShowResponse] = useState(false);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    if (hasCompletedRef.current) return;

    const timeline = async () => {
      // Reading email
      await new Promise(r => setTimeout(r, 1000));
      
      // Checking calendars
      setProcessingState('checking');
      await new Promise(r => setTimeout(r, 1500));
      
      // Scheduling
      setProcessingState('scheduling');
      await new Promise(r => setTimeout(r, 1000));
      
      // Complete
      setProcessingState('complete');
      setShowResponse(true);
      hasCompletedRef.current = true;
      onComplete();
    };

    timeline();
  }, [onComplete]);

  return (
    <div className="flex flex-col h-full">
      {/* Tag */}
      <div className="mb-3">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-white/10 text-white">
          Calendar
        </span>
      </div>

      {/* Title with Icon */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
          <svg 
            className="w-4 h-4 text-white"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-white">Schedule meetings automatically</h3>
      </div>

      {/* Main Container */}
      <div className="flex flex-col space-y-3">
        {/* Email Request */}
        <div className="bg-white/10 rounded-lg p-3">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-sm text-white/70 mb-1">John Smith</div>
              <div className="text-sm text-white">
                Eva, can you find time for a meeting with John next week?
              </div>
            </div>
          </div>
        </div>

        {/* Processing Status */}
        <div className="flex items-center space-x-2 text-sm text-white/70">
          <div className="w-3 h-3 border-2 border-white/20 border-t-white/70 rounded-full animate-spin" />
          <span>
            {processingState === 'reading' && "Reading email..."}
            {processingState === 'checking' && "Checking available slots..."}
            {processingState === 'scheduling' && "Scheduling meeting..."}
            {processingState === 'complete' && "Meeting scheduled"}
          </span>
        </div>

        {/* Response */}
        {showResponse && (
          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex-shrink-0 flex items-center justify-center">
                <span className="text-sm font-medium text-white">E</span>
              </div>
              <div className="flex-1">
                <div className="text-sm text-white/70 mb-1">Eva AI</div>
                <div className="text-sm text-white">
                  I&apos;ve scheduled a meeting with John for Thursday, Feb 7th at 3:30 PM. Calendar invites have been sent.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulerScreen; 