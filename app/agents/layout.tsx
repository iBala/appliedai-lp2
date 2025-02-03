import Footer from '@/components/Footer';

export default function AgentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      {children}
    </main>
  );
} 