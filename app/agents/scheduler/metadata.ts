import { Metadata } from 'next';
import { siteConfig } from '../../metadata';

export const metadata: Metadata = {
  title: 'Eva | Your scheduling assistant',
  description: 'Delegate your scheduling to Eva. She will take care of your meetings and ensure you never miss another important appointment.',
  openGraph: {
    title: 'Eva | Your scheduling assistant',
    description: 'Delegate your scheduling to Eva. She will take care of your meetings and ensure you never miss another important appointment.',
    images: [
      {
        url: `${siteConfig.url}/images/og/scheduler.png`,
        width: 1200,
        height: 630,
        alt: 'AppliedAI Scheduler',
      },
    ],
  },
}; 