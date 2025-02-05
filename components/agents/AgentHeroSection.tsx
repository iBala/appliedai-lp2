'use client';

import { ReactNode, useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import AgentCirclesBackground from './AgentCirclesBackground';
import Header from '../Header';
import WaitlistModal from './WaitlistModal';
import { DemoBackground } from './DemoBackground';

interface CTAConfig {
  type: 'waitlist' | 'link';
  text: string;
  href?: string; // For external links
}

interface AgentHeroProps {
  theme?: 'light' | 'dark';
  title: string;
  description: string;
  rightContent: ReactNode;
  tag?: string;
  tagIcon?: ReactNode;
  cta?: CTAConfig;
}

// Update the CurvedArrow component with a more cursive path and yellow color
const CurvedArrow = () => (
  <svg 
    width="130" 
    height="130" 
    viewBox="0 0 130 130" 
    fill="#FFB800"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute -top-20 right-20 transform -scale-x-100 rotate-[260deg]"
  >
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M60.9866 102.011C75.5791 112.188 92.2457 119.614 108.76 118.142C114.825 117.601 120.44 115.34 126.202 113.089C126.708 112.891 126.959 112.318 126.761 111.813C126.564 111.307 125.991 111.055 125.486 111.253C119.899 113.436 114.463 115.655 108.587 116.178C92.3221 117.629 75.9409 110.146 61.6177 100.05C61.6659 99.904 61.7161 99.7581 61.7664 99.6122C62.8717 96.4058 62.1703 91.7303 60.3636 86.8178C57.7429 79.686 52.8573 72.0229 48.4641 67.7902C46.4383 65.8366 44.4768 64.6098 42.8751 64.3519C41.5406 64.1357 40.3951 64.5004 39.5108 65.5345C38.7833 66.3888 38.3673 67.4776 38.2447 68.7539C38.0819 70.4574 38.4477 72.5256 39.2174 74.7761C42.0652 83.1034 50.4316 94.0615 54.9675 97.5779C56.3884 98.6797 57.8334 99.7607 59.3045 100.818C59.0111 101.74 58.7277 102.621 58.38 103.433C57.8696 104.626 57.2244 105.663 56.1352 106.411C54.1255 107.791 51.7158 108.026 49.2519 107.666C45.3068 107.093 41.2271 105.009 38.2186 103.222C21.2968 93.1733 12.9424 75.7346 8.44871 58.2386C3.90274 40.5446 3.30786 22.7699 1.96336 12.2859C1.89302 11.7467 1.39863 11.3638 0.860028 11.4341C0.321425 11.5018 -0.0604183 11.9968 0.00791197 12.5359C1.36045 23.0773 1.9714 40.9432 6.53948 58.7283C11.1598 76.7114 19.8197 94.5877 37.2137 104.918C40.4152 106.817 44.7703 109.005 48.9685 109.617C51.9369 110.047 54.8289 109.698 57.2486 108.036C58.6594 107.067 59.5316 105.749 60.1908 104.21C60.4862 103.519 60.7394 102.78 60.9866 102.011ZM59.9436 98.8516C60.8761 95.976 60.1144 91.8475 58.5147 87.4976C55.9965 80.6445 51.3179 73.2757 47.0975 69.2071C45.6827 67.8449 44.3382 66.8577 43.1504 66.4487C42.2923 66.1518 41.5426 66.1883 41.0101 66.8134C40.3971 67.5323 40.166 68.5143 40.176 69.6604C40.1861 70.981 40.5217 72.5048 41.0824 74.1405C43.8136 82.1266 51.8243 92.6498 56.1734 96.0203C57.4113 96.9788 58.6694 97.9244 59.9436 98.8516Z"
      className="animate-draw"
    />
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M127.814 110.052C127.747 110.502 127.522 111.075 127.263 111.677C126.678 113.039 125.846 114.493 125.476 115.196C125.225 115.678 125.41 116.274 125.892 116.527C126.375 116.78 126.97 116.592 127.223 116.11C127.673 115.251 128.774 113.323 129.365 111.727C129.669 110.906 129.832 110.151 129.799 109.606C129.765 109.072 129.548 108.713 129.239 108.458C128.913 108.189 128.409 108.03 127.735 108.051C126.996 108.075 125.941 108.309 124.781 108.395C123.808 108.468 122.745 108.437 121.779 107.952C121.292 107.707 120.699 107.903 120.456 108.39C120.213 108.874 120.408 109.468 120.894 109.71C122.707 110.622 124.765 110.424 126.391 110.19C126.875 110.119 127.476 110.073 127.814 110.052Z"
      className="animate-draw"
    />
  </svg>
);

const AgentHeroSection = ({ 
  theme = 'light',
  title,
  description,
  rightContent,
  tag = 'Recruitment',
  tagIcon,
  cta
}: AgentHeroProps) => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const textColorClass = theme === 'light' ? 'text-gray-900' : 'text-white';
  const bgColorClass = theme === 'light' ? 'bg-white' : 'bg-[#0A40C2]';
  
  const handleCTAClick = () => {
    if (cta?.type === 'waitlist') {
      setIsWaitlistOpen(true);
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className={clsx(
        "relative flex min-h-screen w-full flex-col overflow-hidden",
        textColorClass,
        bgColorClass
      )}>
        {/* Header integrated into hero */}
        <Header theme={theme} />
        
        <AgentCirclesBackground theme={theme} />

        {/* Content Container - adjusted padding */}
        <div className="container relative z-10 mx-auto flex min-h-[calc(100vh-56px)] w-full flex-col px-8 py-12 md:py-10 lg:flex-row lg:items-center lg:py-20">
          {/* Left Column */}
          <div className="flex flex-1 flex-col items-start lg:max-w-[50%]">
            <div className="flex w-full flex-col items-start">
              <div className="mb-8 flex items-center">
                <div className="flex items-center gap-2">
                  {tagIcon ? (
                    <div className="text-[#0A40C2]">
                      {tagIcon}
                    </div>
                  ) : (
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      className="text-[#0A40C2]"
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <path d="M20.5 14.3L14.3 20.5C14.1 20.7 13.9 20.8 13.7 21L6 21C5.2 21 4.5 20.3 4.5 19.5L4.5 11.8C4.5 11.6 4.6 11.4 4.8 11.2L11 5C11.9 4.1 13.4 4.1 14.3 5L20.5 11.2C21.4 12.1 21.4 13.4 20.5 14.3Z" />
                      <path d="M9 14C10.1046 14 11 13.1046 11 12C11 10.8954 10.1046 10 9 10C7.89543 10 7 10.8954 7 12C7 13.1046 7.89543 14 9 14Z" />
                    </svg>
                  )}
                  <span className="text-md font-semibold text-[#0A40C2]">
                    {tag}
                  </span>
                </div>
              </div>

              <h1 className="mb-4 text-balance text-[36px] font-semibold leading-[1.2] md:mb-6 md:text-[48px] lg:text-wrap lg:text-start lg:text-[50px] lg:leading-[1.15]">
                {title}
              </h1>
              <h2 className={clsx(
                "mb-8 text-lg md:mb-10 md:text-xl lg:text-start lg:text-xl lg:leading-[1.55]",
                theme === 'light' ? 'text-gray-600' : 'text-white/80'
              )}>
                {description}
              </h2>

              {/* CTA Button */}
              {cta && (
                <div className="flex items-center">
                  {cta.type === 'waitlist' ? (
                    <button
                      onClick={handleCTAClick}
                      className="inline-flex items-center justify-center rounded-full bg-[#0A40C2] px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-[#0A40C2]/90"
                    >
                      {cta.text}
                    </button>
                  ) : (
                    <Link
                      href={cta.href || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-[#0A40C2] px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-[#0A40C2]/90"
                    >
                      {cta.text}
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-1 items-center justify-center lg:max-w-[50%]">
            <div className="relative w-[500px]">
              {/* Try it out label - Reduced top spacing from -20 to -14 */}
              <div className="absolute -top-10 right-28 hidden lg:block">
                <p className="text-lg font-medium text-[#FFB800]">Try it out</p>
                <CurvedArrow />
              </div>

              <div className="relative h-[600px] rounded-xl overflow-hidden">
                <DemoBackground />
                <div className="relative z-10 p-8 h-full flex items-center justify-center">
                  {rightContent}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Waitlist Modal */}
      <WaitlistModal 
        isOpen={isWaitlistOpen} 
        onClose={() => setIsWaitlistOpen(false)}
        agentType={tag}
      />
    </div>
  );
};

export default AgentHeroSection; 