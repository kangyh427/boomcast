/*
 * ============================================================
 * 파일: src/components/common/Header.tsx
 * 설명: BoomCast 헤더 - 화이트 테마 + 모바일 햄버거 메뉴
 * 최근 작업: 세션 3 - 전면 리디자인 (다크→화이트)
 *            모바일 메뉴 로직은 MobileMenu.tsx로 분리
 *            한영 전환 버튼 자리 확보 (세션 6에서 i18n 연결)
 * 작성일: 2025-03-06
 * ============================================================
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import MobileMenu from "@/components/common/MobileMenu";

/* ── 네비게이션 링크 데이터 (한/영 하드코딩, 세션 6에서 i18n 교체) ── */
const navLinks = [
  { href: "/", labelKo: "홈", labelEn: "Home" },
  { href: "/demo", labelKo: "데모", labelEn: "Demo" },
  { href: "/#pricing", labelKo: "요금", labelEn: "Pricing" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /* TODO: 세션 6에서 i18n 훅으로 교체 */
  const lang = "ko";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── 로고 ── */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm">
              B
            </div>
            <span className="text-xl font-bold gradient-text">BoomCast</span>
          </Link>

          {/* ── 데스크탑 네비게이션 (md 이상에서 표시) ── */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm rounded-lg transition-colors",
                  pathname === link.href
                    ? "text-gray-900 font-medium bg-gray-100"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                {lang === "ko" ? link.labelKo : link.labelEn}
              </Link>
            ))}
          </nav>

          {/* ── 우측 영역: 언어 전환 + CTA + 햄버거 ── */}
          <div className="flex items-center gap-2">
            {/* 언어 전환 버튼 (세션 6에서 기능 연결) */}
            <button
              className="hidden sm:flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="언어 전환"
            >
              <span>🇰🇷</span>
              <span className="text-gray-300">/</span>
              <span className="opacity-50">🇺🇸</span>
            </button>

            {/* CTA 버튼 (데스크탑) */}
            <Button size="sm" asChild className="hidden md:inline-flex">
              <Link href="/demo">
                {lang === "ko" ? "체험하기" : "Try Demo"}
              </Link>
            </Button>

            {/* 햄버거 메뉴 버튼 (모바일 md 미만) */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="메뉴 열기"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
        lang={lang}
      />
    </header>
  );
}
