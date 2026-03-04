"use client";

import { Caster } from "@/lib/types";
import { Card } from "@/components/ui/card";

interface CasterPanelProps {
  casters: Caster[];
  activeCasterId: string | null;
  onToggleCaster?: (casterId: string) => void;
  enabledCasters: Set<string>;
}

export default function CasterPanel({
  casters,
  activeCasterId,
  enabledCasters,
  onToggleCaster,
}: CasterPanelProps) {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
        <span>🎙️</span> AI 캐스터
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
                  ? "bg-white/5 hover:bg-white/10"
                  : "bg-white/5 opacity-40 hover:opacity-60"
              }`}
              style={{
                outlineColor: isActive ? caster.color : undefined,
                outline: isActive ? `2px solid ${caster.color}` : undefined,
                outlineOffset: "2px",
                backgroundColor: isActive
                  ? `${caster.color}15`
                  : undefined,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                  style={{ backgroundColor: `${caster.color}20` }}
                >
                  {caster.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-medium text-sm"
                      style={{ color: isEnabled ? caster.color : "#6b7280" }}
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
                  <span className="text-xs text-gray-500">
                    {caster.description}
                  </span>
                </div>
                <div
                  className={`w-3 h-3 rounded-full border-2 transition-colors ${
                    isEnabled
                      ? "border-current bg-current"
                      : "border-gray-600"
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
    </Card>
  );
}
