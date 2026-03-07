/*
 * ============================================================
 * 파일: src/components/landing/Pricing.tsx
 * 설명: BoomCast 요금 안내 섹션 - 화이트 테마
 * 경로: src/components/landing/Pricing.tsx
 * 최근 작업: 세션 6 - 전면 재작성
 *   - 인수인계서 [F] 확정 요금 데이터 적용
 *   - "실시간 이벤트 감지" 삭제
 *   - "경기당 OO원" 비교가 삭제 (인수인계서 [M] ⚠️5)
 *   - 영문 가격: $7.99 / $24.99 / $299.99
 *   - useLang() 훅으로 i18n 전환 적용
 * 작성일: 2026-03-07
 * ============================================================
 */

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/providers/LanguageProvider";

/* ── 한/영 섹션 텍스트 ── */
const text = {
  ko: {
    sectionTitle: "요금 안내",
    sectionSubtitle: "동네 축구도 프로처럼, 부담 없는 가격으로 시작하세요",
  },
  en: {
    sectionTitle: "Pricing",
    sectionSubtitle: "Start your pro-level experience at an affordable price",
  },
};

/* ── 요금 플랜 데이터 (인수인계서 [F] 확정) ── */
const plans = {
  ko: [
    {
      name: "단건 구매",
      description: "1경기만 이용하고 싶을 때",
      price: "9,900",
      unit: "원 / 경기",
      features: [
        "2시간 이내 경기 1회",
        "AI 예능 캐스터 3명 해설",
        "예능 본편 영상 (20~30분)",
        "하이라이트 숏폼 (1분 × 3~5개)",
      ],
      popular: false,
      cta: "단건 구매하기",
    },
    {
      name: "월간 구독",
      description: "매주 경기하는 동네 팀에 딱!",
      price: "35,000",
      unit: "원 / 월",
      features: [
        "월 4회 경기 이용",
        "AI 예능 캐스터 3명 해설",
        "예능 본편 영상 (20~30분)",
        "하이라이트 숏폼 (1분 × 3~5개)",
        "팀 전용 페이지 제공",
        "우선 처리",
      ],
      popular: true,
      cta: "월간 구독하기",
    },
    {
      name: "연간 구독",
      description: "리그를 운영하는 팀에 추천",
      price: "400,000",
      unit: "원 / 년",
      features: [
        "연 50회 경기 이용",
        "AI 예능 캐스터 3명 해설",
        "예능 본편 영상 (20~30분)",
        "하이라이트 숏폼 (1분 × 3~5개)",
        "팀 전용 페이지 제공",
        "시즌 통계 리포트",
        "다음 시즌 할인 쿠폰",
        "최우선 처리",
      ],
      popular: false,
      cta: "연간 구독하기",
    },
  ],
  en: [
    {
      name: "Single Game",
      description: "Perfect for a one-time experience",
      price: "$7.99",
      unit: "/ game",
      features: [
        "1 game up to 2 hours",
        "3 AI entertainment casters",
        "Full show video (20-30 min)",
        "Highlight shorts (1 min × 3-5)",
      ],
      popular: false,
      cta: "Buy Now",
    },
    {
      name: "Monthly",
      description: "For teams that play every week!",
      price: "$24.99",
      unit: "/ mo",
      features: [
        "Up to 4 games per month",
        "3 AI entertainment casters",
        "Full show video (20-30 min)",
        "Highlight shorts (1 min × 3-5)",
        "Team page included",
        "Priority processing",
      ],
      popular: true,
      cta: "Subscribe Monthly",
    },
    {
      name: "Annual",
      description: "For teams running a league",
      price: "$299.99",
      unit: "/ yr",
      features: [
        "Up to 50 games per year",
        "3 AI entertainment casters",
        "Full show video (20-30 min)",
        "Highlight shorts (1 min × 3-5)",
        "Team page included",
        "Season statistics report",
        "Next season discount coupon",
        "Top priority processing",
      ],
      popular: false,
      cta: "Subscribe Annually",
    },
  ],
};

export default function Pricing() {
  const { lang } = useLang();
  const t = text[lang];
  const planList = plans[lang];

  return (
    <section id="pricing" className="py-20 sm:py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* ── 섹션 헤더 ── */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
            <span className="gradient-text">{t.sectionTitle}</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t.sectionSubtitle}
          </p>
        </div>

        {/* ── 플랜 카드 ── */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {planList.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl border p-6 transition-all duration-300 ${
                plan.popular
                  ? "border-blue-400 shadow-lg shadow-blue-100/50 scale-[1.02]"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-md"
              }`}
            >
              {/* BEST 뱃지 */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-blue-500 border-0 text-white px-4 py-1 shadow-md">
                    BEST
                  </Badge>
                </div>
              )}

              {/* 플랜 이름 & 설명 */}
              <div className="text-center pb-4 pt-2">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {plan.name}
                </h3>
                <p className="text-gray-500 text-sm">{plan.description}</p>
              </div>

              {/* 가격 */}
              <div className="text-center my-4">
                <span className="text-4xl font-bold text-gray-900">
                  {plan.price}
                </span>
                <span className="text-gray-400 text-sm ml-1">{plan.unit}</span>
              </div>

              {/* 기능 목록 */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <svg
                      className="w-4 h-4 text-blue-500 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA 버튼 */}
              <Button
                variant={plan.popular ? "default" : "outline"}
                className="w-full"
                asChild
              >
                <Link href="/demo">{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
