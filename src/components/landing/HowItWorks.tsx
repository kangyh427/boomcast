/*
 * ============================================================
 * 파일: src/components/landing/HowItWorks.tsx
 * 설명: BoomCast 이용 방법 섹션 - 4단계 (사후 편집 플로우)
 * 경로: src/components/landing/HowItWorks.tsx
 * 최근 작업: 세션 6 - 전면 교체 + STEP 01 태깅 방식 확정
 *   - STEP 01: 온보드 AI 자동 태깅 (기본)
 *            + 수동 태깅 시 AI가 해당 시점 이전 구간 소급 분석
 *   - "실시간 중계" 표현 완전 삭제
 *   - useLang() 훅으로 i18n 전환 적용
 * 작성일: 2026-03-07
 * ============================================================
 */

"use client";

import { useLang } from "@/providers/LanguageProvider";

/* ── 한/영 섹션 텍스트 ── */
const text = {
  ko: {
    sectionTitle: "이용 방법",
    sectionSubtitle: "4단계로 완성되는 동네 예능 콘텐츠",
  },
  en: {
    sectionTitle: "How It Works",
    sectionSubtitle: "4 simple steps to your entertainment content",
  },
};

/* ── 스텝 데이터 (STEP 01 태깅 방식 확정 반영) ── */
const steps = {
  ko: [
    {
      step: "01",
      title: "촬영",
      description:
        "삼각대에 폰 세우고 촬영만 하세요. 앱 내 AI가 골·파울·액션 장면을 자동으로 태깅합니다. 직접 태깅하면 AI가 그 이전 구간까지 소급 분석해 정확한 장면을 찾아줍니다.",
      icon: "📱",
      detail: "온보드 AI 자동 태깅 + 수동 소급 태깅",
    },
    {
      step: "02",
      title: "업로드",
      description: "경기 후 와이파이에서 자동 업로드. 몇 분이면 끝.",
      icon: "📤",
      detail: "와이파이 자동 업로드",
    },
    {
      step: "03",
      title: "AI가 편집 중",
      description:
        "커피 한 잔 마시는 동안 AI가 예능 영상을 만듭니다. 약 10~15분.",
      icon: "☕",
      detail: "AI 자동 편집 10~15분",
    },
    {
      step: "04",
      title: "완성! 공유!",
      description:
        "예능 본편 + 숏폼 하이라이트 완성! 팀 단톡방에 바로 공유하세요.",
      icon: "🎬",
      detail: "본편 + 숏폼 + 원클릭 공유",
    },
  ],
  en: [
    {
      step: "01",
      title: "Record",
      description:
        "Set your phone on a tripod and just record. The in-app AI auto-tags goals, fouls, and key action moments. Tap manually and the AI analyzes prior footage to pinpoint the exact highlight.",
      icon: "📱",
      detail: "On-device AI auto-tag + manual retro-tag",
    },
    {
      step: "02",
      title: "Upload",
      description: "Auto-upload via WiFi after the game. Done in minutes.",
      icon: "📤",
      detail: "WiFi auto-upload",
    },
    {
      step: "03",
      title: "AI Editing",
      description:
        "Grab a coffee while AI creates your entertainment video. ~10-15 min.",
      icon: "☕",
      detail: "AI auto-editing in 10-15 min",
    },
    {
      step: "04",
      title: "Done! Share!",
      description:
        "Full show + highlight shorts ready! Share with your team chat instantly.",
      icon: "🎬",
      detail: "Full show + shorts + one-click share",
    },
  ],
};

/* ── 스텝별 색상 테마 ── */
const stepColors = [
  { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" },
  { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-100" },
  { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100" },
  { bg: "bg-green-50", text: "text-green-600", border: "border-green-100" },
];

export default function HowItWorks() {
  const { lang } = useLang();
  const t = text[lang];
  const stepList = steps[lang];

  return (
    <section id="how-it-works" className="py-20 sm:py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* ── 섹션 헤더 ── */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
            <span className="gradient-text">{t.sectionTitle}</span>
          </h2>
          <p className="text-gray-500 text-lg">{t.sectionSubtitle}</p>
        </div>

        <div className="relative">
          {/* ── 데스크탑 연결선 (lg 이상) ── */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 -translate-y-1/2" />

          {/* ── 스텝 카드 그리드 ── */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stepList.map((step, index) => {
              const color = stepColors[index];
              return (
                <div key={index} className="relative text-center group">
                  <div
                    className={`bg-white rounded-2xl border ${color.border} p-6 
                                hover:shadow-lg hover:shadow-gray-100 
                                transition-all duration-300 card-hover`}
                  >
                    {/* 아이콘 */}
                    <div className="text-4xl mb-4">{step.icon}</div>

                    {/* STEP 번호 */}
                    <div
                      className={`text-xs font-mono ${color.text} font-semibold mb-2 tracking-wider`}
                    >
                      STEP {step.step}
                    </div>

                    {/* 제목 */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>

                    {/* 설명 */}
                    <p className="text-gray-500 text-sm mb-3 leading-relaxed">
                      {step.description}
                    </p>

                    {/* 디테일 태그 */}
                    <div
                      className={`inline-block text-xs ${color.text} ${color.bg} px-3 py-1 rounded-full font-medium`}
                    >
                      {step.detail}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
