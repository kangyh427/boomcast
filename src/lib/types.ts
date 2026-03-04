export type CasterRole = "play_by_play" | "analyst" | "entertainer";

export interface Caster {
  id: string;
  name: string;
  role: CasterRole;
  description: string;
  personality: string;
  color: string;
  avatar: string;
  voicePitch: number;
  voiceRate: number;
}

export type EventType =
  | "goal"
  | "foul"
  | "corner"
  | "offside"
  | "save"
  | "shot"
  | "card_yellow"
  | "card_red"
  | "substitution"
  | "half_time"
  | "full_time"
  | "kick_off"
  | "free_kick"
  | "penalty";

export interface MatchEvent {
  id: string;
  type: EventType;
  timestamp: number; // seconds into the match
  matchMinute: string;
  team: "home" | "away";
  player?: string;
  description: string;
  importance: "low" | "medium" | "high" | "critical";
}

export interface Commentary {
  id: string;
  eventId: string;
  casterId: string;
  text: string;
  timestamp: number;
  emotion: "neutral" | "excited" | "analytical" | "humorous" | "tense";
}

export interface MatchState {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  currentMinute: string;
  status: "not_started" | "first_half" | "half_time" | "second_half" | "full_time";
  events: MatchEvent[];
}

export interface DemoScenario {
  id: string;
  title: string;
  description: string;
  match: MatchState;
  events: MatchEvent[];
  commentaries: Record<string, Commentary[]>;
}
