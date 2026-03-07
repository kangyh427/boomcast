/*
 * ============================================================
 * 파일: src/app/features/ai-casters/page.tsx
 * 설명: AI 캐스터 소개 상세 페이지
 * 경로: src/app/features/ai-casters/page.tsx
 * 최근 작업: 세션 9 - 신규 생성
 *   - FeatureDetailLayout 공통 레이아웃 사용
 *   - 3명의 캐스터 소개 (실황/해설/예능)
 *   - AI 대본 미리보기 섹션
 *   - useLang() 적용 (한/영)
 *   - lucide-react 아이콘 사용 (이모지 대체)
 * 작성일: 2026-03-07
 * ============================================================
 */

"use client";

import FeatureDetailLayout from "@/components/features/FeatureDetailLayout";
import { useLang } from "@/providers/LanguageProvider";
import { Mic, BookOpen, Laugh, Sparkles } from "lucide-react";

/* ── 한/영 텍스트 데이터 ── */
const pageData = {
  ko: {
    heroBadge: "AI 캐스터",
    heroTitle: "3명의 AI 캐스터가\n당신의 경기를 중계합니다",
    heroSubtitle:
      "실황 캐스터가 현장감을 전하고, 해설위원이 전술을 분석하고,\n예능 캐스터가 웃음을 터뜨립니다.",
    sections: [
      {
        iconComponent: "Mic",
        iconBg: "bg-blue-500",
        title: "실황 캐스터 · 김현우",
        description:
          "경기의 흐름을 놓치지 않는 실황 중계. 골 장면에서는 흥분 가득한 절규, 위기 상황에서는 긴장감 넘치는 톤으로 현장감을 전달합니다.",
        points: [
          "골, 슈팅, 파울 등 주요 장면 즉각 반응",
          "에너지 넘치는 높은 톤의 중계",
          "경기 흐름에 따라 감정선 자동 조절",
        ],
      },
      {
        iconComponent: "BookOpen",
        iconBg: "bg-emerald-500",
        title: "해설위원 · 박지훈",
        description:
          "차분하고 분석적인 전술 해설. 선수의 포지셔닝, 팀 전략, 경기 흐름의 변화를 읽고 시청자에게 깊이 있는 이해를 제공합니다.",
        points: [
          "전술 분석과 상황 설명",
          "차분한 톤의 배경 지식 제공",
          "가끔 인생 조언형 드립으로 웃음 유발",
        ],
      },
      {
        iconComponent: "Laugh",
        iconBg: "bg-amber-500",
        title: "예능 캐스터 · 이수빈",
        description:
          "바이럴 콘텐츠의 핵심. 과장된 리액션, 유행어, 사투리를 섞어 경기를 예능으로 만듭니다. 헛발질에도 웃음 포인트를 만들어냅니다.",
        points: [
          "밝고 유쾌한 과장 리액션",
          "사투리, 유행어, ㅋㅋ 포함",
          "헛발질 → '이건 공이 잘못한 겁니다'",
        ],
      },
      {
        iconComponent: "Sparkles",
        iconBg: "bg-purple-500",
        title: "AI 대본의 비밀",
        description:
          "한국 예능 자막 데이터로 학습한 AI가, 경기 상황에 맞는 대사를 생성합니다. '골때녀', '뭉쳐야 찬다' 스타일의 유머 패턴을 활용합니다.",
        points: [
          "경기 상황별 맞춤 대사 자동 생성",
          "3명의 캐스터가 자연스럽게 대화",
          "사용자 피드백으로 지속 품질 개선",
        ],
      },
    ],
    ctaTitle: "직접 들어보세요",
    ctaSubtitle: "AI 캐스터 3명의 예능 해설을 체험해볼 수 있습니다",
    ctaButtonText: "체험하기",
  },
  en: {
    heroBadge: "AI Casters",
    heroTitle: "3 AI Casters\nCommentate Your Game",
    heroSubtitle:
      "A play-by-play caster brings the action, an analyst breaks down tactics,\nand an entertainer adds the laughs.",
    sections: [
      {
        iconComponent: "Mic",
        iconBg: "bg-blue-500",
        title: "Play-by-Play · Alex Kim",
        description:
          "Never misses a beat. From screaming goal calls to tense penalty moments, the play-by-play caster delivers raw excitement and energy.",
        points: [
          "Instant reactions to goals, shots, fouls",
          "High-energy, passionate commentary style",
          "Emotion auto-adjusts to match flow",
        ],
      },
      {
        iconComponent: "BookOpen",
        iconBg: "bg-emerald-500",
        title: "Analyst · James Park",
        description:
          "Calm and analytical tactical commentary. Reads player positioning, team strategy, and shifts in momentum to give viewers deeper understanding.",
        points: [
          "Tactical analysis and situation breakdowns",
          "Composed tone with expert insights",
          "Occasional life-advice humor for laughs",
        ],
      },
      {
        iconComponent: "Laugh",
        iconBg: "bg-amber-500",
        title: "Entertainer · Mia Lee",
        description:
          "The viral content engine. Over-the-top reactions, catchphrases, and wit turn every game into entertainment. Even a missed shot becomes comedy.",
        points: [
          "Bright, over-the-top reactions",
          "Catchphrases, humor, and LOLs",
          "Missed shot → 'That one's the ball's fault!'",
        ],
      },
      {
        iconComponent: "Sparkles",
        iconBg: "bg-purple-500",
        title: "The AI Script Secret",
        description:
          "AI trained on Korean entertainment subtitle data generates match-specific dialogue. Uses humor patterns inspired by top sports variety shows.",
        points: [
          "Auto-generated scripts per game situation",
          "Natural 3-caster conversation flow",
          "Continuous quality improvement via feedback",
        ],
      },
    ],
    ctaTitle: "Hear It Yourself",
    ctaSubtitle: "Experience the AI casters' entertainment commentary",
    ctaButtonText: "Try Experience",
  },
};

/* ── 아이콘 맵 ── */
const iconMap: Record<string, React.ReactNode> = {
  Mic: <Mic className="w-7 h-7" />,
  BookOpen: <BookOpen className="w-7 h-7" />,
  Laugh: <Laugh className="w-7 h-7" />,
  Sparkles: <Sparkles className="w-7 h-7" />,
};

export default function AICastersPage() {
  const { lang } = useLang();
  const d = pageData[lang];

  /* sections 데이터에 아이콘 컴포넌트 매핑 */
  const sections = d.sections.map((s) => ({
    icon: iconMap[s.iconComponent],
    iconBg: s.iconBg,
    title: s.title,
    description: s.description,
    points: s.points,
  }));

  return (
    <FeatureDetailLayout
      heroGradient="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
      heroIcon={<Mic className="w-8 h-8" />}
      heroBadge={d.heroBadge}
      heroTitle={d.heroTitle}
      heroSubtitle={d.heroSubtitle}
      sections={sections}
      ctaTitle={d.ctaTitle}
      ctaSubtitle={d.ctaSubtitle}
      ctaButtonText={d.ctaButtonText}
    />
  );
}
