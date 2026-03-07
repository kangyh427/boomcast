/*
 * ============================================================
 * 파일: src/components/landing/Pricing.tsx
 * 설명: BoomCast 요금 안내 — 디자인 리뉴얼 v2
 * 경로: src/components/landing/Pricing.tsx
 * 최근 작업: 세션 11 - 디자인 리뉴얼 (마스터플랜 PART 8-6)
 *   - BEST 카드: 블루 그라데이션 상단 바 추가
 *   - 체크마크: inline SVG → lucide-react Check 아이콘
 *   - 비활성 기능: 회색 텍스트 + 줄긋기 (연간 플랜에만)
 *   - 배경: white → slate-bg (#F1F5F9) / 카드는 white
 *   - gradient-text 제거 (Hero에서만 사용 규칙)
 *   - useInView + useInViewMultiple 스크롤 등장 애니메이션
 *   - card-hover 효과 적용
 *   - CTA 버튼 없음 유지 (사이트 전체 2곳만 유지)
 *   - "무료" 문구 없음 유지
 * 작성일: 2026-03-07
 * ============================================================
 */

"use client";

import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/providers/LanguageProvider";
import { useInView, useInViewMultiple } from "@/hooks/useInView";

/* ── 한/영 섹션 텍스트 ── */
const text = {
  ko: {
    sectionTitle: "요금 안내",
    sectionSubtitle: "부담 없는 가격으로, 동네 축구를 예능으로",
  },
  en: {
    sectionTitle: "Pricing",
    sectionSubtitle:
      "Affordable plans to turn your games into entertainment",
  },
};

/* ── 기능 항목 타입 ── */
interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  description: string;
  price: string;
  unit: string;
  features: PlanFeature[];
  popular: boolean;
}

/* ── 요금 데이터 (인수인계서 [F] 확정) ── */
const plans: Record<string, Plan[]> = {
  ko: [
    {
      name: "단건 구매",
      description: "1경기만 이용하고 싶을 때",
      price: "9,900",
      unit: "원 / 경기",
      features: [
        { text: "2시간 이내 경기 1회", included: true },
        { text: "AI 예능 캐스터 3명 해설", included: true },
        { text: "예능 본편 영상 (20~30분)", included: true },
        { text: "하이라이트 숏폼 (1분 × 3~5개)", included: true },
        { text: "팀 전용 페이지", included: false },
        { text: "우선 처리", included: false },
      ],
      popular: false,
    },
    {
      name: "월간 구독",
      description: "매주 경기하는 동네 팀에 딱!",
      price: "35,000",
      unit: "원 / 월",
      features: [
        { text: "월 4회 경기 이용", included: true },
        { text: "AI 예능 캐스터 3명 해설", included: true },
        { text: "예능 본편 영상 (20~30분)", included: true },
        { text: "하이라이트 숏폼 (1분 × 3~5개)", included: true },
        { text: "팀 전용 페이지 제공", included: true },
        { text: "우선 처리", included: true },
      ],
      popular: true,
    },
    {
      name: "연간 구독",
      description: "리그를 운영하는 팀에 추천",
      price: "400,000",
      unit: "원 / 년",
      features: [
        { text: "연 50회 경기 이용", included: true },
        { text: "AI 예능 캐스터 3명 해설", included: true },
        { text: "예능 본편 영상 (20~30분)", included: true },
        { text: "하이라이트 숏폼 (1분 × 3~5개)", included: true },
        { text: "팀 전용 페이지 제공", included: true },
        { text: "시즌 통계 리포트", included: true },
        { text: "다음 시즌 할인 쿠폰", included: true },
        { text: "최우선 처리", included: true },
      ],
      popular: false,
    },
  ],
  en: [
    {
      name: "Single Game",
      description: "Perfect for a one-time experience",
      price: "$7.99",
      unit: "/ game",
      features: [
        { text: "1 game up to 2 hours", included: true },
        { text: "3 AI entertainment casters", included: true },
        { text: "Full show video (20-30 min)", included: true },
        { text: "Highlight shorts (1 min × 3-5)", included: true },
        { text: "Team page", included: false },
        { text: "Priority processing", included: false },
      ],
      popular: false,
    },
    {
      name: "Monthly",
      description: "For teams that play every week!",
      price: "$24.99",
      unit: "/ mo",
      features: [
        { text: "Up to 4 games per month", included: true },
        { text: "3 AI entertainment casters", included: true },
        { text: "Full show video (20-30 min)", included: true },
        { text: "Highlight shorts (1 min × 3-5)", included: true },
        { text: "Team page included", included: true },
        { text: "Priority processing", included: true },
      ],
      popular: true,
    },
    {
      name: "Annual",
      description: "For teams running a league",
      price: "$299.99",
      unit: "/ yr",
      features: [
        { text: "Up to 50 games per year", included: true },
        { text: "3 AI entertainment casters", included: true },
        { text: "Full show video (20-30 min)", included: true },
        { text: "Highlight shorts (1 min × 3-5)", included: true },
        { text: "Team page included", included: true },
        { text: "Season statistics report", included: true },
        { text: "Next season discount coupon", included: true },
        { text: "Top priority processing", included: true },
      ],
      popular: false,
    },
  ],
};

export default function Pricing() {
  const { lang } = useLang();
  const t = text[lang];
  const planList = plans[lang];

  /* 스크롤 등장 애니메이션 */
  const headerRef = useInView();
  const cardsRef = useInViewMultiple();

  return (
    <section id="pricing" className="py-20 sm:py-28 px-4 bg-slate-bg">
      <div className="max-w-5xl mx-auto">
        {/* ── 섹션 헤더 ── */}
        <div ref={headerRef} className="reveal text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            {t.sectionTitle}
          </h2>
          <p className="text-gray-500 text-lg">{t.sectionSubtitle}</p>
        </div>

        {/* ── 플랜 카드 ── */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6 items-stretch"
        >
          {planList.map((plan, index) => (
            <div
              key={index}
              className={`reveal stagger-${index + 1} relative bg-white rounded-2xl border overflow-hidden flex flex-col card-hover ${
                plan.popular
                  ? "border-blue-300 shadow-xl shadow-blue-100/40 ring-1 ring-blue-100 scale-[1.02]"
                  : "border-gray-200"
              }`}
            >
              {/* ── BEST 카드 상단 블루 그라데이션 바 ── */}
              {plan.popular && (
                <div className="h-1.5 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500" />
              )}

              <div className="p-7 flex flex-col flex-1">
                {/* BEST 뱃지 */}
                {plan.popular && (
                  <div className="flex justify-center mb-3">
                    <Badge className="bg-gradient-to-r from-blue-600 to-blue-500 border-0 text-white px-5 py-1 shadow-md text-xs font-bold">
                      BEST
                    </Badge>
                  </div>
                )}

                {/* 플랜 이름 */}
                <div className="text-center pt-1 pb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {plan.description}
                  </p>
                </div>

                {/* 가격 */}
                <div className="text-center my-4">
                  <span className="text-4xl font-black text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-400 text-sm ml-1">
                    {plan.unit}
                  </span>
                </div>

                {/* 구분선 */}
                <div className="border-t border-gray-100 my-4" />

                {/* 기능 목록 */}
                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className={`flex items-start gap-2.5 text-sm ${
                        feature.included
                          ? "text-gray-600"
                          : "text-gray-400 line-through"
                      }`}
                    >
                      {feature.included ? (
                        <Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-gray-300 mt-0.5 shrink-0" />
                      )}
                      {feature.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
