import { ReactNode } from 'react';
import Header from '../Header';
import Footer from '../Footer';

interface AgentPageLayoutProps {
  children: ReactNode;
  theme?: 'light' | 'dark';
}

export default function AgentPageLayout({ children, theme = 'light' }: AgentPageLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Common layout elements for all agent pages */}
      <main>{children}</main>
    </div>
  );
} 