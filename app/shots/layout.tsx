import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Newsletter | Applied AI',
  description: 'Stay updated with the latest in AI and productivity.',
};

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
        {children}
    </div>
  );
} 