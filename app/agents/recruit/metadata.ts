import { Metadata } from 'next';
import { siteConfig } from '../../metadata';

export const metadata: Metadata = {
  title: 'Recruit | Screen candidates with precision',
  description: 'Stop wasting time on unqualified candidates. Our AI screens resumes, schedules interviews, and manages your hiring pipeline.',
  openGraph: {
    title: 'Recruit | Screen candidates with precision',
    description: 'Stop wasting time on unqualified candidates. Our AI screens resumes, schedules interviews, and manages your hiring pipeline.',
    images: [
      {
        url: `/images/og/recruit.png`,
        width: 1200,
        height: 630,
        alt: 'AppliedAI Recruit',
      },
    ],
  },
}; 