"use client";

import { casters } from "@/lib/casters";
import { demoScenario } from "@/lib/demo-data";
import { useCommentaryPlayer } from "@/hooks/useCommentaryPlayer";
import ScoreBoard from "@/components/demo/ScoreBoard";
import MatchVisualizer from "@/components/demo/MatchVisualizer";
import PlayerControls from "@/components/demo/PlayerControls";
import EventTimeline from "@/components/demo/EventTimeline";
import CasterPanel from "@/components/demo/CasterPanel";
import CommentaryDisplay from "@/components/demo/CommentaryDisplay";

export default function DemoPage() {
  const player = useCommentaryPlayer();

  return (
    <div className="min-h-screen py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 text-xs font-medium bg-blue-500/20 text-blue-400 rounded">
              DEMO
            </span>
            <span className="px-2 py-0.5 text-xs font-medium bg-amber-500/20 text-amber-400 rounded">
              축구
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            {demoScenario.title}
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {demoScenario.description}
          </p>
        </div>

        {/* Main layout */}
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Left column - Main content */}
          <div className="lg:col-span-2 space-y-4">
            <ScoreBoard
              homeTeam={demoScenario.match.homeTeam}
              awayTeam={demoScenario.match.awayTeam}
              homeScore={player.homeScore}
              awayScore={player.awayScore}
              matchMinute={player.matchMinute}
              isLive={player.isPlaying}
            />

            <MatchVisualizer
              currentEvent={player.currentEvent}
              isPlaying={player.isPlaying}
              progress={player.progress}
            />

            <PlayerControls
              isPlaying={player.isPlaying}
              ttsEnabled={player.ttsEnabled}
              onPlay={player.play}
              onPause={player.pause}
              onReset={player.reset}
              onToggleTTS={player.toggleTTS}
            />

            <CommentaryDisplay
              commentaries={player.displayedCommentaries}
              typingCommentary={player.typingCommentary}
            />
          </div>

          {/* Right column - Sidebar */}
          <div className="space-y-4">
            <CasterPanel
              casters={casters}
              activeCasterId={player.activeCasterId}
              enabledCasters={player.enabledCasters}
              onToggleCaster={player.toggleCaster}
            />

            <EventTimeline
              events={demoScenario.events}
              currentEventIndex={player.currentEventIndex}
              onEventClick={player.jumpToEvent}
            />

            {/* Tech info box */}
            <div className="glass rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <span>🔧</span> 기술 스택
              </h3>
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>이벤트 감지</span>
                  <span className="text-blue-400">YOLOv8-nano / TFLite</span>
                </div>
                <div className="flex justify-between">
                  <span>대본 생성</span>
                  <span className="text-blue-400">Claude / Gemini</span>
                </div>
                <div className="flex justify-between">
                  <span>음성 합성</span>
                  <span className="text-blue-400">Web Speech API</span>
                </div>
                <div className="flex justify-between">
                  <span>처리 방식</span>
                  <span className="text-blue-400">Edge + Cloud</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
