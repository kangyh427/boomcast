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
    <div className="glass rounded-xl p-4">
      <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
        <span>📋</span> 경기 타임라인
      </h3>
      <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2">
        {events.map((event, index) => {
          const isActive = index === currentEventIndex;
          const isPast = index < currentEventIndex;
          const isFuture = index > currentEventIndex;

          return (
            <button
              key={event.id}
              onClick={() => onEventClick(index)}
              className={`w-full text-left p-2.5 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                isActive
                  ? "bg-blue-500/20 border border-blue-500/30"
                  : isPast
                  ? "bg-white/5 hover:bg-white/10"
                  : "opacity-50 hover:opacity-75"
              } ${isFuture ? "cursor-pointer" : "cursor-pointer"}`}
            >
              <span className="text-lg flex-shrink-0">
                {getEventIcon(event.type)}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-mono ${
                      isActive ? "text-blue-400" : "text-gray-500"
                    }`}
                  >
                    {event.matchMinute}
                  </span>
                  <span
                    className={`text-xs font-medium ${getImportanceColor(
                      event.importance
                    )}`}
                  >
                    {event.importance === "critical" && "★"}
                    {event.importance === "high" && "●"}
                  </span>
                </div>
                <p
                  className={`text-sm truncate ${
                    isActive ? "text-white" : "text-gray-400"
                  }`}
                >
                  {event.description}
                </p>
              </div>
              {isActive && (
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
