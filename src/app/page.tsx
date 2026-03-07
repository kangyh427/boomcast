/*
 * ============================================================
 * 파일: src/app/page.tsx
 * 설명: BoomCast 랜딩 페이지 - 전체 섹션 조합 (확정)
 * 경로: src/app/page.tsx
 * 최근 작업: 세션 6 - 최종 섹션 순서 확정
 *   - Architecture 삭제
 *   - ResultPreview, Testimonials, FAQ 추가
 *   - 인수인계서 [G] 확정 순서 반영
 * 작성일: 2026-03-07
 * ============================================================
 */

import Hero from "@/components/landing/Hero";
import ResultPreview from "@/components/landing/ResultPreview";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <ResultPreview />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}
