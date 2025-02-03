'use client';

import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

type ProcessingState = 'analyzing' | 'calculating' | 'complete';

type DayData = {
  day: string;
  revenue: number;
  percentage: number;
};

const RevenueScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [processingState, setProcessingState] = useState<ProcessingState>('analyzing');
  const [showResponse, setShowResponse] = useState(false);
  const [revenueAmount, setRevenueAmount] = useState(0);
  const hasCompletedRef = useRef(false);

  const weekData: DayData[] = [
    { day: 'Mon', revenue: 3890, percentage: 88 },
    { day: 'Tue', revenue: 4120, percentage: 93 },
    { day: 'Wed', revenue: 3750, percentage: 85 },
    { day: 'Thu', revenue: 4429, percentage: 100 },
    { day: 'Fri', revenue: 4100, percentage: 92 },
  ];

  useEffect(() => {
    if (hasCompletedRef.current) return;

    const timeline = async () => {
      await new Promise(r => setTimeout(r, 1000));
      setProcessingState('calculating');
      await new Promise(r => setTimeout(r, 1500));
      setProcessingState('complete');
      
      const targetAmount = 4429;
      const duration = 1000;
      const startTime = performance.now();

      const animateRevenue = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setRevenueAmount(Math.round(progress * targetAmount));
        
        if (progress < 1) {
          requestAnimationFrame(animateRevenue);
        } else {
          setShowResponse(true);
          hasCompletedRef.current = true;
          onComplete();
        }
      };

      requestAnimationFrame(animateRevenue);
    };

    timeline();
  }, [onComplete]);

  return (
    <div className="flex flex-col h-full">
      {/* Tag */}
      <div className="mb-3">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-white/10 text-white">
          Analytics
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
            <path d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-white">Get instant insights</h3>
      </div>

      {/* Main Container */}
      <div className="flex flex-col space-y-3">
        {/* Question */}
        <div className="bg-white/10 rounded-lg p-3">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-sm text-white/70 mb-1">Sarah Chen</div>
              <div className="text-sm text-white">
                Eva, what&apos;s the revenue yesterday?
              </div>
            </div>
          </div>
        </div>

        {/* Processing Status */}
        <div className="flex items-center space-x-2 text-sm text-white/70">
          <div className="w-3 h-3 border-2 border-white/20 border-t-white/70 rounded-full animate-spin" />
          <span>
            {processingState === 'analyzing' && "Analyzing request..."}
            {processingState === 'calculating' && "Calculating revenue..."}
            {processingState === 'complete' && "Analysis complete"}
          </span>
        </div>

        {/* Response with Chart */}
        {showResponse && (
          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex-shrink-0 flex items-center justify-center">
                <span className="text-sm font-medium text-white">E</span>
              </div>
              <div className="flex-1">
                <div className="text-sm text-white/70 mb-1">Eva AI</div>
                <div className="text-sm text-white space-y-3">
                  <p>We did USD {revenueAmount.toLocaleString()} for yesterday, January 30th.</p>
                  
                  {/* Simple Bar Chart */}
                  <div className="pt-4">
                    <div className="flex items-end h-40 gap-4">
                      {weekData.map((day) => (
                        <div 
                          key={day.day}
                          className="flex-1 flex flex-col items-center"
                        >
                          <div className="w-full relative flex flex-col justify-end h-full">
                            <div 
                              className={clsx(
                                "w-full rounded-t-md transition-all duration-1000 ease-out",
                                day.percentage === 100 ? "bg-blue-500" : "bg-white/40"
                              )}
                              style={{ 
                                height: day.percentage,
                                minHeight: '70px',
                                transitionDelay: '500ms'
                              }}
                            />
                          </div>
                          <div className="text-sm text-white/60 mt-3">{day.day}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-white/60 text-xs">
                    <span className="flex items-center text-green-400">
                      <svg className="w-3 h-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12 7a1 1 0 11-2 0 1 1 0 012 0zm-1 7a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      +12.3% vs last week
                    </span>
                    <span>•</span>
                    <span>Updated 2 mins ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueScreen; 