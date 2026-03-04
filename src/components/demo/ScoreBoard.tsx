"use client";

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
    <div className="glass rounded-xl p-4 sm:p-6">
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
              <div className="flex items-center gap-1 mb-1">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs text-red-400 font-medium">LIVE</span>
              </div>
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
    </div>
  );
}
