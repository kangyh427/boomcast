/*
 * ============================================================
 * 파일: src/components/common/Header.tsx
 * 설명: BoomCast 헤더 - 화이트 테마
 * 경로: src/components/common/Header.tsx
 * 최근 작업: 세션 7-B
 *   - 언어 전환 버튼(🇰🇷/🇺🇸) UI 삭제 (한국 서비스 우선)
 *   - useLang()은 내부 텍스트 전환용으로 유지 (향후 미국 확장 대비)
 *   - MobileMenu에 toggleLang prop 제거
 * 작성일: 2026-03-07
 * ============================================================
 */

"use client";

import { useState } from "react";
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
  const { lang } = useLang();

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

          {/* ── 데스크탑 네비게이션 (md 이상) ── */}
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

          {/* ── 우측 영역: CTA + 햄버거 ── */}
          <div className="flex items-center gap-2">

            {/* CTA 버튼 (데스크탑) */}
            <Button size="sm" asChild className="hidden md:inline-flex">
              <Link href="/demo">
                {lang === "ko" ? "무료 체험" : "Try Free"}
              </Link>
            </Button>

            {/* 햄버거 메뉴 (모바일) */}
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
      />
    </header>
  );
}
