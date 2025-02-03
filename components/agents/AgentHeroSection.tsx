'use client';

import { ReactNode, useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import AgentCirclesBackground from './AgentCirclesBackground';
import Header from '../Header';
import WaitlistModal from './WaitlistModal';

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
        <div className="container relative z-10 mx-auto flex min-h-[calc(100vh-56px)] w-full flex-col px-8 py-12 md:py-20 lg:flex-row lg:items-center lg:py-20">
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

              <h1 className="mb-4 text-balance text-[36px] font-semibold leading-[1.2] md:mb-6 md:text-[48px] lg:text-wrap lg:text-start lg:text-[60px] lg:leading-[1.15]">
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
            <div className="w-full max-w-[500px] relative z-10">
              {rightContent}
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