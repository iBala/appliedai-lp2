import { Metadata } from 'next';
import ResourceHeroSection from '@/components/resources/ResourceHeroSection';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Study Groups | Applied AI Club',
  description: 'Work as a group and learn AI skills fast with Applied AI study groups.',
};

export default function StudyGroupsPage() {
  return (
    <main className="min-h-screen">
      <ResourceHeroSection
        tag="Study Groups"
        tagIcon={<Users />}
        title="Applied AI Study Groups"
        description="Study groups are a way to work with others to build AI skills fast"
      />

      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-8 py-16 space-y-16">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-black">How it works</h2>
            <p className="text-black/70 mb-4">
              We&apos;ve realized that it&apos;s easier to learn new skills when you have partners. Study groups provide a way for you to learn a new AI skill in a short timeframe as a group.
            </p>
            <ul className="list-disc pl-6 text-black/70 space-y-2">
              <li>Pick a specific use case to build.</li>
              <li>Share updates and questions in a dedicated WhatsApp group.</li>
              <li>Join weekly check‑in calls and update your progress tracker.</li>
              <li>Showcase what you built on Demo Day.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-black">There&apos;s a fun catch!</h2>
            <p className="text-black/70 mb-4">
              To keep everyone accountable, there is a ₹499 deposit. Complete the program and you get it back in full.
            </p>
            <ul className="list-disc pl-6 text-black/70 space-y-2">
              <li>Attend at least one weekly check‑in call.</li>
              <li>Update the tracker every week.</li>
              <li>Present your demo on Demo Day.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-black">How to participate</h2>
            <p className="text-black/70">
              Study groups are open to members of the Applied AI Club.
            </p>
            <Link
              href="/club"
              className="inline-block mt-4 rounded-full bg-[#0A40C2] px-6 py-3 text-white font-medium hover:bg-[#0A40C2]/90"
            >
              Join the Club
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

