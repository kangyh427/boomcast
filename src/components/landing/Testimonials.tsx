/*
 * ============================================================
 * 파일: src/components/landing/Testimonials.tsx
 * 설명: BoomCast 고객 후기 섹션 — 디자인 리뉴얼 v2
 * 경로: src/components/landing/Testimonials.tsx
 * 최근 작업: 세션 11 - 디자인 리뉴얼 (마스터플랜 PART 8-5)
 *   - 이모지 제거 → 이니셜 기반 원형 아바타 placeholder
 *   - ★ 텍스트 → SVG 별 아이콘 (기존 Stars 컴포넌트 유지)
 *   - 인용부호(") 장식 추가
 *   - 배경: white → cream (#FFFBF5)
 *   - useInView + useInViewMultiple 스크롤 등장 애니메이션
 *   - card-hover 효과 적용
 *   - gradient-text 제거 (Hero에서만 1회 사용 규칙)
 *   - 모바일 스와이프(scroll-snap) 유지 + 개선
 * 작성일: 2026-03-07
 * ============================================================
 */

"use client";

import { useLang } from "@/providers/LanguageProvider";
import { useInView, useInViewMultiple } from "@/hooks/useInView";

/* ── 한/영 섹션 텍스트 ── */
const text = {
  ko: {
    sectionTitle: "팀들의 이야기",
    sectionSubtitle:
      "이미 많은 동네 팀들이 BoomCast와 함께하고 있습니다",
  },
  en: {
    sectionTitle: "What Teams Say",
    sectionSubtitle:
      "Local teams are already having fun with BoomCast",
  },
};

/* ── 후기 데이터 ── */
const testimonials = {
  ko: [
    {
      quote:
        "팀원들이 매주 영상을 기다립니다. 동네 축구가 이렇게 재밌어질 줄 몰랐어요.",
      name: "이정민",
      role: "고운동 FC 팀장",
      stars: 5,
      avatarColor: "bg-blue-500",
    },
    {
      quote:
        "아이들 축구 경기를 AI가 예능으로 만들어주니까 가족들이 다 같이 봅니다.",
      name: "박수진",
      role: "세종 주니어 FC 학부모",
      stars: 5,
      avatarColor: "bg-emerald-500",
    },
    {
      quote:
        "숏폼 영상을 인스타에 올렸더니 다른 팀에서도 문의가 왔어요. 바이럴이 진짜 됩니다.",
      name: "김태훈",
      role: "한빛동 FC 매니저",
      stars: 4,
      avatarColor: "bg-purple-500",
    },
  ],
  en: [
    {
      quote:
        "Our teammates look forward to the videos every week. Never knew local soccer could be this fun.",
      name: "James Lee",
      role: "Captain, Riverside FC",
      stars: 5,
      avatarColor: "bg-blue-500",
    },
    {
      quote:
        "AI turns our kids' games into entertainment shows. The whole family watches together now.",
      name: "Sarah Park",
      role: "Parent, Youth Soccer Club",
      stars: 5,
      avatarColor: "bg-emerald-500",
    },
    {
      quote:
        "Posted the highlight shorts on Instagram and other teams started asking about it. Real viral potential.",
      name: "Tom Kim",
      role: "Manager, Sunlight FC",
      stars: 4,
      avatarColor: "bg-purple-500",
    },
  ],
};

/* ── SVG 별점 렌더 (재사용 컴포넌트) ── */
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? "text-amber-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ── 이니셜 아바타 (이모지 대체) ── */
function Avatar({
  name,
  colorClass,
}: {
  name: string;
  colorClass: string;
}) {
  const initial = name.charAt(0).toUpperCase();
  return (
    <div
      className={`w-12 h-12 rounded-full ${colorClass} flex items-center justify-center text-white font-bold text-lg shrink-0`}
    >
      {initial}
    </div>
  );
}

export default function Testimonials() {
  const { lang } = useLang();
  const t = text[lang];
  const reviews = testimonials[lang];

  /* 스크롤 등장 애니메이션 */
  const headerRef = useInView();
  const cardsRef = useInViewMultiple();

  return (
    <section className="py-20 sm:py-28 px-4 bg-cream">
      <div className="max-w-5xl mx-auto">
        {/* ── 섹션 헤더 ── */}
        <div ref={headerRef} className="reveal text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            {t.sectionTitle}
          </h2>
          <p className="text-gray-500 text-lg">{t.sectionSubtitle}</p>
        </div>

        {/* ── 후기 카드: 모바일 스와이프 / 데스크탑 3열 ── */}
        <div
          ref={cardsRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0"
        >
          {reviews.map((review, i) => (
            <div
              key={i}
              className={`reveal stagger-${i + 1} min-w-[280px] sm:min-w-0 snap-center bg-white rounded-2xl p-6 sm:p-7 flex flex-col border border-gray-100 card-hover relative`}
            >
              {/* 인용부호 장식 */}
              <div className="absolute top-4 right-5 text-5xl leading-none text-blue-100 font-serif pointer-events-none select-none">
                &ldquo;
              </div>

              {/* 별점 */}
              <div className="mb-4 relative z-10">
                <Stars count={review.stars} />
              </div>

              {/* 후기 본문 */}
              <blockquote className="text-gray-700 text-sm sm:text-base leading-relaxed flex-1 relative z-10">
                {review.quote}
              </blockquote>

              {/* 작성자 정보: 아바타 + 이름/역할 */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
                <Avatar
                  name={review.name}
                  colorClass={review.avatarColor}
                />
                <div>
                  <p className="font-bold text-gray-900 text-sm">
                    {review.name}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 모바일 스와이프 인디케이터 */}
        <div className="flex justify-center gap-2 mt-4 sm:hidden">
          {reviews.map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-gray-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
