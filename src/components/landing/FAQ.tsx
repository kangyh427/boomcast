/*
 * ============================================================
 * 파일: src/components/landing/FAQ.tsx
 * 설명: BoomCast FAQ 아코디언 섹션
 * 경로: src/components/landing/FAQ.tsx
 * 최근 작업: 세션 7-B
 *   - "무료 체험은 어떻게 하나요?" 항목 삭제
 *   - → "결제는 어떻게 하나요?" 항목으로 교체
 *   - 무료 체험 관련 문구 전면 제거
 * 작성일: 2026-03-07
 * ============================================================
 */

"use client";

import { useState } from "react";
import { useLang } from "@/providers/LanguageProvider";

/* ── 한/영 섹션 텍스트 ── */
const text = {
  ko: {
    sectionTitle: "자주 묻는 질문",
    sectionSubtitle: "궁금한 점이 있으신가요?",
  },
  en: {
    sectionTitle: "FAQ",
    sectionSubtitle: "Got questions? We've got answers.",
  },
};

/* ── FAQ 데이터 ── */
const faqData = {
  ko: [
    {
      q: "어떤 스마트폰이 필요한가요?",
      a: "최근 3년 이내 출시된 Android/iOS 기기면 충분합니다. 삼각대는 1만원대 제품이면 됩니다.",
    },
    {
      q: "영상은 얼마나 걸려서 완성되나요?",
      a: "업로드 완료 후 약 10~15분이면 AI가 예능 영상을 완성합니다. 월간/연간 구독 회원은 우선 처리됩니다.",
    },
    {
      q: "축구 외 다른 스포츠도 되나요?",
      a: "현재는 축구(풋살 포함)에 최적화되어 있습니다. 야구, 농구 등은 순차 지원 예정입니다.",
    },
    {
      q: "팀원들도 가입해야 영상을 볼 수 있나요?",
      a: "아닙니다. 공유 링크를 보내면 누구나 시청할 수 있습니다. 팀 전용 페이지는 월간/연간 구독 시 제공됩니다.",
    },
    {
      q: "결제는 어떻게 하나요?",
      a: "회원가입 후 원하는 요금제를 선택하시면 됩니다. 단건 구매부터 월간/연간 구독까지 다양한 플랜을 제공하고 있습니다.",
    },
    {
      q: "촬영 중 태깅은 어떻게 하나요?",
      a: "앱 내 AI가 골, 파울, 주요 액션 장면을 자동으로 태깅합니다. 직접 태깅할 수도 있으며, 이 경우 AI가 해당 시점 이전 구간을 소급 분석해 정확한 장면을 찾아줍니다.",
    },
  ],
  en: [
    {
      q: "What kind of smartphone do I need?",
      a: "Any Android or iOS device released within the last 3 years will work. A basic tripod ($10-15) is all you need.",
    },
    {
      q: "How long does it take to get the video?",
      a: "About 10-15 minutes after the upload is complete. Monthly/Annual subscribers get priority processing.",
    },
    {
      q: "Does it work for sports other than soccer?",
      a: "Currently optimized for soccer (including futsal). Baseball, basketball, and other sports are coming soon.",
    },
    {
      q: "Do my teammates need to sign up to watch?",
      a: "No. Anyone can watch via the share link. Team pages are available with Monthly/Annual plans.",
    },
    {
      q: "How do I pay?",
      a: "Sign up and choose your preferred plan. We offer single game purchases, monthly, and annual subscriptions.",
    },
    {
      q: "How does tagging work during recording?",
      a: "The in-app AI auto-tags goals, fouls, and key action moments. You can also tag manually — the AI will then analyze prior footage to pinpoint the exact highlight.",
    },
  ],
};

export default function FAQ() {
  const { lang } = useLang();
  const t = text[lang];
  const items = faqData[lang];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 sm:py-28 px-4 bg-gray-50/60">
      <div className="max-w-3xl mx-auto">
        {/* ── 섹션 헤더 ── */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            <span className="gradient-text">{t.sectionTitle}</span>
          </h2>
          <p className="text-gray-500 text-lg">{t.sectionSubtitle}</p>
        </div>

        {/* ── 아코디언 ── */}
        <div className="space-y-3">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-blue-200 shadow-md shadow-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {/* 질문 버튼 */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-sm sm:text-base font-semibold text-gray-900 pr-4">
                    {item.q}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* 답변 영역 */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-5">
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
