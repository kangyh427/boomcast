"use client";

import { Card } from "@/components/ui/card";
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
    <Card className="p-4 sm:p-6">
      <div className="flex items-center justify-between">
        {/* Home team */}
        <div className="flex-1 text-center">
          <div className="text-lg sm:text-xl font-bold text-white">
            {homeTeam}
          </div>
          <div className="text-xs text-gray-400 mt-1">HOME</div>
        </div>

        {/* Score */}
        <div className="flex items-center gap-3 sm:gap-6 px-4 sm:px-8">
          <span className="text-4xl sm:text-5xl font-bold text-white tabular-nums">
            {homeScore}
          </span>
          <div className="flex flex-col items-center">
            {isLive && (
              <Badge variant="destructive" className="mb-1 text-[10px] gap-1 px-1.5">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                LIVE
              </Badge>
            )}
            <span className="text-lg text-gray-400">:</span>
            <span className="text-sm text-gray-400 font-mono mt-1">
              {matchMinute}
            </span>
          </div>
          <span className="text-4xl sm:text-5xl font-bold text-white tabular-nums">
            {awayScore}
          </span>
        </div>

        {/* Away team */}
        <div className="flex-1 text-center">
          <div className="text-lg sm:text-xl font-bold text-white">
            {awayTeam}
          </div>
          <div className="text-xs text-gray-400 mt-1">AWAY</div>
        </div>
      </div>
    </Card>
  );
}
