'use client';

import Link from "next/link";
import Image from "next/image";
import CirclesBackground from './CirclesBackground';
import Header from './Header';
import { EventSection } from './EventSection';

interface HeroSectionProps {
  embedCode?: string;
}

const HeroSection = ({ embedCode }: HeroSectionProps) => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen w-full bg-[#0A40C2]">
        {/* Header integrated into hero */}
        <Header theme={'dark'} />
        
        {/* Background - Single implementation using CirclesBackground */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-[calc(50%+300px)] flex scale-75 items-center justify-center md:left-[calc(50%+600px)] md:top-[280px] md:scale-100">
            <CirclesBackground position="right" />
          </div>
        </div>

        {/* Content Container - Two column layout */}
        <div className="relative z-10 container mx-auto min-h-[calc(100vh-56px)] px-6 sm:px-8 py-8">
          <div className="flex flex-col lg:flex-row w-full gap-8 items-center min-h-[calc(100vh-72px)]">
            {/* Left Column - Main Content */}
            <div className={`flex flex-col justify-center ${embedCode ? 'lg:w-1/2' : 'w-full'} lg:pr-8`}>
              {/* Announcement Banner */}
              <Link 
                href="/club"
                className="group relative mb-8 md:mb-10 animate-[heroBannerIn_1s_ease_0s_1_normal_forwards_running] cursor-pointer overflow-hidden rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-md font-medium backdrop-blur-sm w-fit"
              >
                <div className="pointer-events-none absolute inset-0 animate-[blurIn_0.1s_ease_0s_1_normal_forwards_running] rounded-full bg-white/0 transition-all duration-300 will-change-[opacity] hover:bg-white/20 group-hover:bg-white/10" />
                <div className="relative flex items-center">
                  <Image
                    alt="WhatsApp logo"
                    src="/images/WhatsApp.webp"
                    width={20}
                    height={20}
                    className="mr-2"
                    quality={95}
                  />
                  <p className="max-w-[calc(100vw-50px)] truncate text-white">
                    Want to learn to build agents? Join our community!
                  </p>
                  <p className="mx-2 hidden text-white/25 md:flex">·</p>
                  <p className="hidden items-center text-white/60 md:flex">
                    <span className="mr-0.5">Read more</span>
                    <span>
                      <svg className="h-6 w-6">
                        <use href="/images/hero.svg#chevron" />
                      </svg>
                    </span>
                  </p>
                </div>
              </Link>

              {/* Main Content */}
              <div className="flex w-full flex-col">
                <h1 className="mb-6 md:mb-8 text-balance text-white text-[36px] font-semibold leading-[1.2] md:text-[48px] lg:text-[60px] lg:leading-[1.15]">
                  An invite-only club for operators to adapt to the AI world
                </h1>
                <h2 className="mb-8 md:mb-10 text-lg text-white/80 md:text-xl lg:text-xl lg:leading-[1.55]">
                  We understand that while AI offers immense potential, many operators face challenges in getting started and implementing these technologies effectively. Our club is a place where you can learn, share, and grow together.
                </h2>
                <div className="flex items-center">
                  <Link
                    href='/club'
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-base font-semibold text-black transition-colors hover:bg-[white]/70"
                  >
                    Join the Club
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Event Section */}
            {embedCode && (
              <div className="lg:w-1/2 w-full flex items-center justify-center lg:pl-8">
                <div className="w-full bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <EventSection embedCode={embedCode} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;