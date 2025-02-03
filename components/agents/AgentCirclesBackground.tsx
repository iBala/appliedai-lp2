'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface AgentCirclesBackgroundProps {
  theme?: 'light' | 'dark';
}

const AgentCirclesBackground = ({ 
  theme = 'dark'
}: AgentCirclesBackgroundProps) => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => setScreenWidth(window.innerWidth);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Adjusted circle sizes to match CirclesBackground
  const getCircleConfigs = (width: number) => {
    const baseSize = width <= 768 ? 2400 : 3200;
    
    return [
      { size: 4816, delay: null, opacity: 1 },
      { size: 2816, delay: 2.8, opacity: 1 },
      { size: 2560, delay: 2.4, opacity: 1 },
      { size: 2304, delay: 2.0, opacity: 1 },
      { size: 2048, delay: 1.6, opacity: 1 },
      { size: 1792, delay: 1.2, opacity: 1 },
      { size: 1536, delay: 0.8, opacity: 1 },
      { size: 1280, delay: 0.4, opacity: 1 },
      { size: 1024, delay: 0, opacity: 1 },
    ];
  };

  const circles = getCircleConfigs(screenWidth);

  return (
    <div className="absolute hidden h-full w-full items-center justify-center overflow-hidden md:flex">
      <div className="absolute left-[calc(50%+300px)] flex scale-75 items-center justify-center md:left-[calc(50%+600px)] md:top-[280px] md:scale-100">
        <div className="relative flex items-center justify-center">
          {circles.map(({ size, delay, opacity }, index) => (
            <div 
              key={`agent-circle-${size}`}
              style={{
                height: `${size}px`,
                width: `${size}px`,
              }}
              className={clsx(
                "absolute isolate flex items-center justify-center rounded-full",
                delay !== null && "md:animate-[heroShadowAppear_0.8s_ease-in-out_forwards]",
                delay !== null && `[animation-delay:${delay}s]`
              )}
            >
              <div 
                className={clsx(
                  "absolute inset-0.5 rounded-full",
                  "border",
                  theme === 'light' 
                    ? "border-black/5 bg-[#FCFCFC]" 
                    : "border-[#FFD60A]/50 bg-black shadow-[0px_0px_40px_0px_rgba(255,214,10,0.50)_inset]",
                  "after:pointer-events-none after:absolute after:-inset-0.5 after:z-[-1] after:rounded-full",
                  theme === 'light'
                    ? "after:bg-[linear-gradient(180deg,rgba(0,0,0,0.03)_0%,rgba(0,0,0,0)_100%)]"
                    : "after:bg-[linear-gradient(180deg,rgba(255,214,10,0.2)_0%,rgba(255,214,10,0)_100%)]"
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentCirclesBackground; 