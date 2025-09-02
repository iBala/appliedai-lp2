'use client';

import Link from "next/link";
import { useState, useEffect } from 'react';
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
  // const [isOpen, setIsOpen] = useState(false);
  // const [isAgentsOpen, setIsAgentsOpen] = useState(false);
  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  
  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Reset submenu when menu closes
      setMobileSubmenu(null);
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Compute theme-based styles
  const textColorClass = theme === 'light' ? 'text-gray-900' : 'text-white';
  const scrolledBgClass = theme === 'light' 
    ? 'bg-white/80 shadow-lg backdrop-blur-sm border-gray-200' 
    : 'bg-transparent shadow-lg backdrop-blur-sm border-white/10';

  // Handle hover
  // const handleMouseEnter = () => setIsOpen(true);
  // const handleMouseLeave = () => setIsOpen(false);

  // Handle mobile submenu toggle
  const toggleMobileSubmenu = (menu: string) => {
    setMobileSubmenu(prev => prev === menu ? null : menu);
  };

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
              
              {/* Navigation items - desktop */}
              <div className="hidden md:flex items-center space-x-6 flex-1 min-w-0">
                <Link 
                  href="/club"
                  className={clsx(
                    "group inline-flex w-max text-md font-semibold transition-all duration-300 will-change-[opacity] hover:opacity-70 focus:outline-none disabled:pointer-events-none disabled:opacity-50 px-3 leading-6 shrink-0",
                    theme === 'light' ? 'text-gray-900/90' : 'text-white/90'
                  )}
                >
                  Club
                </Link>
                {/* Our Programs dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={clsx(
                        "group inline-flex items-center gap-1 text-md font-semibold transition-all duration-300 will-change-[opacity] hover:opacity-70 focus:outline-none disabled:pointer-events-none disabled:opacity-50 px-3 leading-6",
                        theme === 'light' ? 'text-gray-900/90' : 'text-white/90'
                      )}
                    >
                      Our Programs
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56 p-1" forceMount>
                    <DropdownMenuItem asChild>
                      <Link href="/webinars" className="w-full rounded-md px-2 py-2 hover:bg-gray-100 text-gray-900">
                        Webinars
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/study-groups" className="w-full rounded-md px-2 py-2 hover:bg-gray-100 text-gray-900">
                        Study Groups
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* AI Tools and Companies dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={clsx(
                        "group inline-flex items-center gap-1 text-md font-semibold transition-all duration-300 will-change-[opacity] hover:opacity-70 focus:outline-none disabled:pointer-events-none disabled:opacity-50 px-3 leading-6",
                        theme === 'light' ? 'text-gray-900/90' : 'text-white/90'
                      )}
                    >
                      AI Tools and Companies
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-64 p-1" forceMount>
                    <DropdownMenuItem asChild>
                      <Link href="/companies" className="w-full rounded-md px-2 py-2 hover:bg-gray-100 text-gray-900">
                        Companies
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/repos" className="w-full rounded-md px-2 py-2 hover:bg-gray-100 text-gray-900">
                        Open Source Projects
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Apps dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={clsx(
                        "group inline-flex items-center gap-1 text-md font-semibold transition-all duration-300 will-change-[opacity] hover:opacity-70 focus:outline-none disabled:pointer-events-none disabled:opacity-50 px-3 leading-6",
                        theme === 'light' ? 'text-gray-900/90' : 'text-white/90'
                      )}
                    >
                      Labs
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-64 p-1" forceMount>
                    <DropdownMenuItem asChild>
                      <a 
                        href="https://documatcher.com?ref=appliedai.club" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-full rounded-md px-2 py-2 hover:bg-gray-100 text-gray-900"
                      >
                        Extract documents with LLM
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* For Corporates link */}
                <Link 
                  href="/for-corporates"
                  className={clsx(
                    "group inline-flex w-max text-md font-semibold transition-all duration-300 will-change-[opacity] hover:opacity-70 focus:outline-none disabled:pointer-events-none disabled:opacity-50 px-3 leading-6 shrink-0",
                    theme === 'light' ? 'text-gray-900/90' : 'text-white/90'
                  )}
                >
                  For Corporates
                </Link>
                {/* AIShots Link - Desktop - commented out
                <Link 
                  href="/shots"
                  className={clsx(
                    "group inline-flex w-max text-md font-semibold transition-all duration-300 will-change-[opacity] hover:opacity-70 focus:outline-none disabled:pointer-events-none disabled:opacity-50 px-3 leading-6 shrink-0",
                    theme === 'light' ? 'text-gray-900/90' : 'text-white/90'
                  )}
                >
                  AIShots
                </Link>
                */}
              </div>
            </div>
            
            {/* Right side buttons */}
            <div className="flex items-center text-md font-semibold shrink-0 ml-4">
              <Link 
                href="/club" 
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  "hidden whitespace-nowrap leading-6 transition-all duration-300 hover:opacity-70 md:inline-flex px-3",
                  theme === 'light' ? 'text-gray-900/90' : 'text-white/90'
                )}
              >
                Join the Club
              </Link>
              
              {/* Hamburger menu button - mobile only */}
              <button 
                className="md:hidden flex items-center justify-center p-2 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
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
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                ) : (
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
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                )}
              </button>
            </div>
          </nav>
          
          {/* Mobile Menu - Only shown when hamburger is clicked */}
          {isMobileMenuOpen && (
            <div 
              className="fixed inset-0 z-[100] md:hidden bg-white dark:bg-gray-900 overflow-y-auto"
              style={{ top: '56px' }}
            >
              <div className="container mx-auto py-4 px-4">
                {/* Mobile menu items */}
                <div className="space-y-2">
                  {/* Agents menu */}
                  <div className="border-b border-gray-100 pb-2">
                    <button 
                      className="flex items-center justify-between w-full py-2 font-semibold text-gray-900"
                      onClick={() => toggleMobileSubmenu('agents')}
                    >
                      <span>Agents</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2"
                        className={`transition-transform ${mobileSubmenu === 'agents' ? 'rotate-180' : ''}`}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                    
                    {/* Submenu for Agents */}
                    {mobileSubmenu === 'agents' && (
                      <div className="pl-4 mt-2 space-y-2">
                        {AGENTS.map((agent) => (
                          <Link 
                            key={agent.name}
                            href={agent.href}
                            className="flex items-start py-2 gap-3"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span className="text-[#0A40C2] mt-0.5">{agent.icon}</span>
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-gray-900">
                                {agent.name}
                              </span>
                              <span className="text-sm text-gray-500">
                                {agent.description}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Club link */}
                  <div className="border-b border-gray-100 pb-2">
                    <Link 
                      href="/club"
                      className="flex w-full py-2 font-semibold text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Club
                    </Link>
                  </div>
                  
                  {/* Our Programs (mobile) */}
                  <div className="border-b border-gray-100 pb-2">
                    <button 
                      className="flex items-center justify-between w-full py-2 font-semibold text-gray-900"
                      onClick={() => toggleMobileSubmenu('programs')}
                    >
                      <span>Our Programs</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${mobileSubmenu === 'programs' ? 'rotate-180' : ''}`}> 
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                    {mobileSubmenu === 'programs' && (
                      <div className="pl-4 mt-2 space-y-2">
                        <Link href="/webinars" className="flex w-full py-2 text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>Webinars</Link>
                        <Link href="/study-groups" className="flex w-full py-2 text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>Study Groups</Link>
                      </div>
                    )}
                  </div>

                  {/* AI Tools and Companies (mobile) */}
                  <div className="border-b border-gray-100 pb-2">
                    <button 
                      className="flex items-center justify-between w-full py-2 font-semibold text-gray-900"
                      onClick={() => toggleMobileSubmenu('tools')}
                    >
                      <span>AI Tools and Companies</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${mobileSubmenu === 'tools' ? 'rotate-180' : ''}`}> 
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                    {mobileSubmenu === 'tools' && (
                      <div className="pl-4 mt-2 space-y-2">
                        <Link href="/companies" className="flex w-full py-2 text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>Companies</Link>
                        <Link href="/repos" className="flex w-full py-2 text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>Open Source Projects</Link>
                      </div>
                    )}
                  </div>

                  {/* Apps (mobile) */}
                  <div className="border-b border-gray-100 pb-2">
                    <button 
                      className="flex items-center justify-between w-full py-2 font-semibold text-gray-900"
                      onClick={() => toggleMobileSubmenu('apps')}
                    >
                      <span>Apps</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${mobileSubmenu === 'apps' ? 'rotate-180' : ''}`}> 
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                    {mobileSubmenu === 'apps' && (
                      <div className="pl-4 mt-2 space-y-2">
                        <a 
                          href="https://documatcher.com?ref=appliedai.club"
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="flex w-full py-2 text-gray-900" 
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Extract documents with LLM
                        </a>
                      </div>
                    )}
                  </div>

                  {/* For Corporates link (mobile) */}
                  <div className="border-b border-gray-100 pb-2">
                    <Link 
                      href="/for-corporates"
                      className="flex w-full py-2 font-semibold text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      For Corporates
                    </Link>
                  </div>
                  
                  {/* AIShots Link - Mobile - commented out
                  <div className="border-b border-gray-100 pb-2">
                    <Link 
                      href="/shots"
                      className="flex w-full py-2 font-semibold text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      AIShots
                    </Link>
                  </div>
                  */}
                  
                  {/* Sign in link */}
                  <div className="pt-2">
                    <Link 
                      href="https://dashboard.appliedai.club/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full py-2 font-semibold text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign in
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 
