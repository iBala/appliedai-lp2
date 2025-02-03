'use client';

import clsx from 'clsx';
import { useEffect, useState, useMemo } from 'react';

interface CirclesBackgroundProps {
  theme?: 'light' | 'dark';
  position?: 'right' | 'left' | 'both';
  variant?: 'default' | 'sparse' | 'dense';
}

const CirclesBackground = ({ 
  theme = 'dark', 
  position = 'right',
  variant = 'default' 
}: CirclesBackgroundProps) => {
  console.log('CirclesBackground mounted with position:', position);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    // Set initial width
    setScreenWidth(window.innerWidth);
    
    // Debounced resize handler
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setScreenWidth(window.innerWidth), 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Define gradient colors based on theme
  const gradientColors = theme === 'light' 
    ? {
        radial: {
          start: 'rgba(29, 94, 249, 0.1)',
          end: 'rgba(9, 63, 193, 0.05)'
        },
        linear: {
          start: 'rgba(255, 255, 255, 0.1)',
          end: 'rgba(255, 255, 255, 0)'
        }
      }
    : {
        radial: {
          start: 'rgb(29, 94, 249)',
          end: 'rgb(9, 63, 193)'
        },
        linear: {
          start: 'rgba(255, 255, 255, 0.20)',
          end: 'rgba(255, 255, 255, 0)'
        }
      };

  // Adjust circle sizes based on screen width
  const getCircleConfigs = (width: number) => {
    const baseSize = width <= 768 ? 2400 : 3200; // Smaller base size for mobile
    
    return {
      default: [
        { size: baseSize * 1.5, delay: null, opacity: 1 },
        { size: baseSize * 0.88, delay: 2.8, opacity: 1 },
        { size: baseSize * 0.8, delay: 2.4, opacity: 1 },
        { size: baseSize * 0.72, delay: 2.0, opacity: 1 },
        { size: baseSize * 0.64, delay: 1.6, opacity: 1 },
        { size: baseSize * 0.56, delay: 1.2, opacity: 1 },
        { size: baseSize * 0.48, delay: 0.8, opacity: 1 },
        { size: baseSize * 0.4, delay: 0.4, opacity: 1 },
        { size: baseSize * 0.32, delay: 0, opacity: 1 },
      ],
      sparse: [
        { size: baseSize * 1.5, delay: null, opacity: 1 },
        { size: baseSize * 0.88, delay: 1.6, opacity: 1 },
        { size: baseSize * 0.56, delay: 0.8, opacity: 1 },
      ],
      dense: [
        { size: baseSize * 1.5, delay: null, opacity: 1 },
        { size: baseSize * 0.88, delay: 2.8, opacity: 1 },
        { size: baseSize * 0.8, delay: 2.4, opacity: 1 },
        { size: baseSize * 0.72, delay: 2.0, opacity: 1 },
        { size: baseSize * 0.64, delay: 1.6, opacity: 1 },
        { size: baseSize * 0.56, delay: 1.2, opacity: 1 },
        { size: baseSize * 0.48, delay: 0.8, opacity: 1 },
        { size: baseSize * 0.4, delay: 0.4, opacity: 1 },
        { size: baseSize * 0.32, delay: 0, opacity: 1 },
      ],
    };
  };

  // Memoize circle configurations
  const circles = useMemo(() => {
    const baseSize = screenWidth <= 768 ? 2400 : 3200;
    return getCircleConfigs(baseSize)[variant];
  }, [screenWidth, variant]);

  const renderCircleSet = (positionClass: string) => (
    <div 
      className={clsx(
        "absolute top-[20%] flex items-center justify-center",
        positionClass
      )}
    >
      {circles.map(({ size, delay, opacity }, index) => (
        <div 
          key={`${size}-${positionClass}`}
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
            className="
              absolute 
              inset-0.5
              rounded-full 
              after:pointer-events-none 
              after:absolute 
              after:-inset-0.5 
              after:z-[-1] 
              after:rounded-full
              after:bg-[linear-gradient(180deg,rgba(255,255,255,.20)_0%,rgba(255,255,255,0)_100%)]
              shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]
              after:shadow-[0_0_30px_-6px_rgba(0,0,0,0.4)]
            "
            style={{
              background: `radial-gradient(90.34% 90.34% at 50.11% 9.66%, ${gradientColors.radial.start} 0%, ${gradientColors.radial.end} 100%)`,
            }}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative">
      {position === 'both' ? (
        <>
          {renderCircleSet("right-[-30%] md:right-[-20%] lg:right-[-10%]")}
          {renderCircleSet("left-[-30%] md:left-[-20%] lg:left-[-10%]")}
        </>
      ) : (
        renderCircleSet(
          position === 'right'
            ? "right-[-30%] md:right-[-20%] lg:right-[-10%]"
            : "left-[-30%] md:left-[-20%] lg:left-[-10%]"
        )
      )}
    </div>
  );
};

export default CirclesBackground; 