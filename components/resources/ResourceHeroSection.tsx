'use client';

import clsx from 'clsx';
import Header from '../Header';
import AgentCirclesBackground from '../agents/AgentCirclesBackground';

interface ResourceHeroProps {
  tag: string;
  tagIcon: React.ReactNode;
  title: string;
  description: string;
  theme?: 'light' | 'dark';
}

export default function ResourceHeroSection({
  tag,
  tagIcon,
  title,
  description,
  theme = 'light'
}: ResourceHeroProps) {
  const textColorClass = theme === 'light' ? 'text-gray-900' : 'text-white';
  const bgColorClass = theme === 'light' ? 'bg-white' : 'bg-[#0A40C2]';

  return (
    <div className="relative overflow-hidden">
      <div className={clsx(
        "relative flex w-full flex-col overflow-hidden",
        textColorClass,
        bgColorClass
      )}>
        {/* Header integrated into hero */}
        <Header theme={theme} />
        
        <AgentCirclesBackground theme={theme} />

        {/* Content Container */}
        <div className="container relative z-10 mx-auto flex w-full flex-col px-8 py-12 md:py-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="mb-8 flex items-center">
              <div className="flex items-center gap-2">
                {tagIcon && (
                  <div className="text-[#0A40C2]">
                    {tagIcon}
                  </div>
                )}
                <span className="text-md font-semibold text-[#0A40C2]">
                  {tag}
                </span>
              </div>
            </div>

            <h1 className="mb-4 text-balance text-[36px] font-semibold leading-[1.2] md:mb-6 md:text-[48px] lg:text-wrap lg:text-[50px] lg:leading-[1.15]">
              {title}
            </h1>
            
            <h2 className={clsx(
              "mb-8 text-lg md:mb-10 md:text-xl lg:text-xl lg:leading-[1.55] max-w-2xl",
              theme === 'light' ? 'text-gray-600' : 'text-white/80'
            )}>
              {description}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
} 