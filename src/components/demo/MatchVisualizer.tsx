"use client";

import { MatchEvent } from "@/lib/types";
import { getEventIcon } from "@/lib/demo-data";

interface MatchVisualizerProps {
  currentEvent: MatchEvent | null;
  isPlaying: boolean;
  progress: number;
}

export default function MatchVisualizer({
  currentEvent,
  isPlaying,
  progress,
}: MatchVisualizerProps) {
  return (
    <div className="glass rounded-xl overflow-hidden">
      {/* Simulated video area */}
      <div className="relative aspect-video bg-gradient-to-br from-green-900/40 via-green-800/30 to-green-900/40">
        {/* Soccer field background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3/4 h-3/4 border-2 border-white/10 rounded-lg relative">
            {/* Center line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/10" />
            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-white/10 rounded-full" />
            {/* Penalty areas */}
            <div className="absolute top-1/4 left-0 w-16 h-1/2 border-2 border-l-0 border-white/10" />
            <div className="absolute top-1/4 right-0 w-16 h-1/2 border-2 border-r-0 border-white/10" />
          </div>
        </div>

        {/* Current event overlay */}
        {currentEvent && isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
            <div className="text-center">
              <div className="text-6xl mb-2">{getEventIcon(currentEvent.type)}</div>
              <div className="glass px-6 py-3 rounded-xl">
                <div className="text-sm text-gray-400 font-mono mb-1">
                  {currentEvent.matchMinute}
                </div>
                <div className="text-white font-bold text-lg">
                  {currentEvent.type === "goal" && "GOAL!!!"}
                  {currentEvent.type === "save" && "SAVE!"}
                  {currentEvent.type === "penalty" && "PENALTY!"}
                  {currentEvent.type === "card_yellow" && "YELLOW CARD"}
                  {currentEvent.type === "card_red" && "RED CARD"}
                  {currentEvent.type === "half_time" && "HALF TIME"}
                  {currentEvent.type === "full_time" && "FULL TIME"}
                  {currentEvent.type === "kick_off" && "KICK OFF"}
                  {currentEvent.type === "substitution" && "SUBSTITUTION"}
                  {!["goal", "save", "penalty", "card_yellow", "card_red", "half_time", "full_time", "kick_off", "substitution"].includes(currentEvent.type) && currentEvent.type.toUpperCase().replace("_", " ")}
                </div>
                {currentEvent.player && (
                  <div className="text-blue-400 text-sm mt-1">
                    {currentEvent.player}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Not playing overlay */}
        {!isPlaying && !currentEvent && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-4 opacity-50">⚽</div>
              <p className="text-gray-400 text-sm">
                AI 캐스팅 데모를 시작하려면<br />아래 재생 버튼을 눌러주세요
              </p>
            </div>
          </div>
        )}

        {/* BoomCast watermark */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 opacity-60">
          <div className="w-5 h-5 rounded bg-gradient-to-br from-blue-500 to-amber-500 flex items-center justify-center text-white text-[8px] font-bold">
            B
          </div>
          <span className="text-xs font-bold text-white/80">BoomCast</span>
        </div>

        {/* AI indicator */}
        {isPlaying && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs text-red-400 font-medium">AI LIVE</span>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-gray-800">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
