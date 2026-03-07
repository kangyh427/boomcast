/*
 * ============================================================
 * 파일: src/providers/LanguageProvider.tsx
 * 설명: BoomCast 글로벌 한/영 전환 Context Provider
 * 경로: src/providers/LanguageProvider.tsx
 * 최근 작업: 세션 6 - 신규 생성
 *   - 전체 앱의 언어 상태를 하나의 Context로 관리
 *   - localStorage에 언어 설정 저장 (새로고침 유지)
 *   - 모든 컴포넌트에서 useLang() 훅으로 접근
 * 작성일: 2026-03-07
 * ============================================================
 */

"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

/* ── 타입 정의 ── */
export type Lang = "ko" | "en";

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  setLang: (lang: Lang) => void;
}

/* ── Context 생성 ── */
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/* ── Provider 컴포넌트 ── */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ko");
  const [isHydrated, setIsHydrated] = useState(false);

  /* 초기 로드: localStorage에서 언어 설정 복원 */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("boomcast-lang");
      if (saved === "ko" || saved === "en") {
        setLangState(saved);
      }
    } catch {
      /* localStorage 접근 불가 환경 대응 (SSR 등) */
    }
    setIsHydrated(true);
  }, []);

  /* 언어 변경 시 localStorage에 저장 */
  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    try {
      localStorage.setItem("boomcast-lang", newLang);
    } catch {
      /* localStorage 접근 불가 환경 대응 */
    }
  };

  /* 토글 함수: ko ↔ en 전환 */
  const toggleLang = () => {
    setLang(lang === "ko" ? "en" : "ko");
  };

  /* hydration 완료 전에는 기본값(ko) 유지 - 깜빡임 방지 */
  if (!isHydrated) {
    return (
      <LanguageContext.Provider value={{ lang: "ko", toggleLang: () => {}, setLang: () => {} }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

/* ── 커스텀 훅: 모든 컴포넌트에서 사용 ── */
export function useLang(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLang()은 <LanguageProvider> 내부에서만 사용할 수 있습니다.");
  }
  return context;
}
