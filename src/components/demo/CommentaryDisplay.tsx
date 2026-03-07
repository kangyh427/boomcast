/*
 * ============================================================
 * 파일: src/components/demo/CommentaryDisplay.tsx
 * 설명: AI 캐스팅 해설 표시 컴포넌트 - 화이트 테마
 * 경로: src/components/demo/CommentaryDisplay.tsx
 * 최근 작업: 세션 7-B
 *   - useLang() 적용: 제목/안내 텍스트 한영 전환
 *   - "AI 캐스팅 해설" 한영 전환
 * 작성일: 2026-03-07
 * ============================================================
 */

"use client";

import { Commentary } from "@/lib/types";
import { getCasterById } from "@/lib/casters";
import { useEffect, useRef } from "react";
import { useLang } from "@/providers/LanguageProvider";

interface CommentaryDisplayProps {
  commentaries: Commentary[];
  typingCommentary: {
    commentary: Commentary;
    displayedText: string;
  } | null;
}

/* ── 한/영 텍스트 ── */
const text = {
  ko: {
    title: "AI 캐스팅 해설",
    emptyGuide: "재생 버튼을 눌러 AI 캐스팅을 시작하세요",
  },
  en: {
    title: "AI Casting Commentary",
    emptyGuide: "Press play to start AI casting",
  },
};

/* ── 감정별 좌측 보더 색상 ── */
const getEmotionStyle = (emotion: Commentary["emotion"]) => {
  switch (emotion) {
    case "excited":
      return "border-l-red-400";
    case "analytical":
      return "border-l-cyan-500";
    case "humorous":
      return "border-l-amber-400";
    case "tense":
      return "border-l-purple-400";
    default:
      return "border-l-gray-300";
  }
};

export default function CommentaryDisplay({
  commentaries,
  typingCommentary,
}: CommentaryDisplayProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { lang } = useLang();
  const t = text[lang];

  /* 자동 스크롤 */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [commentaries, typingCommentary]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col h-full">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <span>💬</span> {t.title}
      </h3>

      <div
        ref={scrollRef}
        className="flex-1 space-y-3 overflow-y-auto pr-2 min-h-[300px] max-h-[500px]"
      >
        {/* 비어있을 때 안내 */}
        {commentaries.length === 0 && !typingCommentary && (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            {t.emptyGuide}
          </div>
        )}

        {/* 완료된 해설 */}
        {commentaries.map((commentary) => {
          const caster = getCasterById(commentary.casterId);
          if (!caster) return null;

          return (
            <div
              key={commentary.id}
              className={`animate-fade-in border-l-2 pl-3 py-1 ${getEmotionStyle(commentary.emotion)}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">{caster.avatar}</span>
                <span
                  className="text-xs font-medium"
                  style={{ color: caster.color }}
                >
                  {caster.name}
                </span>
                <span className="text-xs text-gray-400">
                  {caster.description}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {commentary.text}
              </p>
            </div>
          );
        })}

        {/* 타이핑 중인 해설 */}
        {typingCommentary && (
          <div
            className={`animate-fade-in border-l-2 pl-3 py-1 ${getEmotionStyle(typingCommentary.commentary.emotion)}`}
          >
            <div className="flex items-center gap-2 mb-1">
              {(() => {
                const caster = getCasterById(typingCommentary.commentary.casterId);
                if (!caster) return null;
                return (
                  <>
                    <span className="text-sm">{caster.avatar}</span>
                    <span
                      className="text-xs font-medium"
                      style={{ color: caster.color }}
                    >
                      {caster.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {caster.description}
                    </span>
                  </>
                );
              })()}
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {typingCommentary.displayedText}
              <span className="inline-block w-0.5 h-3.5 bg-blue-500/50 animate-pulse ml-0.5 align-middle" />
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
