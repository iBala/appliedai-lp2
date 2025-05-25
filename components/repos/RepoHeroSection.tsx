import React from 'react';
import Header from '@/components/Header';

interface RepoHeroSectionProps {
  tag: string;
  tagIcon: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
}

const RepoHeroSection: React.FC<RepoHeroSectionProps> = ({
  tag,
  tagIcon,
  title,
  description,
  children
}) => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      
      <Header theme="light" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="text-center">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            {tagIcon}
            {tag}
          </div>
          
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {title}
          </h1>
          
          {/* Description */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {description}
          </p>
          
          {/* Children (optional content like debug components) */}
          {children}
        </div>
      </div>
    </section>
  );
};

export default RepoHeroSection; 