"use client"

import Link from "next/link"
import FooterCirclesBackground from "./FooterCirclesBackground"

const Footer = () => {
  return (
    <footer className="relative w-full bg-black py-12 overflow-hidden">
      {/* Background Circles */}
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
        <FooterCirclesBackground />
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col relative z-10"> {/* Added z-10 to keep content above background */}
          {/* Main Footer Content */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              {/* Left Section - Logo and Sign Up */}
              <div className="flex items-center gap-6 mb-8 md:mb-0">
                {/* Logo */}
                <Link href="/" className="shrink-0">
                  <svg width="76" height="24" viewBox="0 0 76 24" className="fill-white stroke-white/10">
                    {/* Add your logo SVG paths here */}
                  </svg>
                </Link>

                {/* Sign Up Button */}
                <Link 
                  href="/signup" 
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-white/90"
                >
                  Sign Up
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="flex items-center space-x-8">
                <Link 
                  href="/agents" 
                  className="text-sm font-semibold text-white/60 transition-colors hover:text-white"
                >
                  Agents
                </Link>
                <Link 
                  href="/contact" 
                  className="text-sm font-semibold text-white/60 transition-colors hover:text-white"
                >
                  Contact Us
                </Link>

                {/* Social Media Links */}
                <div className="flex items-center space-x-4">
                  <Link 
                    href="https://twitter.com/appliedaiclub" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 transition-colors hover:text-white"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z"/>
                    </svg>
                  </Link>
                  <Link 
                    href="https://linkedin.com/company/appliedaiclub" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 transition-colors hover:text-white"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Slogan */}
          <div className="border-t border-white/10 pt-6">
            <p className="text-center text-sm font-medium italic text-white/40">
              "Great work is a lot of little things done well."
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 