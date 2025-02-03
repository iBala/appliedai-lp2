'use client';

import React from 'react';

interface DemoComponentProps {
  onComplete: () => void;
}

type DemoWrapperProps = {
  children: React.ReactElement<DemoComponentProps>;
};

export function DemoWrapper({ children }: DemoWrapperProps) {
  return (
    <div className="w-[500px]">
      {/* Clone the child and pass onComplete prop */}
      {React.cloneElement(children, {
        onComplete: () => {}
      })}
    </div>
  );
} 