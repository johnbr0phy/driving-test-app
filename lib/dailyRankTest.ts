// A/B test of the daily rank (lib/dailyRank.ts). Test dailyRank1, Nov 2026.
//
//   control  no rank anywhere (answers still count, so the distribution is
//            everyone's and the rank arm compares against real numbers)
//   rank     the chip in the bar while training and in drills (in place of
//            "View stats" and the DMV stats upsell; never on practice tests)
//            and the rank card at the end of every session
// Question: does seeing your rank bring people back and keep them answering?
//   Primary   next-day return: share of enrolled browsers that answer again
//             on the local day after the one they enrolled.
//   Secondary questions per session (a session ends after 30 idle minutes).
//   Guardrail Premium conversion within 14 days of enrolment.
// An arm wins at a return lift of 2+ points with p < 0.05 and no significant
// drop in Premium; with no winner once both arms reach 3,000 browsers that
// had a chance to return, keep control (nothing ships).
//
// Who is in it: every browser that answers a question, assigned once (50/50)
// at its first answer. `?rank=on` / `?rank=off` pins an arm for previews and
// is never counted. Test, internal and bot browsers never count. Counts go to
// analytics/dailyRankTest through /api/analytics/rank-test; the card is on the
// /admin A/B tests tab.

import { auth } from "@/lib/firebase";
import { isInternalBrowser } from "@/lib/internal";
import { twoProportionP } from "@/lib/guestPromptTest";
import { localDay, nextDay } from "@/lib/dailyRank";

export const RANK_TEST_ID = "dailyRank1";
export const RANK_TEST_DOC = "analytics/dailyRankTest";
export const RANK_ARMS = ["control", "rank"] as const;
export type RankArm = (typeof RANK_ARMS)[number];
export const RANK_STEPS = ["enrolled", "returned", "purchase"] as const;
export type RankStep = (typeof RANK_STEPS)[number];

export const isRankArm = (v: unknown): v is RankArm => v === "control" || v === "rank";
export const isRankStep = (v: unknown): v is RankStep =>
  typeof v === "string" && (RANK_STEPS as readonly string[]).includes(v);

/** A gap this long between answers starts a new session. */
export const RANK_SESSION_GAP_MS = 30 * 60_000;
/** Purchases count this long after enrolment. */
export const RANK_PURCHASE_WINDOW_MS = 14 * 24 * 3_600_000;
/** One browser adds at most this many answers, so a stuck script cannot skew the mean. */
export const RANK_ANSWER_CAP = 3000;
/** Most sessions / answers one activity report may add. */
export const RANK_MAX_REPORT = 500;

const KEY = "tigertest-daily-rank-test";

type Stored = {
  test: string;
  arm: RankArm;
  pinned?: boolean;
  enrolledAt?: number;
  enrolledDay?: string;
  lastAnswerAt?: number;
  /** Answers and sessions counted, and how many were already reported. */
  answers?: number;
  sessions?: number;
  reportedAnswers?: number;
  reportedSessions?: number;
  sent?: RankStep[];
};

function load(): Stored | null {
  try {
    const r = JSON.parse(localStorage.getItem(KEY) || "null") as Stored | null;
    if (r?.test === RANK_TEST_ID && isRankArm(r.arm)) return r;
  } catch {
    // Storage blocked.
  }
  return null;
}

function save(r: Stored) {
  try {
    localStorage.setItem(KEY, JSON.stringify(r));
  } catch {
    // Without storage the browser drops out of the test.
  }
}

/** This browser's arm, assigning one on first call. Pins from ?rank=on|off. */
export function rankArm(random: () => number = Math.random): RankArm | null {
  if (typeof window === "undefined") return null;
  let r = load();
  const pin = new URLSearchParams(window.location.search).get("rank");
  if (pin === "on" || pin === "off") {
    r = { ...(r ?? { test: RANK_TEST_ID }), test: RANK_TEST_ID, arm: pin === "on" ? "rank" : "control", pinned: true };
    save(r);
    return r.arm;
  }
  if (!r) {
    r = { test: RANK_TEST_ID, arm: random() < 0.5 ? "control" : "rank" };
    save(r);
  }
  return r.arm;
}

function counted(r: Stored): boolean {
  return !r.pinned && !!r.enrolledAt && !isInternalBrowser(auth.currentUser?.email);
}

function post(body: Record<string, unknown>) {
  void fetch("/api/analytics/rank-test", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ test: RANK_TEST_ID, ...body }),
    keepalive: true,
  }).catch(() => {});
}

function send(r: Stored, step: RankStep) {
  if (r.sent?.includes(step)) return;
  r.sent = [...(r.sent ?? []), step];
  save(r);
  if (counted(r)) post({ arm: r.arm, step });
}

/** Every first-time answer (from lib/dailyRankClient.ts). */
export function noteRankTestAnswer(now = Date.now()) {
  if (typeof window === "undefined") return;
  rankArm();
  const r = load();
  if (!r || r.pinned) return;
  if (isInternalBrowser(auth.currentUser?.email)) return;
  const today = localDay(new Date(now), Intl.DateTimeFormat().resolvedOptions().timeZone);
  if (!r.enrolledAt) {
    r.enrolledAt = now;
    r.enrolledDay = today;
    r.answers = 0;
    r.sessions = 0;
    r.reportedAnswers = 0;
    r.reportedSessions = 0;
    send(r, "enrolled");
  }
  if (r.enrolledDay && today === nextDay(r.enrolledDay)) send(r, "returned");
  if (!r.lastAnswerAt || now - r.lastAnswerAt > RANK_SESSION_GAP_MS) r.sessions = (r.sessions ?? 0) + 1;
  r.lastAnswerAt = now;
  r.answers = Math.min((r.answers ?? 0) + 1, RANK_ANSWER_CAP);
  save(r);
}

/** Sends answers and sessions not yet reported (called with each rank flush). */
export function flushRankTestActivity() {
  const r = typeof window === "undefined" ? null : load();
  if (!r || !counted(r)) return;
  const answers = (r.answers ?? 0) - (r.reportedAnswers ?? 0);
  const sessions = (r.sessions ?? 0) - (r.reportedSessions ?? 0);
  if (answers <= 0 && sessions <= 0) return;
  r.reportedAnswers = r.answers;
  r.reportedSessions = r.sessions;
  save(r);
  post({ arm: r.arm, step: "activity", answers: Math.max(0, answers), sessions: Math.max(0, sessions) });
}

export function noteRankTestPurchase() {
  const r = typeof window === "undefined" ? null : load();
  if (r?.enrolledAt && Date.now() - r.enrolledAt < RANK_PURCHASE_WINDOW_MS) send(r, "purchase");
}

// ── Admin maths ─────────────────────────────────────────────────────────────

export type RankArmCounts = Partial<Record<RankStep, number>> & { answers?: number; sessions?: number };
export type RankVerdict = "too_early" | "running" | "rank" | "control" | "tie";

export const RANK_TARGET_PER_ARM = 3000;
export const RANK_MIN_LIFT = 0.02;

export type RankTestResult = {
  verdict: RankVerdict;
  /** rank minus control, in rate points. */
  returnLift: number;
  pReturn: number;
  pPurchase: number;
  perSession: { control: number; rank: number };
};

/**
 * `eligible` per arm: browsers enrolled before today, the only ones that can
 * have come back the next day yet.
 */
export function rankTestResult(
  control: RankArmCounts,
  rank: RankArmCounts,
  eligible: { control: number; rank: number },
): RankTestResult {
  const n1 = eligible.control;
  const n2 = eligible.rank;
  const rate = (x: number | undefined, n: number) => (n ? (x ?? 0) / n : 0);
  const returnLift = rate(rank.returned, n2) - rate(control.returned, n1);
  const pReturn = twoProportionP(rank.returned ?? 0, n2, control.returned ?? 0, n1);
  const pPurchase = twoProportionP(rank.purchase ?? 0, rank.enrolled ?? 0, control.purchase ?? 0, control.enrolled ?? 0);
  const purchaseGap = rate(rank.purchase, rank.enrolled ?? 0) - rate(control.purchase, control.enrolled ?? 0);
  const perSession = {
    control: control.sessions ? (control.answers ?? 0) / control.sessions : 0,
    rank: rank.sessions ? (rank.answers ?? 0) / rank.sessions : 0,
  };
  let verdict: RankVerdict;
  if (n1 < 200 || n2 < 200) verdict = "too_early";
  else if (pReturn < 0.05 && returnLift >= RANK_MIN_LIFT && !(purchaseGap < 0 && pPurchase < 0.05)) verdict = "rank";
  else if (pReturn < 0.05 && -returnLift >= RANK_MIN_LIFT) verdict = "control";
  else if (n1 >= RANK_TARGET_PER_ARM && n2 >= RANK_TARGET_PER_ARM) verdict = "tie";
  else verdict = "running";
  return { verdict, returnLift, pReturn, pPurchase, perSession };
}
