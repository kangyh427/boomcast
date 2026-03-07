/*
 * ============================================================
 * 파일: src/components/landing/Features.tsx
 * 설명: BoomCast 핵심 기능 - Vrew 스타일 좌/우 교차 레이아웃
 * 경로: src/components/landing/Features.tsx
 * 최근 작업: 세션 6 - 전면 재디자인
 *   - 4개 기능, 좌/우 교차 스토리텔링 (Vrew 참고)
 *   - 각 기능 클릭 → /features/... 상세 페이지
 *   - CTA 버튼 없음 (사이트 전체 2곳만 유지)
 * 작성일: 2026-03-07
 * ============================================================
 */

"use client";

import Link from "next/link";
import { useLang } from "@/providers/LanguageProvider";

/* ── 한/영 섹션 텍스트 ── */
const text = {
  ko: {
    sectionTitle: "이런 것들이 가능해요",
    sectionSubtitle: "촬영만 하면, AI가 알아서 만들어줍니다",
    learnMore: "자세히 보기 →",
  },
  en: {
    sectionTitle: "Here's What You Get",
    sectionSubtitle: "Just record — AI handles the rest",
    learnMore: "Learn more →",
  },
};

/* ── 기능 데이터 (인수인계서 [D] 확정 4개) ── */
const features = {
  ko: [
    {
      icon: "🎙️",
      title: "AI 예능 캐스터 3인",
      headline: "실황 + 해설 + 예능,\n진짜 방송 같은 AI 해설",
      description: "실황 캐스터가 현장감을 전하고, 해설위원이 전술을 분석하고, 예능 캐스터가 웃음을 선사합니다. 동네 축구가 프로 예능 영상이 됩니다.",
      gradient: "from-blue-500 to-cyan-400",
      bgLight: "bg-blue-50",
      href: "/features/ai-casters",
    },
    {
      icon: "🎬",
      title: "자동 하이라이트 숏폼",
      headline: "골 장면이 1분 숏폼으로,\n인스타에 바로 공유",
      description: "AI가 경기 속 골, 슈팅, 세리머니 등 핵심 장면을 자동으로 편집합니다. 1분 숏폼 3~5개가 즉시 완성됩니다.",
      gradient: "from-green-500 to-emerald-400",
      bgLight: "bg-green-50",
      href: "/features/highlights",
    },
    {
      icon: "📱",
      title: "스마트폰 하나로 촬영",
      headline: "별도 장비 0원,\n삼각대에 폰만 세우세요",
      description: "촬영 앱의 온보드 AI가 경기 중 주요 장면을 자동으로 태깅합니다. 별도 카메라, 마이크 없이 스마트폰 하나면 충분합니다.",
      gradient: "from-purple-500 to-pink-400",
      bgLight: "bg-purple-50",
      href: "/features/easy-setup",
    },
    {
      icon: "👥",
      title: "팀 전용 페이지",
      headline: "우리 팀만의 공간,\n시즌 기록과 경기 아카이브",
      description: "경기 영상, 하이라이트, 시즌 통계가 한곳에 모입니다. 팀원들과 함께 보고, 추억하고, 공유하세요.",
      gradient: "from-amber-500 to-orange-400",
      bgLight: "bg-amber-50",
      href: "/features/team-page",
    },
  ],
  en: [
    {
      icon: "🎙️",
      title: "3 AI Entertainment Casters",
      headline: "Play-by-Play + Analyst +\nEntertainer, like real TV",
      description: "A play-by-play caster brings the action, an analyst breaks down tactics, and an entertainer adds the laughs. Your local game becomes a pro entertainment show.",
      gradient: "from-blue-500 to-cyan-400",
      bgLight: "bg-blue-50",
      href: "/features/ai-casters",
    },
    {
      icon: "🎬",
      title: "Auto Highlight Shorts",
      headline: "Goal clips auto-edited into\n1-min shorts for Instagram",
      description: "AI automatically edits goals, shots, and celebrations from the game. 3-5 one-minute short clips are ready instantly.",
      gradient: "from-green-500 to-emerald-400",
      bgLight: "bg-green-50",
      href: "/features/highlights",
    },
    {
      icon: "📱",
      title: "Just Your Smartphone",
      headline: "Zero equipment cost,\njust your phone on a tripod",
      description: "The recording app's on-device AI auto-tags key moments during the game. No camera, no mic — just your smartphone.",
      gradient: "from-purple-500 to-pink-400",
      bgLight: "bg-purple-50",
      href: "/features/easy-setup",
    },
    {
      icon: "👥",
      title: "Team Page",
      headline: "Your team's own space with\nseason records and archive",
      description: "Game videos, highlights, and season stats all in one place. Watch, remember, and share with your teammates.",
      gradient: "from-amber-500 to-orange-400",
      bgLight: "bg-amber-50",
      href: "/features/team-page",
    },
  ],
};

export default function Features() {
  const { lang } = useLang();
  const t = text[lang];
  const featureList = features[lang];

  return (
    <section id="features" className="py-20 sm:py-28 px-4 bg-gray-50/60">
      <div className="max-w-5xl mx-auto">
        {/* ── 섹션 헤더 ── */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            <span className="gradient-text">{t.sectionTitle}</span>
          </h2>
          <p className="text-gray-500 text-lg">{t.sectionSubtitle}</p>
        </div>

        {/* ── Vrew 스타일: 좌/우 교차 기능 설명 ── */}
        <div className="space-y-16 sm:space-y-24">
          {featureList.map((feature, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={index}
                className={`flex flex-col ${
                  isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-8 lg:gap-16`}
              >
                {/* 비주얼 카드 */}
                <div className="lg:w-2/5 w-full flex justify-center">
                  <div
                    className={`${feature.bgLight} rounded-3xl p-10 sm:p-12 w-full max-w-[280px] aspect-square flex flex-col items-center justify-center text-center shadow-sm`}
                  >
                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-4xl mb-4 shadow-lg`}
                    >
                      {feature.icon}
                    </div>
                    <p className="text-sm font-bold text-gray-700">
                      {feature.title}
                    </p>
                  </div>
                </div>

                {/* 텍스트 영역 */}
                <div className="lg:w-3/5 w-full text-center lg:text-left">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 whitespace-pre-line leading-tight">
                    {feature.headline}
                  </h3>
                  <p className="text-gray-500 leading-relaxed mb-4 max-w-lg mx-auto lg:mx-0">
                    {feature.description}
                  </p>
                  <Link
                    href={feature.href}
                    className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {t.learnMore}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
