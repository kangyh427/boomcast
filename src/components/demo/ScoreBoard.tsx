/*
 * ============================================================
 * 파일: src/components/demo/ScoreBoard.tsx
 * 설명: 스코어보드 컴포넌트 - 화이트 테마
 * 경로: src/components/demo/ScoreBoard.tsx
 * 최근 작업: 세션 4 - 화이트 리디자인
 *           - text-white → text-gray-900
 *           - text-gray-400 → text-gray-500
 * 작성일: 2025-03-06
 * ============================================================
 */

"use client";

import { Badge } from "@/components/ui/badge";

interface ScoreBoardProps {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  matchMinute: string;
  isLive: boolean;
}

export default function ScoreBoard({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  matchMinute,
  isLive,
}: ScoreBoardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
      <div className="flex items-center justify-between">
        {/* Home team */}
        <div className="flex-1 text-center">
          <div className="text-lg sm:text-xl font-bold text-gray-900">
            {homeTeam}
          </div>
          <div className="text-xs text-gray-400 mt-1">HOME</div>
        </div>

        {/* Score */}
        <div className="flex items-center gap-3 sm:gap-6 px-4 sm:px-8">
          <span className="text-4xl sm:text-5xl font-bold text-gray-900 tabular-nums">
            {homeScore}
          </span>
          <div className="flex flex-col items-center">
            {isLive && (
              <Badge variant="destructive" className="mb-1 text-[10px] gap-1 px-1.5">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                LIVE
              </Badge>
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
          <div className="text-xs text-gray-400 mt-1">AWAY</div>
        </div>
      </div>
    </div>
  );
}
