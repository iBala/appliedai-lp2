import React from 'react';

interface EventSectionProps {
  embedCode?: string;
}

export function EventSection({ embedCode }: EventSectionProps) {
  return (
    <section className="bg-white py-16 relative z-0">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Upcoming Event</h2>
        
        {embedCode ? (
          // If we have an embed code, display it in a responsive container
          <div className="max-w-4xl mx-auto">
            {/* Set a specific height that matches the Luma iframe */}
            <div className="w-full min-h-[450px]">
              <div 
                className="w-full"
                dangerouslySetInnerHTML={{ 
                  __html: embedCode.replace(/\\/g, '') // Remove any escape characters
                }} 
              />
            </div>
          </div>
        ) : (
          // If no embed code is available, show the message
          <div className="text-center text-gray-600 text-lg">
            <p>We don&apos;t have an event scheduled right now. Watch this space for upcoming events.</p>
          </div>
        )}
      </div>
    </section>
  );
} 