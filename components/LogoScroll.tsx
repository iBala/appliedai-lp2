'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

// Array of logo objects with alt text and specific size adjustments if needed
const logos = [
  { src: '/images/logo1.png', alt: 'Logo 1', className: '' },
  { src: '/images/logo2.png', alt: 'Logo 2', className: '' },
  { src: '/images/logo3.png', alt: 'Logo 3', className: '' },
  { src: '/images/logo4.png', alt: 'Logo 4', className: '' },
  { src: '/images/logo5.png', alt: 'Logo 5', className: '' },
  { src: '/images/logo6.png', alt: 'Logo 6', className: 'scale-90' }, // Slightly reduce if larger
  { src: '/images/logo7.png', alt: 'Logo 7', className: '' },
  { src: '/images/logo8.png', alt: 'Logo 8', className: '' },
  { src: '/images/logo9.png', alt: 'Logo 9', className: '' },
  { src: '/images/logo10.webp', alt: 'Logo 10', className: '' },
  { src: '/images/logo11.png', alt: 'Logo 11', className: '' },
  { src: '/images/logo12.png', alt: 'Logo 12', className: '' },
  { src: '/images/logo13.svg', alt: 'Logo 13', className: '' },
  { src: '/images/logo14.jpg', alt: 'Logo 14', className: '' },
  { src: '/images/logo15.png', alt: 'Logo 15', className: '' },
  { src: '/images/logo16.png', alt: 'Logo 16', className: '' },
];

/**
 * LogoScroll component - Shows a horizontal scrolling list of logos with consistent sizing
 */
const LogoScroll = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="w-full bg-white py-12">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-800 mb-10">
          Trusted by companies of all sizes
        </h2>
      </div>

      {/* Logo scroller container - this is the viewport window */}
      <div className="relative max-w-6xl mx-auto overflow-hidden">
        {/* This div creates a gradient fade effect on the left and right edges */}
        <div className="absolute top-0 bottom-0 left-0 w-16 z-10 bg-gradient-to-r from-white to-transparent"></div>
        <div className="absolute top-0 bottom-0 right-0 w-16 z-10 bg-gradient-to-l from-white to-transparent"></div>
        
        {/* The actual scrolling content - single track with both logo sets inline */}
        <div className="logo-scroll-track">
          {/* We now render all logos in a single row with consistent sizing */}
          {logos.map((logo, index) => (
            <div key={`logo-${index}`} className="logo-item">
              {mounted && (
                <div className="logo-wrapper">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={120}
                    height={60}
                    className={`w-auto object-contain ${logo.className}`}
                    priority={index < 4}
                    loading={index < 4 ? "eager" : "lazy"}
                    quality={90}
                  />
                </div>
              )}
            </div>
          ))}
          
          {/* Duplicate set for seamless scrolling */}
          {logos.map((logo, index) => (
            <div key={`logo-dup-${index}`} className="logo-item">
              {mounted && (
                <div className="logo-wrapper">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={120}
                    height={60}
                    className={`w-auto object-contain ${logo.className}`}
                    loading="lazy"
                    quality={90}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 
        Custom CSS for the animation and consistent logo sizing
      */}
      <style jsx global>{`
        .logo-scroll-track {
          display: flex;
          width: fit-content;
          animation: scroll 50s linear infinite;
        }
        
        .logo-item {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 2rem;
          height: 80px;
        }
        
        .logo-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 120px;
          height: 50px;
        }
        
        .logo-wrapper img {
          max-width: 100%;
          max-height: 100%;
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        /* Add pause on hover for better UX */
        .logo-scroll-track:hover {
          animation-play-state: paused;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .logo-item {
            padding: 0 1.5rem;
            height: 70px;
          }
          .logo-wrapper {
            width: 100px;
            height: 45px;
          }
        }
        
        @media (max-width: 640px) {
          .logo-item {
            padding: 0 1rem;
            height: 60px;
          }
          .logo-wrapper {
            width: 90px;
            height: 40px;
          }
        }
      `}</style>
    </section>
  );
};

export default LogoScroll; 