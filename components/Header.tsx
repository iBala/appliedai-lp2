'use client';

import Link from "next/link";
import { useState } from 'react';
import clsx from 'clsx';
// import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as AgentIcons from './agents/AgentIcons';

const AGENTS = [
  {
    name: "Recruit",
    description: "Find the right fit from a 1000+ applicants using past interviews",
    href: "/agents/recruit",
    icon: <AgentIcons.RecruitIcon />
  },
  {
    name: "Scheduler",
    description: "Just tag @eva to coordinate and schedule your meetings",
    href: "/agents/scheduler",
    icon: <AgentIcons.SchedulerIcon />
  },
  {
    name: "WhatsApp Reports",
    description: "Ask and get your business reports directly on WhatsApp",
    href: "/agents/whatsapp-reports",
    icon: <AgentIcons.WhatsappReportsIcon />
  },
  {
    name: "Extractor",
    description: "Instantly extract data from paper documents with 98% accuracy",
    href: "/agents/extractor",
    icon: <AgentIcons.ExtractorIcon />
  },
  {
    name: "User Research",
    description: "Have in depth conversations with your users at scale",
    href: "/agents/user-research",
    icon: <AgentIcons.UserResearchIcon />
  }
];

interface HeaderProps {
  theme?: 'light' | 'dark';
  isScrolled?: boolean;
  disableSticky?: boolean;
}

const Header = ({ theme = 'light', isScrolled = false, disableSticky }: HeaderProps) => {
  // const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  // const isRecruitPage = pathname.includes('/recruit');

  // Compute theme-based styles
  const textColorClass = theme === 'light' ? 'text-gray-900' : 'text-white';
  const scrolledBgClass = theme === 'light' 
    ? 'bg-white/80 shadow-lg backdrop-blur-sm border-gray-200' 
    : 'bg-transparent shadow-lg backdrop-blur-sm border-white/10';

  // Handle hover
  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <header 
      className={clsx(
        "w-full z-50 bg-transparent",
        !disableSticky && "sticky top-0"
      )}
    >
      <div className={clsx(
        'transition-all duration-300 bg-transparent',
        isScrolled ? `${scrolledBgClass} rounded-full border` : 'bg-transparent'
      )}>
        <div className="container relative mx-auto bg-transparent">
          <nav 
            aria-label="Main" 
            className={clsx(
              "relative z-[60] flex h-14 w-full justify-between transition-all duration-300 px-2 md:px-4 bg-transparent",
              textColorClass
            )}
          >
            {/* Logo and Nav items container */}
            <div className="flex items-center flex-1 min-w-0">
              <Link 
                href="/" 
                className={clsx(
                  "flex items-center mr-5 transition-all duration-300 will-change-[opacity] hover:opacity-70 shrink-0",
                  textColorClass
                )}
                aria-label="navigate to home"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className={textColorClass}
                >
                  <path d="M7 2h10"></path>
                  <path d="M5 6h14"></path>
                  <rect width="18" height="12" x="3" y="10" rx="2"></rect>
                </svg>
                <span className="ml-2 text-lg font-semibold">Applied AI</span>
              </Link>
              
              {/* Navigation items */}
              <div className="hidden md:flex items-center space-x-6 flex-1 min-w-0">
                <div 
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                    <DropdownMenuTrigger asChild>
                      <button 
                        className={clsx(
                          "group inline-flex w-max items-center text-md font-semibold transition-all duration-300 will-change-[opacity] hover:opacity-70 focus:outline-none disabled:pointer-events-none disabled:opacity-50 px-3 leading-6",
                          theme === 'light' ? 'text-gray-900/90' : 'text-white/90'
                        )}
                      >
                        Agents
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="start"
                      className="w-[600px] p-4"
                      forceMount
                    >
                      <div className="grid grid-cols-2 gap-4">
                        {AGENTS.map((agent) => (
                          <DropdownMenuItem key={agent.name} asChild>
                            <Link 
                              href={agent.href}
                              className="flex items-start gap-3 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                            >
                              <span className="text-[#0A40C2]">{agent.icon}</span>
                              <div className="flex flex-col">
                                <span className="text-sm font-semibold text-gray-900">
                                  {agent.name}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {agent.description}
                                </span>
                              </div>
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Link 
                  href="/club"
                  className={clsx(
                    "group inline-flex w-max text-md font-semibold transition-all duration-300 will-change-[opacity] hover:opacity-70 focus:outline-none disabled:pointer-events-none disabled:opacity-50 px-3 leading-6 shrink-0",
                    theme === 'light' ? 'text-gray-900/90' : 'text-white/90'
                  )}
                >
                  Club
                </Link>
                <Link 
                  href="/resources"
                  className={clsx(
                    "group inline-flex w-max text-md font-semibold transition-all duration-300 will-change-[opacity] hover:opacity-70 focus:outline-none disabled:pointer-events-none disabled:opacity-50 px-3 leading-6 shrink-0",
                    theme === 'light' ? 'text-gray-900/90' : 'text-white/90'
                  )}
                >
                  Resources
                </Link>
              </div>
            </div>
            
            {/* Right side buttons */}
            <div className="flex items-center text-md font-semibold shrink-0 ml-4">
              <Link 
                href="https://dashboard.appliedai.club/" 
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  "hidden whitespace-nowrap leading-6 transition-all duration-300 hover:opacity-70 md:inline-flex px-3",
                  theme === 'light' ? 'text-gray-900/90' : 'text-white/90'
                )}
              >
                Sign in
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 