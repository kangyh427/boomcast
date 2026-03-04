"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";

interface PlayerControlsProps {
  isPlaying: boolean;
  ttsEnabled: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onToggleTTS: () => void;
}

export default function PlayerControls({
  isPlaying,
  ttsEnabled,
  onPlay,
  onPause,
  onReset,
  onToggleTTS,
}: PlayerControlsProps) {
  return (
    <Card className="p-4 flex items-center justify-between">
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
          title="처음부터"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>

        <div className="text-sm text-gray-400">
          {isPlaying ? (
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              AI 캐스팅 진행 중...
            </span>
          ) : (
            "재생 버튼을 눌러 시작"
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
    </Card>
  );
}
