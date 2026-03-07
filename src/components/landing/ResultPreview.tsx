/*
 * ============================================================
 * 파일: src/components/landing/ResultPreview.tsx
 * 설명: AI 결과물 미리보기 섹션 - 사이트 첫 번째 CTA 위치
 * 경로: src/components/landing/ResultPreview.tsx
 * 최근 작업: 세션 6 - 재디자인
 *   - 사이트 전체에서 CTA는 여기 1개 + CTA섹션 1개 = 총 2개
 *   - Vrew 스타일: 좌 폰 프레임 + 우 설명
 *   - 캐스터 탭 전환 (실황/해설/예능)
 * 작성일: 2026-03-07
 * ============================================================
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLang } from "@/providers/LanguageProvider";

/* ── 한/영 섹션 텍스트 ── */
const text = {
  ko: {
    sectionTitle: "AI가 만든 예능 영상,\n미리 보세요",
    sectionSubtitle: "촬영만 하면, 이런 영상이 자동으로 완성됩니다",
    ctaPrimary: "무료 체험하기",
    tabPlayByPlay: "실황",
    tabAnalyst: "해설",
    tabEntertainment: "예능",
    resultItems: [
      { icon: "🎬", title: "예능 본편 영상", desc: "20~30분, AI 캐스터 3명의 풀 해설" },
      { icon: "📱", title: "하이라이트 숏폼", desc: "1분 × 3~5개, 인스타·틱톡용" },
      { icon: "🔗", title: "원클릭 공유", desc: "팀 단톡방에 링크 하나로 공유" },
    ],
    priceNote: "이 모든 것이 경기당 9,900원",
  },
  en: {
    sectionTitle: "Preview AI-Created\nEntertainment",
    sectionSubtitle: "Just record the game — videos like these are created automatically",
    ctaPrimary: "Try Free",
    tabPlayByPlay: "Play-by-Play",
    tabAnalyst: "Analyst",
    tabEntertainment: "Entertainment",
    resultItems: [
      { icon: "🎬", title: "Full Show Video", desc: "20-30 min with 3 AI caster commentary" },
      { icon: "📱", title: "Highlight Shorts", desc: "1 min × 3-5 clips for Instagram/TikTok" },
      { icon: "🔗", title: "One-Click Share", desc: "Share via a single link to team chat" },
    ],
    priceNote: "All this for just $7.99 per game",
  },
};

/* ── 캐스터별 대사 ── */
const casterPreview = {
  ko: {
    playByPlay: {
      name: "🎙️ 김현우 (실황)",
      lines: [
        "35분, 이정민이 공을 받습니다!",
        "왼발 슛—— 들어갑니다!!",
        "골~~~~~~!!!! 이정민!!!!",
        "고운동 FC 1-0 리드입니다!",
      ],
    },
    analyst: {
      name: "📊 박지훈 (해설)",
      lines: [
        "수비 라인 사이 공간을 정확히 찔렀습니다",
        "왼발 인사이드로 감아 차는 기술이 돋보이네요",
        "골키퍼가 반응할 시간조차 없었습니다",
        "이정민 선수, 오늘 움직임이 예사롭지 않습니다",
      ],
    },
    entertainment: {
      name: "🎭 이수빈 (예능)",
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
      name: "🎙️ Alex (Play-by-Play)",
      lines: [
        "35th minute, Lee gets the ball!",
        "Left foot shot—— IT'S IN!!",
        "GOOOAL!!!! What a strike!!!!",
        "Team Alpha takes the 1-0 lead!",
      ],
    },
    analyst: {
      name: "📊 James (Analyst)",
      lines: [
        "He found the gap between the defenders perfectly",
        "Brilliant technique with the inside of his left foot",
        "The keeper had zero time to react",
        "Lee has been exceptional today",
      ],
    },
    entertainment: {
      name: "🎭 Mia (Entertainment)",
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
  const t = text[lang];
  const preview = casterPreview[lang];

  const tabs: { key: TabKey; label: string }[] = [
    { key: "playByPlay", label: t.tabPlayByPlay },
    { key: "analyst", label: t.tabAnalyst },
    { key: "entertainment", label: t.tabEntertainment },
  ];

  const activeCaster = preview[activeTab];

  return (
    <section id="result-preview" className="py-20 sm:py-28 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* ── 섹션 헤더 ── */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 whitespace-pre-line leading-tight">
            <span className="gradient-text">{t.sectionTitle}</span>
          </h2>
          <p className="text-gray-500 text-lg mt-4">{t.sectionSubtitle}</p>
        </div>

        {/* ── 2컬럼 (모바일: 세로 스택) ── */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* ── 좌측: 폰 프레임 (3/5) ── */}
          <div className="lg:col-span-3 flex justify-center">
            <div className="w-full max-w-[380px]">
              <div className="relative bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl shadow-gray-900/20">
                {/* 노치 */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-2xl z-10" />

                <div className="bg-white rounded-[2rem] overflow-hidden">
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
                    <p className="text-xs font-bold text-gray-900 mb-4">{activeCaster.name}</p>
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
          <div className="lg:col-span-2">
            {/* 결과물 카드 */}
            <div className="space-y-4 mb-8">
              {t.resultItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center text-xl shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{item.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
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
