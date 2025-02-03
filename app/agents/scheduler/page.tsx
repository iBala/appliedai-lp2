import AgentPageLayout from '@/components/agents/AgentPageLayout';
import AgentHeroSection from '@/components/agents/AgentHeroSection';
import FeatureSection from '@/components/agents/FeatureSection';
import ValueProposition from '@/components/agents/ValueProposition';
import { Application } from '@/components/recruit/application';
import Footer from '@/components/Footer';

const SchedulerIcon = () => (
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

export default function SchedulerAgentPage() {
  return (
    <AgentPageLayout>
      <AgentHeroSection
        theme="light"
        tag="Scheduler"
        tagIcon={<SchedulerIcon />}
        title={`"I'm looping in Eva to find us time."`}
        description="Just cc: @eva to your conversations. She will take care of the scheduling, conflicts and follow ups."
        rightContent={<Application />}
        cta={{
          type: 'waitlist',
          text: 'Join Waitlist'
          // Or for external link:
          // type: 'link',
          // text: 'Try Now',
          // href: 'https://example.com'
        }}
      />
      <ValueProposition 
        title="Why this helps?"
        description="Scheduling is a pain. Average leader has 4+ meetings a day. There's so much time and effort spent in coordination that people hire assistants to do it. Eva is your AI assistant that can do this effectively. You just show up and never miss a meeting."
      />
      
      <FeatureSection
        category="Scheduler"
        title="Delegate your scheduling to Eva"
        description="Eva is smart enough to handle conflicts, address follow up questions and makes sure the meeting happens."
        features={[
          {
            title: "Eva takes over, coordinates, and follows up",
            description: "Eva can share availability, reschedule meetings, takes over back and forth, sends follow up and ensures reminders are sent. "
          },
          {
            title: "Your calendar is secure",
            description: "Eva never sees your private calendar. She only schedules on your behalf."
          },
          {
            title: "Eva consults you when needed.",
            description: "Just like a human assistant, Eva can consult you to handle complex scheduling/rescheduling requests."
          }
        ]}
        imageSrc="/images/scheduler-features.png"
        imageAlt="AI Scheduler Features"
      />

      <Footer />
    </AgentPageLayout>
  );
} 