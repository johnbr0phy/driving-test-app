"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useV2Store, EMPTY_V2, V2Data } from "@/store/useV2Store";
import { loadV2, mergeV2, saveV2 } from "@/lib/v2/sync";

const pick = (s: V2Data): V2Data => ({ sessions: s.sessions, results: s.results, drills: s.drills, basics: s.basics, goals: s.goals });

/**
 * Keeps the v2 store in step with the signed-in account so the phone drills
 * and the desktop test share one record. Guests stay local. On sign-in the
 * guest data is merged into the account; on sign-out (or a different account
 * on the same browser) the local copy is cleared.
 */
export function V2Sync() {
  const { user, loading } = useAuth();
  const userId = user?.uid ?? null;
  const ready = useRef<string | null>(null);

  useEffect(() => {
    if (loading) return;
    const uid = userId;
    const state = useV2Store.getState();

    if (!uid) {
      ready.current = null;
      // Signed out after using an account here: don't leave its progress behind.
      if (state.syncedUid) state.replaceData(EMPTY_V2, null);
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let unsubscribe: (() => void) | undefined;

    (async () => {
      try {
        // Another account's copy on this browser is not ours to merge.
        const local = state.syncedUid && state.syncedUid !== uid ? EMPTY_V2 : pick(useV2Store.getState());
        const remote = await loadV2(uid);
        if (cancelled) return;
        const merged = remote ? mergeV2(local, remote) : local;
        // A goal picked while the account was loading is newer than the
        // account's copy: keep it instead of snapping back to the saved one.
        const goalsNow = useV2Store.getState().goals;
        if (goalsNow !== local.goals) {
          const changed = Object.fromEntries(Object.entries(goalsNow).filter(([k, v]) => local.goals[k] !== v));
          merged.goals = { ...merged.goals, ...changed };
        }
        useV2Store.getState().replaceData(merged, uid);
        await saveV2(uid, merged);
        if (cancelled) return;
        ready.current = uid;
        unsubscribe = useV2Store.subscribe((next, prev) => {
          if (ready.current !== uid) return;
          if (next.sessions === prev.sessions && next.results === prev.results && next.drills === prev.drills && next.basics === prev.basics && next.goals === prev.goals) return;
          clearTimeout(timer);
          timer = setTimeout(() => saveV2(uid, pick(useV2Store.getState())).catch((e) => console.error("v2 sync failed", e)), 1500);
        });
      } catch (e) {
        console.error("v2 sync load failed", e);
      }
    })();

    // Flush a pending save when the tab is hidden (phone locked, tab closed).
    const flush = () => {
      if (document.visibilityState === "hidden" && ready.current === uid && timer) {
        clearTimeout(timer);
        timer = undefined;
        saveV2(uid, pick(useV2Store.getState())).catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", flush);

    return () => {
      cancelled = true;
      // Leaving the page (or a re-run) must not drop a save still waiting out its debounce.
      if (ready.current === uid && timer) saveV2(uid, pick(useV2Store.getState())).catch(() => {});
      ready.current = null;
      unsubscribe?.();
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", flush);
    };
  }, [userId, loading]);

  return null;
}
