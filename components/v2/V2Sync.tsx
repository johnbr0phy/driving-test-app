"use client";

import { useEffect, useRef, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { useV2Store, EMPTY_V2, V2Data } from "@/store/useV2Store";
import { loadV2, mergeV2, saveV2 } from "@/lib/v2/sync";
import { withLocalChanges } from "@/lib/v2/merge";
import { mcpProgressRevisionChanged, rebaseMcpProgress, shouldPreferRemoteMcpProgress } from "@/lib/mcpProgressGuard";

const pick = (s: V2Data): V2Data => ({ sessions: s.sessions, results: s.results, drills: s.drills, basics: s.basics, goals: s.goals, questionStats: s.questionStats ?? {} });

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
  // Bumped to load the account again after practice in another session
  // (the assistant) while this page had nothing unsaved.
  const [epoch, setEpoch] = useState(0);

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
    // Saves still running, and whether the last one failed: while either
    // holds (or a save waits out its debounce), this page has work the account
    // may not have, and a change elsewhere is left to the guard.
    let inFlight = 0;
    let failed = false;
    const save = (data: V2Data) => {
      inFlight++;
      return saveV2(uid, data)
        .then(() => { failed = false; }, (e) => { failed = true; throw e; })
        .finally(() => { inFlight--; });
    };
    const unsaved = () => inFlight > 0 || failed || timer !== undefined;

    (async () => {
      try {
        // Another account's copy on this browser is not ours to merge.
        const before = pick(useV2Store.getState());
        const local = state.syncedUid && state.syncedUid !== uid ? EMPTY_V2 : before;
        const remote = await loadV2(uid);
        if (cancelled) return;
        // Do not resurrect an assistant reset by unioning the stale account
        // copy on reload. Guests still merge, and other accounts stay isolated.
        const merged = shouldPreferRemoteMcpProgress(uid, 'v2', state.syncedUid)
          ? remote ?? EMPTY_V2
          : remote ? mergeV2(local, remote) : local;
        // Anything done here while the account was loading (a test started
        // with Start module, a drill answer, a goal) is newer than either copy.
        const synced = withLocalChanges(merged, before, pick(useV2Store.getState()));
        useV2Store.getState().replaceData(synced, uid);
        await save(synced);
        if (cancelled) return;
        ready.current = uid;
        unsubscribe = useV2Store.subscribe((next, prev) => {
          if (ready.current !== uid) return;
          if (next.sessions === prev.sessions && next.results === prev.results && next.drills === prev.drills && next.basics === prev.basics && next.goals === prev.goals && next.questionStats === prev.questionStats) return;
          clearTimeout(timer);
          timer = setTimeout(() => {
            // Cleared so a later tab-hide or unmount does not save again with nothing changed.
            timer = undefined;
            save(pick(useV2Store.getState())).catch((e) => console.error("v2 sync failed", e));
          }, 1500);
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
        save(pick(useV2Store.getState())).catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", flush);

    // Back on this page after practising with the assistant: with nothing
    // unsaved here, load the account again instead of letting the next save
    // hit the "Progress changed in another session" notice. At most one read
    // per 10 seconds, since focus fires on every click back into the window.
    let lastCheck = 0;
    const recheck = async () => {
      if (document.visibilityState !== "visible" || ready.current !== uid || unsaved() || Date.now() - lastCheck < 10_000) return;
      lastCheck = Date.now();
      try {
        const snap = await getDoc(doc(db, "users", uid));
        if (cancelled || unsaved() || !mcpProgressRevisionChanged(uid, "v2", snap.data())) return;
        if (rebaseMcpProgress(uid, "v2")) setEpoch((n) => n + 1);
      } catch (e) {
        console.error("v2 recheck failed", e);
      }
    };
    document.addEventListener("visibilitychange", recheck);
    window.addEventListener("focus", recheck);

    return () => {
      cancelled = true;
      // Leaving the page (or a re-run) must not drop a save still waiting out its debounce.
      if (ready.current === uid && timer) saveV2(uid, pick(useV2Store.getState())).catch(() => {});
      ready.current = null;
      unsubscribe?.();
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", flush);
      document.removeEventListener("visibilitychange", recheck);
      window.removeEventListener("focus", recheck);
    };
  }, [userId, loading, epoch]);

  return null;
}
