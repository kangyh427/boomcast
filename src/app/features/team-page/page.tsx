/*
 * ============================================================
 * 파일: src/app/features/team-page/page.tsx
 * 설명: 팀 전용 페이지 기능 상세 페이지
 * 경로: src/app/features/team-page/page.tsx
 * 최근 작업: 세션 10 - 신규 생성
 *   - FeatureDetailLayout 공통 레이아웃 사용
 *   - 4개 섹션: 팀 프로필 / 경기 아카이브 / 시즌 통계 / 팀원 초대
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
import { Users, Archive, BarChart3, UserPlus } from "lucide-react";

/* ── 한/영 텍스트 데이터 ── */
const pageData = {
  ko: {
    heroBadge: "팀 전용 페이지",
    heroTitle: "우리 팀만의 역사관을\n만들어보세요",
    heroSubtitle:
      "경기 영상, 하이라이트, 시즌 기록이 한곳에 모입니다.\n팀원들과 함께 보고, 추억하고, 공유하세요.",
    sections: [
      {
        iconComponent: "Users",
        iconBg: "bg-amber-500",
        title: "팀 프로필",
        description:
          "팀 이름, 로고, 유니폼 색상, 멤버 목록을 한곳에서 관리합니다. 우리 팀만의 정체성을 만들고, 새 멤버가 합류할 때도 한눈에 팀을 소개할 수 있습니다.",
        points: [
          "팀 이름, 로고, 대표 색상 커스터마이징",
          "멤버 프로필 관리 (포지션, 등번호)",
          "팀 소개 페이지 외부 공유 가능",
        ],
      },
      {
        iconComponent: "Archive",
        iconBg: "bg-blue-500",
        title: "경기 아카이브",
        description:
          "모든 경기 영상과 하이라이트가 자동으로 아카이브됩니다. 날짜, 상대팀, 결과별로 검색하고, 과거 명장면을 언제든 다시 볼 수 있습니다.",
        points: [
          "경기 영상 + 하이라이트 자동 저장",
          "날짜, 상대팀, 결과별 필터 검색",
          "과거 명장면 언제든 다시 보기",
        ],
      },
      {
        iconComponent: "BarChart3",
        iconBg: "bg-emerald-500",
        title: "시즌 통계",
        description:
          "승, 무, 패 기록부터 득점, 실점, 개인별 활약까지. 시즌 단위로 팀의 성장을 한눈에 확인하고, MVP를 선정할 수도 있습니다.",
        points: [
          "시즌별 승/무/패, 득점/실점 자동 집계",
          "개인별 골, 어시스트, 출전 횟수 기록",
          "시즌 MVP 투표 기능",
        ],
      },
      {
        iconComponent: "UserPlus",
        iconBg: "bg-purple-500",
        title: "팀원 초대",
        description:
          "초대 코드 하나면 새 멤버가 바로 합류할 수 있습니다. 카카오톡이나 문자로 코드를 공유하세요. 팀원이 많아질수록 팀 페이지가 더 풍성해집니다.",
        points: [
          "초대 코드 생성 → 카카오톡/문자 공유",
          "코드 입력만으로 간편 합류",
          "멤버 역할 설정 (관리자, 일반 멤버)",
        ],
      },
    ],
    ctaTitle: "우리 팀의 공간을 만들어보세요",
    ctaSubtitle: "경기 기록부터 시즌 통계까지, 팀의 역사가 쌓입니다",
    ctaButtonText: "체험하기",
  },
  en: {
    heroBadge: "Team Page",
    heroTitle: "Build Your Team's\nOwn Hall of Fame",
    heroSubtitle:
      "Game videos, highlights, and season records all in one place.\nWatch, remember, and share with your teammates.",
    sections: [
      {
        iconComponent: "Users",
        iconBg: "bg-amber-500",
        title: "Team Profile",
        description:
          "Manage your team name, logo, jersey colors, and member roster in one place. Build your team's identity and easily introduce the team when new members join.",
        points: [
          "Customize team name, logo, and primary color",
          "Member profiles with position and number",
          "Shareable team intro page",
        ],
      },
      {
        iconComponent: "Archive",
        iconBg: "bg-blue-500",
        title: "Game Archive",
        description:
          "All game videos and highlights are automatically archived. Search by date, opponent, or result, and revisit legendary moments anytime.",
        points: [
          "Auto-saved game videos + highlights",
          "Filter by date, opponent, and result",
          "Replay classic moments anytime",
        ],
      },
      {
        iconComponent: "BarChart3",
        iconBg: "bg-emerald-500",
        title: "Season Stats",
        description:
          "From win/draw/loss records to goals, assists, and individual performances. Track your team's growth season by season and even vote for MVP.",
        points: [
          "Auto-calculated season W/D/L and goals",
          "Individual goals, assists, and appearances",
          "Season MVP voting feature",
        ],
      },
      {
        iconComponent: "UserPlus",
        iconBg: "bg-purple-500",
        title: "Invite Teammates",
        description:
          "Share a simple invite code and new members can join instantly. Send via text or messaging apps. The more members, the richer your team page becomes.",
        points: [
          "Generate invite code → share via message",
          "Join with just an invite code",
          "Set member roles (admin, member)",
        ],
      },
    ],
    ctaTitle: "Create Your Team's Space",
    ctaSubtitle: "From game records to season stats, your team's history grows here",
    ctaButtonText: "Try Experience",
  },
};

/* ── 아이콘 맵 ── */
const iconMap: Record<string, React.ReactNode> = {
  Users: <Users className="w-7 h-7" />,
  Archive: <Archive className="w-7 h-7" />,
  BarChart3: <BarChart3 className="w-7 h-7" />,
  UserPlus: <UserPlus className="w-7 h-7" />,
};

export default function TeamPagePage() {
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
      heroGradient="bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900"
      heroIcon={<Users className="w-8 h-8" />}
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
