import { Metadata } from 'next';
import { siteConfig } from '../../metadata';

export const metadata: Metadata = {
  title: 'Whatsapp Reports | Get your data reports via Whatsapp',
  description: 'Want to know yesterday&apos;s sales? Just ping on whatsapp. Eva will respond with the report instantly.',
  openGraph: {
    title: 'WhatsApp Reports | Get your data reports via Whatsapp',
    description: 'Want to know yesterday&apos;s sales? Just ping on whatsapp. Eva will respond with the report instantly.',
    images: [
      {
        url: `/images/og/whatsapp-reports.png`,
        width: 1200,
        height: 630,
        alt: 'AppliedAI WhatsApp Reports',
      },
    ],
  },
}; 