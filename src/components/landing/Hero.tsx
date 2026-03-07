/*
 * ============================================================
 * 파일: src/components/landing/Hero.tsx
 * 설명: BoomCast 히어로 섹션 — 다크 Hero (디자인 리뉴얼)
 * 경로: src/components/landing/Hero.tsx
 * 최근 작업: 세션 10 - 다크 Hero 전환 (마스터플랜 PART 8-1)
 *   - 배경: 다크 그라데이션 (#0F172A → #1E293B) + 글로우 오브
 *   - 이모지 캐스터 → lucide-react 아이콘 + 컬러 원형 배경
 *   - 캐스터 프리뷰 카드: glass-dark 스타일 + 글로우 효과
 *   - useInView 스크롤 등장 애니메이션 적용
 *   - 텍스트 컬러 white 계열로 전면 전환
 *   - "실시간" 표현 금지 준수
 *   - "무료" 표현 금지 준수
 *   - 이모지 UI 아이콘 금지 준수 (lucide-react 사용)
 *   - 그라데이션 텍스트는 Hero 제목에만 1회 사용
 * 이전: 세션 6 - 흰 배경 Vrew 스타일
 * 작성일: 2026-03-07
 * ============================================================
 */

"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { useLang } from "@/providers/LanguageProvider";
import { Mic, BookOpen, Laugh } from "lucide-react";

/* ── 한/영 텍스트 ── */
const text = {
  ko: {
    badge: "AI 예능 스포츠 캐스팅",
    titleLine1: "동네 축구가",
    titleHighlight: "예능 콘텐츠",
    titleLine2: "가 되다",
    subtitle:
      "경기장에 스마트폰만 세워두세요.\nAI 캐스터 3명이 동네 축구를 예능 영상으로 만들어줍니다.",
    previewLabel: "AI 캐스팅 미리보기",
    matchInfo: "고운동 FC vs 아름동 FC",
    scrollHint: "아래로 스크롤",
  },
  en: {
    badge: "AI Entertainment Sports Casting",
    titleLine1: "Your Local Game,",
    titleHighlight: "Pro Entertainment",
    titleLine2: "Level",
    subtitle:
      "Just set up your smartphone at the field.\n3 AI casters turn your local soccer into entertainment videos.",
    previewLabel: "AI Casting Preview",
    matchInfo: "Team Alpha vs Team Beta",
    scrollHint: "Scroll down",
  },
};

/* ── 캐스터 프리뷰 데이터 (lucide 아이콘 + 컬러) ── */
interface CasterLine {
  icon: "Mic" | "BookOpen" | "Laugh";
  name: string;
  role: string;
  text: string;
  color: string;
  bgClass: string;
}

const castingLines: Record<string, CasterLine[]> = {
  ko: [
    {
      icon: "Mic",
      name: "김현우",
      role: "실황",
      text: "골~~~~~~!!!! 이정민 선수!!!!",
      color: "#2563EB",
      bgClass: "bg-blue-500",
    },
    {
      icon: "BookOpen",
      name: "박지훈",
      role: "해설",
      text: "수비 라인 사이를 정확히 찔렀습니다!",
      color: "#059669",
      bgClass: "bg-emerald-500",
    },
    {
      icon: "Laugh",
      name: "이수빈",
      role: "예능",
      text: "이게 동네 축구 맞습니까?! ㅋㅋㅋ",
      color: "#D97706",
      bgClass: "bg-amber-500",
    },
  ],
  en: [
    {
      icon: "Mic",
      name: "Alex",
      role: "Play",
      text: "GOOOAL!!!!! What a strike!!",
      color: "#2563EB",
      bgClass: "bg-blue-500",
    },
    {
      icon: "BookOpen",
      name: "James",
      role: "Analyst",
      text: "He found the gap between defenders!",
      color: "#059669",
      bgClass: "bg-emerald-500",
    },
    {
      icon: "Laugh",
      name: "Mia",
      role: "Fun",
      text: "Is this really a local game?! LOL",
      color: "#D97706",
      bgClass: "bg-amber-500",
    },
  ],
};

/* ── 아이콘 렌더러 ── */
const CasterIcon = ({ icon, className }: { icon: string; className?: string }) => {
  const cls = className || "w-4 h-4";
  switch (icon) {
    case "Mic":
      return <Mic className={cls} />;
    case "BookOpen":
      return <BookOpen className={cls} />;
    case "Laugh":
      return <Laugh className={cls} />;
    default:
      return null;
  }
};

export default function Hero() {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const { lang } = useLang();
  const heroRef = useInView();

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
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-dark-section">
      {/* ── 다크 그라데이션 배경 ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-[#131d35] to-[#1E293B]" />

      {/* ── 글로우 오브 장식 (PART 8-1) ── */}
      <div className="glow-orb-blue w-[500px] h-[500px] top-[-15%] left-[-10%]" />
      <div className="glow-orb-amber w-[400px] h-[400px] bottom-[-15%] right-[-10%]" />
      {/* 추가 미세 글로우 */}
      <div className="absolute top-[40%] right-[20%] w-64 h-64 rounded-full bg-purple-500/5 blur-[80px] pointer-events-none" />

      <div
        ref={heroRef}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center"
      >
        {/* ── 뱃지 ── */}
        <div className="reveal mb-8">
          <span className="inline-block py-1.5 px-5 text-sm bg-white/10 text-blue-300 border border-white/15 font-medium rounded-full backdrop-blur-sm">
            {t.badge}
          </span>
        </div>

        {/* ── 메인 타이틀 ── */}
        <h1 className="reveal stagger-1 text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 text-white tracking-tight leading-tight">
          {t.titleLine1}
          <br className="sm:hidden" />{" "}
          <span className="gradient-text">{t.titleHighlight}</span>
          {t.titleLine2}
        </h1>

        {/* ── 서브 타이틀 ── */}
        <p className="reveal stagger-2 text-base sm:text-lg text-white/60 max-w-xl mx-auto mb-12 whitespace-pre-line leading-relaxed">
          {t.subtitle}
        </p>

        {/* ── 캐스터 프리뷰 카드 (glass-dark) ── */}
        <div className="reveal stagger-3 max-w-lg mx-auto">
          <div className="glass-dark rounded-2xl shadow-2xl shadow-black/30 overflow-hidden">
            {/* 카드 헤더 */}
            <div className="px-5 py-3 border-b border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-xs text-blue-300 font-semibold">
                {t.previewLabel}
              </span>
              <span className="text-xs text-white/30 ml-auto">
                {t.matchInfo}
              </span>
            </div>

            {/* 캐스터 인디케이터 (lucide 아이콘 사용) */}
            <div className="px-5 pt-4 pb-1 flex gap-3">
              {lines.map((line, i) => (
                <button
                  key={i}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all duration-300 ${
                    i === currentLine
                      ? "font-semibold text-white shadow-lg"
                      : "text-white/40 bg-white/5"
                  }`}
                  style={
                    i === currentLine
                      ? { backgroundColor: line.color }
                      : {}
                  }
                  onClick={() => {
                    setCurrentLine(i);
                    setDisplayText("");
                    setIsTyping(true);
                  }}
                >
                  <CasterIcon icon={line.icon} className="w-3 h-3" />
                  {line.role}
                </button>
              ))}
            </div>

            {/* 타이핑 영역 */}
            <div className="px-5 py-4 min-h-[64px] flex items-center">
              <div className="flex items-start gap-3 w-full">
                {/* 캐스터 아이콘 + 이름 */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div
                    className={`w-7 h-7 rounded-lg ${lines[currentLine].bgClass} flex items-center justify-center`}
                  >
                    <CasterIcon
                      icon={lines[currentLine].icon}
                      className="w-4 h-4 text-white"
                    />
                  </div>
                  <span
                    className="text-sm font-bold whitespace-nowrap"
                    style={{ color: lines[currentLine].color }}
                  >
                    {lines[currentLine].name}
                  </span>
                </div>

                {/* 타이핑 텍스트 */}
                <p className="text-left text-white/80 text-sm sm:text-base leading-relaxed">
                  {displayText}
                  <span className="inline-block w-0.5 h-4 bg-blue-400/60 animate-pulse ml-0.5 align-middle" />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── 스크롤 유도 ── */}
        <div className="reveal stagger-4 mt-14">
          <a
            href="#result-preview"
            className="inline-flex flex-col items-center text-white/30 hover:text-white/60 transition-colors"
          >
            <span className="text-xs mb-2">{t.scrollHint}</span>
            <svg
              className="w-5 h-5 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
