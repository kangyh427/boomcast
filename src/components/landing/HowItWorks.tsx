/*
 * ============================================================
 * 파일: src/components/landing/HowItWorks.tsx
 * 설명: BoomCast 이용 방법 - Vrew 스타일 타임라인
 * 경로: src/components/landing/HowItWorks.tsx
 * 최근 작업: 세션 6 - 재디자인
 *   - 타임라인 연결선 + 좌우 교차 레이아웃 (데스크탑)
 *   - 모바일: 세로 카드 스택
 *   - STEP 01: 온보드 AI 자동 태깅 (기본) + 수동 소급 태깅 (보조)
 * 작성일: 2026-03-07
 * ============================================================
 */

"use client";

import { useLang } from "@/providers/LanguageProvider";

/* ── 한/영 섹션 텍스트 ── */
const text = {
  ko: {
    sectionTitle: "이렇게 사용하세요",
    sectionSubtitle: "촬영부터 영상 완성까지, 단 4단계",
  },
  en: {
    sectionTitle: "How It Works",
    sectionSubtitle: "From recording to finished video in just 4 steps",
  },
};

/* ── 스텝 데이터 ── */
const steps = {
  ko: [
    {
      step: "01",
      title: "촬영",
      description: "삼각대에 폰 세우고 촬영만 하세요.",
      subDescription: "앱 내 AI가 골·파울·액션 장면을 자동 태깅합니다. 직접 태깅하면 AI가 이전 구간까지 소급 분석해 정확한 장면을 찾아줍니다.",
      icon: "📱",
      color: "#2563EB",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      step: "02",
      title: "업로드",
      description: "경기 끝나면 와이파이에서 자동 업로드.",
      subDescription: "몇 분이면 끝납니다. 별도 작업 없이 앱이 알아서 처리합니다.",
      icon: "📤",
      color: "#7C3AED",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      step: "03",
      title: "AI가 편집 중",
      description: "커피 한 잔 마시는 동안 AI가 영상을 만듭니다.",
      subDescription: "약 10~15분이면 예능 본편 영상과 하이라이트 숏폼이 자동으로 완성됩니다.",
      icon: "☕",
      color: "#D97706",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
    },
    {
      step: "04",
      title: "완성! 공유!",
      description: "예능 본편 + 숏폼 하이라이트 완성!",
      subDescription: "팀 단톡방에 링크 하나로 공유하세요. 팀원들이 난리 납니다.",
      icon: "🎬",
      color: "#059669",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
  ],
  en: [
    {
      step: "01",
      title: "Record",
      description: "Set your phone on a tripod and just record.",
      subDescription: "In-app AI auto-tags goals, fouls, and key moments. Tap manually and AI analyzes prior footage to find the exact highlight.",
      icon: "📱",
      color: "#2563EB",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      step: "02",
      title: "Upload",
      description: "Auto-upload via WiFi after the game.",
      subDescription: "Done in minutes. The app handles everything automatically.",
      icon: "📤",
      color: "#7C3AED",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      step: "03",
      title: "AI Editing",
      description: "Grab a coffee while AI creates your video.",
      subDescription: "In about 10-15 minutes, a full entertainment show and highlight shorts are automatically produced.",
      icon: "☕",
      color: "#D97706",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
    },
    {
      step: "04",
      title: "Done! Share!",
      description: "Full show + highlight shorts ready!",
      subDescription: "Share with your team chat via a single link. Your teammates will love it.",
      icon: "🎬",
      color: "#059669",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
  ],
};

export default function HowItWorks() {
  const { lang } = useLang();
  const t = text[lang];
  const stepList = steps[lang];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* ── 섹션 헤더 ── */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            <span className="gradient-text">{t.sectionTitle}</span>
          </h2>
          <p className="text-gray-500 text-lg">{t.sectionSubtitle}</p>
        </div>

        {/* ── 타임라인 스텝 ── */}
        <div className="relative">
          {/* 세로 연결선 (데스크탑) */}
          <div className="hidden sm:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-200 via-purple-200 via-amber-200 to-green-200" />

          <div className="space-y-8 sm:space-y-12">
            {stepList.map((step, index) => (
              <div key={index} className="relative flex gap-6 sm:gap-8">
                {/* 스텝 넘버 원 */}
                <div className="relative z-10 shrink-0">
                  <div
                    className={`w-16 h-16 rounded-2xl ${step.bgColor} border-2 ${step.borderColor} flex items-center justify-center text-2xl shadow-sm`}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* 내용 */}
                <div className="pt-1 pb-2">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-xs font-mono font-bold tracking-widest"
                      style={{ color: step.color }}
                    >
                      STEP {step.step}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 font-medium mb-1">
                    {step.description}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {step.subDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
