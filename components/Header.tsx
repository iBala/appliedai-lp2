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

// Add Resources sections configuration
const RESOURCES_SECTIONS = [
  {
    name: "Guides",
    description: "Simple guides to common tasks in setting up an AI project",
    href: "/resources",
    icon: (
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    )
  },
  {
    name: "Blogs & Webinars",
    description: "Blog posts and webinars around AI projects",
    href: "/webinars",
    icon: (
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
      >
        <path d="M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17Z"/>
        <path d="M12 15l-3-3h6l-3 3z"/>
        <path d="M12 9v3"/>
      </svg>
    )
  },
  {
    name: "Common Issues",
    description: "Common bugs and issues faced and how to solve them",
    href: "/common-issues",
    icon: (
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    )
  }
]

interface HeaderProps {
  theme?: 'light' | 'dark';
  isScrolled?: boolean;
  disableSticky?: boolean;
}

const Header = ({ theme = 'light', isScrolled = false, disableSticky }: HeaderProps) => {
  // const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  // const [isAgentsOpen, setIsAgentsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
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
  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

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
                        We&apos;re working on
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
                <div 
                  className="relative"
                  onMouseEnter={() => setIsResourcesOpen(true)}
                  onMouseLeave={() => setIsResourcesOpen(false)}
                >
                  <DropdownMenu open={isResourcesOpen} onOpenChange={setIsResourcesOpen}>
                    <DropdownMenuTrigger asChild>
                      <button 
                        className={clsx(
                          "group inline-flex w-max items-center text-md font-semibold transition-all duration-300 will-change-[opacity] hover:opacity-70 focus:outline-none disabled:pointer-events-none disabled:opacity-50 px-3 leading-6",
                          theme === 'light' ? 'text-gray-900/90' : 'text-white/90'
                        )}
                      >
                        Resources
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="start"
                      className="w-[500px] p-3"
                      forceMount
                    >
                      <div className="grid grid-cols-1 gap-3">
                        {RESOURCES_SECTIONS.map((section) => (
                          <DropdownMenuItem key={section.name} asChild>
                            <Link 
                              href={section.href}
                              className="flex items-start gap-3 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                            >
                              <span className="text-[#0A40C2]">{section.icon}</span>
                              <div className="flex flex-col">
                                <span className="text-sm font-semibold text-gray-900">
                                  {section.name}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {section.description}
                                </span>
                              </div>
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {/* Newsletter Link - Desktop */}
                <Link 
                  href="https://appliedaiclub.substack.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    "group inline-flex w-max text-md font-semibold transition-all duration-300 will-change-[opacity] hover:opacity-70 focus:outline-none disabled:pointer-events-none disabled:opacity-50 px-3 leading-6 shrink-0",
                    theme === 'light' ? 'text-gray-900/90' : 'text-white/90'
                  )}
                >
                  Newsletter
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
                  
                  {/* Resources menu */}
                  <div className="border-b border-gray-100 pb-2">
                    <button 
                      className="flex items-center justify-between w-full py-2 font-semibold text-gray-900"
                      onClick={() => toggleMobileSubmenu('resources')}
                    >
                      <span>Resources</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2"
                        className={`transition-transform ${mobileSubmenu === 'resources' ? 'rotate-180' : ''}`}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                    
                    {/* Submenu for Resources */}
                    {mobileSubmenu === 'resources' && (
                      <div className="pl-4 mt-2 space-y-2">
                        {RESOURCES_SECTIONS.map((section) => (
                          <Link 
                            key={section.name}
                            href={section.href}
                            className="flex items-start py-2 gap-3"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span className="text-[#0A40C2] mt-0.5">{section.icon}</span>
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-gray-900">
                                {section.name}
                              </span>
                              <span className="text-sm text-gray-500">
                                {section.description}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Newsletter Link - Mobile */}
                  <div className="border-b border-gray-100 pb-2">
                    <Link 
                      href="https://appliedaiclub.substack.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full py-2 font-semibold text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Newsletter
                    </Link>
                  </div>
                  
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