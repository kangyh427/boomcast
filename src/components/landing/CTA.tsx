/*
 * ============================================================
 * 파일: src/components/landing/CTA.tsx
 * 설명: BoomCast 최종 CTA 섹션 — 디자인 리뉴얼 v2
 * 경로: src/components/landing/CTA.tsx
 * 최근 작업: 세션 11 - 전면 교체 (마스터플랜 PART 8-8)
 *   - 배경: 흰 카드 → 다크 그라데이션 (#0F172A → #1E293B)
 *   - 텍스트: 흰색 대형 타이틀 + 밝은 서브텍스트
 *   - CTA 버튼: 반전 스타일 (흰 배경 + 블루 텍스트)
 *   - 장식: 블루/앰버 글로우 오브 + 좌측 축구 아이콘 + 우측 폰 아이콘
 *   - gradient-text 제거 (Hero에서만 사용 규칙)
 *   - useInView 스크롤 등장 애니메이션
 *   - "무료" 문구 없음 유지
 *   - CTA 버튼: 사이트 전체 2곳 중 하나 (2번째)
 * 작성일: 2026-03-07
 * ============================================================
 */

"use client";

import Link from "next/link";
import { ArrowRight, Smartphone, Trophy } from "lucide-react";
import { useLang } from "@/providers/LanguageProvider";
import { useInView } from "@/hooks/useInView";

/* ── 한/영 텍스트 ── */
const text = {
  ko: {
    title: "동네 축구의 새로운 경험",
    subtitle:
      "스마트폰 하나로 우리 팀 경기가 예능 콘텐츠로 변합니다. 지금 시작해보세요.",
    cta: "시작하기",
  },
  en: {
    title: "A New Way to Experience Local Soccer",
    subtitle:
      "Turn your team's games into entertainment content with just a smartphone. Get started today.",
    cta: "Get Started",
  },
};

export default function CTA() {
  const { lang } = useLang();
  const t = text[lang];

  /* 스크롤 등장 애니메이션 */
  const sectionRef = useInView();

  return (
    <section className="py-20 sm:py-28 px-4 bg-white">
      <div
        ref={sectionRef}
        className="reveal max-w-5xl mx-auto relative overflow-hidden rounded-3xl"
      >
        {/* ── 다크 그라데이션 배경 ── */}
        <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] px-8 py-16 sm:px-14 sm:py-20 relative">
          {/* ── 글로우 오브 장식 ── */}
          <div className="glow-orb-blue w-72 h-72 top-[-20%] left-[-10%] opacity-60" />
          <div className="glow-orb-amber w-56 h-56 bottom-[-15%] right-[-5%] opacity-40" />

          {/* ── 장식 아이콘: 좌측 트로피 ── */}
          <div className="absolute top-8 left-8 sm:top-12 sm:left-14 opacity-10">
            <Trophy className="w-20 h-20 sm:w-28 sm:h-28 text-blue-400" />
          </div>

          {/* ── 장식 아이콘: 우측 스마트폰 ── */}
          <div className="absolute bottom-8 right-8 sm:bottom-12 sm:right-14 opacity-10">
            <Smartphone className="w-16 h-16 sm:w-24 sm:h-24 text-amber-400" />
          </div>

          {/* ── 콘텐츠 ── */}
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
              {t.title}
            </h2>

            <p className="text-slate-300 text-base sm:text-lg mb-10 leading-relaxed max-w-lg mx-auto">
              {t.subtitle}
            </p>

            {/* ── 반전 CTA 버튼 (흰 배경 + 블루 텍스트) ── */}
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-8 py-4 rounded-xl shadow-lg shadow-white/10 hover:shadow-xl hover:shadow-white/20 hover:bg-blue-50 transition-all duration-300 hover:-translate-y-0.5 text-base btn-hover-arrow"
            >
              {t.cta}
              <ArrowRight className="w-5 h-5 arrow-icon" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
