import ClubHero from '@/components/club/ClubHero';
import ClubContent from '@/components/club/ClubContent';
import JoinForm from '@/components/club/JoinForm';
import Footer from '@/components/Footer';

export default function ClubPage() {
  return (
    <main className="min-h-screen bg-white">
      <ClubHero />
      <ClubContent />
      <JoinForm />
      <Footer />
    </main>
  );
} 