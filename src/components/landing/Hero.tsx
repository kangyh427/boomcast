"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const castingLines = [
  { caster: "🎙️ 김현우", text: "골~~~~~~!!!! 이정민!!!!", color: "#3B82F6" },
  { caster: "📊 박지훈", text: "동네 축구에서 이런 골이 나올 줄이야!", color: "#10B981" },
  { caster: "🎭 이수빈", text: "이게 동네 축구 맞습니까?! ㅋㅋ", color: "#F59E0B" },
];

export default function Hero() {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const line = castingLines[currentLine];
    if (isTyping) {
      if (displayText.length < line.text.length) {
        const timer = setTimeout(() => {
          setDisplayText(line.text.slice(0, displayText.length + 1));
        }, 50);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timer);
      }
    } else {
      setDisplayText("");
      setCurrentLine((prev) => (prev + 1) % castingLines.length);
      setIsTyping(true);
    }
  }, [displayText, isTyping, currentLine]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <div className="animate-fade-in-up">
          <Badge className="mb-8 py-1.5 px-4 text-sm">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse mr-2" />
            동네 예능 스포츠 AI 캐스팅
          </Badge>
        </div>

        <h1
          className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          동네 축구가{" "}
          <span className="gradient-text">예능 콘텐츠</span>가 되다
        </h1>

        <p
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          경기장에 스마트폰만 세워두세요.
          <br />
          AI 캐스터 3명이 동네 축구를 프로 예능처럼 중계합니다.
        </p>

        {/* Live casting preview */}
        <div
          className="max-w-2xl mx-auto mb-10 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs text-red-400 font-medium">LIVE</span>
              <span className="text-xs text-gray-500">고운동 vs 아름동</span>
            </div>
            <div className="min-h-[60px] flex items-center">
              <div className="flex items-start gap-3 w-full">
                <span className="text-sm font-medium whitespace-nowrap" style={{ color: castingLines[currentLine].color }}>
                  {castingLines[currentLine].caster}
                </span>
                <p className="text-left text-gray-200 text-sm sm:text-base">
                  {displayText}
                  <span className="inline-block w-0.5 h-4 bg-white/60 animate-pulse ml-0.5 align-middle" />
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <Button size="lg" asChild>
            <Link href="/demo">
              데모 체험하기
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#features">
              자세히 보기
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
