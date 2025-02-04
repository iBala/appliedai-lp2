import { Metadata } from 'next';
// import { siteConfig } from '../../metadata';

export const metadata: Metadata = {
  title: 'Recruit | Find the right hire among 1000s',
  description: 'Among 1000s of applications, find the right candidate that suit the culture, skills and experience.',
  openGraph: {
    title: 'Recruit | Find the right hire among 1000s',
    description: 'Among 1000s of applications, find the right candidate that suit the culture, skills and experience.',
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