import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import LogoScroll from "@/components/LogoScroll";
import { getEventEmbed } from "@/lib/event";

export default async function Home() {
  // Fetch the event embed code
  const eventEmbed = await getEventEmbed();

  return (
    <main className="relative">
      <div className="relative">
        <HeroSection embedCode={eventEmbed} />
      </div>
      
      {/* Logo scroll section showing companies that use our platform */}
      <div className="relative">
        <LogoScroll />
      </div>
      
      <div className="relative bg-white">
        <HowItWorks />
      </div>
      <Footer />
    </main>
  );
}