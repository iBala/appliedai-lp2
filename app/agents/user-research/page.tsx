'use client';

import AgentPageLayout from '@/components/agents/AgentPageLayout';
import AgentHeroSection from '@/components/agents/AgentHeroSection';
import FeatureSection from '@/components/agents/FeatureSection';
import ValueProposition from '@/components/agents/ValueProposition';
import Footer from '@/components/Footer';
import UserResearchScreen from '@/components/demo/screens/UserResearchScreen';
import { DemoWrapper } from '@/components/demo/wrappers/DemoWrapper';
import { FeatureDemoWrapper } from '@/components/agents/FeatureDemoWrapper';

const UserResearchIcon = () => (
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

export default function UserResearchAgentPage() {
  return (
    <AgentPageLayout>
      <AgentHeroSection
        theme="light"
        tag="User Research"
        tagIcon={<UserResearchIcon />}
        title="Have in depth conversations with your users"
        description="Our Research AI is specifically designed to understand user's emotion, identify topics and have open ended, in depth conversations."
        rightContent={
          <DemoWrapper>
            <UserResearchScreen onComplete={() => {}} />
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
        description="Product teams often take months to build products only to find that having that 30 minute conversation with users would have saved them months of development time. The user research agent is built to have open ended conversations with users and identify the pain points and emotions in an effective and scalable way."
      />
      
      <FeatureSection
        category="User Research"
        title="Have real conversations with users"
        description="Make talking to your users a breeze. Build the right products with confidence backed by data."
        features={[
          {
            title: "You can use multiple channels",
            description: "Use custom chat links, Whatsapp, SMS, Email or phone calls. "
          },
          {
            title: "Set the overall objective",
            description: "Just set the larger objective. The agent takes care of the building the conversation, adapting to the user's responses and asking follow up questions."
          },
          {
            title: "Get structured insights",
            description: "Send out the campaigns in bulk, get structured insights as a summary and also access to individual raw conversations."
          }
        ]}
        imageSrc={
          <div className="w-full">
            <FeatureDemoWrapper>
              <UserResearchScreen onComplete={() => {}} />
            </FeatureDemoWrapper>
          </div>
        }
      />

      <Footer />
    </AgentPageLayout>
  );
} 