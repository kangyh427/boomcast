/*
 * ============================================================
 * 파일: src/components/landing/Testimonials.tsx
 * 설명: BoomCast 고객 후기 섹션 - 사회적 증명
 * 경로: src/components/landing/Testimonials.tsx
 * 최근 작업: 세션 6 - 신규 생성 (인수인계서 [J-2])
 *   - 가상 후기 데이터 3개 (한/영)
 *   - 모바일: 좌우 스와이프 (CSS scroll-snap)
 *   - 데스크탑: 3열 그리드
 *   - useLang() 적용
 * 작성일: 2026-03-07
 * ============================================================
 */

"use client";

import { useLang } from "@/providers/LanguageProvider";

/* ── 한/영 섹션 텍스트 ── */
const text = {
  ko: {
    sectionTitle: "팀들의 이야기",
    sectionSubtitle: "이미 많은 동네 팀들이 BoomCast와 함께하고 있습니다",
  },
  en: {
    sectionTitle: "What Teams Say",
    sectionSubtitle: "Local teams are already having fun with BoomCast",
  },
};

/* ── 후기 데이터 (인수인계서 [J-2] 가상 데이터) ── */
const testimonials = {
  ko: [
    {
      quote:
        "팀원들이 매주 영상을 기다립니다. 동네 축구가 이렇게 재밌어질 줄 몰랐어요.",
      name: "이정민",
      role: "고운동 FC 팀장",
      stars: 5,
      emoji: "⚽",
    },
    {
      quote:
        "아이들 축구 경기를 AI가 예능으로 만들어주니까 가족들이 다 같이 봅니다.",
      name: "박수진",
      role: "세종 주니어 FC 학부모",
      stars: 5,
      emoji: "👨‍👩‍👧‍👦",
    },
    {
      quote:
        "숏폼 영상을 인스타에 올렸더니 다른 팀에서도 문의가 왔어요. 바이럴이 진짜 됩니다.",
      name: "김태훈",
      role: "한빛동 FC 매니저",
      stars: 4,
      emoji: "📱",
    },
  ],
  en: [
    {
      quote:
        "Our teammates look forward to the videos every week. Never knew local soccer could be this fun.",
      name: "James Lee",
      role: "Captain, Riverside FC",
      stars: 5,
      emoji: "⚽",
    },
    {
      quote:
        "AI turns our kids' games into entertainment shows. The whole family watches together now.",
      name: "Sarah Park",
      role: "Parent, Youth Soccer Club",
      stars: 5,
      emoji: "👨‍👩‍👧‍👦",
    },
    {
      quote:
        "Posted the highlight shorts on Instagram and other teams started asking about it. Real viral potential.",
      name: "Tom Kim",
      role: "Manager, Sunlight FC",
      stars: 4,
      emoji: "📱",
    },
  ],
};

/* ── 별점 렌더 ── */
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

export default function Testimonials() {
  const { lang } = useLang();
  const t = text[lang];
  const reviews = testimonials[lang];

  return (
    <section className="py-20 sm:py-28 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* ── 섹션 헤더 ── */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            <span className="gradient-text">{t.sectionTitle}</span>
          </h2>
          <p className="text-gray-500 text-lg">{t.sectionSubtitle}</p>
        </div>

        {/* ── 후기 카드: 모바일 스와이프 / 데스크탑 3열 ── */}
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="min-w-[280px] sm:min-w-0 snap-center bg-gray-50 rounded-2xl p-6 sm:p-7 flex flex-col border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300"
            >
              {/* 이모지 아이콘 */}
              <div className="text-3xl mb-4">{review.emoji}</div>

              {/* 별점 */}
              <Stars count={review.stars} />

              {/* 후기 본문 */}
              <blockquote className="text-gray-700 text-sm leading-relaxed mt-4 flex-1">
                &ldquo;{review.quote}&rdquo;
              </blockquote>

              {/* 작성자 정보 */}
              <div className="mt-5 pt-4 border-t border-gray-200">
                <p className="font-bold text-gray-900 text-sm">{review.name}</p>
                <p className="text-gray-500 text-xs mt-0.5">{review.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 모바일 스와이프 인디케이터 */}
        <div className="flex justify-center gap-2 mt-4 sm:hidden">
          {reviews.map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-gray-300" />
          ))}
        </div>
      </div>
    </section>
  );
}
