/*
 * ============================================================
 * 파일: src/app/features/easy-setup/page.tsx
 * 설명: 간편 촬영 기능 상세 페이지
 * 경로: src/app/features/easy-setup/page.tsx
 * 최근 작업: 세션 10 - 신규 생성
 *   - FeatureDetailLayout 공통 레이아웃 사용
 *   - 4개 섹션: 필요 장비 / AI 자동 태깅 / 촬영 안정성 / 촬영 체크리스트
 *   - useLang() 한/영 전환 적용
 *   - lucide-react 아이콘 사용 (이모지 대체)
 *   - "실시간" 표현 금지 준수
 *   - "무료" 표현 금지 준수
 * 작성일: 2026-03-07
 * ============================================================
 */

"use client";

import FeatureDetailLayout from "@/components/features/FeatureDetailLayout";
import { useLang } from "@/providers/LanguageProvider";
import { Smartphone, ScanSearch, ShieldCheck, ClipboardCheck } from "lucide-react";

/* ── 한/영 텍스트 데이터 ── */
const pageData = {
  ko: {
    heroBadge: "간편 촬영",
    heroTitle: "스마트폰만 있으면\n프로급 촬영 완성",
    heroSubtitle:
      "별도 카메라, 마이크 없이 스마트폰 하나면 충분합니다.\n삼각대에 세우고 촬영 버튼만 누르세요.",
    sections: [
      {
        iconComponent: "Smartphone",
        iconBg: "bg-purple-500",
        title: "필요한 건 딱 2가지",
        description:
          "스마트폰 한 대와 1만원대 삼각대. 이게 전부입니다. 별도 카메라, 마이크, 조명 없이도 프로급 콘텐츠를 만들 수 있습니다.",
        points: [
          "스마트폰 1대 (iOS / Android 모두 지원)",
          "삼각대 1개 (1만원대 미니 삼각대 OK)",
          "별도 장비 구매 비용 0원",
        ],
      },
      {
        iconComponent: "ScanSearch",
        iconBg: "bg-blue-500",
        title: "AI가 알아서 태깅합니다",
        description:
          "촬영 앱 내 온보드 AI가 골, 파울, 주요 액션 장면을 자동으로 감지하고 태깅합니다. 직접 태깅하면 AI가 해당 시점 이전 구간까지 소급 분석해 정확한 장면을 찾아줍니다.",
        points: [
          "온보드 AI가 주요 장면 자동 감지 (기본)",
          "수동 태깅 시 AI가 이전 구간 소급 분석 (보조)",
          "촬영 중 별도 조작 없이 경기에만 집중 가능",
        ],
      },
      {
        iconComponent: "ShieldCheck",
        iconBg: "bg-emerald-500",
        title: "90분도 끄떡없는 안정성",
        description:
          "전후반 90분 연속 촬영을 위해 설계되었습니다. 발열 방지, 자동 분할 저장, 배터리 모니터링으로 촬영 중 멈춤이나 데이터 손실을 방지합니다.",
        points: [
          "5분 단위 자동 분할 저장 (중간 멈춤 방지)",
          "발열 감지 시 자동 최적화 모드 전환",
          "배터리 잔량 실시간 모니터링 및 경고",
        ],
      },
      {
        iconComponent: "ClipboardCheck",
        iconBg: "bg-amber-500",
        title: "촬영 전 체크리스트",
        description:
          "경기 시작 전, 앱이 자동으로 촬영 환경을 점검합니다. 배터리, 저장 공간, 네트워크 상태를 한눈에 확인하고 최적의 촬영 조건을 안내합니다.",
        points: [
          "배터리 80% 이상 권장 (알림 제공)",
          "저장 공간 5GB 이상 확보 확인",
          "촬영 위치·각도 가이드 제공",
        ],
      },
    ],
    ctaTitle: "촬영은 이렇게 간단합니다",
    ctaSubtitle: "스마트폰 하나로 시작하는 프로급 촬영을 체험해보세요",
    ctaButtonText: "체험하기",
  },
  en: {
    heroBadge: "Easy Setup",
    heroTitle: "Pro-Level Recording\nWith Just Your Phone",
    heroSubtitle:
      "No cameras, no mics — just your smartphone is enough.\nSet it on a tripod and hit record.",
    sections: [
      {
        iconComponent: "Smartphone",
        iconBg: "bg-purple-500",
        title: "You Only Need 2 Things",
        description:
          "One smartphone and a budget tripod. That's it. No extra cameras, mics, or lighting required to create professional-quality content.",
        points: [
          "One smartphone (iOS / Android supported)",
          "One tripod (budget mini tripod works fine)",
          "Zero additional equipment cost",
        ],
      },
      {
        iconComponent: "ScanSearch",
        iconBg: "bg-blue-500",
        title: "AI Auto-Tags for You",
        description:
          "The recording app's on-device AI detects and tags goals, fouls, and key action moments automatically. Tap manually and AI analyzes prior footage to find the exact highlight start point.",
        points: [
          "On-device AI auto-detects key moments (default)",
          "Manual tag triggers AI retroactive analysis (assist)",
          "Focus on the game — no need to operate anything",
        ],
      },
      {
        iconComponent: "ShieldCheck",
        iconBg: "bg-emerald-500",
        title: "90 Minutes, Rock Solid",
        description:
          "Designed for full 90-minute continuous recording. Overheat prevention, auto-split saving, and battery monitoring ensure zero crashes or data loss.",
        points: [
          "5-minute auto-split saves (prevents mid-crash loss)",
          "Auto-optimization mode on overheat detection",
          "Battery level monitoring with alerts",
        ],
      },
      {
        iconComponent: "ClipboardCheck",
        iconBg: "bg-amber-500",
        title: "Pre-Game Checklist",
        description:
          "Before kickoff, the app auto-checks your recording environment. Battery, storage, and network status at a glance with optimal setup guidance.",
        points: [
          "80%+ battery recommended (notification provided)",
          "5GB+ storage space verification",
          "Recording position & angle guide included",
        ],
      },
    ],
    ctaTitle: "Recording Made Simple",
    ctaSubtitle: "Experience pro-level recording with just your smartphone",
    ctaButtonText: "Try Experience",
  },
};

/* ── 아이콘 맵 ── */
const iconMap: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone className="w-7 h-7" />,
  ScanSearch: <ScanSearch className="w-7 h-7" />,
  ShieldCheck: <ShieldCheck className="w-7 h-7" />,
  ClipboardCheck: <ClipboardCheck className="w-7 h-7" />,
};

export default function EasySetupPage() {
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
      heroGradient="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      heroIcon={<Smartphone className="w-8 h-8" />}
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
