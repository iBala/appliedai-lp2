import { Metadata } from 'next';
// import { siteConfig } from '../../metadata';

export const metadata: Metadata = {
  title: 'User Research | Talk to your users with AI',
  description: 'Build better products by understanding your users. Our user research assistant will help you conduct in-depth research at scale.',
  openGraph: {
    title: 'User Research | Talk to your users with AI',
    description: 'Build better products by understanding your users. Our user research assistant will help you conduct in-depth research at scale.',
    images: [
      {
        url: `/images/og/user-research.png`,
        width: 1200,
        height: 630,
        alt: 'AppliedAI User Research',
      },
    ],
  },
}; 