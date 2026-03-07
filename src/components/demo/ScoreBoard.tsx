/*
 * ============================================================
 * 파일: src/components/demo/ScoreBoard.tsx
 * 설명: 스코어보드 컴포넌트 - 화이트 테마
 * 경로: src/components/demo/ScoreBoard.tsx
 * 최근 작업: 세션 7-B
 *   - LIVE 배지 제거 (인수인계서 [K] ⚠️1: "LIVE" 표현 금지)
 *   - isLive → isPlaying으로 의미 변경 (재생 상태 표시)
 *   - useLang() 적용: HOME/AWAY 텍스트 한영 전환
 * 작성일: 2026-03-07
 * ============================================================
 */

"use client";

import { useLang } from "@/providers/LanguageProvider";

interface ScoreBoardProps {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  matchMinute: string;
  isPlaying: boolean;
}

/* ── 한/영 텍스트 ── */
const text = {
  ko: { home: "홈", away: "원정" },
  en: { home: "HOME", away: "AWAY" },
};

export default function ScoreBoard({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  matchMinute,
  isPlaying,
}: ScoreBoardProps) {
  const { lang } = useLang();
  const t = text[lang];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
      <div className="flex items-center justify-between">
        {/* Home team */}
        <div className="flex-1 text-center">
          <div className="text-lg sm:text-xl font-bold text-gray-900">
            {homeTeam}
          </div>
          <div className="text-xs text-gray-400 mt-1">{t.home}</div>
        </div>

        {/* Score */}
        <div className="flex items-center gap-3 sm:gap-6 px-4 sm:px-8">
          <span className="text-4xl sm:text-5xl font-bold text-gray-900 tabular-nums">
            {homeScore}
          </span>
          <div className="flex flex-col items-center">
            {/* 재생 중 표시 (LIVE 배지 대신 작은 인디케이터) */}
            {isPlaying && (
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mb-1" />
            )}
            <span className="text-lg text-gray-300">:</span>
            <span className="text-sm text-gray-500 font-mono mt-1">
              {matchMinute}
            </span>
          </div>
          <span className="text-4xl sm:text-5xl font-bold text-gray-900 tabular-nums">
            {awayScore}
          </span>
        </div>

        {/* Away team */}
        <div className="flex-1 text-center">
          <div className="text-lg sm:text-xl font-bold text-gray-900">
            {awayTeam}
          </div>
          <div className="text-xs text-gray-400 mt-1">{t.away}</div>
        </div>
      </div>
    </div>
  );
}
