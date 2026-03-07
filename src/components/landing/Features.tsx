/*
 * ============================================================
 * 파일: src/components/landing/Features.tsx
 * 설명: BoomCast 핵심 기능 섹션 - 4개 카드 (확정)
 * 경로: src/components/landing/Features.tsx
 * 최근 작업: 세션 6 - 전면 재작성
 *   - 6개 → 4개로 압축 (인수인계서 [D] 확정)
 *   - "실시간 이벤트 감지" 삭제
 *   - "자연스러운 AI 음성" 삭제
 *   - 각 카드 클릭 시 /features/... 상세 페이지 이동
 *   - "중계" 표현 → "예능 영상" / "콘텐츠"로 교체
 *   - useLang() 훅으로 i18n 전환 적용
 * 작성일: 2026-03-07
 * ============================================================
 */

"use client";

import Link from "next/link";
import { useLang } from "@/providers/LanguageProvider";

/* ── 한/영 섹션 텍스트 ── */
const text = {
  ko: {
    sectionTitle: "핵심 기능",
    sectionSubtitle:
      "촬영만 하면, AI가 알아서 예능 영상을 만들어줍니다",
    learnMore: "자세히 보기 →",
  },
  en: {
    sectionTitle: "Key Features",
    sectionSubtitle:
      "Just record, and AI creates entertainment videos for you",
    learnMore: "Learn more →",
  },
};

/* ── 기능 카드 데이터 (인수인계서 [D] 확정 4개) ── */
const features = {
  ko: [
    {
      icon: "🎙️",
      title: "AI 예능 캐스터 3인",
      description:
        "실황+해설+예능, 진짜 방송 같은 AI 해설. 3명의 AI 캐스터가 동네 축구를 프로 예능 영상으로 만들어줍니다.",
      gradient: "from-blue-500 to-cyan-400",
      bgLight: "bg-blue-50",
      href: "/features/ai-casters",
    },
    {
      icon: "🎬",
      title: "자동 하이라이트 숏폼",
      description:
        "골 장면이 1분 숏폼으로, 인스타에 바로 공유. AI가 자동으로 편집한 하이라이트 클립을 받아보세요.",
      gradient: "from-green-500 to-emerald-400",
      bgLight: "bg-green-50",
      href: "/features/highlights",
    },
    {
      icon: "📱",
      title: "스마트폰 하나로 촬영",
      description:
        "별도 장비 0원, 삼각대에 폰만 세우세요. 앱 내 AI가 촬영 중 주요 장면을 자동으로 태깅합니다.",
      gradient: "from-purple-500 to-pink-400",
      bgLight: "bg-purple-50",
      href: "/features/easy-setup",
    },
    {
      icon: "👥",
      title: "팀 전용 페이지",
      description:
        "우리 팀만의 공간, 시즌 기록, 경기 아카이브. 팀원들과 영상을 모아보고 함께 즐기세요.",
      gradient: "from-amber-500 to-orange-400",
      bgLight: "bg-amber-50",
      href: "/features/team-page",
    },
  ],
  en: [
    {
      icon: "🎙️",
      title: "3 AI Entertainment Casters",
      description:
        "Play-by-play + Analyst + Entertainer, just like real TV. 3 AI casters turn your local game into pro entertainment videos.",
      gradient: "from-blue-500 to-cyan-400",
      bgLight: "bg-blue-50",
      href: "/features/ai-casters",
    },
    {
      icon: "🎬",
      title: "Auto Highlight Shorts",
      description:
        "Goal clips auto-edited into 1-min shorts for Instagram. Get AI-edited highlight reels instantly.",
      gradient: "from-green-500 to-emerald-400",
      bgLight: "bg-green-50",
      href: "/features/highlights",
    },
    {
      icon: "📱",
      title: "Just Your Smartphone",
      description:
        "Zero equipment cost, just your phone on a tripod. The in-app AI auto-tags key moments during recording.",
      gradient: "from-purple-500 to-pink-400",
      bgLight: "bg-purple-50",
      href: "/features/easy-setup",
    },
    {
      icon: "👥",
      title: "Team Page",
      description:
        "Your team's space with season records and game archive. Collect and enjoy videos with your teammates.",
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
    <section id="features" className="py-20 sm:py-24 px-4 bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        {/* ── 섹션 헤더 ── */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
            <span className="gradient-text">{t.sectionTitle}</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t.sectionSubtitle}
          </p>
        </div>

        {/* ── 기능 카드 그리드 (2×2) ── */}
        <div className="grid md:grid-cols-2 gap-6">
          {featureList.map((feature, index) => (
            <Link
              key={index}
              href={feature.href}
              className="group bg-white rounded-2xl border border-gray-200 p-6
                         hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50
                         transition-all duration-300 card-hover block"
            >
              {/* 아이콘 */}
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient}
                            flex items-center justify-center text-2xl mb-4
                            group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>

              {/* 제목 */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>

              {/* 설명 */}
              <p className="text-gray-500 text-sm leading-relaxed mb-3">
                {feature.description}
              </p>

              {/* 상세 보기 링크 */}
              <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
                {t.learnMore}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
