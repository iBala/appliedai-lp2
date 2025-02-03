'use client';

import Link from "next/link";
import Image from "next/image";
import CirclesBackground from './CirclesBackground';
// import { useState } from 'react';
import { Application } from './recruit/application';
// import clsx from 'clsx';
import Header from './Header';

// type Tab = 'recruit' | 'returns' | 'tracking';

const HeroSection = () => {
  // const [isScrolled, setIsScrolled] = useState(false);
  // const [activeTab, setActiveTab] = useState<Tab>('recruit');

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-transparent">
        {/* Header integrated into hero */}
        <Header theme={'dark'} />
        
        {/* Background - Single implementation using CirclesBackground */}
        <div className="absolute inset-0 h-full w-full items-center justify-center overflow-hidden bg-[#0A40C2]">
          <div className="absolute left-[calc(50%+300px)] flex scale-75 items-center justify-center md:left-[calc(50%+600px)] md:top-[280px] md:scale-100">
            <CirclesBackground position="right" />
          </div>
        </div>

        {/* Content Container */}
        <div className="container relative z-10 mx-auto flex min-h-[calc(100vh-56px)] w-full flex-col px-8 py-12 md:py-16 lg:flex-row lg:items-center lg:py-20">
          {/* Left Column */}
          <div className="flex flex-1 flex-col items-start lg:max-w-[50%]">
            {/* Announcement Banner */}
            <Link 
              href="/club"
              className="group relative mb-6 animate-[heroBannerIn_1s_ease_0s_1_normal_forwards_running] cursor-pointer overflow-hidden rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-md font-medium backdrop-blur-sm"
            >
              <div className="pointer-events-none absolute inset-0 animate-[blurIn_0.1s_ease_0s_1_normal_forwards_running] rounded-full bg-white/0 transition-all duration-300 will-change-[opacity] hover:bg-white/20 group-hover:bg-white/10" />
              <div className="relative flex  items-center">
                <Image
                  alt="Slack logo"
                  src="/images/slack-new-logo.svg"
                  width={20}
                  height={20}
                  className="mr-2"
                  quality={95}
                />
                <p className="max-w-[calc(100vw-100px)] truncate text-white">
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
            <div className="flex w-full flex-col items-start">
              <h1 className="mb-4 text-balance text-[36px] font-semibold leading-[1.2] md:mb-6 md:text-[48px] lg:text-wrap lg:text-start lg:text-[60px] lg:leading-[1.15]">
                Micro-agents to 100x your team&apos;s productivity
              </h1>
              <h2 className="mb-6 text-lg text-white/80 md:mb-8 md:text-xl lg:text-start lg:text-xl lg:leading-[1.55]">
                You know those little tasks that eat up your day—like chasing status updates, scheduling calls, combing through resumes, or extracting data from yet another report? Yeah, those. Let our agents take them away.
              </h2>
            </div>
          </div>

          {/* Right Column - Application Container */}
          <div className="flex flex-1 items-center justify-center lg:max-w-[50%]">
            <div className="w-full max-w-[500px]">
              <Application />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;