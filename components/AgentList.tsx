"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import ApplicationScreen from './demo/screens/ApplicationScreen'
import ExtractorScreen from '@/components/demo/screens/ExtractorScreen'
import UserResearchScreen from './demo/screens/UserResearchScreen'
import SchedulerScreen from './demo/screens/SchedulerScreen'
import RevenueScreen from '@/components/demo/screens/RevenueScreen'

const agents = [
  {
    id: 1,
    name: "Recruit",
    description: "Screen resumes, schedule interviews, and manage your hiring pipeline with precision.",
    image: "/images/agents/recruit.png",
    component: "recruit",
    href: "/agents/recruit"
  },
  {
    id: 2,
    name: "Image/Doc Extractor",
    description: "Extract structured data from any document or image with high accuracy.",
    image: "/images/agents/extractor.png",
    component: "extractor",
    href: "/agents/extractor"
  },
  {
    id: 3,
    name: "User Research",
    description: "Conduct user interviews, analyze feedback, and generate actionable insights.",
    image: "/images/agents/research.png",
    component: "research",
    href: "/agents/user-research"
  },
  {
    id: 4,
    name: "Scheduler",
    description: "Coordinate meetings across time zones, handle follow-ups, and manage your calendar.",
    image: "/images/agents/scheduler.png",
    component: "scheduler",
    href: "/agents/scheduler"
  },
  {
    id: 5,
    name: "Data Analysis",
    description: "Transform raw data into meaningful insights with automated analysis and visualization.",
    image: "/images/agents/analysis.png",
    component: "analysis",
    href: "/agents/whatsapp-reports"
  }
]

const DoodlePattern = () => (
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
        
        {/* Random decorative elements */}
        <path d="M88 35 L83 30 L88 25" fill="none" transform="rotate(15, 85, 30)" />
        <path d="M15 85 Q 20 80, 25 85" fill="none" transform="rotate(-10, 20, 85)" />
        
        {/* Small zigzags */}
        <path d="M40 60 L45 55 L50 60 L55 55" fill="none" />
        
        {/* Tiny scattered elements */}
        <circle cx="82" cy="82" r="0.5" fill="white" />
        <rect x="18" y="40" width="2" height="2" fill="none" transform="rotate(33)" />
        <path d="M65 12 L68 15 M66.5 13.5 L63.5 10.5" transform="rotate(-15, 65, 12)" />
      </g>
    </pattern>
    <rect width="100%" height="100%" fill="url(#agentDoodlePattern)" />
  </svg>
)

const AgentList = () => {
  const [selectedAgent, setSelectedAgent] = useState(agents[0])
  const [activeTab, setActiveTab] = useState(agents[0].name)

  const renderAgentContent = (agent: typeof agents[0]) => {
    switch (agent.component) {
      case 'recruit':
        return (
          <div className="relative h-full w-full flex items-center justify-center">
            <div className="w-[500px]">
              <ApplicationScreen onComplete={() => {}} />
            </div>
          </div>
        )
      case 'extractor':
        return (
          <div className="relative h-full w-full flex items-center justify-center">
            <div className="w-[500px]">
              <ExtractorScreen onComplete={() => {}} />
            </div>
          </div>
        )
      case 'research':
        return (
          <div className="relative h-full w-full flex items-center justify-center">
            <div className="w-[500px]">
              <UserResearchScreen onComplete={() => {}} />
            </div>
          </div>
        )
      case 'scheduler':
        return (
          <div className="relative h-full w-full flex items-center justify-center">
            <div className="w-[500px]">
              <SchedulerScreen onComplete={() => {}} />
            </div>
          </div>
        )
      case 'analysis':
        return (
          <div className="relative h-full w-full flex items-center justify-center">
            <div className="w-[500px]">
              <RevenueScreen onComplete={() => {}} />
            </div>
          </div>
        )
      default:
        return (
          <Image
            src={agent.image}
            alt={`${agent.name} demo`}
            fill
            className="object-cover rounded-lg"
            priority
          />
        )
    }
  }

  return (
    <section className="relative w-full bg-white py-20">
      <div className="container mx-auto px-4 md:px-8">
        {/* Heading Section - Left Aligned */}
        <div className="mb-16">
          <span className="mb-4 inline-block text-[#1D5EF9] text-sm font-semibold">
            Our Agents
          </span>
          <div className="max-w-[900px]">
            <h2 className="mb-6 text-[36px] font-semibold leading-[1.1] md:text-[48px] lg:text-[56px] text-black">
              Create return experiences that fit your brand
            </h2>
            <p className="text-lg md:text-xl text-black">
              Make your teams 100x productive with AI. AppliedAI&apos;s agents make your life easier.
            </p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col">
          {/* Tab Navigation - Aligned to left */}
          <div className="w-full mb-8">
            <div className="flex overflow-x-auto">
              <div className="flex w-full max-w-[900px] border-b border-black/10">
                {agents.map((agent) => (
                  <button
                    key={agent.id}
                    data-active={activeTab === agent.name}
                    onClick={() => {
                      setActiveTab(agent.name)
                      setSelectedAgent(agent)
                    }}
                    className="relative flex whitespace-nowrap px-8 h-12 font-semibold text-black/60 transition-colors will-change-[colors] hover:text-black/100 data-[active=true]:text-black md:h-10"
                  >
                    <span className="relative flex h-full items-center">
                      {agent.name}
                      {activeTab === agent.name && (
                        <span className="absolute -bottom-px left-0 h-px w-full bg-black" style={{ opacity: 1 }} />
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Description - Moved below tabs */}
          <p className="mb-8 text-base font-medium leading-normal text-black/70 max-w-[900px]">
            {selectedAgent.description}
          </p>

          {/* Display Component */}
          <div className="flex w-full flex-col">
            <div className="relative w-full overflow-hidden rounded-xl bg-[#0A40C2]">
              {/* Doodle Pattern Background */}
              <DoodlePattern />

              {/* Glass Container */}
              <div 
                className="relative w-full rounded-xl bg-white/10 shadow-[0px_-1px_1px_0px_rgba(255,255,255,0.10)_inset,0px_1px_1px_0px_rgba(255,255,255,0.25)_inset,0px_8px_6px_0px_rgba(0,0,0,0.05)] transition-transform duration-200 ease-linear will-change-transform"
                style={{ transform: 'translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg)' }}
              >
                <div className="relative z-10 flex h-[28rem] flex-col items-center p-8">
                  {/* Agent Demo Content */}
                  <div className="relative h-full w-full">
                    {renderAgentContent(selectedAgent)}
                  </div>
                </div>

                {/* Try it out button */}
                <div className="absolute bottom-8 right-8 z-20">
                  <Link
                    href={selectedAgent.href}
                    className="group flex items-center gap-2 rounded-full bg-black/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-black/20"
                  >
                    Try it out
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 16 16" 
                      fill="none" 
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      <path 
                        d="M1 8h12m0 0L8.5 3.5M13 8l-4.5 4.5" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AgentList 