/*
 * ============================================================
 * 파일: src/components/landing/FAQ.tsx
 * 설명: BoomCast FAQ 아코디언 섹션 — 디자인 리뉴얼 v2
 * 경로: src/components/landing/FAQ.tsx
 * 최근 작업: 세션 11 - 디자인 리뉴얼 (마스터플랜 PART 8-7)
 *   - 열림/닫힘: max-h 방식 → ref 기반 실제 높이 전환 (부드러움 개선)
 *   - 활성 항목 좌측 블루 바 (3px) 표시
 *   - 배경: gray-50/60 → white (Pricing이 slate이므로 대비)
 *   - gradient-text 제거 (Hero에서만 사용 규칙)
 *   - useInView 스크롤 등장 애니메이션
 *   - "무료" 문구 없음 유지
 *   - chevron 회전 애니메이션 유지
 * 작성일: 2026-03-07
 * ============================================================
 */

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { useLang } from "@/providers/LanguageProvider";
import { useInView, useInViewMultiple } from "@/hooks/useInView";

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

/* ── 개별 아코디언 아이템 컴포넌트 (ref 기반 높이 전환) ── */
function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  /* 답변 열림/닫힘 시 실제 높이를 계산 */
  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? "border-blue-200 shadow-md shadow-blue-50/60 border-l-[3px] border-l-blue-500"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {/* 질문 버튼 */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="text-sm sm:text-base font-semibold text-gray-900 pr-4">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-blue-500" : ""
          }`}
        />
      </button>

      {/* 답변 영역: ref 기반 실제 높이로 부드러운 전환 */}
      <div
        style={{ maxHeight: height }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div ref={contentRef} className="px-6 pb-5">
          <p className="text-sm text-gray-500 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { lang } = useLang();
  const t = text[lang];
  const items = faqData[lang];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = useCallback(
    (index: number) => {
      setOpenIndex(openIndex === index ? null : index);
    },
    [openIndex]
  );

  /* 스크롤 등장 애니메이션 */
  const headerRef = useInView();
  const listRef = useInViewMultiple();

  return (
    <section className="py-20 sm:py-28 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        {/* ── 섹션 헤더 ── */}
        <div ref={headerRef} className="reveal text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            {t.sectionTitle}
          </h2>
          <p className="text-gray-500 text-lg">{t.sectionSubtitle}</p>
        </div>

        {/* ── 아코디언 ── */}
        <div ref={listRef} className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className={`reveal stagger-${Math.min(index + 1, 5)}`}
            >
              <AccordionItem
                question={item.q}
                answer={item.a}
                isOpen={openIndex === index}
                onToggle={() => toggle(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
