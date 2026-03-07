/*
 * ============================================================
 * 파일: src/components/common/Header.tsx
 * 설명: BoomCast 헤더 — 디자인 리뉴얼 v2
 * 경로: src/components/common/Header.tsx
 * 최근 작업: 세션 11 - 미세 조정 (마스터플랜 PART 9-1 세션 C)
 *   - 로고: gradient-text → 네이비 텍스트 (gradient는 Hero에서만)
 *   - 스크롤 감지: 스크롤 시 그림자 강화 (shadow-sm 추가)
 *   - 네비 호버: 밑줄 애니메이션 추가
 *   - FAQ 네비 링크 추가
 *   - 언어 전환 UI 버튼 없음 유지
 *   - CTA "체험하기" 버튼 유지 (Header CTA는 /demo 이동용)
 * 작성일: 2026-03-07
 * ============================================================
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import MobileMenu from "@/components/common/MobileMenu";
import { useLang } from "@/providers/LanguageProvider";

/* ── 네비게이션 링크 데이터 ── */
const navLinks = [
  { href: "/", labelKo: "홈", labelEn: "Home" },
  { href: "/#features", labelKo: "기능", labelEn: "Features" },
  { href: "/#pricing", labelKo: "요금", labelEn: "Pricing" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { lang } = useLang();

  /* ── 스크롤 감지: 그림자 전환 ── */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b transition-shadow duration-300",
        isScrolled
          ? "border-gray-200 shadow-sm"
          : "border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ── 로고 ── */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm">
              B
            </div>
            <span className="text-xl font-bold text-gray-900">
              BoomCast
            </span>
          </Link>

          {/* ── 데스크탑 네비게이션 (md 이상) ── */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm rounded-lg transition-colors relative",
                  pathname === link.href
                    ? "text-gray-900 font-medium bg-gray-100"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                {lang === "ko" ? link.labelKo : link.labelEn}
              </Link>
            ))}
          </nav>

          {/* ── 우측 영역: CTA + 햄버거 ── */}
          <div className="flex items-center gap-2">
            {/* CTA 버튼 (데스크탑) */}
            <Button size="sm" asChild className="hidden md:inline-flex">
              <Link href="/demo">
                {lang === "ko" ? "체험하기" : "Try It"}
              </Link>
            </Button>

            {/* 햄버거 메뉴 (모바일) */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="메뉴 열기"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── 모바일 메뉴 드로어 ── */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
        currentPath={pathname}
      />
    </header>
  );
}
