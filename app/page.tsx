import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import { EventSection } from "@/components/EventSection";
import { getEventEmbed } from "@/lib/event";

export default async function Home() {
  // Fetch the event embed code
  const eventEmbed = await getEventEmbed();

  return (
    <main className="relative">
      <div className="relative">
        <HeroSection />
      </div>
      <div className="relative bg-white">
        <EventSection embedCode={eventEmbed} />
        <HowItWorks />
      </div>
      <Footer />
    </main>
  );
}