"use client";

// The browser side of the daily rank (lib/dailyRank.ts).
//
// Every answered exam question passes through noteRankAnswer (called from
// lib/classProgress.ts recordClassAnswerById, the one path the DMV, v1, v2
// and quiz runners all share). The first answer to a question today is
// queued; a right one bumps today's count at once, so the header chip moves
// with every answer. "Top X%" is worked out here from the percentile cutoffs
// the server last sent; the "N more" line comes from the server after each
// flush (a few seconds later). The day is Tiger Time's: it resets at
// midnight Eastern time for everyone, wherever they are.

import { useSyncExternalStore } from "react";
import { auth } from "@/lib/firebase";
import { getBrowserId } from "@/lib/enrollment";
import { isTestBrowser } from "@/lib/internal";
import { tigerDay, topPercentFromCutoffs, type RankNext, type RankStatus } from "@/lib/dailyRank";

const KEY = "tigertest-daily-rank";
const FLUSH_MS = 4_000;
/** Status older than this is fetched again when a rank surface mounts. */
const STALE_MS = 5 * 60_000;
/** Questions remembered locally per day, matching the server's cap. */
const MAX_SEEN = 3000;

type Pending = { e: string; q: string; ok: boolean };

export type RankState = {
  day: string;
  correct: number;
  seen: string[];
  pending: Pending[];
  cutoffs: (number | null)[];
  next: RankNext | null;
  /** Place today (top 100 only), its next place up, or what gets you into the top 100. */
  place?: number | null;
  placeGoal?: { place: number; need: number } | null;
  enterTop?: { need: number } | null;
  /** The server's count at the last sync (the "N more" line is relative to it). */
  serverCorrect: number;
  syncedAt: number;
};

export type RankView = {
  correct: number;
  topPercent: number | null;
  next: RankNext | null;
  /** Percentile cutoffs from the last sync. */
  cutoffs: (number | null)[];
  /** Place today, in the top 100 only (from the last sync). */
  place: number | null;
  placeGoal: { place: number; need: number } | null;
  enterTop: { need: number } | null;
};

/** The Tiger Time day: one for everyone, Eastern time (lib/dailyRank.ts). */
export function today(now = new Date()): string {
  return tigerDay(now);
}

export function freshState(day: string): RankState {
  return { day, correct: 0, seen: [], pending: [], cutoffs: [], next: null, serverCorrect: 0, syncedAt: 0 };
}

/** Starts a new state at local midnight; keeps everything otherwise. */
export function rollDay(s: RankState, day: string): RankState {
  return s.day === day ? s : freshState(day);
}

/** Pure: one answer into the state. First answer to a question today only. */
export function addAnswer(s: RankState, exam: string, questionId: string, ok: boolean): RankState {
  const key = `${exam}:${questionId}`;
  if (s.seen.includes(key) || s.seen.length >= MAX_SEEN) return s;
  return {
    ...s,
    seen: [...s.seen, key],
    pending: [...s.pending, { e: exam, q: questionId, ok }],
    correct: s.correct + (ok ? 1 : 0),
  };
}

/** Pure: what the UI shows. */
export function viewOf(s: RankState): RankView {
  const topPercent = s.cutoffs.length ? topPercentFromCutoffs(s.cutoffs, s.correct) : null;
  // The server's "N more" was for serverCorrect; answers since then count toward it.
  let next = s.next;
  if (next && next.kind !== "top") {
    const need = next.need - Math.max(0, s.correct - s.serverCorrect);
    next = need > 0 ? { ...next, need } : null;
  }
  // Same for the place goals: answers since the sync count toward them.
  const gained = Math.max(0, s.correct - s.serverCorrect);
  const shrink = <T extends { need: number }>(g: T | null | undefined): T | null =>
    g && g.need - gained > 0 ? { ...g, need: g.need - gained } : null;
  return {
    correct: s.correct,
    topPercent,
    next,
    cutoffs: s.cutoffs,
    place: s.place ?? null,
    placeGoal: shrink(s.placeGoal),
    enterTop: shrink(s.enterTop),
  };
}

// ── Storage and subscribers ─────────────────────────────────────────────────

let state: RankState | null = null;
let view: RankView | null = null;
let viewFor: RankState | null = null;
const listeners = new Set<() => void>();

function load(): RankState {
  const day = today();
  if (state) return (state = rollDay(state, day));
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || "null") as RankState | null;
    if (parsed && typeof parsed.day === "string" && Array.isArray(parsed.seen)) return (state = rollDay({ ...freshState(day), ...parsed }, day));
  } catch {
    // Storage blocked: in memory only.
  }
  return (state = freshState(day));
}

function commit(next: RankState) {
  state = next;
  view = viewOf(next);
  viewFor = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Best effort.
  }
  for (const l of listeners) l();
}

// ── Answers in, status back ─────────────────────────────────────────────────

let timer: ReturnType<typeof setTimeout> | null = null;
let inFlight = false;
let listening = false;

export function noteRankAnswer(exam: string, questionId: string, correct: boolean) {
  if (typeof window === "undefined") return;
  const before = load();
  const after = addAnswer(before, exam, questionId, correct);
  if (after === before) return;
  commit(after);
  if (!listening) {
    listening = true;
    window.addEventListener("pagehide", () => void flushRank());
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") void flushRank();
    });
  }
  if (!timer) timer = setTimeout(() => void flushRank(), FLUSH_MS);
}

async function headers(): Promise<Record<string, string>> {
  const h: Record<string, string> = { "Content-Type": "application/json" };
  const user = auth.currentUser;
  if (user) {
    try {
      h.Authorization = `Bearer ${await user.getIdToken()}`;
    } catch {
      // Counted as the browser instead.
    }
  }
  return h;
}

function applyStatus(status: RankStatus, sent: Pending[]) {
  const s = load();
  if (status.day !== s.day) return;
  const unsent = s.pending.filter((p) => !sent.includes(p));
  const unsentCorrect = unsent.filter((p) => p.ok).length;
  commit({
    ...s,
    pending: unsent,
    // The server is the truth (it also has other devices' answers today);
    // answers still queued here are on top of it.
    correct: status.correct + unsentCorrect,
    serverCorrect: status.correct,
    cutoffs: status.cutoffs ?? [],
    next: status.next,
    place: status.place ?? null,
    placeGoal: status.placeGoal ?? null,
    enterTop: status.enterTop ?? null,
    syncedAt: Date.now(),
  });
}

export async function flushRank() {
  if (timer) clearTimeout(timer);
  timer = null;
  if (inFlight || typeof window === "undefined") return;
  const s = load();
  if (!s.pending.length) return;
  // Test and internal browsers keep a local count only.
  if (isTestBrowser()) return;
  const sent = s.pending.slice(0, 300);
  inFlight = true;
  try {
    const res = await fetch("/api/rank/today", {
      method: "POST",
      headers: await headers(),
      body: JSON.stringify({ browserId: getBrowserId(), answers: sent }),
      keepalive: true,
    });
    if (res.ok) applyStatus((await res.json()) as RankStatus, sent);
  } catch {
    // Retried with the next answer.
  } finally {
    inFlight = false;
  }
  if (load().pending.length && !timer) timer = setTimeout(() => void flushRank(), FLUSH_MS);
}

/** Fetches the status when it is stale (a rank surface mounting). */
export async function refreshRank(force = false) {
  if (typeof window === "undefined") return;
  const s = load();
  if (s.pending.length) return void flushRank();
  if (!force && Date.now() - s.syncedAt < STALE_MS) return;
  if (isTestBrowser()) return;
  const browserId = getBrowserId();
  if (!auth.currentUser && !browserId) return;
  try {
    const params = new URLSearchParams(browserId ? { b: browserId } : {});
    const res = await fetch(`/api/rank/today?${params}`, { headers: await headers() });
    if (res.ok) applyStatus((await res.json()) as RankStatus, []);
  } catch {
    // Keep the local count.
  }
}

/**
 * On sign-in (contexts/AuthContext.tsx): send queued guest answers first,
 * then move today's guest count onto the account. Once per uid per day.
 */
export async function mergeRankOnSignIn() {
  const user = auth.currentUser;
  const browserId = getBrowserId();
  if (!user || !browserId || isTestBrowser()) return;
  const mark = `${KEY}-merged`;
  const tag = `${user.uid}:${today()}`;
  try {
    if (localStorage.getItem(mark) === tag) return;
  } catch {
    // Merge anyway; the server makes it safe to repeat.
  }
  try {
    const res = await fetch("/api/rank/merge", {
      method: "POST",
      headers: await headers(),
      body: JSON.stringify({ browserId }),
    });
    if (!res.ok) return;
    applyStatus((await res.json()) as RankStatus, []);
    localStorage.setItem(mark, tag);
    void flushRank();
  } catch {
    // Tried again at the next sign-in.
  }
}

// ── React ───────────────────────────────────────────────────────────────────

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

function snapshot(): RankView | null {
  if (typeof window === "undefined") return null;
  const s = load();
  if (viewFor !== s) {
    view = viewOf(s);
    viewFor = s;
  }
  return view;
}

/** Today's rank for this browser, live. null on the server. */
export function useDailyRank(): RankView | null {
  return useSyncExternalStore(subscribe, snapshot, () => null);
}

