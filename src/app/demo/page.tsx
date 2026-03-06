/*
 * ============================================================
 * 파일: src/app/demo/page.tsx
 * 설명: BoomCast AI 캐스팅 데모 페이지 - 화이트 테마
 * 경로: src/app/demo/page.tsx
 * 최근 작업: 세션 4 - 화이트 리디자인 + 한/영 텍스트 하드코딩
 *           - text-white → text-gray-900
 *           - text-gray-400 → text-gray-500
 *           - 기술 스택 박스 화이트 테마
 * 작성일: 2025-03-06
 * ============================================================
 */

"use client";

import { casters } from "@/lib/casters";
import { demoScenario } from "@/lib/demo-data";
import { useCommentaryPlayer } from "@/hooks/useCommentaryPlayer";
import { Badge } from "@/components/ui/badge";
import ScoreBoard from "@/components/demo/ScoreBoard";
import MatchVisualizer from "@/components/demo/MatchVisualizer";
import PlayerControls from "@/components/demo/PlayerControls";
import EventTimeline from "@/components/demo/EventTimeline";
import CasterPanel from "@/components/demo/CasterPanel";
import CommentaryDisplay from "@/components/demo/CommentaryDisplay";

/* ── 한/영 텍스트 ── */
const text = {
  ko: {
    techStack: "기술 스택",
    eventDetect: "이벤트 감지",
    eventDetectVal: "AI 자동 인식",
    scriptGen: "대본 생성",
    scriptGenVal: "Claude / Gemini",
    voiceSynth: "음성 합성",
    voiceSynthVal: "Web Speech API",
    equipment: "촬영 장비",
    equipmentVal: "스마트폰 1대",
  },
  en: {
    techStack: "Tech Stack",
    eventDetect: "Event Detection",
    eventDetectVal: "AI Auto-detect",
    scriptGen: "Script Gen",
    scriptGenVal: "Claude / Gemini",
    voiceSynth: "Voice Synth",
    voiceSynthVal: "Web Speech API",
    equipment: "Equipment",
    equipmentVal: "1 Smartphone",
  },
};

export default function DemoPage() {
  const player = useCommentaryPlayer();

  /* TODO: 세션 6에서 i18n 훅으로 교체 */
  const lang: "ko" | "en" = "ko";
  const t = text[lang];

  return (
    <div className="min-h-screen py-6 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* ── 페이지 헤더 ── */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Badge>DEMO</Badge>
            <Badge variant="warning">
              {lang === "ko" ? "동네 축구" : "Local Soccer"}
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {demoScenario.title}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {demoScenario.description}
          </p>
        </div>

        {/* ── 메인 레이아웃 ── */}
        <div className="grid lg:grid-cols-3 gap-4">

          {/* 좌측: 메인 콘텐츠 */}
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

          {/* 우측: 사이드바 */}
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

            {/* ── 기술 스택 정보 ── */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span>🔧</span> {t.techStack}
              </h3>
              <div className="space-y-2 text-xs">
                {[
                  { label: t.eventDetect, value: t.eventDetectVal },
                  { label: t.scriptGen, value: t.scriptGenVal },
                  { label: t.voiceSynth, value: t.voiceSynthVal },
                  { label: t.equipment, value: t.equipmentVal },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between text-gray-500">
                    <span>{item.label}</span>
                    <span className="text-blue-600 font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
