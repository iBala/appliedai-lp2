'use client';

import { DemoBackground } from './DemoBackground';

export function FeatureDemoWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden">
      <DemoBackground />
      <div className="relative z-10 p-8 h-full flex items-center justify-center">
        <div className="w-[500px]">
          {children}
        </div>
      </div>
    </div>
  );
} 