/*
 * ============================================================
 * 파일: src/components/landing/CTA.tsx
 * 설명: BoomCast 최종 CTA 섹션 - 사이트 두 번째(마지막) CTA
 * 경로: src/components/landing/CTA.tsx
 * 최근 작업: 세션 7-B
 *   - "무료 체험하기" → "시작하기"
 *   - "첫 경기는 무료입니다" → 서비스 가치 중심 카피
 *   - 무료 관련 문구 전면 삭제
 * 작성일: 2026-03-07
 * ============================================================
 */

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/providers/LanguageProvider";

/* ── 한/영 텍스트 ── */
const text = {
  ko: {
    titleBefore: "지금 바로 ",
    titleHighlight: "시작",
    titleAfter: "해보세요",
    subtitle: "동네 축구가 어떻게 예능 콘텐츠로 변하는지, 직접 경험해보세요.",
    cta: "시작하기",
  },
  en: {
    titleBefore: "Ready to ",
    titleHighlight: "Get Started",
    titleAfter: "?",
    subtitle: "See how your local soccer transforms into entertainment content.",
    cta: "Get Started",
  },
};

export default function CTA() {
  const { lang } = useLang();
  const t = text[lang];

  return (
    <section className="py-20 sm:py-28 px-4 bg-gray-50/50">
      <div className="max-w-3xl mx-auto text-center">
        <div className="relative bg-white rounded-3xl border border-gray-200 shadow-xl shadow-gray-200/40 p-10 sm:p-14 overflow-hidden">
          {/* ── 배경 장식 ── */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-amber-50/40 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-gray-900">
              {t.titleBefore}
              <span className="gradient-text">{t.titleHighlight}</span>
              {t.titleAfter}
            </h2>

            <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto leading-relaxed">
              {t.subtitle}
            </p>

            <Button size="lg" asChild>
              <Link href="/demo" className="gap-2">
                {t.cta}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
