/*
 * ============================================================
 * 파일: src/components/landing/ResultPreview.tsx
 * 설명: AI 결과물 미리보기 섹션 — 사이트 첫 번째 CTA 위치
 * 경로: src/components/landing/ResultPreview.tsx
 * 최근 작업: 세션 10 - 디자인 리뉴얼 (마스터플랜 PART 8-2)
 *   - 배경: cream (#FFFBF5) → Hero 다크와 대비
 *   - 이모지 → lucide-react 아이콘 + 컬러 배경으로 교체
 *   - 폰 프레임 반사광(glare) 효과 추가
 *   - useInView 스크롤 등장 애니메이션 적용
 *   - 캐스터 이름에서 이모지 제거 → lucide 아이콘
 *   - hover 효과 강화 (translateY -4px + shadow-xl)
 *   - "실시간" 금지, "무료" 금지 준수
 * 이전: 세션 7-B - 무료 문구 삭제
 * 작성일: 2026-03-07
 * ============================================================
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import { useLang } from "@/providers/LanguageProvider";
import { Film, Smartphone, LinkIcon, Mic, BookOpen, Laugh } from "lucide-react";

/* ── 결과물 아이콘 맵 ── */
const resultIconMap: Record<string, { icon: React.ReactNode; bg: string }> = {
  film: {
    icon: <Film className="w-5 h-5 text-blue-600" />,
    bg: "bg-blue-100",
  },
  smartphone: {
    icon: <Smartphone className="w-5 h-5 text-purple-600" />,
    bg: "bg-purple-100",
  },
  link: {
    icon: <LinkIcon className="w-5 h-5 text-emerald-600" />,
    bg: "bg-emerald-100",
  },
};

/* ── 한/영 섹션 텍스트 ── */
const text = {
  ko: {
    sectionTitle: "AI가 만든 예능 영상,\n미리 보세요",
    sectionSubtitle: "촬영만 하면, 이런 영상이 자동으로 완성됩니다",
    ctaPrimary: "체험하기",
    tabPlayByPlay: "실황",
    tabAnalyst: "해설",
    tabEntertainment: "예능",
    resultItems: [
      { iconKey: "film", title: "예능 본편 영상", desc: "20~30분, AI 캐스터 3명의 풀 해설" },
      { iconKey: "smartphone", title: "하이라이트 숏폼", desc: "1분 × 3~5개, 인스타·틱톡용" },
      { iconKey: "link", title: "원클릭 공유", desc: "팀 단톡방에 링크 하나로 공유" },
    ],
    priceNote: "이 모든 것이 경기당 9,900원",
  },
  en: {
    sectionTitle: "Preview AI-Created\nEntertainment",
    sectionSubtitle: "Just record the game — videos like these are created automatically",
    ctaPrimary: "Try It",
    tabPlayByPlay: "Play-by-Play",
    tabAnalyst: "Analyst",
    tabEntertainment: "Entertainment",
    resultItems: [
      { iconKey: "film", title: "Full Show Video", desc: "20-30 min with 3 AI caster commentary" },
      { iconKey: "smartphone", title: "Highlight Shorts", desc: "1 min × 3-5 clips for Instagram/TikTok" },
      { iconKey: "link", title: "One-Click Share", desc: "Share via a single link to team chat" },
    ],
    priceNote: "All this for just $7.99 per game",
  },
};

/* ── 캐스터별 대사 (lucide 아이콘 사용) ── */
interface CasterData {
  icon: React.ReactNode;
  name: string;
  color: string;
  lines: string[];
}

const casterPreview: Record<string, Record<string, CasterData>> = {
  ko: {
    playByPlay: {
      icon: <Mic className="w-4 h-4 text-white" />,
      name: "김현우 (실황)",
      color: "#2563EB",
      lines: [
        "35분, 이정민이 공을 받습니다!",
        "왼발 슛—— 들어갑니다!!",
        "골~~~~~~!!!! 이정민!!!!",
        "고운동 FC 1-0 리드입니다!",
      ],
    },
    analyst: {
      icon: <BookOpen className="w-4 h-4 text-white" />,
      name: "박지훈 (해설)",
      color: "#059669",
      lines: [
        "수비 라인 사이 공간을 정확히 찔렀습니다",
        "왼발 인사이드로 감아 차는 기술이 돋보이네요",
        "골키퍼가 반응할 시간조차 없었습니다",
        "이정민 선수, 오늘 움직임이 예사롭지 않습니다",
      ],
    },
    entertainment: {
      icon: <Laugh className="w-4 h-4 text-white" />,
      name: "이수빈 (예능)",
      color: "#D97706",
      lines: [
        "잠깐잠깐잠깐 뭐야 이거?!",
        "이게 동네 축구 맞습니까?! ㅋㅋㅋ",
        "손흥민이 빙의한 거 아닙니까?!",
        "상대팀 표정 좀 보세요 하하하",
      ],
    },
  },
  en: {
    playByPlay: {
      icon: <Mic className="w-4 h-4 text-white" />,
      name: "Alex (Play-by-Play)",
      color: "#2563EB",
      lines: [
        "35th minute, Lee gets the ball!",
        "Left foot shot—— IT'S IN!!",
        "GOOOAL!!!! What a strike!!!!",
        "Team Alpha takes the 1-0 lead!",
      ],
    },
    analyst: {
      icon: <BookOpen className="w-4 h-4 text-white" />,
      name: "James (Analyst)",
      color: "#059669",
      lines: [
        "He found the gap between the defenders perfectly",
        "Brilliant technique with the inside of his left foot",
        "The keeper had zero time to react",
        "Lee has been exceptional today",
      ],
    },
    entertainment: {
      icon: <Laugh className="w-4 h-4 text-white" />,
      name: "Mia (Entertainment)",
      color: "#D97706",
      lines: [
        "Wait wait wait, WHAT?!",
        "Is this really a local game?! LOL",
        "Did Messi possess this guy?!",
        "Look at the other team's faces hahaha",
      ],
    },
  },
};

type TabKey = "playByPlay" | "analyst" | "entertainment";

export default function ResultPreview() {
  const [activeTab, setActiveTab] = useState<TabKey>("entertainment");
  const { lang } = useLang();
  const sectionRef = useInView();

  const t = text[lang];
  const preview = casterPreview[lang];

  const tabs: { key: TabKey; label: string }[] = [
    { key: "playByPlay", label: t.tabPlayByPlay },
    { key: "analyst", label: t.tabAnalyst },
    { key: "entertainment", label: t.tabEntertainment },
  ];

  const activeCaster = preview[activeTab];

  return (
    <section
      id="result-preview"
      className="py-20 sm:py-28 px-4 bg-cream"
    >
      <div ref={sectionRef} className="max-w-6xl mx-auto">
        {/* ── 섹션 헤더 ── */}
        <div className="text-center mb-16">
          <h2 className="reveal text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 whitespace-pre-line leading-tight">
            {t.sectionTitle}
          </h2>
          <p className="reveal stagger-1 text-gray-500 text-lg mt-4">
            {t.sectionSubtitle}
          </p>
        </div>

        {/* ── 2컬럼 (모바일: 세로 스택) ── */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* ── 좌측: 폰 프레임 (3/5) ── */}
          <div className="reveal-left lg:col-span-3 flex justify-center">
            <div className="w-full max-w-[380px]">
              {/* 폰 프레임 + 반사광 */}
              <div className="relative bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl shadow-gray-900/20">
                {/* 노치 */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-2xl z-20" />

                {/* 반사광 (glare) 효과 — PART 8-2 */}
                <div
                  className="absolute inset-0 rounded-[2.5rem] z-10 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.04) 100%)",
                  }}
                />

                <div className="relative bg-white rounded-[2rem] overflow-hidden">
                  {/* 스코어보드 */}
                  <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 px-5 py-4 pt-10">
                    <div className="flex items-center justify-between text-white/80 text-xs mb-1">
                      <span>{lang === "ko" ? "고운동 FC" : "Team Alpha"}</span>
                      <span>{lang === "ko" ? "아름동 FC" : "Team Beta"}</span>
                    </div>
                    <div className="flex items-center justify-center gap-8">
                      <span className="text-white text-3xl font-black">1</span>
                      <span className="text-blue-200 text-lg font-light">-</span>
                      <span className="text-white text-3xl font-black">0</span>
                    </div>
                    <p className="text-center text-blue-200 text-xs mt-1">35&apos;</p>
                  </div>

                  {/* 탭 전환 */}
                  <div className="flex border-b border-gray-100">
                    {tabs.map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex-1 py-3 text-xs font-semibold transition-all duration-200 ${
                          activeTab === tab.key
                            ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* 대사 */}
                  <div className="p-5 min-h-[220px]">
                    {/* 캐스터 이름 (lucide 아이콘 + 텍스트) */}
                    <div className="flex items-center gap-2 mb-4">
                      <div
                        className="w-6 h-6 rounded-md flex items-center justify-center"
                        style={{ backgroundColor: activeCaster.color }}
                      >
                        {activeCaster.icon}
                      </div>
                      <span
                        className="text-xs font-bold"
                        style={{ color: activeCaster.color }}
                      >
                        {activeCaster.name}
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {activeCaster.lines.map((line, i) => (
                        <div
                          key={`${activeTab}-${i}`}
                          className="bg-gray-50 rounded-xl px-4 py-2.5 text-sm text-gray-700 leading-relaxed animate-fade-in-up"
                          style={{ animationDelay: `${i * 0.08}s` }}
                        >
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 하단 */}
                  <div className="px-5 pb-8 pt-1">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center py-3 rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/20">
                      {lang === "ko" ? "전체 영상 보기" : "Watch Full Video"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 우측: 결과물 구성 + CTA (2/5) ── */}
          <div className="reveal-right lg:col-span-2">
            {/* 결과물 카드 (lucide 아이콘 + 컬러 배경) */}
            <div className="space-y-4 mb-8">
              {t.resultItems.map((item, i) => {
                const iconData = resultIconMap[item.iconKey];
                return (
                  <div
                    key={i}
                    className="flex items-start gap-4 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm card-hover transition-all duration-300"
                  >
                    <div
                      className={`w-11 h-11 rounded-xl ${iconData.bg} flex items-center justify-center shrink-0`}
                    >
                      {iconData.icon}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{item.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 가격 + CTA (사이트 전체 첫 번째 CTA) */}
            <p className="text-sm text-gray-500 mb-5 font-medium">{t.priceNote}</p>
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/demo">{t.ctaPrimary}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
