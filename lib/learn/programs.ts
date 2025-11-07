export type ProgramType = 'study-group' | 'bootcamp';

interface ProgramCohort {
  label: string;
  startDate: string;
  endDate: string;
  demoDate: string;
  syncUps: string;
  whatsappGroupDescription: string;
  enrollmentLink: string;
}

interface ProgramFacilitator {
  name: string;
  title: string;
  bio: string;
  avatarUrl?: string;
}

interface ProgramFaq {
  question: string;
  answer: string;
}

interface CompanyHighlight {
  name: string;
  logoUrl: string;
  description?: string;
}

export interface LearningProgram {
  slug: string;
  type: ProgramType;
  name: string;
  tagline: string;
  description: string;
  heroImage?: string;
  priceLabel: string;
  depositLabel?: string;
  refundPolicy?: string;
  duration: string;
  cadenceDescription: string;
  bulletPoints: string[];
  whoIsItFor: string[];
  cohort: ProgramCohort;
  facilitators: ProgramFacilitator[];
  participatingCompanies: CompanyHighlight[];
  faqs: ProgramFaq[];
}

const PLACEHOLDER_IMAGE = '/images/learn-ai/placeholder.jpg';

const STUDY_GROUP_PROGRAMS: LearningProgram[] = [
  {
    slug: 'n8n',
    type: 'study-group',
    name: 'n8n Study Group',
    tagline: 'A commitment based 3 week cohort where you learn to use n8n and build a project of your choice. Learn by yourself using material provided and advisor help.',
    description:
      "You'll be added to a whatsapp group of similar enthusiasts. Learn and build your project. Present to the world at the end of 3 weeks.",
    heroImage: PLACEHOLDER_IMAGE,
    priceLabel: '₹499 refundable deposit',
    depositLabel: 'Deposit refunded on successful demo',
    refundPolicy: 'Complete all syncs and demo day to get the full deposit back.',
    duration: '3 weeks',
    cadenceDescription: 'Two syncs each week, async accountability in a dedicated WhatsApp group.',
    bulletPoints: [
      'Kick-off session to scope the automation you will build',
      'Weekly office hours to unblock implementation details',
      'Demo day where every participant presents their project live',
    ],
    whoIsItFor: [
      'This is ideal if you can learn by yourself with some guidance. If you need to be taught, explore our bootcamps',
      'Beginners who know the basics of n8n and want structured accountability',
      'You have some understanding of technology',
    ],
    cohort: {
      label: '',
      startDate: '2025-11-11',
      endDate: '2025-11-29',
      demoDate: '2025-11-29',
      syncUps: 'Tuesdays & Thursdays · 7 PM IST',
      whatsappGroupDescription: 'Dedicated WhatsApp space to share progress, blockers, and resources.',
      enrollmentLink: '#',
    },
    facilitators: [
      {
        name: 'Bala Panneerselvam',
        title: 'Founding member, Applied AI Club',
        bio: '17+ years in Product. Founder, ZORP. Independent AI tranformation consultant.',
        avatarUrl: undefined,
      },
      {
        name: 'Praveen kumar Thiyagarajan',
        title: 'Founding member, Applied AI Club',
        bio: '17+ years a product leader and ex-Director at Swiggy, now working on his own startup.',
      },
    ],
    participatingCompanies: [
      {
        name: 'Freshdesk',
        logoUrl: '/images/logo1.png',
        description: 'Support operations team automated onboarding workflows.',
      },
      {
        name: 'Kosha Labs',
        logoUrl: '/images/logo5.png',
        description: 'Founders streamlining product operations with automation.',
      },
      {
        name: 'Nova Retail',
        logoUrl: '/images/logo8.png',
        description: 'Retail ops crew prototyped inventory and reporting automations.',
      },
      {
        name: 'SwiftScale',
        logoUrl: '/images/logo11.png',
        description: 'Automation-first GTM teams validating internal workflows.',
      },
    ],
    faqs: [
      {
        question: 'Do I need prior n8n experience?',
        answer:
          'This is a self learning course. Having some knowledge around what n8n is or similar tools is important. ',
      },
      {
        question: 'What happens if I miss a sync?',
        answer:
          'You can catch up through the recordings and async updates. Missing more than one sync means the deposit is not refunded.',
      },
      {
        question: 'How does the refund work?',
        answer:
          'Attend the syncs, post weekly updates, and present during demo day. We process the refund within 7 business days.',
      },
      {
        question: 'What if I need dedicated teaching courses?',
        answer:
          'Check out our bootcamps for structured training courses.',
      },
      {
        question: "Why should I pay you if I'm going to learn myself?",
        answer:
          "This is meant for people who know they can learn but they don't find the time or motivation. The commitment is to make sure there's some skin in the game. The amount will be refunded if you finish the course.",
      },
    ],
  },
  {
    slug: 'vibe-coding',
    type: 'study-group',
    name: 'Vibe Coding Study Group',
    tagline: 'A commitment based 3 week cohort where you learn to vibe code and build a project of your choice. Learn by yourself using material provided and advisor help.',
    description:
      'Are you looking to learn vibe coding? Join a group of potential builders and learn vibe coding together through a self learning study group. Demo your product at the end of the course.',
    heroImage: PLACEHOLDER_IMAGE,
    priceLabel: '₹499 refundable deposit',
    depositLabel: 'Refunded when you complete the demo',
    refundPolicy: 'Attend all syncs, keep the tracker updated, and demo on Saturday to qualify for a refund.',
    duration: '4 weeks',
    cadenceDescription: 'Kick-off workshop, async build sprints, and shared office hours every Wednesday.',
    bulletPoints: [
      'Learn to work with vibe coding tools like cursor, lovable, replit etc.',
      'Decide on the project and requirements.',
      'Work on your project, take help and complete the demo.',
    ],
    whoIsItFor: [
      'This is ideal if you can learn by yourself with some guidance. If you need to be taught, explore our bootcamps',
      'You have some basic experience with scripting or coding.',
      'You are finding it hard to find the time and motivation to learn.',
    ],
    cohort: {
      label: '',
      startDate: '2025-11-11',
      endDate: '2025-12-06',
      demoDate: '2025-12-06',
      syncUps: 'Wednesdays · 8 PM IST',
      whatsappGroupDescription: 'Daily check-ins and peer feedback channel to keep momentum high.',
      enrollmentLink: '#',
    },
    facilitators: [
      {
        name: 'Bala Panneerselvam',
        title: 'Founding member, Applied AI Club',
        bio: '17+ years in Product. Founder, ZORP. Independent AI tranformation consultant.',
        avatarUrl: undefined,
      },
      {
        name: 'Praveen kumar Thiyagarajan',
        title: 'Founding member, Applied AI Club',
        bio: '17+ years a product leader and ex-Director at Swiggy, now working on his own startup.',
      },
    ],
    participatingCompanies: [
      {
        name: 'Creator Stack',
        logoUrl: '/images/logo2.png',
        description: 'Community product leaders experimenting with vibe-led onboarding.',
      },
      {
        name: 'Buzzverse',
        logoUrl: '/images/logo9.png',
        description: 'Consumer app teams prototyping playful AI companions.',
      },
      {
        name: 'DialUp',
        logoUrl: '/images/logo12.png',
        description: 'Community operations groups adding AI-first engagement loops.',
      },
      {
        name: 'PlayLoop',
        logoUrl: '/images/logo15.png',
        description: 'Early vibe-product founders validating their first assistants.',
      },
    ],
    faqs: [
      {
        question: 'Can I join if I am new to coding?',
        answer:
          'Yes. Since this is a self learning course, we recommend you have a technical background. You should understand what is happening. ',
      },
      {
        question: 'Will the course material be shared?',
        answer:
          "We share videos and posts on working with vibe coding which are fairly clear. We also have dedicated sessions where you can use the facilitator's help to learn.",
      },
      {
        question: 'How many hours should I budget each week?',
        answer: 'Expect 3-4 hours including syncs, async build time, and demo prep.',
      },
      {
        question: 'What if I need dedicated teaching courses?',
        answer:
          'Check out our bootcamps for structured training courses.',
      },
      {
        question: "Why should I pay you if I'm going to learn myself?",
        answer:
          "This is meant for people who know they can learn but they don't find the time or motivation. The commitment is to make sure there's some skin in the game. The amount will be refunded if you finish the course.",
      },
    ],
  },
];

const BOOTCAMP_PROGRAMS: LearningProgram[] = [
  {
    slug: 'n8n',
    type: 'bootcamp',
    name: 'n8n Bootcamp',
    tagline: 'Deep dive into building production-grade automations with n8n.',
    description:
      'A weekend intensive led by practitioners who operate large-scale automations. You will understand architecture, best practices, and ship a workflow with advanced nodes.',
    heroImage: PLACEHOLDER_IMAGE,
    priceLabel: '₹7,999',
    refundPolicy: 'Full refund if you cancel 7 days before the bootcamp.',
    duration: 'Weekend intensive · 2 days',
    cadenceDescription: 'Live expert sessions, guided labs, and project clinics.',
    bulletPoints: [
      'Architecture choices for scaling n8n workloads',
      'Advanced nodes, error handling, and monitoring',
      'Hands-on project clinic with mentor feedback',
    ],
    whoIsItFor: [
      'Automation engineers wanting to productionize n8n',
      'Operators upgrading from no-code tools to self-hosted setups',
      'Teams planning to centralise automations behind maintained workflows',
    ],
    cohort: {
      label: 'Bootcamp · March 2025',
      startDate: 'TBD',
      endDate: 'TBD',
      demoDate: 'TBD',
      syncUps: 'Live sessions · 10 AM – 5 PM IST',
      whatsappGroupDescription: 'Pop-up WhatsApp cohort for peer support and Q&A with instructors.',
      enrollmentLink: '#',
    },
    facilitators: [
      {
        name: 'Rahul Desai',
        title: 'Automation Architect',
        bio: 'Designs automation platforms for enterprise clients and co-hosts the n8n India meetup.',
      },
      {
        name: 'Sneha Kulkarni',
        title: 'Senior Solutions Engineer',
        bio: 'Built n8n installations that serve millions of automation jobs every month.',
      },
    ],
    participatingCompanies: [
      {
        name: 'ByteScale',
        logoUrl: '/images/logo3.png',
        description: 'Growth-stage SaaS team scaling internal automations with n8n.',
      },
      {
        name: 'Maple Labs',
        logoUrl: '/images/logo6.png',
        description: 'Product ops org deploying n8n as their automation backbone.',
      },
      {
        name: 'Northwind Logistics',
        logoUrl: '/images/logo10.webp',
        description: 'Logistics operations automating dispatch and reporting flows.',
      },
      {
        name: 'BlueRiver',
        logoUrl: '/images/logo13.svg',
        description: 'Ops teams centralising automation governance with n8n.',
      },
    ],
    faqs: [
      {
        question: 'Do I need to self-host n8n for the bootcamp?',
        answer:
          'We cover both cloud and self-hosted setups. Bring whichever environment you are comfortable with.',
      },
      {
        question: 'Is there a certificate?',
        answer:
          'Yes, participants who complete the capstone project receive a certificate of completion from Applied AI Club.',
      },
    ],
  },
  {
    slug: 'vibe-coding',
    type: 'bootcamp',
    name: 'Vibe Coding Bootcamp',
    tagline: 'Design, prototype, and launch full-fledged vibe companions.',
    description:
      'A guided series of sessions that unpack how successful vibe bots are designed, deployed, and iterated. Learn the frameworks and ship a production-ready vibe companion.',
    heroImage: PLACEHOLDER_IMAGE,
    priceLabel: '₹5,999',
    refundPolicy: '50% refund for cancellations up to 5 days in advance.',
    duration: '3 live sessions over 6 days',
    cadenceDescription: 'Live classes, assignments, and office hours to review vibe bot flows.',
    bulletPoints: [
      'Frameworks to map personality, tone, and response triggers',
      'Building multi-turn conversations with guardrails',
      'Launching and measuring impact in real communities',
    ],
    whoIsItFor: [
      'Product designers experimenting with conversational interfaces',
      'Developers building vibe-first consumer experiences',
      'Community leads who want to deploy AI companions responsibly',
    ],
    cohort: {
      label: 'Bootcamp · April 2025',
      startDate: '2025-04-08',
      endDate: '2025-04-13',
      demoDate: '2025-04-13',
      syncUps: 'Sessions on 8th, 10th, and 13th April · 7 PM IST',
      whatsappGroupDescription: 'Small cohort WhatsApp pod for feedback and resource sharing.',
      enrollmentLink: '#',
    },
    facilitators: [
      {
        name: 'Arjun Pillai',
        title: 'Head of AI Experiences',
        bio: 'Leads vibe product strategy at a fast-growing consumer app and shares real launch playbooks.',
      },
    ],
    participatingCompanies: [
      {
        name: 'Ripple',
        logoUrl: '/images/logo4.png',
        description: 'Community platforms exploring AI vibe companions for onboarding.',
      },
      {
        name: 'Spark Social',
        logoUrl: '/images/logo7.png',
        description: 'Marketing teams prototyping brand-led vibe experiences.',
      },
      {
        name: 'CampusConnect',
        logoUrl: '/images/logo14.jpg',
        description: 'Student communities building supportive vibe assistants.',
      },
      {
        name: 'Wave Labs',
        logoUrl: '/images/logo16.png',
        description: 'Consumer apps experimenting with high-retention vibe loops.',
      },
    ],
    faqs: [
      {
        question: 'Will sessions be recorded?',
        answer: 'Yes. Recordings are shared within 24 hours for registered participants.',
      },
      {
        question: 'How much coaching is included?',
        answer:
          'Assignments get asynchronous feedback and we host a group office hour to review flows and copy.',
      },
    ],
  },
  {
    slug: 'langgraph',
    type: 'bootcamp',
    name: 'LangGraph Bootcamp',
    tagline: 'Master multi-agent orchestration with LangGraph and Applied AI tooling.',
    description:
      'A hands-on bootcamp to help you design reasoning agents, manage memory, and orchestrate reliable outcomes using LangGraph.',
    heroImage: PLACEHOLDER_IMAGE,
    priceLabel: '₹8,499',
    refundPolicy: 'Full refund for cancellations 10 days in advance.',
    duration: '4 live sessions over 2 weekends',
    cadenceDescription: 'Instructor-led deep dives, paired programming, and project showcase.',
    bulletPoints: [
      'Understand LangGraph primitives and agent composition patterns',
      'Implement memory, tools, and evaluation loops that scale',
      'Ship a capstone agent and present for instructor feedback',
    ],
    whoIsItFor: [
      'Engineers exploring production agent patterns',
      'Applied researchers who want to test multi-agent orchestration quickly',
      'Teams building LLM-powered workflows that need reliability',
    ],
    cohort: {
      label: 'Bootcamp · May 2025',
      startDate: '2025-05-10',
      endDate: '2025-05-18',
      demoDate: '2025-05-18',
      syncUps: 'Saturdays & Sundays · 6 PM IST',
      whatsappGroupDescription: 'Dedicated workspace for Q&A, resources, and peer support.',
      enrollmentLink: '#',
    },
    facilitators: [
      {
        name: 'Aditi Narayan',
        title: 'Principal Applied AI Engineer',
        bio: 'Designs multi-agent systems for analytics pipelines and contributes to LangGraph ecosystem tools.',
      },
      {
        name: 'Karan Sethi',
        title: 'AI Systems Architect',
        bio: 'Helps teams evaluate and deploy agentic workflows at scale.',
      },
    ],
    participatingCompanies: [
      {
        name: 'InsightWorks',
        logoUrl: '/images/logo1.png',
        description: 'Analytics teams building multi-agent research assistants.',
      },
      {
        name: 'Orbit Finance',
        logoUrl: '/images/logo5.png',
        description: 'Fintech teams prototyping LangGraph-powered copilots.',
      },
      {
        name: 'Helio Labs',
        logoUrl: '/images/logo9.png',
        description: 'Applied AI startups orchestrating complex agent workflows.',
      },
      {
        name: 'SignalForge',
        logoUrl: '/images/logo11.png',
        description: 'Enterprise AI groups evaluating LangGraph orchestration.',
      },
    ],
    faqs: [
      {
        question: 'Is prior LangChain experience required?',
        answer:
          'Base familiarity with LangChain or similar frameworks is recommended. We provide prep material for newcomers.',
      },
      {
        question: 'Do we work in teams?',
        answer:
          'Capstones are individual but we encourage pairing during lab time. We also have breakout rooms for peer reviews.',
      },
    ],
  },
];

export const CONTACT_EMAIL = 'hello@appliedai.club';

export function getStudyGroupPrograms(): LearningProgram[] {
  return STUDY_GROUP_PROGRAMS;
}

export function getBootcampPrograms(): LearningProgram[] {
  return BOOTCAMP_PROGRAMS;
}

export function getProgramBySlug(type: ProgramType, slug: string): LearningProgram | undefined {
  const source = type === 'study-group' ? STUDY_GROUP_PROGRAMS : BOOTCAMP_PROGRAMS;
  return source.find((program) => program.slug === slug);
}
