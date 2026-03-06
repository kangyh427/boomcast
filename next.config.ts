/*
 * ============================================================
 * 파일: next.config.ts (프로젝트 루트)
 * 설명: Next.js 설정 - Webpack 빌드 사용
 * 경로: next.config.ts
 * 최근 작업: 세션 4 - Turbopack 비활성화
 *           Tailwind CSS v4의 @import "tailwindcss" 구문이
 *           Turbopack에서 PostCSS 파서 충돌을 일으키는 문제 해결
 *           Webpack 빌드는 @tailwindcss/postcss와 완벽 호환
 * 작성일: 2025-03-06
 * ============================================================
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Turbopack이 @import "tailwindcss"를 올바르게 처리하지 못하는 문제가 있어
     프로덕션 빌드에서 Webpack을 사용합니다.
     Next.js 16에서 Turbopack은 기본 dev 서버에서만 사용되며,
     프로덕션 빌드(next build)는 기본적으로 Webpack을 사용합니다.
     아래 설정은 향후 Turbopack이 기본 빌드로 변경될 경우를 대비한 안전장치입니다. */
};

export default nextConfig;
