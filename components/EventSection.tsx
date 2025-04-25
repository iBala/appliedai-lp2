import React from 'react';

interface EventSectionProps {
  embedCode?: string;
}

export function EventSection({ embedCode }: EventSectionProps) {
  if (!embedCode) return null;

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-white mb-6">Upcoming Event</h2>
      
      {/* Embed container */}
      <div className="w-full">
        <div 
          className="w-full min-h-[450px]"
          dangerouslySetInnerHTML={{ 
            __html: embedCode.replace(/\\/g, '')
          }} 
        />
      </div>
    </div>
  );
} 