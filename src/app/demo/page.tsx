/*
 * ============================================================
 * 파일: src/app/demo/page.tsx
 * 설명: BoomCast AI 캐스팅 체험 페이지 - 화이트 테마
 * 경로: src/app/demo/page.tsx
 * 최근 작업: 세션 7-B
 *   - 기술 스택 박스 완전 삭제 (인수인계서 [K] ⚠️4)
 *   - useLang() 훅 적용 (하드코딩 lang 제거)
 *   - "DEMO" → "체험/Experience" 뉘앙스 전환
 *   - "실시간", "LIVE" 표현 제거 (인수인계서 [K] ⚠️1)
 *   - 모바일 세로 스택 레이아웃 최적화
 * 작성일: 2026-03-07
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
import { useLang } from "@/providers/LanguageProvider";

/* ── 한/영 텍스트 ── */
const text = {
  ko: {
    badge1: "체험",
    badge2: "동네 축구",
    pageDesc: "AI가 편집한 예능 스타일 결과물을 미리 체험해보세요",
  },
  en: {
    badge1: "Experience",
    badge2: "Local Soccer",
    pageDesc: "Preview AI-edited entertainment-style results",
  },
};

export default function DemoPage() {
  const player = useCommentaryPlayer();
  const { lang } = useLang();
  const t = text[lang];

  return (
    <div className="min-h-screen py-6 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* ── 페이지 헤더 ── */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Badge>{t.badge1}</Badge>
            <Badge variant="warning">{t.badge2}</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {demoScenario.title}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {t.pageDesc}
          </p>
        </div>

        {/* ── 메인 레이아웃: 데스크탑 3컬럼 / 모바일 세로 스택 ── */}
        <div className="grid lg:grid-cols-3 gap-4">

          {/* 좌측: 메인 콘텐츠 */}
          <div className="lg:col-span-2 space-y-4">
            <ScoreBoard
              homeTeam={demoScenario.match.homeTeam}
              awayTeam={demoScenario.match.awayTeam}
              homeScore={player.homeScore}
              awayScore={player.awayScore}
              matchMinute={player.matchMinute}
              isPlaying={player.isPlaying}
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

          {/* 우측: 사이드바 (기술스택 박스 삭제됨) */}
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
          </div>
        </div>
      </div>
    </div>
  );
}
