/*
 * ============================================================
 * 파일: src/components/landing/HowItWorks.tsx
 * 설명: BoomCast 이용 방법 — Vrew 스타일 타임라인
 * 경로: src/components/landing/HowItWorks.tsx
 * 최근 작업: 세션 10 - 디자인 리뉴얼 (마스터플랜 PART 8-3)
 *   - 배경: slate (#F1F5F9) → 섹션간 변주
 *   - 이모지 → lucide-react 아이콘 + 컬러 배경으로 교체
 *   - useInViewMultiple 스태거 등장 애니메이션 적용
 *   - 그라데이션 연결선 강화
 *   - 호버 효과 강화 (translateY -4px + shadow-xl)
 *   - "실시간" 금지, "무료" 금지 준수
 *   - STEP 01 태깅: AI 자동(기본) + 수동 시 AI 소급 분석(보조)
 * 이전: 세션 6 - 흰 배경 타임라인
 * 작성일: 2026-03-07
 * ============================================================
 */

"use client";

import { useInViewMultiple } from "@/hooks/useInView";
import { useLang } from "@/providers/LanguageProvider";
import { Smartphone, Upload, Wand2, Share2 } from "lucide-react";

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

/* ── 아이콘 렌더러 ── */
const StepIcon = ({ step }: { step: string }) => {
  const cls = "w-6 h-6 text-white";
  switch (step) {
    case "01":
      return <Smartphone className={cls} />;
    case "02":
      return <Upload className={cls} />;
    case "03":
      return <Wand2 className={cls} />;
    case "04":
      return <Share2 className={cls} />;
    default:
      return null;
  }
};

/* ── 스텝 데이터 ── */
interface StepData {
  step: string;
  title: string;
  description: string;
  subDescription: string;
  color: string;
  bgClass: string;
}

const steps: Record<string, StepData[]> = {
  ko: [
    {
      step: "01",
      title: "촬영",
      description: "삼각대에 폰 세우고 촬영만 하세요.",
      subDescription:
        "앱 내 AI가 골·파울·액션 장면을 자동 태깅합니다. 직접 태깅하면 AI가 이전 구간까지 소급 분석해 정확한 장면을 찾아줍니다.",
      color: "#2563EB",
      bgClass: "bg-blue-500",
    },
    {
      step: "02",
      title: "업로드",
      description: "경기 끝나면 와이파이에서 자동 업로드.",
      subDescription:
        "몇 분이면 끝납니다. 별도 작업 없이 앱이 알아서 처리합니다.",
      color: "#7C3AED",
      bgClass: "bg-purple-500",
    },
    {
      step: "03",
      title: "AI가 편집 중",
      description: "커피 한 잔 마시는 동안 AI가 영상을 만듭니다.",
      subDescription:
        "약 10~15분이면 예능 본편 영상과 하이라이트 숏폼이 자동으로 완성됩니다.",
      color: "#D97706",
      bgClass: "bg-amber-500",
    },
    {
      step: "04",
      title: "완성! 공유!",
      description: "예능 본편 + 숏폼 하이라이트 완성!",
      subDescription:
        "팀 단톡방에 링크 하나로 공유하세요. 팀원들이 난리 납니다.",
      color: "#059669",
      bgClass: "bg-emerald-500",
    },
  ],
  en: [
    {
      step: "01",
      title: "Record",
      description: "Set your phone on a tripod and just record.",
      subDescription:
        "In-app AI auto-tags goals, fouls, and key moments. Tap manually and AI analyzes prior footage to find the exact highlight.",
      color: "#2563EB",
      bgClass: "bg-blue-500",
    },
    {
      step: "02",
      title: "Upload",
      description: "Auto-upload via WiFi after the game.",
      subDescription:
        "Done in minutes. The app handles everything automatically.",
      color: "#7C3AED",
      bgClass: "bg-purple-500",
    },
    {
      step: "03",
      title: "AI Editing",
      description: "Grab a coffee while AI creates your video.",
      subDescription:
        "In about 10-15 minutes, a full entertainment show and highlight shorts are automatically produced.",
      color: "#D97706",
      bgClass: "bg-amber-500",
    },
    {
      step: "04",
      title: "Done! Share!",
      description: "Full show + highlight shorts ready!",
      subDescription:
        "Share with your team chat via a single link. Your teammates will love it.",
      color: "#059669",
      bgClass: "bg-emerald-500",
    },
  ],
};

export default function HowItWorks() {
  const { lang } = useLang();
  const t = text[lang];
  const stepList = steps[lang];
  const containerRef = useInViewMultiple();

  return (
    <section id="how-it-works" className="py-20 sm:py-28 px-4 bg-slate-bg">
      <div ref={containerRef} className="max-w-4xl mx-auto">
        {/* ── 섹션 헤더 ── */}
        <div className="text-center mb-16">
          <h2 className="reveal text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            {t.sectionTitle}
          </h2>
          <p className="reveal stagger-1 text-gray-500 text-lg">
            {t.sectionSubtitle}
          </p>
        </div>

        {/* ── 타임라인 스텝 ── */}
        <div className="relative">
          {/* 세로 연결선 (데스크탑) — 그라데이션 */}
          <div
            className="hidden sm:block absolute left-8 top-0 bottom-0 w-0.5"
            style={{
              background:
                "linear-gradient(to bottom, #2563EB, #7C3AED, #D97706, #059669)",
            }}
          />

          <div className="space-y-8 sm:space-y-12">
            {stepList.map((step, index) => (
              <div
                key={index}
                className={`reveal stagger-${index + 1} relative flex gap-6 sm:gap-8 group`}
              >
                {/* 스텝 아이콘 (lucide + 컬러 배경) */}
                <div className="relative z-10 shrink-0">
                  <div
                    className={`w-16 h-16 rounded-2xl ${step.bgClass} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:-translate-y-1`}
                  >
                    <StepIcon step={step.step} />
                  </div>
                </div>

                {/* 내용 카드 */}
                <div className="pt-1 pb-2 bg-white rounded-2xl px-6 py-5 border border-gray-100 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 flex-1">
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
