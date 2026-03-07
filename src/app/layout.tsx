/*
 * ============================================================
 * 파일: src/app/layout.tsx
 * 설명: BoomCast 루트 레이아웃 - Header + Footer + LanguageProvider
 * 경로: src/app/layout.tsx
 * 최근 작업: 세션 6 - LanguageProvider 적용
 *   - 전역 한/영 전환 Context 추가
 *   - metadata에서 "실시간" 표현 제거
 *   - Pretendard CDN 폰트 로드 추가
 * 작성일: 2026-03-07
 * ============================================================
 */

import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { LanguageProvider } from "@/providers/LanguageProvider";

export const metadata: Metadata = {
  title: "BoomCast - 동네 축구를 예능 영상으로",
  description:
    "스마트폰으로 촬영하면 AI가 예능 영상을 만들어줍니다. 3명의 AI 캐스터가 동네 축구를 프로 예능 콘텐츠로 변환합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Pretendard 웹폰트 CDN */}
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="antialiased">
        <LanguageProvider>
          <Header />
          <main className="pt-16">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
