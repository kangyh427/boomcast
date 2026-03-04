"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const castingLines = [
  { caster: "🎙️ 김현우", text: "골~~~~~~!!!! 손흥민!!!!", color: "#3B82F6" },
  { caster: "📊 박지성", text: "교과서적인 컷인 슈팅입니다.", color: "#10B981" },
  { caster: "🎭 이영표", text: "이 맛에 축구 보는 겁니다!", color: "#F59E0B" },
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-8">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            AI 멀티 페르소나 스포츠 캐스팅
          </div>
        </div>

        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          스마트폰이{" "}
          <span className="gradient-text">중계 스튜디오</span>가 되다
        </h1>

        <p
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          2~3명의 AI 캐스터가 실시간으로 엔터테인먼트 중계를 제공합니다.
          <br />
          촬영만 하면, 나머지는 BoomCast가 알아서.
        </p>

        {/* Live casting preview */}
        <div
          className="max-w-2xl mx-auto mb-10 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs text-red-400 font-medium">LIVE</span>
              <span className="text-xs text-gray-500">AI 캐스팅 미리보기</span>
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
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <Link
            href="/demo"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-500/25 text-lg"
          >
            데모 체험하기
          </Link>
          <a
            href="#features"
            className="px-8 py-3 border border-gray-600 text-gray-300 font-medium rounded-xl hover:bg-white/5 transition-all text-lg"
          >
            자세히 보기
          </a>
        </div>
      </div>
    </section>
  );
}
