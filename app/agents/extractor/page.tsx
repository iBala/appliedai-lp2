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
        description="Companies digitize their documents in two ways. 1. Set up templates for each document type to use OCR and extract data. 2. Manually type in the data from your scans or PDFs into the systems. Both of these are extremely time consuming and error prone. This solutions helps you digitize your documents with no templates, and no more manual data entry. We help you hit 98.6% accuracy in digitally created documents and 90%+ in legible handwritten documents."
      />
      
      <FeatureSection
        category="Document Processing"
        title="Extract data from any document"
        description="Work with non-standard documents like invoices, receipts, and contracts with ease."
        features={[
          {
            title: "Highest accuracy in extracting data",
            description: "We use the latest in OCR and LLM technology to extract data from your documents with 98.6% accuracy in digitally created documents and 90%+ in legible handwritten documents."
          },
          {
            title: "No templates, no coding",
            description: "Got a new type of documents? No problem, just upload the document and we will extract the data for you."
          },
          {
            title: "No just text, extract everything!",
            description: "We help you extract signatures, stamps, tables, headers and more through smart OCR and LLM technology."
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