import { Metadata } from 'next';
import { siteConfig } from '../../metadata';

export const metadata: Metadata = {
  title: 'Extractor | Extract data from any document',
  description: 'Extract structured data from non-standard documents with AI. AI extractor deploys human level vision intelligence to improve accuracy.',
  openGraph: {
    title: 'Extractor | Extract data from any document',
    description: 'Extract structured data from non-standard documents with AI. AI extractor deploys human level vision intelligence to improve accuracy.',
    images: [
      {
        url: `/images/og/extractor.png`,
        width: 1200,
        height: 630,
        alt: 'AppliedAI Extractor',
      },
    ],
  },
}; 