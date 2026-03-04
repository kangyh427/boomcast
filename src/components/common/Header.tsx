"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm">
              B
            </div>
            <span className="text-xl font-bold gradient-text">BoomCast</span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm transition-colors ${
                pathname === "/"
                  ? "text-white font-medium"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              홈
            </Link>
            <Link
              href="/demo"
              className={`text-sm transition-colors ${
                pathname === "/demo"
                  ? "text-white font-medium"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              데모
            </Link>
            <Link
              href="/demo"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-medium rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-500/25"
            >
              체험하기
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
