/*
 * ============================================================
 * 파일: src/app/page.tsx
 * 설명: BoomCast 랜딩 페이지 - 모든 섹션 조합
 * 경로: src/app/page.tsx
 * 최근 작업: 세션 6 - 섹션 순서 변경
 *   - Architecture import/렌더링 삭제
 *   - ResultPreview 추가 (Hero 바로 아래)
 *   - 세션 7에서 Testimonials, FAQ 추가 예정
 * 작성일: 2026-03-07
 * ============================================================
 */

import Hero from "@/components/landing/Hero";
import ResultPreview from "@/components/landing/ResultPreview";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import CTA from "@/components/landing/CTA";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <ResultPreview />
      <HowItWorks />
      <Features />
      {/* 세션 7에서 추가 예정: <Testimonials /> */}
      <Pricing />
      {/* 세션 7에서 추가 예정: <FAQ /> */}
      <CTA />
    </>
  );
}
