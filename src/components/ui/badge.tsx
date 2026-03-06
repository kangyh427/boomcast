/*
 * ============================================================
 * 파일: src/components/ui/badge.tsx
 * 설명: BoomCast 뱃지 컴포넌트 - 화이트 테마
 * 최근 작업: 세션 3 - 다크→화이트 색상 교체
 * 작성일: 2025-03-06
 * ============================================================
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        /* 기본: 블루 톤 */
        default: "border-blue-200 bg-blue-50 text-blue-700",
        /* 보조: 그레이 톤 */
        secondary: "border-gray-200 bg-gray-100 text-gray-600",
        /* 파괴적: 레드 톤 */
        destructive: "border-red-200 bg-red-50 text-red-700",
        /* 아웃라인: 보더만 */
        outline: "border-gray-300 text-gray-600",
        /* 성공: 그린 톤 */
        success: "border-green-200 bg-green-50 text-green-700",
        /* 경고: 앰버 톤 */
        warning: "border-amber-200 bg-amber-50 text-amber-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
