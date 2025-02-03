import { ReactNode } from 'react';

interface AgentPageLayoutProps {
  children: ReactNode;
  theme?: 'light' | 'dark';
}

export default function AgentPageLayout({ children }: AgentPageLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Common layout elements for all agent pages */}
      <main>{children}</main>
    </div>
  );
} 