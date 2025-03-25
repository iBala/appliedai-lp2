"use client"

import { useState } from "react"

const HowItWorks = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null)

  const sections = [
    {
      mainText: "We conduct weekly sessions to teach practical topics on how to use AI.⚡️",
      description: "We cover topics like how to build agents, different tools available, how to use agents, how to build agents that work with your existing systems, how to build agents that are scalable, etc."
    },
    {
      mainText: "A newsletter for operators to learn about AI. 💸",
      description: "We share advances in AI that are relevant to businesses and Operators. Not just research papers."
    },
    {
      mainText: "A community of operators to discuss and learn from each other. 💯",
      description: "A live community where you can interact with other operators, share your learnings, get help, and discuss AI."
    },
    {
      mainText: "This is not a place to join and hang around. 🚀",
      description: "We expect you to do the work to improve yourselves. If you're not putting in the effort, this is not the right place for you."
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
            We (Praveen and Bala) started building agents with no coding experience. We went through our months of learning and building. Our years of work in building products at several large scale companies helped. But it was very hard to get started.{' '}
              <span className="text-black">
                <span className="highlight">
                  We could only do this because we worked together.
                </span>. So we started the club to provide a platform for people to learn and build agents. Here&apos;s what we do at the club:
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