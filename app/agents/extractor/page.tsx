'use client';

import AgentPageLayout from '@/components/agents/AgentPageLayout';
import AgentHeroSection from '@/components/agents/AgentHeroSection';
import FeatureSection from '@/components/agents/FeatureSection';
import ValueProposition from '@/components/agents/ValueProposition';
import Footer from '@/components/Footer';
import ExtractorScreen from '@/components/demo/screens/ExtractorScreen';
import { DemoWrapper } from '@/components/demo/wrappers/DemoWrapper';
import { FeatureDemoWrapper } from '@/components/agents/FeatureDemoWrapper';

const ExtractorIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

export default function ExtractorAgentPage() {
  return (
    <AgentPageLayout>
      <AgentHeroSection
        theme="light"
        tag="Document Processing"
        tagIcon={<ExtractorIcon />}
        title="Extract structured data without templates"
        description="Extractor is more than OCR. It can understand and extract the data from the an image or a doc. No template creation, no coding. Just works."
        rightContent={
          <DemoWrapper>
            <ExtractorScreen onComplete={() => {}} />
          </DemoWrapper>
        }
        cta={{
          type: 'link',
          text: 'Sign Up',
          href: 'https://dashboard.appliedai.club'
        }}
      />
      <ValueProposition 
        title="Why this helps?"
        description="Letting in an unqualified candidate wastes time, resources, disppoints the panel. This impacts the overall candidate experience resulting in conversion problems. Imagine if you paid a lot of attention and you made sure only highly qualified 5 candidates get shortlisted. - High ROI for panel, Easier scheduling, Better candidate experience. This is the 20% effort that will give you 80% results."
      />
      
      <FeatureSection
        category="Document Processing"
        title="Extract data from any document"
        description="Don't just depend on resume, use public data to improve candidate evaluation and find the right candidate"
        features={[
          {
            title: "Evaluate more than the technical skills",
            description: "Evaluate candidates based on cultural value of company, functional team requirements and technical skills"
          },
          {
            title: "Smart interview scheduling",
            description: "Eliminate back-and-forth emails with AI-powered scheduling that finds the perfect time for both parties."
          },
          {
            title: "Keep the right candidates engaged",
            description: "Recruit AI can talk to your candidates and keep them engaged throughout the hiring process and ensure their success."
          }
        ]}
        imageSrc={
          <div className="w-full">
            <FeatureDemoWrapper>
              <ExtractorScreen onComplete={() => {}} />
            </FeatureDemoWrapper>
          </div>
        }
      />

      <Footer />
    </AgentPageLayout>
  );
} 