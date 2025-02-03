'use client';

import AgentPageLayout from '@/components/agents/AgentPageLayout';
import AgentHeroSection from '@/components/agents/AgentHeroSection';
import FeatureSection from '@/components/agents/FeatureSection';
import ValueProposition from '@/components/agents/ValueProposition';
import Footer from '@/components/Footer';
import RevenueScreen from '@/components/demo/screens/RevenueScreen';
import { DemoWrapper } from '@/components/demo/wrappers/DemoWrapper';
import { FeatureDemoWrapper } from '@/components/agents/FeatureDemoWrapper';

const WhatsappReportsIcon = () => (
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

export default function WhatsappReportsAgentPage() {
  return (
    <AgentPageLayout>
      <AgentHeroSection
        theme="light"
        tag="Whatsapp Reports"
        tagIcon={<WhatsappReportsIcon />}
        title="Get your reports directly from Whatsapp"
        description="Want to know yesterday's sales? Just ping on whatsapp. Eva will respond with the report instantly."
        rightContent={
          <DemoWrapper>
            <RevenueScreen onComplete={() => {}} />
          </DemoWrapper>
        }
        cta={{
          type: 'waitlist',
          text: 'Join Waitlist'
        }}
      />
      <ValueProposition 
        title="Why this helps?"
        description="Most MIS requests do not need a data scientist. These are common requests and most teams have an MIS team to just handle this. Eva can run these reports on your data in real time and send it to you on whatsapp."
      />
      
      <FeatureSection
        category="Whatsapp Reports"
        title="Get your reports directly from Whatsapp"
        description="Just ping whatever report you need on whatsapp. Eva will generate the report, verify it, fetch the data and send it to you in a few seconds."
        features={[
          {
            title: "Your data is always fresh",
            description: "Eva freshly runs the query and gets you report instantly. So it's never stale. "
          },
          {
            title: "Your data is secure",
            description: "Eva only responds to requests from registered users. And Eva can only access the data you authorize her to."
          },
          {
            title: "Eva can take human help",
            description: "When the request is complex, Eva can take human help to get the report. "
          }
        ]}
        imageSrc={
          <div className="w-full">
            <FeatureDemoWrapper>
              <RevenueScreen onComplete={() => {}} />
            </FeatureDemoWrapper>
          </div>
        }
      />

      <Footer />
    </AgentPageLayout>
  );
} 