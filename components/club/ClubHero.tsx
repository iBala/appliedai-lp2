'use client';

import Header from '../Header';

export default function ClubHero() {
  return (
    <div className="relative overflow-hidden bg-[#0A40C2]">
      <Header theme="dark" />
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Join the Applied AI Club
          </h1>
          <p className="mt-6 text-xl text-white/80">
            This is an invite-only club for builders looking to learn, build, and grow with AI.
          </p>
        </div>
      </div>
    </div>
  );
} 