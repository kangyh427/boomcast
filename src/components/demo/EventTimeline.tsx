/*
 * ============================================================
 * 파일: src/components/demo/EventTimeline.tsx
 * 설명: 경기 타임라인 컴포넌트 - 화이트 테마
 * 경로: src/components/demo/EventTimeline.tsx
 * 최근 작업: 세션 4 - 화이트 리디자인
 *           - text-gray-300 → text-gray-700 (제목)
 *           - text-white → text-gray-900 (활성 이벤트)
 *           - text-gray-400 → text-gray-500 (일반 이벤트)
 *           - bg-blue-500/20 → bg-blue-50 (활성 배경)
 *           - bg-white/5 → bg-gray-50 (지난 이벤트)
 *           - 카드: 화이트 border 적용
 * 작성일: 2025-03-06
 * ============================================================
 */

"use client";

import { MatchEvent } from "@/lib/types";
import { getEventIcon, getImportanceColor } from "@/lib/demo-data";

interface EventTimelineProps {
  events: MatchEvent[];
  currentEventIndex: number;
  onEventClick: (index: number) => void;
}

export default function EventTimeline({
  events,
  currentEventIndex,
  onEventClick,
}: EventTimelineProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <span>📋</span> 경기 타임라인
      </h3>
      <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2">
        {events.map((event, index) => {
          const isActive = index === currentEventIndex;
          const isPast = index < currentEventIndex;

          return (
            <button
              key={event.id}
              onClick={() => onEventClick(index)}
              className={`w-full text-left p-2.5 rounded-lg transition-all duration-200 flex items-center gap-3 cursor-pointer ${
                isActive
                  ? "bg-blue-50 border border-blue-200"
                  : isPast
                  ? "bg-gray-50 hover:bg-gray-100"
                  : "opacity-50 hover:opacity-75"
              }`}
            >
              <span className="text-lg flex-shrink-0">
                {getEventIcon(event.type)}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-mono ${
                      isActive ? "text-blue-600" : "text-gray-400"
                    }`}
                  >
                    {event.matchMinute}
                  </span>
                  <span
                    className={`text-xs font-medium ${getImportanceColor(event.importance)}`}
                  >
                    {event.importance === "critical" && "★"}
                    {event.importance === "high" && "●"}
                  </span>
                </div>
                <p
                  className={`text-sm truncate ${
                    isActive ? "text-gray-900 font-medium" : "text-gray-500"
                  }`}
                >
                  {event.description}
                </p>
              </div>
              {isActive && (
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
