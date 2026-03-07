/*
 * ============================================================
 * 파일: src/app/features/highlights/page.tsx
 * 설명: 하이라이트 영상 상세 페이지
 * 경로: src/app/features/highlights/page.tsx
 * 최근 작업: 세션 9 - 신규 생성
 *   - FeatureDetailLayout 공통 레이아웃 사용
 *   - AI 자동 편집 과정 4단계 설명
 *   - 결과물 종류 (본편 + 숏폼) 안내
 *   - SNS 공유 설명
 *   - useLang() 적용 (한/영)
 *   - ⚠️ "실시간" 표현 절대 금지
 * 작성일: 2026-03-07
 * ============================================================
 */

"use client";

import FeatureDetailLayout from "@/components/features/FeatureDetailLayout";
import { useLang } from "@/providers/LanguageProvider";
import { Film, Scissors, Captions, Share2 } from "lucide-react";

/* ── 한/영 텍스트 데이터 ── */
const pageData = {
  ko: {
    heroBadge: "하이라이트",
    heroTitle: "경기가 끝나면,\nAI가 숏폼을 만들어줍니다",
    heroSubtitle:
      "골, 세이브, 세리머니 등 핵심 장면을 AI가 자동으로 추출하고\n자막과 음성을 입혀 완성합니다.",
    sections: [
      {
        iconComponent: "Film",
        iconBg: "bg-green-500",
        title: "이벤트 자동 감지",
        description:
          "촬영 중 스마트폰의 온보드 AI가 골, 파울, 슈팅 등 주요 장면을 자동으로 태깅합니다. 경기 후 서버에서 태깅 데이터를 기반으로 편집이 시작됩니다.",
        points: [
          "온보드 AI가 촬영 중 주요 장면 자동 감지",
          "수동 태깅도 가능 (AI가 소급 분석하여 정확한 시점 보정)",
          "경기 후 서버 업로드 시 자동 처리 시작",
        ],
      },
      {
        iconComponent: "Scissors",
        iconBg: "bg-violet-500",
        title: "AI 자동 클립 편집",
        description:
          "태깅된 이벤트를 기반으로 AI가 최적의 구간을 추출합니다. 각 클립의 시작/끝 타이밍을 자동으로 조정하여 자연스러운 영상을 완성합니다.",
        points: [
          "이벤트 전후 문맥을 고려한 구간 추출",
          "시작/끝 타이밍 자동 최적화",
          "핵심 장면 놓침 방지를 위한 다중 검증",
        ],
      },
      {
        iconComponent: "Captions",
        iconBg: "bg-blue-500",
        title: "자막 + 음성 합성",
        description:
          "AI가 생성한 예능 대본이 자막으로 오버레이되고, 3명의 AI 캐스터 음성이 합성됩니다. 예능 본편(20~30분)과 숏폼(1분 × 3~5개)이 동시에 제작됩니다.",
        points: [
          "예능 본편: 전체 경기 하이라이트 (20~30분)",
          "숏폼: 핵심 장면별 1분 클립 (3~5개)",
          "자막 + 음성 + BGM 자동 합성",
        ],
      },
      {
        iconComponent: "Share2",
        iconBg: "bg-pink-500",
        title: "SNS 즉시 공유",
        description:
          "완성된 숏폼은 인스타그램 릴스, 틱톡, 유튜브 쇼츠 규격에 맞춰 자동 변환됩니다. 팀 전용 페이지에서 한 번의 탭으로 공유할 수 있습니다.",
        points: [
          "인스타그램 릴스 / 틱톡 / 유튜브 쇼츠 규격 자동 대응",
          "카카오톡, 링크 복사 공유 지원",
          "팀 전용 페이지에서 모아보기",
        ],
      },
    ],
    ctaTitle: "결과물을 직접 확인하세요",
    ctaSubtitle: "AI가 편집한 예능 스타일 하이라이트를 체험해볼 수 있습니다",
    ctaButtonText: "체험하기",
  },
  en: {
    heroBadge: "Highlights",
    heroTitle: "After the Game,\nAI Creates Your Shorts",
    heroSubtitle:
      "AI automatically extracts key moments — goals, saves, celebrations —\nand adds captions and voice to create polished content.",
    sections: [
      {
        iconComponent: "Film",
        iconBg: "bg-green-500",
        title: "Auto Event Detection",
        description:
          "During recording, the smartphone's on-device AI auto-tags key moments like goals, fouls, and shots. After the game, server-side editing begins based on tagged data.",
        points: [
          "On-device AI detects key moments during recording",
          "Manual tagging also available (AI retroactively adjusts timing)",
          "Auto-processing starts upon server upload",
        ],
      },
      {
        iconComponent: "Scissors",
        iconBg: "bg-violet-500",
        title: "AI Auto Clip Editing",
        description:
          "AI extracts optimal segments from tagged events. Start and end timing is auto-adjusted for each clip, producing natural, watchable videos.",
        points: [
          "Context-aware segment extraction",
          "Auto-optimized start/end timing",
          "Multi-verification to prevent missing key moments",
        ],
      },
      {
        iconComponent: "Captions",
        iconBg: "bg-blue-500",
        title: "Captions + Voice Synthesis",
        description:
          "AI-generated entertainment scripts become overlay captions, with 3 AI caster voices synthesized. Full show (20-30 min) and shorts (1 min × 3-5) are produced simultaneously.",
        points: [
          "Full show: complete highlight video (20-30 min)",
          "Shorts: key moment clips (1 min × 3-5)",
          "Auto-synthesis of captions + voice + BGM",
        ],
      },
      {
        iconComponent: "Share2",
        iconBg: "bg-pink-500",
        title: "Instant SNS Sharing",
        description:
          "Finished shorts auto-convert to Instagram Reels, TikTok, and YouTube Shorts formats. Share with one tap from your team page.",
        points: [
          "Auto-format for Instagram Reels / TikTok / YouTube Shorts",
          "KakaoTalk and link sharing supported",
          "View all from your team page",
        ],
      },
    ],
    ctaTitle: "See the Results Yourself",
    ctaSubtitle: "Experience AI-edited entertainment-style highlights",
    ctaButtonText: "Try Experience",
  },
};

/* ── 아이콘 맵 ── */
const iconMap: Record<string, React.ReactNode> = {
  Film: <Film className="w-7 h-7" />,
  Scissors: <Scissors className="w-7 h-7" />,
  Captions: <Captions className="w-7 h-7" />,
  Share2: <Share2 className="w-7 h-7" />,
};

export default function HighlightsPage() {
  const { lang } = useLang();
  const d = pageData[lang];

  const sections = d.sections.map((s) => ({
    icon: iconMap[s.iconComponent],
    iconBg: s.iconBg,
    title: s.title,
    description: s.description,
    points: s.points,
  }));

  return (
    <FeatureDetailLayout
      heroGradient="bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900"
      heroIcon={<Film className="w-8 h-8" />}
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
