/*
 * ============================================================
 * 파일: src/app/layout.tsx
 * 설명: BoomCast 루트 레이아웃 - Header + Footer 배치
 * 최근 작업: 세션 3 - Footer 컴포넌트 추가
 * 작성일: 2025-03-06
 * ============================================================
 */

import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "BoomCast - AI 멀티 페르소나 스포츠 캐스팅",
  description:
    "스마트폰 기반 AI 멀티 페르소나 엔터테인먼트 중계 플랫폼. 2~3명의 AI 캐스터가 실시간으로 경기를 중계합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
