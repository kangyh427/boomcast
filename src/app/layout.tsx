import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/common/Header";

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
      </body>
    </html>
  );
}
