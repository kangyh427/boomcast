/*
 * ============================================================
 * 파일: src/components/landing/Hero.tsx
 * 설명: BoomCast 랜딩 히어로 섹션 - 화이트 테마
 * 경로: src/components/landing/Hero.tsx
 * 최근 작업: 세션 4 - 화이트 리디자인 + 한/영 텍스트 하드코딩
 *           - 다크 테마 색상 완전 제거
 *           - 타이핑 효과 유지 (캐스터별 컬러)
 *           - 라이브 프리뷰 카드 화이트 스타일
 *           - 한/영 전환 대비 (lang 변수, 세션 6에서 i18n 훅 교체)
 * 작성일: 2025-03-06
 * ============================================================
 */

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/* ── 한/영 텍스트 ── */
const text = {
  ko: {
    badge: "동네 예능 스포츠 AI 캐스팅",
    titleBefore: "동네 축구가 ",
    titleHighlight: "예능 콘텐츠",
    titleAfter: "가 되다",
    subtitle1: "경기장에 스마트폰만 세워두세요.",
    subtitle2: "AI 캐스터 3명이 동네 축구를 프로 예능처럼 중계합니다.",
    liveLabel: "LIVE",
    matchInfo: "고운동 vs 아름동",
    ctaPrimary: "데모 체험하기",
    ctaSecondary: "자세히 보기",
  },
  en: {
    badge: "AI Entertainment Sports Casting",
    titleBefore: "Your Local Game, ",
    titleHighlight: "Pro Entertainment",
    titleAfter: " Level",
    subtitle1: "Just set up your smartphone at the field.",
    subtitle2: "3 AI casters turn your local soccer into pro-level entertainment.",
    liveLabel: "LIVE",
    matchInfo: "Team A vs Team B",
    ctaPrimary: "Try Demo",
    ctaSecondary: "Learn More",
  },
};

/* ── 캐스터 라이브 프리뷰 데이터 ── */
const castingLines = {
  ko: [
    { caster: "🎙️ 김현우", text: "골~~~~~~!!!! 이정민!!!!", color: "#2563EB" },
    { caster: "📊 박지훈", text: "동네 축구에서 이런 골이 나올 줄이야!", color: "#059669" },
    { caster: "🎭 이수빈", text: "이게 동네 축구 맞습니까?! ㅋㅋ", color: "#D97706" },
  ],
  en: [
    { caster: "🎙️ Alex", text: "GOOOAL!!!!! What a strike!!", color: "#2563EB" },
    { caster: "📊 James", text: "Unbelievable goal for a local match!", color: "#059669" },
    { caster: "🎭 Mia", text: "Is this really a local game?! LOL", color: "#D97706" },
  ],
};

export default function Hero() {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  /* TODO: 세션 6에서 i18n 훅으로 교체 */
  const lang: "ko" | "en" = "ko";
  const t = text[lang];
  const lines = castingLines[lang];

  /* ── 타이핑 효과 ── */
  useEffect(() => {
    const line = lines[currentLine];
    if (isTyping) {
      if (displayText.length < line.text.length) {
        const timer = setTimeout(() => {
          setDisplayText(line.text.slice(0, displayText.length + 1));
        }, 50);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timer);
      }
    } else {
      setDisplayText("");
      setCurrentLine((prev) => (prev + 1) % lines.length);
      setIsTyping(true);
    }
  }, [displayText, isTyping, currentLine, lines]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">

      {/* ── 배경 장식 (화이트 테마) ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 상단 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/60 via-transparent to-transparent" />
        {/* 블러 원형 장식 */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl" />
        {/* 그리드 패턴 */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #2563EB 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">

        {/* ── 뱃지 ── */}
        <div className="animate-fade-in-up">
          <Badge className="mb-8 py-1.5 px-4 text-sm bg-blue-50 text-blue-700 border-blue-200">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-2 inline-block" />
            {t.badge}
          </Badge>
        </div>

        {/* ── 메인 타이틀 ── */}
        <h1
          className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 text-gray-900 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          {t.titleBefore}
          <span className="gradient-text">{t.titleHighlight}</span>
          {t.titleAfter}
        </h1>

        {/* ── 서브 타이틀 ── */}
        <p
          className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          {t.subtitle1}
          <br />
          {t.subtitle2}
        </p>

        {/* ── 라이브 캐스팅 프리뷰 카드 ── */}
        <div
          className="max-w-2xl mx-auto mb-10 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg shadow-gray-200/50 p-5">
            {/* 카드 헤더: LIVE 표시 + 매치 정보 */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs text-red-500 font-semibold tracking-wide">
                {t.liveLabel}
              </span>
              <span className="text-xs text-gray-400 ml-1">{t.matchInfo}</span>
            </div>
            {/* 타이핑 영역 */}
            <div className="min-h-[56px] flex items-center">
              <div className="flex items-start gap-3 w-full">
                <span
                  className="text-sm font-semibold whitespace-nowrap"
                  style={{ color: lines[currentLine].color }}
                >
                  {lines[currentLine].caster}
                </span>
                <p className="text-left text-gray-700 text-sm sm:text-base leading-relaxed">
                  {displayText}
                  <span className="inline-block w-0.5 h-4 bg-blue-500/50 animate-pulse ml-0.5 align-middle" />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA 버튼 ── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <Button size="lg" asChild>
            <Link href="/demo">{t.ctaPrimary}</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#features">{t.ctaSecondary}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
