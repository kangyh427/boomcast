import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Architecture from "@/components/landing/Architecture";
import CTA from "@/components/landing/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Architecture />
      <CTA />
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-800">
        <p>&copy; 2026 BoomCast. AI Multi-Persona Sports Casting Platform.</p>
      </footer>
    </>
  );
}
