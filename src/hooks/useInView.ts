/*
 * ============================================================
 * 파일: src/hooks/useInView.ts
 * 설명: IntersectionObserver 기반 스크롤 등장 애니메이션 훅
 * 경로: src/hooks/useInView.ts
 * 최근 작업: 세션 9 - 신규 생성
 *   - threshold 0.2 (20% 보이면 트리거)
 *   - once: true (한번 나타나면 재트리거 안 함)
 *   - ref를 반환하여 컴포넌트에서 직접 사용
 *   - 자동으로 reveal + reveal-visible CSS 클래스 토글
 * 사용법:
 *   const ref = useInView();
 *   <div ref={ref} className="reveal">...</div>
 * 작성일: 2026-03-07
 * ============================================================
 */

"use client";

import { useEffect, useRef, useCallback } from "react";

interface UseInViewOptions {
  /** 화면에 몇 % 보이면 트리거 (0~1, 기본 0.2) */
  threshold?: number;
  /** 한번만 트리거할지 (기본 true) */
  once?: boolean;
  /** 루트 마진 (기본 "0px 0px -40px 0px" — 하단 40px 여유) */
  rootMargin?: string;
}

/**
 * useInView — 요소가 뷰포트에 진입하면 'reveal-visible' 클래스를 추가합니다.
 *
 * globals.css의 .reveal / .reveal-visible과 함께 사용합니다.
 * - .reveal: opacity:0 + translateY(30px)
 * - .reveal-visible: opacity:1 + translateY(0)
 *
 * @example
 * function MyComponent() {
 *   const ref = useInView();
 *   return <div ref={ref} className="reveal">등장!</div>;
 * }
 *
 * @example 스태거 애니메이션
 * function MyList() {
 *   const ref = useInView();
 *   return (
 *     <div ref={ref}>
 *       <div className="reveal stagger-1">첫째</div>
 *       <div className="reveal stagger-2">둘째</div>
 *       <div className="reveal stagger-3">셋째</div>
 *     </div>
 *   );
 * }
 */
export function useInView(options: UseInViewOptions = {}) {
  const {
    threshold = 0.2,
    once = true,
    rootMargin = "0px 0px -40px 0px",
  } = options;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    /* 모션 감소 설정 시 즉시 표시 */
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      element.classList.add("reveal-visible");
      /* 자식 요소 중 reveal 클래스가 있는 것도 즉시 표시 */
      element
        .querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale")
        .forEach((child) => child.classList.add("reveal-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");

            /* 자식 요소에도 reveal-visible 전파 */
            entry.target
              .querySelectorAll(
                ".reveal, .reveal-left, .reveal-right, .reveal-scale"
              )
              .forEach((child) => child.classList.add("reveal-visible"));

            if (once) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once, rootMargin]);

  return ref;
}

/**
 * useInViewMultiple — 여러 자식 요소를 각각 개별적으로 관찰합니다.
 * 부모 ref를 전달하면, 내부의 .reveal 클래스 요소들을 각각 관찰합니다.
 *
 * @example
 * function CardGrid() {
 *   const containerRef = useInViewMultiple();
 *   return (
 *     <div ref={containerRef}>
 *       <div className="reveal stagger-1">카드 1</div>
 *       <div className="reveal stagger-2">카드 2</div>
 *       <div className="reveal stagger-3">카드 3</div>
 *     </div>
 *   );
 * }
 */
export function useInViewMultiple(options: UseInViewOptions = {}) {
  const {
    threshold = 0.2,
    once = true,
    rootMargin = "0px 0px -40px 0px",
  } = options;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const targets = container.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale"
    );

    if (prefersReducedMotion) {
      targets.forEach((el) => el.classList.add("reveal-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            if (once) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    targets.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [threshold, once, rootMargin]);

  return ref;
}
