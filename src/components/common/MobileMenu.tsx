/*
 * ============================================================
 * 파일: src/components/common/MobileMenu.tsx
 * 설명: BoomCast 모바일 메뉴 드로어 (슬라이드 오버레이)
 * 경로: src/components/common/MobileMenu.tsx
 * 최근 작업: 세션 7-B
 *   - lang prop 제거 → useLang() 훅으로 직접 접근
 *   - 언어 전환 버튼 UI 삭제 (한국 서비스 우선)
 *   - "체험하기" CTA 유지
 * 작성일: 2026-03-07
 * ============================================================
 */

"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLang } from "@/providers/LanguageProvider";

/* ── Props 타입 정의 ── */
interface NavLink {
  href: string;
  labelKo: string;
  labelEn: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  currentPath: string;
}

export default function MobileMenu({
  isOpen,
  onClose,
  navLinks,
  currentPath,
}: MobileMenuProps) {
  const { lang } = useLang();

  /* 메뉴 열릴 때 body 스크롤 방지 */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* ESC 키로 닫기 */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* ── 배경 오버레이 ── */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── 슬라이드 드로어 ── */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* 헤더: 로고 + 닫기 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <span className="text-lg font-bold gradient-text">BoomCast</span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="메뉴 닫기"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 네비게이션 링크 */}
        <nav className="p-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "block px-4 py-3 text-base rounded-lg transition-colors",
                currentPath === link.href
                  ? "text-blue-600 font-medium bg-blue-50"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              {lang === "ko" ? link.labelKo : link.labelEn}
            </Link>
          ))}
        </nav>

        {/* 하단 영역: CTA 버튼 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <Button asChild className="w-full">
            <Link href="/demo" onClick={onClose}>
              {lang === "ko" ? "체험하기" : "Try It"}
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
