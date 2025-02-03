import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import AgentList from "@/components/AgentList";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <AgentList />
      <Footer />
    </main>
  );
}