'use client';

export function DemoBackground() {
  return (
    <>
      {/* Blue Background */}
      <div className="absolute inset-0 rounded-xl bg-[#0A40C2]">
        {/* Doodle Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.15]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="agentDoodlePattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <g stroke="white" strokeWidth="0.8">
              {/* Randomly placed squares with rotation */}
              <rect x="12" y="8" width="4" height="4" fill="none" transform="rotate(15)" />
              <rect x="78" y="65" width="3" height="3" fill="none" transform="rotate(-8)" />
              <rect x="35" y="82" width="5" height="5" fill="none" transform="rotate(23)" />
              
              {/* Scattered plus signs of different sizes */}
              <path d="M30 24 L30 36 M24 30 L36 30" transform="rotate(12, 30, 30)" />
              <path d="M85 45 L85 51 M82 48 L88 48" transform="rotate(-5, 85, 48)" />
              
              {/* Random dots */}
              <circle cx="15" cy="72" r="1" fill="white" />
              <circle cx="92" cy="23" r="0.8" fill="white" />
              <circle cx="45" cy="12" r="1.2" fill="white" />
              <circle cx="67" cy="89" r="0.9" fill="white" />
              
              {/* Squiggly lines with random curves */}
              <path d="M10 20 Q 18 12, 22 18 Q 26 24, 32 18" fill="none" />
              <path d="M60 75 Q 65 85, 70 75 Q 75 65, 80 75" fill="none" transform="rotate(-8, 70, 75)" />
              
              {/* Scattered circles of varying sizes */}
              <circle cx="75" cy="40" r="3" fill="none" transform="rotate(8)" />
              <circle cx="25" cy="65" r="2.5" fill="none" transform="rotate(-12)" />
              <circle cx="55" cy="15" r="4" fill="none" transform="rotate(20)" />
            </g>
          </pattern>
          <rect width="100%" height="100%" fill="url(#agentDoodlePattern)" />
        </svg>
      </div>

      {/* Glass Overlay */}
      <div className="absolute inset-0 rounded-xl bg-white/10 shadow-[0px_-1px_1px_0px_rgba(255,255,255,0.10)_inset,0px_1px_1px_0px_rgba(255,255,255,0.25)_inset,0px_8px_6px_0px_rgba(0,0,0,0.05)]" />
    </>
  );
} 