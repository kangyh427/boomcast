"use client";

import { MatchEvent } from "@/lib/types";
import { getEventIcon } from "@/lib/demo-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone } from "lucide-react";

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
    <Card className="overflow-hidden border-0">
      {/* Smartphone camera view - simulating phone placed at center of field */}
      <div className="relative aspect-video bg-gradient-to-b from-sky-300/20 via-green-700/40 to-green-900/50 overflow-hidden">
        {/* Sky gradient at top */}
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-sky-400/15 to-transparent" />

        {/* Field grass texture */}
        <div className="absolute inset-0">
          {/* Grass lines effect */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute inset-x-0 h-px bg-white/20"
                style={{ top: `${(i + 1) * 8}%` }}
              />
            ))}
          </div>

          {/* Perspective field lines - viewed from phone at ground level */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 450" preserveAspectRatio="none">
            {/* Field boundary lines converging to top center */}
            <line x1="0" y1="450" x2="300" y2="100" stroke="white" strokeWidth="1.5" opacity="0.15" />
            <line x1="800" y1="450" x2="500" y2="100" stroke="white" strokeWidth="1.5" opacity="0.15" />
            {/* Goal line at distance */}
            <line x1="300" y1="100" x2="500" y2="100" stroke="white" strokeWidth="1" opacity="0.12" />
            {/* Center circle at distance */}
            <ellipse cx="400" cy="220" rx="80" ry="25" fill="none" stroke="white" strokeWidth="1" opacity="0.1" />
            {/* Center line */}
            <line x1="150" y1="280" x2="650" y2="280" stroke="white" strokeWidth="1" opacity="0.1" />
          </svg>
        </div>

        {/* Amateur players silhouettes */}
        <div className="absolute inset-0">
          {/* Home team (blue) */}
          <div className="absolute top-[30%] left-[25%] flex flex-col items-center animate-pulse" style={{ animationDelay: "0s" }}>
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-500/60" />
            <div className="w-3 h-5 sm:w-4 sm:h-6 bg-blue-500/40 rounded-b-sm -mt-0.5" />
          </div>
          <div className="absolute top-[35%] left-[40%] flex flex-col items-center">
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-500/60" />
            <div className="w-3 h-5 sm:w-4 sm:h-6 bg-blue-500/40 rounded-b-sm -mt-0.5" />
          </div>
          <div className="absolute top-[45%] left-[55%] flex flex-col items-center animate-pulse" style={{ animationDelay: "1s" }}>
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500/70" />
            <div className="w-4 h-6 sm:w-5 sm:h-7 bg-blue-500/50 rounded-b-sm -mt-0.5" />
          </div>
          <div className="absolute top-[50%] left-[30%] flex flex-col items-center">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500/70" />
            <div className="w-4 h-6 sm:w-5 sm:h-7 bg-blue-500/50 rounded-b-sm -mt-0.5" />
          </div>

          {/* Away team (red) */}
          <div className="absolute top-[32%] left-[60%] flex flex-col items-center animate-pulse" style={{ animationDelay: "0.3s" }}>
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-red-500/60" />
            <div className="w-3 h-5 sm:w-4 sm:h-6 bg-red-500/40 rounded-b-sm -mt-0.5" />
          </div>
          <div className="absolute top-[40%] left-[70%] flex flex-col items-center">
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-red-500/60" />
            <div className="w-3 h-5 sm:w-4 sm:h-6 bg-red-500/40 rounded-b-sm -mt-0.5" />
          </div>
          <div className="absolute top-[48%] left-[45%] flex flex-col items-center animate-pulse" style={{ animationDelay: "0.7s" }}>
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-500/70" />
            <div className="w-4 h-6 sm:w-5 sm:h-7 bg-red-500/50 rounded-b-sm -mt-0.5" />
          </div>
          <div className="absolute top-[55%] left-[65%] flex flex-col items-center">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-500/70" />
            <div className="w-4 h-6 sm:w-5 sm:h-7 bg-red-500/50 rounded-b-sm -mt-0.5" />
          </div>

          {/* Ball */}
          {isPlaying && (
            <div className="absolute top-[42%] left-[50%] w-3 h-3 bg-white rounded-full shadow-lg animate-bounce" style={{ animationDuration: "1.5s" }} />
          )}
        </div>

        {/* Phone camera frame overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Camera UI corners */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-white/40 rounded-tl-sm" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-white/40 rounded-tr-sm" />
          <div className="absolute bottom-8 left-3 w-6 h-6 border-b-2 border-l-2 border-white/40 rounded-bl-sm" />
          <div className="absolute bottom-8 right-3 w-6 h-6 border-b-2 border-r-2 border-white/40 rounded-br-sm" />

          {/* Recording indicator */}
          {isPlaying && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded-full">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-[10px] text-white font-medium tracking-wider">REC</span>
            </div>
          )}

          {/* Crosshair - phone autofocus */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 opacity-20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-3 bg-white" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-3 bg-white" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-px bg-white" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-px bg-white" />
          </div>
        </div>

        {/* Current event overlay */}
        {currentEvent && isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
            <div className="text-center">
              <div className="text-5xl sm:text-6xl mb-2">{getEventIcon(currentEvent.type)}</div>
              <div className="bg-black/60 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/10">
                <div className="text-xs text-gray-300 font-mono mb-1">
                  {currentEvent.matchMinute}
                </div>
                <div className="text-white font-bold text-base sm:text-lg">
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
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="text-center">
              <Smartphone className="w-12 h-12 mx-auto mb-3 text-white/40" />
              <p className="text-gray-300/80 text-sm font-medium">
                경기장 중앙에 세워둔 스마트폰
              </p>
              <p className="text-gray-400/60 text-xs mt-1">
                재생 버튼을 눌러 AI 캐스팅을 시작하세요
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

        {/* AI LIVE badge */}
        {isPlaying && (
          <div className="absolute top-3 right-3">
            <Badge variant="destructive" className="text-[10px] gap-1">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
              AI LIVE
            </Badge>
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
    </Card>
  );
}
