/*
 * ============================================================
 * 파일: src/components/landing/CTA.tsx
 * 설명: BoomCast CTA(Call to Action) 섹션 - 화이트 테마
 * 경로: src/components/landing/CTA.tsx
 * 최근 작업: 세션 4 - 화이트 리디자인 + 한/영 텍스트 하드코딩
 *           - 다크 테마 색상 완전 제거
 *           - 배경 글로우: blue-100 (화이트 대비 소프트)
 *           - 텍스트: text-gray-900, text-gray-500
 *           - 한/영 전환 대비 (lang 변수, 세션 6에서 i18n 훅 교체)
 * 작성일: 2025-03-06
 * ============================================================
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

/* ── 한/영 텍스트 ── */
const text = {
  ko: {
    titleBefore: "지금 바로 ",
    titleHighlight: "체험",
    titleAfter: "해보세요",
    subtitle: "동네 축구가 어떻게 예능 콘텐츠로 변하는지, 데모를 통해 직접 경험해보세요.",
    cta: "데모 시작하기",
  },
  en: {
    titleBefore: "Ready to ",
    titleHighlight: "Experience",
    titleAfter: " It?",
    subtitle: "See how your local soccer transforms into entertainment content through our live demo.",
    cta: "Start Demo",
  },
};

export default function CTA() {
  /* TODO: 세션 6에서 i18n 훅으로 교체 */
  const lang: "ko" | "en" = "ko";
  const t = text[lang];

  return (
    <section className="py-20 sm:py-24 px-4 bg-gray-50/50">
      <div className="max-w-3xl mx-auto text-center">
        <div className="relative bg-white rounded-2xl border border-gray-200 shadow-lg shadow-gray-200/50 p-10 sm:p-12 overflow-hidden">

          {/* ── 배경 글로우 장식 ── */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* 타이틀 */}
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
              {t.titleBefore}
              <span className="gradient-text">{t.titleHighlight}</span>
              {t.titleAfter}
            </h2>

            {/* 서브 텍스트 */}
            <p className="text-gray-500 text-lg mb-8 max-w-lg mx-auto">
              {t.subtitle}
            </p>

            {/* CTA 버튼 */}
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
