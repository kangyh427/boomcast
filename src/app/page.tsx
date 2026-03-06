/*
 * ============================================================
 * 파일: src/app/page.tsx
 * 설명: BoomCast 랜딩 페이지 - 모든 섹션 조합
 * 경로: src/app/page.tsx
 * 최근 작업: 세션 4 - 랜딩 페이지 신규 구성 (화이트 테마)
 * 작성일: 2025-03-06
 * ============================================================
 */

import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Architecture from "@/components/landing/Architecture";
import Pricing from "@/components/landing/Pricing";
import CTA from "@/components/landing/CTA";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Architecture />
      <Pricing />
      <CTA />
    </>
  );
}
