import React from 'react';
import clsx from 'clsx';
import Header from '@/components/Header';
import AgentCirclesBackground from '@/components/agents/AgentCirclesBackground';

interface RepoHeroSectionProps {
  tag: string;
  tagIcon: React.ReactNode;
  title: string;
  description: string;
  theme?: 'light' | 'dark';
  children?: React.ReactNode;
}

const RepoHeroSection: React.FC<RepoHeroSectionProps> = ({
  tag,
  tagIcon,
  title,
  description,
  theme = 'light',
  children
}) => {
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
          <div className="flex flex-col max-w-5xl mx-auto w-full">
            <div className="mb-4 flex items-center">
              <div className="flex items-center gap-2">
                {tagIcon && (
                  <div className="text-gray-500 mr-2">
                    {tagIcon}
                  </div>
                )}
                <span className="text-sm font-medium text-gray-500">
                  {tag}
                </span>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-black mb-4">
              {title}
            </h1>
            
            <p className="text-xl text-gray-600 mt-2 mb-6">
              {description}
            </p>
            
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoHeroSection; 