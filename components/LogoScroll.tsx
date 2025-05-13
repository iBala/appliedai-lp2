'use client';

import Image from 'next/image';

// Array of logo objects - update these with your actual logos
const logos = [
  { src: '/images/logo1.png', alt: 'Logo 1' },
  { src: '/images/logo2.png', alt: 'Logo 2' },
  { src: '/images/logo3.png', alt: 'Logo 3' },
  { src: '/images/logo4.png', alt: 'Logo 4' },
  { src: '/images/logo5.png', alt: 'Logo 5' },
  { src: '/images/logo6.png', alt: 'Logo 6' },
  { src: '/images/logo7.png', alt: 'Logo 7' },
  { src: '/images/logo8.png', alt: 'Logo 8' },
  { src: '/images/logo9.png', alt: 'Logo 9' },
  { src: '/images/logo10.webp', alt: 'Logo 10' },
  { src: '/images/logo11.png', alt: 'Logo 11' },
  { src: '/images/logo12.png', alt: 'Logo 12' },
  { src: '/images/logo13.svg', alt: 'Logo 13' },
  { src: '/images/logo14.jpg', alt: 'Logo 14' },
  { src: '/images/logo15.png', alt: 'Logo 15' },
  { src: '/images/logo16.png', alt: 'Logo 16' },
];

/**
 * LogoScroll renders a single row of logos, duplicated for seamless infinite scroll.
 * Uses CSS keyframes for performant, smooth animation. No DOM cloning or useEffect needed.
 */
const LogoScroll = () => {
  // Duplicate the logos array for seamless looping
  const scrollingLogos = [...logos, ...logos];

  return (
    <div className="w-full overflow-hidden bg-white py-8">
      {/*
        The row below is animated using CSS keyframes for infinite leftward scroll.
        We duplicate the logos so the scroll appears seamless when looping.
      */}
      <div className="flex animate-logo-scroll whitespace-nowrap">
        {scrollingLogos.map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center px-10"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={200}
              height={80}
              className="h-16 w-auto object-contain opacity-60 transition-opacity hover:opacity-100"
            />
          </div>
        ))}
      </div>
      {/*
        Tailwind custom animation (logo-scroll) must be defined in tailwind.config.js:
        @keyframes logo-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-logo-scroll {
          animation: logo-scroll 20s linear infinite;
        }
        This ensures the row scrolls left and loops seamlessly.
      */}
    </div>
  );
};

export default LogoScroll; 