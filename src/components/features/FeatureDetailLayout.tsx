/*
 * ============================================================
 * 파일: src/components/features/FeatureDetailLayout.tsx
 * 설명: 기능 상세 페이지 공통 레이아웃
 * 경로: src/components/features/FeatureDetailLayout.tsx
 * 최근 작업: 세션 9 - 신규 생성
 *   - 히어로 (그라데이션 배경 + 아이콘 + 타이틀)
 *   - 좌/우 교차 섹션 블록 (Vrew 스타일)
 *   - 하단 CTA → /demo 이동
 *   - useInView 스크롤 등장 애니메이션 적용
 *   - useLang() 적용 (한/영 전환)
 *   - 4개 상세 페이지에서 공통 사용
 * 작성일: 2026-03-07
 * ============================================================
 */

"use client";

import Link from "next/link";
import { useInView, useInViewMultiple } from "@/hooks/useInView";
import { useLang } from "@/providers/LanguageProvider";
import type { ReactNode } from "react";

/* ── 타입 정의 ── */

/** 좌/우 교차 섹션 블록 하나의 데이터 */
export interface FeatureSection {
  /** lucide-react 아이콘 컴포넌트 (JSX) */
  icon: ReactNode;
  /** 아이콘 배경 색상 (Tailwind 클래스, 예: "bg-blue-500") */
  iconBg: string;
  /** 섹션 소제목 */
  title: string;
  /** 섹션 설명 텍스트 */
  description: string;
  /** 추가 상세 포인트 목록 (선택) */
  points?: string[];
}

/** FeatureDetailLayout에 전달할 전체 props */
export interface FeatureDetailLayoutProps {
  /** 히어로 배경 그라데이션 (Tailwind 클래스) */
  heroGradient: string;
  /** 히어로 아이콘 (JSX) */
  heroIcon: ReactNode;
  /** 히어로 뱃지 텍스트 */
  heroBadge: string;
  /** 히어로 타이틀 */
  heroTitle: string;
  /** 히어로 서브타이틀 */
  heroSubtitle: string;
  /** 좌/우 교차 섹션 블록 배열 */
  sections: FeatureSection[];
  /** 하단 CTA 텍스트 */
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButtonText: string;
}

/* ── 한/영 공통 텍스트 ── */
const commonText = {
  ko: { backToHome: "← 홈으로", ctaHref: "/demo" },
  en: { backToHome: "← Back to Home", ctaHref: "/demo" },
};

/* ── 섹션 배경색 순환 (디자인 가이드라인 PART 2) ── */
const sectionBgs = [
  "bg-white",        /* 1번 섹션 */
  "bg-cream",        /* 2번 섹션 */
  "bg-slate-section", /* 3번 섹션 */
  "bg-white",        /* 4번 섹션 */
  "bg-cream",        /* 5번 이상 순환 */
];

export default function FeatureDetailLayout({
  heroGradient,
  heroIcon,
  heroBadge,
  heroTitle,
  heroSubtitle,
  sections,
  ctaTitle,
  ctaSubtitle,
  ctaButtonText,
}: FeatureDetailLayoutProps) {
  const { lang } = useLang();
  const ct = commonText[lang];
  const heroRef = useInView();

  return (
    <div className="min-h-screen">
      {/* ================================================================
         히어로 섹션 — 다크 그라데이션 배경
         ================================================================ */}
      <section className={`relative overflow-hidden ${heroGradient}`}>
        {/* 글로우 오브 장식 */}
        <div className="glow-orb-blue w-96 h-96 top-[-10%] left-[-5%]" />
        <div className="glow-orb-amber w-72 h-72 bottom-[-10%] right-[-5%]" />

        <div
          ref={heroRef}
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center"
        >
          {/* 뒤로 가기 */}
          <Link
            href="/"
            className="reveal inline-block text-sm text-white/60 hover:text-white/90 transition-colors mb-8"
          >
            {ct.backToHome}
          </Link>

          {/* 아이콘 */}
          <div className="reveal stagger-1 flex justify-center mb-6">
            <div className="icon-bg-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white">
              {heroIcon}
            </div>
          </div>

          {/* 뱃지 */}
          <div className="reveal stagger-2 mb-4">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold rounded-full bg-white/15 text-white/90 backdrop-blur-sm border border-white/20">
              {heroBadge}
            </span>
          </div>

          {/* 타이틀 */}
          <h1 className="reveal stagger-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight tracking-tight">
            {heroTitle}
          </h1>

          {/* 서브타이틀 */}
          <p className="reveal stagger-4 text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* ================================================================
         좌/우 교차 섹션 블록들
         ================================================================ */}
      {sections.map((section, index) => {
        const isReversed = index % 2 === 1;
        const bgClass = sectionBgs[index % sectionBgs.length];

        return (
          <SectionBlock
            key={index}
            section={section}
            isReversed={isReversed}
            bgClass={bgClass}
            index={index}
          />
        );
      })}

      {/* ================================================================
         하단 CTA
         ================================================================ */}
      <BottomCTA
        title={ctaTitle}
        subtitle={ctaSubtitle}
        buttonText={ctaButtonText}
        href={ct.ctaHref}
      />
    </div>
  );
}

/* ── 좌/우 교차 섹션 블록 (분리 컴포넌트) ── */
function SectionBlock({
  section,
  isReversed,
  bgClass,
  index,
}: {
  section: FeatureSection;
  isReversed: boolean;
  bgClass: string;
  index: number;
}) {
  const ref = useInView();

  return (
    <section className={`${bgClass} py-16 sm:py-20 px-4`}>
      <div
        ref={ref}
        className={`max-w-5xl mx-auto flex flex-col ${
          isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
        } items-center gap-10 lg:gap-16`}
      >
        {/* 비주얼 카드 */}
        <div className={`lg:w-2/5 w-full flex justify-center ${isReversed ? "reveal-right" : "reveal-left"}`}>
          <div className="w-full max-w-[320px] aspect-square rounded-3xl bg-white shadow-lg shadow-gray-200/50 border border-gray-100 flex flex-col items-center justify-center p-8">
            {/* 아이콘 */}
            <div className={`icon-bg-lg ${section.iconBg} text-white mb-5 shadow-lg`}>
              {section.icon}
            </div>
            <p className="text-sm font-bold text-gray-700 text-center">
              {section.title}
            </p>
          </div>
        </div>

        {/* 텍스트 영역 */}
        <div className={`lg:w-3/5 w-full text-center lg:text-left ${isReversed ? "reveal-left" : "reveal-right"}`}>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
            {section.title}
          </h3>
          <p className="text-gray-500 leading-relaxed mb-5 max-w-lg mx-auto lg:mx-0">
            {section.description}
          </p>

          {/* 상세 포인트 리스트 */}
          {section.points && section.points.length > 0 && (
            <ul className="space-y-3 max-w-lg mx-auto lg:mx-0">
              {section.points.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-gray-600 text-sm"
                >
                  <span className="mt-1 w-5 h-5 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── 하단 CTA (분리 컴포넌트) ── */
function BottomCTA({
  title,
  subtitle,
  buttonText,
  href,
}: {
  title: string;
  subtitle: string;
  buttonText: string;
  href: string;
}) {
  const ref = useInView();

  return (
    <section className="bg-dark-section py-16 sm:py-20 px-4">
      <div ref={ref} className="max-w-3xl mx-auto text-center">
        <h2 className="reveal text-2xl sm:text-3xl font-extrabold text-white mb-4">
          {title}
        </h2>
        <p className="reveal stagger-1 text-white/60 mb-8 max-w-xl mx-auto">
          {subtitle}
        </p>
        <Link
          href={href}
          className="reveal stagger-2 inline-flex items-center gap-2 px-8 py-3.5 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg btn-hover-arrow"
        >
          {buttonText}
          <svg
            className="w-4 h-4 arrow-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
