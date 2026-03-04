"use client";

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
    <div className="glass rounded-xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Play/Pause button */}
        <button
          onClick={isPlaying ? onPause : onPlay}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            isPlaying
              ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
              : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
          }`}
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Reset button */}
        <button
          onClick={onReset}
          className="w-10 h-10 rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white flex items-center justify-center transition-all"
          title="처음부터"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>

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
        <button
          onClick={onToggleTTS}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all ${
            ttsEnabled
              ? "bg-blue-500/20 text-blue-400"
              : "bg-white/5 text-gray-500 hover:text-gray-300"
          }`}
        >
          {ttsEnabled ? "🔊" : "🔇"}
          <span>TTS {ttsEnabled ? "ON" : "OFF"}</span>
        </button>
      </div>
    </div>
  );
}
