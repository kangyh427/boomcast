/*
 * ============================================================
 * 파일: src/components/landing/Hero.tsx
 * 설명: BoomCast 히어로 섹션 - Vrew 스타일 임팩트 히어로
 * 경로: src/components/landing/Hero.tsx
 * 최근 작업: 세션 6 - 전면 재디자인
 *   - CTA 버튼 제거 (사이트 전체 CTA는 딱 2곳만)
 *   - 스크롤 유도 화살표로 자연스러운 흐름 유도
 *   - 타이핑 캐스터 프리뷰를 더 임팩트있게
 *   - Vrew 스타일: 큰 타이틀 + 서브 카피 + 비주얼
 * 작성일: 2026-03-07
 * ============================================================
 */

"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/providers/LanguageProvider";

/* ── 한/영 텍스트 ── */
const text = {
  ko: {
    badge: "AI 예능 스포츠 캐스팅",
    titleLine1: "동네 축구가",
    titleHighlight: "예능 콘텐츠",
    titleLine2: "가 되다",
    subtitle: "경기장에 스마트폰만 세워두세요.\nAI 캐스터 3명이 동네 축구를 예능 영상으로 만들어줍니다.",
    previewLabel: "AI 캐스팅 미리보기",
    matchInfo: "고운동 FC vs 아름동 FC",
    scrollHint: "아래로 스크롤",
  },
  en: {
    badge: "AI Entertainment Sports Casting",
    titleLine1: "Your Local Game,",
    titleHighlight: "Pro Entertainment",
    titleLine2: "Level",
    subtitle: "Just set up your smartphone at the field.\n3 AI casters turn your local soccer into entertainment videos.",
    previewLabel: "AI Casting Preview",
    matchInfo: "Team Alpha vs Team Beta",
    scrollHint: "Scroll down",
  },
};

/* ── 캐스터 프리뷰 데이터 ── */
const castingLines = {
  ko: [
    { caster: "🎙️ 김현우", role: "실황", text: "골~~~~~~!!!! 이정민 선수!!!!", color: "#2563EB" },
    { caster: "📊 박지훈", role: "해설", text: "수비 라인 사이를 정확히 찔렀습니다!", color: "#059669" },
    { caster: "🎭 이수빈", role: "예능", text: "이게 동네 축구 맞습니까?! ㅋㅋㅋ", color: "#D97706" },
  ],
  en: [
    { caster: "🎙️ Alex", role: "Play", text: "GOOOAL!!!!! What a strike!!", color: "#2563EB" },
    { caster: "📊 James", role: "Analyst", text: "He found the gap between defenders!", color: "#059669" },
    { caster: "🎭 Mia", role: "Fun", text: "Is this really a local game?! LOL", color: "#D97706" },
  ],
};

export default function Hero() {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const { lang } = useLang();

  const t = text[lang];
  const lines = castingLines[lang];

  /* ── 타이핑 효과 ── */
  useEffect(() => {
    const line = lines[currentLine];
    if (isTyping) {
      if (displayText.length < line.text.length) {
        const timer = setTimeout(() => {
          setDisplayText(line.text.slice(0, displayText.length + 1));
        }, 45);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setIsTyping(false), 2500);
        return () => clearTimeout(timer);
      }
    } else {
      setDisplayText("");
      setCurrentLine((prev) => (prev + 1) % lines.length);
      setIsTyping(true);
    }
  }, [displayText, isTyping, currentLine, lines]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white">
      {/* ── 배경 장식 ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-transparent to-transparent" />
        <div className="absolute top-20 left-[15%] w-72 h-72 bg-blue-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-[15%] w-64 h-64 bg-amber-100/25 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* ── 뱃지 ── */}
        <div className="animate-fade-in-up mb-8">
          <Badge className="py-1.5 px-5 text-sm bg-blue-50 text-blue-700 border-blue-200 font-medium">
            {t.badge}
          </Badge>
        </div>

        {/* ── 메인 타이틀 ── */}
        <h1
          className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 text-gray-900 tracking-tight leading-tight animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          {t.titleLine1}
          <br className="sm:hidden" />{" "}
          <span className="gradient-text">{t.titleHighlight}</span>
          {t.titleLine2}
        </h1>

        {/* ── 서브 타이틀 ── */}
        <p
          className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto mb-12 whitespace-pre-line leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          {t.subtitle}
        </p>

        {/* ── 캐스터 프리뷰 카드 ── */}
        <div
          className="max-w-lg mx-auto animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl shadow-gray-200/40 overflow-hidden">
            {/* 카드 헤더 */}
            <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-xs text-blue-600 font-semibold">{t.previewLabel}</span>
              <span className="text-xs text-gray-400 ml-auto">{t.matchInfo}</span>
            </div>
            {/* 캐스터 인디케이터 */}
            <div className="px-5 pt-4 pb-1 flex gap-3">
              {lines.map((line, i) => (
                <button
                  key={i}
                  className={`text-xs px-2.5 py-1 rounded-full transition-all duration-300 ${
                    i === currentLine
                      ? "font-semibold text-white"
                      : "text-gray-400 bg-gray-50"
                  }`}
                  style={i === currentLine ? { backgroundColor: line.color } : {}}
                  onClick={() => {
                    setCurrentLine(i);
                    setDisplayText("");
                    setIsTyping(true);
                  }}
                >
                  {line.role}
                </button>
              ))}
            </div>
            {/* 타이핑 영역 */}
            <div className="px-5 py-4 min-h-[64px] flex items-center">
              <div className="flex items-start gap-3 w-full">
                <span
                  className="text-sm font-bold whitespace-nowrap"
                  style={{ color: lines[currentLine].color }}
                >
                  {lines[currentLine].caster}
                </span>
                <p className="text-left text-gray-800 text-sm sm:text-base leading-relaxed">
                  {displayText}
                  <span className="inline-block w-0.5 h-4 bg-blue-500/60 animate-pulse ml-0.5 align-middle" />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── 스크롤 유도 ── */}
        <div
          className="mt-14 animate-fade-in"
          style={{ animationDelay: "0.8s" }}
        >
          <a
            href="#result-preview"
            className="inline-flex flex-col items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span className="text-xs mb-2">{t.scrollHint}</span>
            <svg
              className="w-5 h-5 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
