/*
 * ============================================================
 * 파일: src/components/landing/Pricing.tsx
 * 설명: BoomCast 요금 안내 섹션 - 화이트 테마
 * 경로: src/components/landing/Pricing.tsx
 * 최근 작업: 세션 4 - 화이트 리디자인 + 한/영 텍스트 하드코딩
 *           - 다크 테마 색상 완전 제거
 *           - BEST 플랜: 블루 보더 + 소프트 블루 섀도우
 *           - 체크 아이콘: text-blue-500
 *           - 가격 텍스트: text-gray-900 (기존 text-white)
 *           - 한/영 전환 대비 (lang 변수, 세션 6에서 i18n 훅 교체)
 * 작성일: 2025-03-06
 * ============================================================
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/* ── 한/영 텍스트 ── */
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

/* ── 요금 플랜 데이터 (한/영) ── */
const plans = {
  ko: [
    {
      name: "단건 구매",
      description: "1경기만 이용하고 싶을 때",
      price: "9,900",
      unit: "원 / 경기",
      features: [
        "2시간 이내 경기 1회",
        "AI 멀티 캐스터 3명",
        "실시간 이벤트 감지",
        "경기 하이라이트 영상",
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
        "AI 멀티 캐스터 3명",
        "실시간 이벤트 감지",
        "경기 하이라이트 영상",
        "팀 전용 페이지 제공",
        "경기당 8,750원",
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
        "AI 멀티 캐스터 3명",
        "실시간 이벤트 감지",
        "경기 하이라이트 영상",
        "팀 전용 페이지 제공",
        "시즌 통계 리포트",
        "경기당 8,000원",
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
        "3 AI Multi-Casters",
        "Real-time event detection",
        "Game highlight video",
      ],
      popular: false,
      cta: "Buy Now",
    },
    {
      name: "Monthly",
      description: "For teams that play every week!",
      price: "$24.99",
      unit: "/ month",
      features: [
        "4 games per month",
        "3 AI Multi-Casters",
        "Real-time event detection",
        "Game highlight videos",
        "Team dedicated page",
        "$6.25 per game",
      ],
      popular: true,
      cta: "Subscribe Monthly",
    },
    {
      name: "Annual",
      description: "Best for league-running teams",
      price: "$249.99",
      unit: "/ year",
      features: [
        "50 games per year",
        "3 AI Multi-Casters",
        "Real-time event detection",
        "Game highlight videos",
        "Team dedicated page",
        "Season statistics report",
        "$5.00 per game",
      ],
      popular: false,
      cta: "Subscribe Annually",
    },
  ],
};

export default function Pricing() {
  /* TODO: 세션 6에서 i18n 훅으로 교체 */
  const lang: "ko" | "en" = "ko";
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
              className={`relative bg-white rounded-xl border p-6 transition-all duration-300 ${
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
