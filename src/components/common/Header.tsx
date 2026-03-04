"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm">
              B
            </div>
            <span className="text-xl font-bold gradient-text">BoomCast</span>
          </Link>

          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/"
              className={cn(
                "px-3 py-2 text-sm rounded-lg transition-colors",
                pathname === "/"
                  ? "text-white font-medium bg-white/5"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              홈
            </Link>
            <Link
              href="/demo"
              className={cn(
                "px-3 py-2 text-sm rounded-lg transition-colors",
                pathname === "/demo"
                  ? "text-white font-medium bg-white/5"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              데모
            </Link>
            <Link
              href="/#pricing"
              className="px-3 py-2 text-sm rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              요금
            </Link>
            <Button size="sm" asChild className="ml-2">
              <Link href="/demo">체험하기</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
