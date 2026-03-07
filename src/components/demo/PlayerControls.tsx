/*
 * ============================================================
 * 파일: src/components/demo/PlayerControls.tsx
 * 설명: 재생 컨트롤 컴포넌트 - 화이트 테마
 * 경로: src/components/demo/PlayerControls.tsx
 * 최근 작업: 세션 7-B
 *   - useLang() 적용: 상태 텍스트 한영 전환
 *   - "AI 캐스팅 진행 중" / "재생 버튼을 눌러 시작" 한영 전환
 *   - 버튼 title 한영 전환
 * 작성일: 2026-03-07
 * ============================================================
 */

"use client";

import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { useLang } from "@/providers/LanguageProvider";

interface PlayerControlsProps {
  isPlaying: boolean;
  ttsEnabled: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onToggleTTS: () => void;
}

/* ── 한/영 텍스트 ── */
const text = {
  ko: {
    playing: "AI 캐스팅 진행 중...",
    stopped: "재생 버튼을 눌러 시작",
    resetTitle: "처음부터",
  },
  en: {
    playing: "AI casting in progress...",
    stopped: "Press play to start",
    resetTitle: "Restart",
  },
};

export default function PlayerControls({
  isPlaying,
  ttsEnabled,
  onPlay,
  onPause,
  onReset,
  onToggleTTS,
}: PlayerControlsProps) {
  const { lang } = useLang();
  const t = text[lang];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Play/Pause button */}
        <Button
          onClick={isPlaying ? onPause : onPlay}
          variant={isPlaying ? "destructive" : "default"}
          size="icon"
          className="w-12 h-12 rounded-full"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5 ml-0.5" />
          )}
        </Button>

        {/* Reset button */}
        <Button
          onClick={onReset}
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-full"
          title={t.resetTitle}
        >
          <RotateCcw className="w-4 h-4" />
        </Button>

        <div className="text-sm text-gray-500">
          {isPlaying ? (
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              {t.playing}
            </span>
          ) : (
            t.stopped
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* TTS toggle */}
        <Button
          onClick={onToggleTTS}
          variant={ttsEnabled ? "secondary" : "ghost"}
          size="sm"
          className="gap-2"
        >
          {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          <span className="text-xs">TTS {ttsEnabled ? "ON" : "OFF"}</span>
        </Button>
      </div>
    </div>
  );
}
