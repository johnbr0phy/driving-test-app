"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { EMPTY_QUIZ_DATA, useQuizStore, type QuizData } from "@/store/useQuizStore";
import { loadQuizData, mergeQuizData, saveQuizData } from "@/lib/quizSync";

const pick = (s: QuizData): QuizData => ({ progress: s.progress, recent: s.recent });

/**
 * Keeps quiz progress in step with the signed-in account (mounted by the
 * /q pages and /create). Guests stay local; on sign-in the guest copy is
 * merged into the account; on sign-out the local copy is cleared.
 */
export function QuizSync() {
  const { user, loading } = useAuth();
  const userId = user?.uid ?? null;
  const ready = useRef<string | null>(null);

  useEffect(() => {
    if (loading) return;
    const uid = userId;
    const state = useQuizStore.getState();

    if (!uid) {
      ready.current = null;
      if (state.syncedUid) state.replaceData(EMPTY_QUIZ_DATA, null);
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let unsubscribe: (() => void) | undefined;

    (async () => {
      try {
        const local = state.syncedUid && state.syncedUid !== uid ? EMPTY_QUIZ_DATA : pick(useQuizStore.getState());
        const remote = await loadQuizData(uid);
        if (cancelled) return;
        const merged = remote ? mergeQuizData(local, remote) : local;
        useQuizStore.getState().replaceData(merged, uid);
        await saveQuizData(uid, merged);
        if (cancelled) return;
        ready.current = uid;
        unsubscribe = useQuizStore.subscribe((next, prev) => {
          if (ready.current !== uid) return;
          if (next.progress === prev.progress && next.recent === prev.recent) return;
          clearTimeout(timer);
          timer = setTimeout(() => saveQuizData(uid, pick(useQuizStore.getState())).catch((e) => console.error("quiz sync failed", e)), 1500);
        });
      } catch (e) {
        console.error("quiz sync load failed", e);
      }
    })();

    const flush = () => {
      if (document.visibilityState === "hidden" && ready.current === uid && timer) {
        clearTimeout(timer);
        timer = undefined;
        saveQuizData(uid, pick(useQuizStore.getState())).catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", flush);

    return () => {
      cancelled = true;
      if (ready.current === uid && timer) saveQuizData(uid, pick(useQuizStore.getState())).catch(() => {});
      ready.current = null;
      unsubscribe?.();
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", flush);
    };
  }, [userId, loading]);

  return null;
}
