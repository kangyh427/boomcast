/*
 * ============================================================
 * 파일: src/components/demo/CasterPanel.tsx
 * 설명: AI 캐스터 패널 컴포넌트 - 화이트 테마
 * 경로: src/components/demo/CasterPanel.tsx
 * 최근 작업: 세션 7-B
 *   - useLang() 적용: 제목 한영 전환
 *   - "AI 캐스터" → 한영 전환
 * 작성일: 2026-03-07
 * ============================================================
 */

"use client";

import { Caster } from "@/lib/types";
import { useLang } from "@/providers/LanguageProvider";

interface CasterPanelProps {
  casters: Caster[];
  activeCasterId: string | null;
  onToggleCaster?: (casterId: string) => void;
  enabledCasters: Set<string>;
}

/* ── 한/영 텍스트 ── */
const text = {
  ko: { title: "AI 캐스터" },
  en: { title: "AI Casters" },
};

export default function CasterPanel({
  casters,
  activeCasterId,
  enabledCasters,
  onToggleCaster,
}: CasterPanelProps) {
  const { lang } = useLang();
  const t = text[lang];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <span>🎙️</span> {t.title}
      </h3>
      <div className="space-y-2">
        {casters.map((caster) => {
          const isActive = activeCasterId === caster.id;
          const isEnabled = enabledCasters.has(caster.id);

          return (
            <button
              key={caster.id}
              onClick={() => onToggleCaster?.(caster.id)}
              className={`w-full text-left p-3 rounded-lg transition-all duration-300 cursor-pointer ${
                isActive
                  ? "ring-2"
                  : isEnabled
                  ? "bg-gray-50 hover:bg-gray-100"
                  : "bg-gray-50 opacity-40 hover:opacity-60"
              }`}
              style={{
                outlineColor: isActive ? caster.color : undefined,
                outline: isActive ? `2px solid ${caster.color}` : undefined,
                outlineOffset: "2px",
                backgroundColor: isActive
                  ? `${caster.color}10`
                  : undefined,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                  style={{ backgroundColor: `${caster.color}15` }}
                >
                  {caster.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-medium text-sm"
                      style={{ color: isEnabled ? caster.color : "#9ca3af" }}
                    >
                      {caster.name}
                    </span>
                    {isActive && (
                      <span
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: caster.color }}
                      />
                    )}
                  </div>
                  <span className="text-xs text-gray-400">
                    {caster.description}
                  </span>
                </div>
                <div
                  className={`w-3 h-3 rounded-full border-2 transition-colors ${
                    isEnabled
                      ? "border-current bg-current"
                      : "border-gray-300"
                  }`}
                  style={{
                    borderColor: isEnabled ? caster.color : undefined,
                    backgroundColor: isEnabled ? caster.color : undefined,
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
