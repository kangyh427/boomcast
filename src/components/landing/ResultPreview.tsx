/*
 * ============================================================
 * 파일: src/components/landing/ResultPreview.tsx
 * 설명: AI가 만든 예능 영상 미리보기 섹션
 * 경로: src/components/landing/ResultPreview.tsx
 * 최근 작업: 세션 6 - 신규 생성 (인수인계서 [J-1])
 *   - Hero 바로 아래 위치
 *   - 모바일 폰 프레임 안에 캐스터 탭 전환 (실황/해설/예능)
 *   - 9,900원 CTA + 무료 체험 버튼
 *   - 데스크탑: 2컬럼 (좌 폰 프레임 + 우 설명)
 *   - 모바일: 세로 스택
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
    sectionTitle: "AI가 만든 예능 영상, 미리 보세요",
    sectionSubtitle: "촬영만 하면, 이런 영상이 자동으로 완성됩니다",
    priceNote: "경기당 9,900원에 이런 영상이 완성됩니다",
    ctaPrimary: "무료 체험하기",
    ctaSecondary: "요금 보기",
    tabPlayByPlay: "실황",
    tabAnalyst: "해설",
    tabEntertainment: "예능",
    resultTitle: "결과물 구성",
    resultMain: "예능 본편 영상",
    resultMainDesc: "20~30분, AI 캐스터 3명의 풀 해설",
    resultShort: "하이라이트 숏폼",
    resultShortDesc: "1분 × 3~5개, 인스타/틱톡용",
    resultShare: "원클릭 공유",
    resultShareDesc: "팀 단톡방에 링크 하나로 공유",
  },
  en: {
    sectionTitle: "Preview AI-Created Entertainment",
    sectionSubtitle: "Just record the game, and videos like these are created automatically",
    priceNote: "All this for just $7.99 per game",
    ctaPrimary: "Try Free",
    ctaSecondary: "See Pricing",
    tabPlayByPlay: "Play-by-Play",
    tabAnalyst: "Analyst",
    tabEntertainment: "Entertainment",
    resultTitle: "What You Get",
    resultMain: "Full Show Video",
    resultMainDesc: "20-30 min with 3 AI caster commentary",
    resultShort: "Highlight Shorts",
    resultShortDesc: "1 min × 3-5 clips for Instagram/TikTok",
    resultShare: "One-Click Share",
    resultShareDesc: "Share with your team chat via a single link",
  },
};

/* ── 캐스터별 대사 미리보기 (탭 전환용) ── */
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
  const [activeTab, setActiveTab] = useState<TabKey>("playByPlay");
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
    <section className="py-20 sm:py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">

        {/* ── 섹션 헤더 ── */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
            <span className="gradient-text">{t.sectionTitle}</span>
          </h2>
          <p className="text-gray-500 text-lg">{t.sectionSubtitle}</p>
        </div>

        {/* ── 2컬럼 레이아웃 (모바일: 세로 스택) ── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── 좌측: 폰 프레임 + 캐스터 탭 ── */}
          <div className="flex justify-center">
            <div className="w-full max-w-[320px]">
              {/* 폰 프레임 */}
              <div className="relative bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl">
                {/* 노치 */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-gray-900 rounded-b-2xl z-10" />

                {/* 스크린 영역 */}
                <div className="bg-white rounded-[2rem] overflow-hidden">
                  {/* 상단 바 */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3 pt-8">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs font-semibold">
                        {lang === "ko" ? "고운동 FC vs 아름동 FC" : "Team Alpha vs Team Beta"}
                      </span>
                      <span className="text-blue-200 text-xs">35&apos;</span>
                    </div>
                    <div className="flex items-center justify-center gap-6 mt-2">
                      <span className="text-white text-2xl font-bold">1</span>
                      <span className="text-blue-200 text-sm">-</span>
                      <span className="text-white text-2xl font-bold">0</span>
                    </div>
                  </div>

                  {/* 탭 전환 */}
                  <div className="flex border-b border-gray-100">
                    {tabs.map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
                          activeTab === tab.key
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* 대사 목록 */}
                  <div className="p-4 min-h-[200px]">
                    <p className="text-xs font-semibold text-gray-900 mb-3">
                      {activeCaster.name}
                    </p>
                    <div className="space-y-2.5">
                      {activeCaster.lines.map((line, i) => (
                        <div
                          key={i}
                          className="bg-gray-50 rounded-lg px-3 py-2 text-xs text-gray-700 leading-relaxed animate-fade-in"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        >
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 하단 버튼 */}
                  <div className="px-4 pb-6 pt-2">
                    <div className="bg-blue-600 text-white text-center py-2.5 rounded-xl text-xs font-semibold">
                      {lang === "ko" ? "전체 영상 보기" : "Watch Full Video"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 우측: 설명 텍스트 + 결과물 구성 + CTA ── */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              {t.resultTitle}
            </h3>

            {/* 결과물 카드 3개 */}
            <div className="space-y-4 mb-8">
              {/* 예능 본편 */}
              <div className="flex items-start gap-4 bg-white rounded-xl border border-gray-100 p-4 card-hover">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-xl shrink-0">
                  🎬
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.resultMain}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{t.resultMainDesc}</p>
                </div>
              </div>

              {/* 하이라이트 숏폼 */}
              <div className="flex items-start gap-4 bg-white rounded-xl border border-gray-100 p-4 card-hover">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-xl shrink-0">
                  📱
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.resultShort}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{t.resultShortDesc}</p>
                </div>
              </div>

              {/* 원클릭 공유 */}
              <div className="flex items-start gap-4 bg-white rounded-xl border border-gray-100 p-4 card-hover">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-xl shrink-0">
                  🔗
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.resultShare}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{t.resultShareDesc}</p>
                </div>
              </div>
            </div>

            {/* 가격 안내 + CTA */}
            <p className="text-sm text-gray-500 mb-4">{t.priceNote}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" asChild>
                <Link href="/demo">{t.ctaPrimary}</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#pricing">{t.ctaSecondary}</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
