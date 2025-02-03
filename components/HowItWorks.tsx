"use client"

import { useState } from "react"

const HowItWorks = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null)

  const sections = [
    {
      mainText: "Our agents solve specific problems. ⚡️",
      description: "No more bloated one-size-fits-all solutions. Our micro-agents are laser-focused on specific tasks, ensuring they deliver outstanding results every single time."
    },
    {
      mainText: "Pay only for what you use. 💸",
      description: "No seat pricing, implementation charges, slab pricing, feature gating. Just pay for what you use. Sharing it with everyone. Nothing else."
    },
    {
      mainText: "We work well with your existing systems. 💯",
      description: "All our agents are built to work with your existing systems. No complicated integrations, no new code, no new systems."
    },
    {
      mainText: "We are very small, by design. 🚀",
      description: "We strongly believe in the power of having a small, high performing team of ridiculously high standards. "
    }
  ]

  // Handler for when cursor leaves the entire section
  const handleSectionLeave = () => {
    // Only close if cursor leaves the entire section
    setActiveSection(null)
  }

  return (
    <section 
      className="relative w-full bg-white py-20"
      onMouseLeave={handleSectionLeave} // Added handler for entire section
    >
      <div className="container mx-auto px-8">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-10">
            <p className="text-[24px] leading-[1.3] text-black/60 md:text-[28px]">
              Most software companies start to solve specific problems. But overtime, they end up justifying their valuation by building so many features that 90% of the customers don't use.{' '}
              <span className="text-black">
                <span className="highlight">
                  There's beauty in keeping things simple
                </span>. We're building a new kind of software company. How we work:
              </span>
            </p>
          </div>

          {sections.map((section, index) => (
            <div 
              key={index}
              className={`transition-all duration-300 ${
                activeSection === index ? 'mb-16' : 'mb-6'
              }`}
              onMouseEnter={() => setActiveSection(index)}
            >
              <div className="flex items-start">
                <span 
                  className={`mr-4 text-[25px] translate-y-[-0.2em] transition-opacity duration-300 ${
                    activeSection === null ? 'opacity-40' : 
                    activeSection === index ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  👉
                </span>
                <div className="flex-1">
                  <h3 
                    className={`text-[15px] font-small leading-[1.1] text-black transition-opacity duration-300 md:text-[24px] ${
                      activeSection === null ? 'opacity-40' : 
                      activeSection === index ? 'opacity-100' : 'opacity-40'
                    }`}
                  >
                    {section.mainText}
                  </h3>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      activeSection === index ? 'max-h-[100px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="mt-4 text-lg text-black/60">
                      {section.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks