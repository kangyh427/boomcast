"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Commentary, MatchEvent } from "@/lib/types";
import { demoScenario } from "@/lib/demo-data";
import { getCasterById } from "@/lib/casters";

interface TypingState {
  commentary: Commentary;
  displayedText: string;
}

interface PlayerState {
  isPlaying: boolean;
  currentEventIndex: number;
  displayedCommentaries: Commentary[];
  typingCommentary: TypingState | null;
  currentEvent: MatchEvent | null;
  homeScore: number;
  awayScore: number;
  matchMinute: string;
  progress: number;
  ttsEnabled: boolean;
}

export function useCommentaryPlayer() {
  const [state, setState] = useState<PlayerState>({
    isPlaying: false,
    currentEventIndex: -1,
    displayedCommentaries: [],
    typingCommentary: null,
    currentEvent: null,
    homeScore: 0,
    awayScore: 0,
    matchMinute: "0'",
    progress: 0,
    ttsEnabled: false,
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const typingRef = useRef<NodeJS.Timeout | null>(null);
  const commentaryQueueRef = useRef<Commentary[]>([]);
  const isProcessingRef = useRef(false);
  const enabledCastersRef = useRef<Set<string>>(
    new Set(["caster-pbp", "caster-analyst", "caster-entertainer"])
  );
  const [enabledCasters, setEnabledCasters] = useState<Set<string>>(
    new Set(["caster-pbp", "caster-analyst", "caster-entertainer"])
  );

  const speak = useCallback((text: string, casterId: string) => {
    if (!state.ttsEnabled) return;
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const caster = getCasterById(casterId);
    if (!caster) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ko-KR";
    utterance.pitch = caster.voicePitch;
    utterance.rate = caster.voiceRate;
    window.speechSynthesis.speak(utterance);
  }, [state.ttsEnabled]);

  const processNextCommentary = useCallback(() => {
    if (isProcessingRef.current) return;
    if (commentaryQueueRef.current.length === 0) {
      isProcessingRef.current = false;
      return;
    }

    isProcessingRef.current = true;
    const commentary = commentaryQueueRef.current.shift()!;

    if (!enabledCastersRef.current.has(commentary.casterId)) {
      isProcessingRef.current = false;
      processNextCommentary();
      return;
    }

    let charIndex = 0;
    const text = commentary.text;
    const typeSpeed = 30;

    const typeNextChar = () => {
      if (charIndex <= text.length) {
        setState((prev) => ({
          ...prev,
          typingCommentary: {
            commentary,
            displayedText: text.slice(0, charIndex),
          },
        }));
        charIndex++;
        typingRef.current = setTimeout(typeNextChar, typeSpeed);
      } else {
        // Typing complete - move to displayed
        setState((prev) => ({
          ...prev,
          typingCommentary: null,
          displayedCommentaries: [...prev.displayedCommentaries, commentary],
        }));

        speak(text, commentary.casterId);

        isProcessingRef.current = false;
        // Process next after a short delay
        setTimeout(() => processNextCommentary(), 500);
      }
    };

    typeNextChar();
  }, [speak]);

  const processEvent = useCallback(
    (eventIndex: number) => {
      const events = demoScenario.events;
      if (eventIndex >= events.length) {
        setState((prev) => ({ ...prev, isPlaying: false }));
        return;
      }

      const event = events[eventIndex];
      const commentaries = demoScenario.commentaries[event.id] || [];

      // Calculate score
      let homeScore = 0;
      let awayScore = 0;
      for (let i = 0; i <= eventIndex; i++) {
        if (events[i].type === "goal") {
          if (events[i].team === "home") homeScore++;
          else awayScore++;
        }
      }

      setState((prev) => ({
        ...prev,
        currentEventIndex: eventIndex,
        currentEvent: event,
        homeScore,
        awayScore,
        matchMinute: event.matchMinute,
        progress: ((eventIndex + 1) / events.length) * 100,
      }));

      // Queue commentaries
      commentaryQueueRef.current = [...commentaries];
      processNextCommentary();

      // Schedule next event
      const delay = commentaries.length * 2500 + 1500;
      timeoutRef.current = setTimeout(() => {
        processEvent(eventIndex + 1);
      }, delay);
    },
    [processNextCommentary]
  );

  const play = useCallback(() => {
    const startIndex =
      state.currentEventIndex < 0 ? 0 : state.currentEventIndex;
    setState((prev) => ({ ...prev, isPlaying: true }));
    processEvent(startIndex);
  }, [state.currentEventIndex, processEvent]);

  const pause = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (typingRef.current) clearTimeout(typingRef.current);
    commentaryQueueRef.current = [];
    isProcessingRef.current = false;
    setState((prev) => ({
      ...prev,
      isPlaying: false,
      typingCommentary: null,
    }));
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const reset = useCallback(() => {
    pause();
    setState({
      isPlaying: false,
      currentEventIndex: -1,
      displayedCommentaries: [],
      typingCommentary: null,
      currentEvent: null,
      homeScore: 0,
      awayScore: 0,
      matchMinute: "0'",
      progress: 0,
      ttsEnabled: state.ttsEnabled,
    });
  }, [pause, state.ttsEnabled]);

  const jumpToEvent = useCallback(
    (index: number) => {
      pause();

      // Collect all commentaries up to this event
      const events = demoScenario.events;
      const allCommentaries: Commentary[] = [];
      let homeScore = 0;
      let awayScore = 0;

      for (let i = 0; i < index; i++) {
        const evtCommentaries = demoScenario.commentaries[events[i].id] || [];
        const filtered = evtCommentaries.filter((c) =>
          enabledCastersRef.current.has(c.casterId)
        );
        allCommentaries.push(...filtered);

        if (events[i].type === "goal") {
          if (events[i].team === "home") homeScore++;
          else awayScore++;
        }
      }

      setState((prev) => ({
        ...prev,
        currentEventIndex: index,
        currentEvent: events[index],
        displayedCommentaries: allCommentaries,
        homeScore,
        awayScore,
        matchMinute: events[index].matchMinute,
        progress: ((index + 1) / events.length) * 100,
      }));

      // Start playing from this event
      setTimeout(() => {
        setState((prev) => ({ ...prev, isPlaying: true }));
        const commentaries = demoScenario.commentaries[events[index].id] || [];
        commentaryQueueRef.current = [...commentaries];
        processNextCommentary();

        const delay = commentaries.length * 2500 + 1500;
        timeoutRef.current = setTimeout(() => {
          processEvent(index + 1);
        }, delay);
      }, 100);
    },
    [pause, processEvent, processNextCommentary]
  );

  const toggleCaster = useCallback((casterId: string) => {
    setEnabledCasters((prev) => {
      const next = new Set(prev);
      if (next.has(casterId)) {
        if (next.size > 1) next.delete(casterId);
      } else {
        next.add(casterId);
      }
      enabledCastersRef.current = next;
      return next;
    });
  }, []);

  const toggleTTS = useCallback(() => {
    setState((prev) => ({ ...prev, ttsEnabled: !prev.ttsEnabled }));
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (typingRef.current) clearTimeout(typingRef.current);
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    ...state,
    enabledCasters,
    play,
    pause,
    reset,
    jumpToEvent,
    toggleCaster,
    toggleTTS,
    activeCasterId: state.typingCommentary?.commentary.casterId ?? null,
  };
}
