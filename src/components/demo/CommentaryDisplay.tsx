"use client";

import { Commentary } from "@/lib/types";
import { getCasterById } from "@/lib/casters";
import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

interface CommentaryDisplayProps {
  commentaries: Commentary[];
  typingCommentary: {
    commentary: Commentary;
    displayedText: string;
  } | null;
}

export default function CommentaryDisplay({
  commentaries,
  typingCommentary,
}: CommentaryDisplayProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [commentaries, typingCommentary]);

  const getEmotionStyle = (emotion: Commentary["emotion"]) => {
    switch (emotion) {
      case "excited":
        return "border-l-red-400";
      case "analytical":
        return "border-l-cyan-400";
      case "humorous":
        return "border-l-amber-400";
      case "tense":
        return "border-l-purple-400";
      default:
        return "border-l-gray-400";
    }
  };

  return (
    <Card className="p-4 flex flex-col h-full">
      <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
        <span>💬</span> AI 캐스팅 해설
      </h3>
      <div
        ref={scrollRef}
        className="flex-1 space-y-3 overflow-y-auto pr-2 min-h-[300px] max-h-[500px]"
      >
        {commentaries.length === 0 && !typingCommentary && (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
            재생 버튼을 눌러 AI 캐스팅을 시작하세요
          </div>
        )}

        {commentaries.map((commentary) => {
          const caster = getCasterById(commentary.casterId);
          if (!caster) return null;

          return (
            <div
              key={commentary.id}
              className={`animate-fade-in border-l-2 pl-3 py-1 ${getEmotionStyle(
                commentary.emotion
              )}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">{caster.avatar}</span>
                <span
                  className="text-xs font-medium"
                  style={{ color: caster.color }}
                >
                  {caster.name}
                </span>
                <span className="text-xs text-gray-600">
                  {caster.description}
                </span>
              </div>
              <p className="text-sm text-gray-200 leading-relaxed">
                {commentary.text}
              </p>
            </div>
          );
        })}

        {typingCommentary && (
          <div
            className={`animate-fade-in border-l-2 pl-3 py-1 ${getEmotionStyle(
              typingCommentary.commentary.emotion
            )}`}
          >
            <div className="flex items-center gap-2 mb-1">
              {(() => {
                const caster = getCasterById(
                  typingCommentary.commentary.casterId
                );
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
                    <span className="text-xs text-gray-600">
                      {caster.description}
                    </span>
                  </>
                );
              })()}
            </div>
            <p className="text-sm text-gray-200 leading-relaxed">
              {typingCommentary.displayedText}
              <span className="inline-block w-0.5 h-3.5 bg-white/60 animate-pulse ml-0.5 align-middle" />
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
