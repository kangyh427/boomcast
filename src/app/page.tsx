import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Architecture from "@/components/landing/Architecture";
import Pricing from "@/components/landing/Pricing";
import CTA from "@/components/landing/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Architecture />
      <CTA />
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-800">
        <p>&copy; 2026 BoomCast. 동네 예능 스포츠 AI 캐스팅 플랫폼.</p>
      </footer>
    </>
  );
}
