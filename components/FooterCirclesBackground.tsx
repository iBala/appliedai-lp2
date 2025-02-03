'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';

const FooterCirclesBackground = () => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => setScreenWidth(window.innerWidth);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Using the same circle configuration but with different styling
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
              key={`footer-circle-${size}`}
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
                className="absolute inset-0.5 rounded-full border border-white/20"
                style={{
                  background: 'radial-gradient(90.34% 90.34% at 50.11% 9.66%, rgb(45, 45, 45) 0%, rgb(0, 0, 0) 100%)',
                  boxShadow: `
                    rgba(255, 255, 255, 0.15) 10.408px 8.921px 27.953px 4.461px inset,
                    rgba(255, 255, 255, 0.1) 0px 0px 50px 0px
                  `
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterCirclesBackground; 