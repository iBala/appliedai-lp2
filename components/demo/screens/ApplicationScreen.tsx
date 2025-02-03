'use client';

import { useState, useEffect, useRef } from 'react';

type Skill = {
  name: string;
  matched: boolean;
};

const ApplicationScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [matchPercentage, setMatchPercentage] = useState(0);
  const hasCompletedRef = useRef(false);

  const skills: Skill[] = [
    { name: 'Product Strategy', matched: true },
    { name: 'Team Leadership', matched: true },
    { name: 'Agile', matched: true },
    { name: 'User Research', matched: false },
  ];

  // Animate the match percentage
  useEffect(() => {
    if (hasCompletedRef.current) return;

    const targetPercentage = 76;
    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setMatchPercentage(Math.round(progress * targetPercentage));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        hasCompletedRef.current = true;
        onComplete();
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <div className="flex flex-col h-full">
      {/* Tag */}
      <div className="mb-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-white/10 text-white">
          Recruit
        </span>
      </div>

      {/* Header with icon and title */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
          <svg 
            className="w-6 h-6 text-white"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-white">Application Received</h3>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Role info */}
          <div className="space-y-2">
            <p className="text-lg text-white">Senior Product Management Role</p>
            <div className="flex items-center space-x-2">
              <span className="text-white/60">Application from</span>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-white/20" />
                <span className="text-white font-medium">John D.</span>
              </div>
            </div>
          </div>

          {/* Match percentage */}
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/60">Match Score</span>
              <span className="text-white font-medium">
                {matchPercentage}%
              </span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-1000 ease-out rounded-full"
                style={{ width: `${matchPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Skills match */}
        <div className="mt-6">
          <h4 className="text-white/60 mb-3">Key Skills Match</h4>
          <div className="grid grid-cols-2 gap-3">
            {skills.map((skill) => (
              <div 
                key={skill.name}
                className="bg-white/10 rounded-lg px-3 py-2 text-sm flex items-center justify-between"
              >
                <span className="text-white">{skill.name}</span>
                {skill.matched ? (
                  <svg className="w-4 h-4 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationScreen; 