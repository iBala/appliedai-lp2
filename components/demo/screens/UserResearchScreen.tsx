'use client';

import { useState, useEffect, useRef } from 'react';

type ProcessingState = 'asking' | 'receiving' | 'complete';

const UserResearchScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [processingState, setProcessingState] = useState<ProcessingState>('asking');
  const [showUserResponse, setShowUserResponse] = useState(false);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    if (hasCompletedRef.current) return; // Skip if already completed once

    const timeline = async () => {
      await new Promise(r => setTimeout(r, 1000));
      setProcessingState('receiving');
      await new Promise(r => setTimeout(r, 1500));
      setShowUserResponse(true);
      await new Promise(r => setTimeout(r, 500));
      setProcessingState('complete');
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
          User Research
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
            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-white">Collect user feedback</h3>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col bg-white/5 rounded-lg overflow-hidden">
        {/* Chat Header */}
        <div className="flex items-center px-4 py-3 bg-white/10 border-b border-white/10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex-shrink-0 flex items-center justify-center">
            <span className="text-sm font-medium text-white">E</span>
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-white">Eva AI</div>
            <div className="text-xs text-white/60">Product Research Interview</div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-6 space-y-6 overflow-auto">
          {/* Eva's Question - Left aligned */}
          <div className="flex items-start max-w-[80%]">
            <div className="flex space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex-shrink-0 flex items-center justify-center">
                <span className="text-sm font-medium text-white">E</span>
              </div>
              <div className="bg-white/10 rounded-2xl rounded-tl-none px-5 py-3">
                <div className="text-sm text-white">
                  Can you share your experience using Acme&apos;s face cream?
                </div>
              </div>
            </div>
          </div>

          {/* Processing Status */}
          {processingState === 'receiving' && !showUserResponse && (
            <div className="flex items-center space-x-2 text-sm text-white/70 px-11">
              <div className="w-2.5 h-2.5 border-2 border-white/20 border-t-white/70 rounded-full animate-spin" />
              <span>User is typing...</span>
            </div>
          )}

          {/* User Response - Right aligned */}
          {showUserResponse && (
            <div className="flex items-start justify-end">
              <div className="flex flex-row-reverse items-start space-x-reverse space-x-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0" />
                <div className="bg-blue-500/30 rounded-2xl rounded-tr-none px-5 py-3">
                  <div className="text-sm text-white">
                    It was smooth. I liked it. Suits my skin.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Status Bar */}
        {processingState === 'complete' && (
          <div className="px-4 py-2.5 bg-white/5 border-t border-white/10">
            <div className="flex items-center space-x-2 text-sm text-white/60">
              <span className="flex items-center text-green-400">
                <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
                Positive Sentiment
              </span>
              <span>•</span>
              <span>Feedback recorded</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserResearchScreen; 