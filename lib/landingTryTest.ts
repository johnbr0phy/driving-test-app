// A/B test of "Try one now", the playable question in exam landing heroes
// (components/exam/LandingTryQuestion.tsx). Test landingTry1, Nov 2026.
//
// Question: does putting a real question on the landing get more new
// visitors practicing, and does it cost or win sign-ups?
//   Primary   first answer: share of enrolled browsers that answer at least
//             one question, anywhere on the site, within 7 days.
//   Secondary 10+ answers within 7 days (did they keep going, or try one and
//             leave?); account made within 7 days.
//   Guardrail purchases within 7 days, watched only (too few to power).
// Ship the card when first answer is at least 3 points higher at p < 0.05
// and sign-ups are not lower at p < 0.05; drop it when first answer is not
// higher after 1,500 enrolled browsers per arm (enough to see a 5-point
// lift from about 35% at 95% confidence and 80% power).
//
// Who is in it: a browser that opens an exam landing with a card and has
// never answered a question on Tigertest (no funnel answer flag and no pick
// history). Each browser gets an arm once ("card" or "control"), from the
// inline script in the hero (LANDING_TRY_INIT_SCRIPT) so a control browser
// never sees the card flash. `?tryq=card` or `?tryq=control` pins an arm for
// previews and is never counted. Test, internal and bot browsers never count.
// Counts go to analytics/landingTryTest through /api/analytics/landing-try;
// the card is on the /admin Conversion tab.

import { auth } from "@/lib/firebase";
import { isInternalBrowser } from "@/lib/internal";
import { twoProportionP } from "@/lib/guestPromptTest";

export const LANDING_TRY_TEST_ID = "landingTry1";
export const LANDING_TRY_ARMS = ["card", "control"] as const;
export type LandingTryArm = (typeof LANDING_TRY_ARMS)[number];
export const LANDING_TRY_STEPS = ["enrolled", "answered", "engaged", "signup", "purchase"] as const;
export type LandingTryStep = (typeof LANDING_TRY_STEPS)[number];

export const isLandingTryArm = (v: unknown): v is LandingTryArm => v === "card" || v === "control";
export const isLandingTryStep = (v: unknown): v is LandingTryStep =>
  typeof v === "string" && (LANDING_TRY_STEPS as readonly string[]).includes(v);

/** Outcomes count only this long after enrolment, the same for both arms. */
export const LANDING_TRY_WINDOW_MS = 7 * 24 * 3_600_000;
/** "Kept going": this many answers in the window. */
export const LANDING_TRY_ENGAGED = 10;

export const LANDING_TRY_STORAGE_KEY = "tigertest-landing-try-test";
const KEY = LANDING_TRY_STORAGE_KEY;

type Stored = {
  test: string;
  arm: LandingTryArm;
  pinned?: boolean;
  /** Set once the browser is counted in the test. */
  enrolledAt?: number;
  exam?: string;
  answers?: number;
  /** Steps already sent, so each counts once per browser. */
  sent?: LandingTryStep[];
  /** In the answer-count cohort (enrolled once answer counting shipped, Nov 17 2026). */
  ac?: boolean;
  /** Answers already added to the arm's total. */
  reported?: number;
};

/**
 * Runs inline before the hero paints: assigns the arm and marks <html> with
 * it, so CSS hides the card for control browsers from the first frame.
 * Kept in step with load() below.
 */
// A fixed string with the key and test id written in (a test checks they match
// KEY and LANDING_TRY_TEST_ID), so nothing is interpolated into the script.
export const LANDING_TRY_INIT_SCRIPT =
  '(function(){try{var k="tigertest-landing-try-test",t="landingTry1",p=new URLSearchParams(location.search).get("tryq"),r=null;try{r=JSON.parse(localStorage.getItem(k)||"null")}catch(e){}if(!r||r.test!==t||(r.arm!=="card"&&r.arm!=="control"))r={test:t,arm:Math.random()<0.5?"card":"control"};if(p==="card"||p==="control"){r.arm=p;r.pinned=true}localStorage.setItem(k,JSON.stringify(r));document.documentElement.setAttribute("data-ltq",r.arm)}catch(e){}})();';

function load(): Stored | null {
  try {
    const r = JSON.parse(localStorage.getItem(KEY) || "null") as Stored | null;
    if (r?.test === LANDING_TRY_TEST_ID && isLandingTryArm(r.arm)) return r;
  } catch {
    // Storage blocked: not in the test.
  }
  return null;
}

function save(r: Stored) {
  try {
    localStorage.setItem(KEY, JSON.stringify(r));
  } catch {
    // Without storage the browser simply drops out of the test.
  }
}

/** This browser's arm, or null when the init script could not run (the card shows). */
export function landingTryArm(): LandingTryArm | null {
  if (typeof window === "undefined") return null;
  // The arm this page was drawn with (set by the inline script, per
  // document). localStorage is shared by every tab and frame, so the admin
  // preview's two frames, pinned to different arms, would otherwise read
  // whichever frame wrote last and both show the control page.
  const drawn = document.documentElement.getAttribute("data-ltq");
  if (drawn === "card" || drawn === "control") return drawn;
  return load()?.arm ?? null;
}

/** A browser that has answered anything before is not a new visitor. */
function hasAnsweredBefore(): boolean {
  try {
    if (localStorage.getItem("tigertest-funnel:answered") !== null) return true;
    const picks = JSON.parse(localStorage.getItem("tigertest-pick-skill") || "{}") as Record<string, { n?: number }>;
    return Object.values(picks).some((v) => (v?.n ?? 0) > 0);
  } catch {
    return true;
  }
}

function inWindow(r: Stored): boolean {
  return !!r.enrolledAt && Date.now() - r.enrolledAt < LANDING_TRY_WINDOW_MS;
}

function send(r: Stored, step: LandingTryStep) {
  if (r.sent?.includes(step)) return;
  r.sent = [...(r.sent ?? []), step];
  save(r);
  if (isInternalBrowser(auth.currentUser?.email)) return;
  void fetch("/api/analytics/landing-try", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ test: LANDING_TRY_TEST_ID, arm: r.arm, step, exam: r.exam, ...(r.ac && { ac: true }) }),
    keepalive: true,
  }).catch(() => {});
}

/** On a landing that has a card: enrol this browser if it is new and unpinned. */
export function noteLandingTryEnrolled(examId: string) {
  if (typeof window === "undefined") return;
  const r = load();
  if (!r || r.pinned || r.enrolledAt || auth.currentUser || hasAnsweredBefore()) return;
  if (isInternalBrowser()) return;
  r.enrolledAt = Date.now();
  r.exam = examId.slice(0, 40);
  r.answers = 0;
  r.ac = true;
  r.reported = 0;
  send(r, "enrolled");
}

// ── Answers per visitor ─────────────────────────────────────────────────────
// Each browser in the answer-count cohort adds its answers (within the 7-day
// window) to its arm's total, plus the matching change in the sum of squares
// so the admin card can test the means. Sent at milestones and when the page
// is hidden, so a browser costs a handful of writes, not one per answer.

/** Answer counts the card shows as "reached N+" (and that trigger a send). */
export const LANDING_TRY_MILESTONES = [1, 3, 5, 10, 20, 50, 100] as const;
/** One browser's answers count up to this, so a stuck script cannot skew the mean. */
export const LANDING_TRY_ANSWER_CAP = 1000;

function flushAnswers(r: Stored, reached?: number) {
  if (!r.ac) return;
  const prev = r.reported ?? 0;
  const now = Math.min(r.answers ?? 0, LANDING_TRY_ANSWER_CAP);
  if (now <= prev && reached === undefined) return;
  r.reported = Math.max(prev, now);
  save(r);
  if (isInternalBrowser(auth.currentUser?.email)) return;
  void fetch("/api/analytics/landing-try", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ test: LANDING_TRY_TEST_ID, arm: r.arm, step: "answers", prev, now: r.reported, reached }),
    keepalive: true,
  }).catch(() => {});
}

let flushOnHide = false;
function flushPendingAnswers() {
  const r = load();
  if (r && r.ac && (r.answers ?? 0) > (r.reported ?? 0)) flushAnswers(r);
}

/** Every answered exam question (from lib/questionPicks.ts). */
export function noteLandingTryAnswer() {
  if (typeof window === "undefined") return;
  const r = load();
  if (!r || !inWindow(r)) return;
  r.answers = (r.answers ?? 0) + 1;
  save(r);
  send(r, "answered");
  if (r.answers >= LANDING_TRY_ENGAGED) send(r, "engaged");
  if (!r.ac) return;
  if ((LANDING_TRY_MILESTONES as readonly number[]).includes(r.answers)) flushAnswers(r, r.answers);
  else if (!flushOnHide) {
    flushOnHide = true;
    window.addEventListener("pagehide", flushPendingAnswers);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") flushPendingAnswers();
    });
  }
}

export function noteLandingTrySignup() {
  if (typeof window === "undefined") return;
  const r = load();
  if (r && inWindow(r)) send(r, "signup");
}

export function noteLandingTryPurchase() {
  if (typeof window === "undefined") return;
  const r = load();
  if (r && inWindow(r)) send(r, "purchase");
}

// ── Admin maths ─────────────────────────────────────────────────────────────

export type LandingTryCounts = Partial<Record<LandingTryStep, number>>;

/** The decision the card shows, from the rules at the top of this file. */
export type LandingTryVerdict = "too_early" | "ship" | "drop" | "running";

export const LANDING_TRY_TARGET_PER_ARM = 1500;
export const LANDING_TRY_MIN_LIFT = 0.03;

export type LandingTryResult = {
  verdict: LandingTryVerdict;
  /** Card minus control, in rate points (0.04 = 4 points). */
  lift: number;
  pAnswered: number;
  pSignup: number;
};

/**
 * Applies the decision rule: ship at a lift of 3+ points with p < 0.05 and no
 * significant drop in sign-ups; drop once both arms reach the target without
 * that; under 100 browsers an arm it is too early to read anything.
 */
export function landingTryResult(card: LandingTryCounts, control: LandingTryCounts): LandingTryResult {
  const n1 = card.enrolled ?? 0;
  const n2 = control.enrolled ?? 0;
  const rate = (x: number | undefined, n: number) => (n ? (x ?? 0) / n : 0);
  const lift = rate(card.answered, n1) - rate(control.answered, n2);
  const pAnswered = twoProportionP(card.answered ?? 0, n1, control.answered ?? 0, n2);
  const pSignup = twoProportionP(card.signup ?? 0, n1, control.signup ?? 0, n2);
  const signupWorse = rate(card.signup, n1) < rate(control.signup, n2) && pSignup < 0.05;
  let verdict: LandingTryVerdict;
  if (n1 < 100 || n2 < 100) verdict = "too_early";
  else if (lift >= LANDING_TRY_MIN_LIFT && pAnswered < 0.05 && !signupWorse) verdict = "ship";
  else if (n1 >= LANDING_TRY_TARGET_PER_ARM && n2 >= LANDING_TRY_TARGET_PER_ARM) verdict = "drop";
  else verdict = "running";
  return { verdict, lift, pAnswered, pSignup };
}

/** Answers-per-visitor counters for one arm (analytics/landingTryTest.answers). */
export type LandingTryAnswerCounts = {
  /** Browsers enrolled into the answer-count cohort. */
  enrolled?: number;
  /** Their answers within 7 days. */
  total?: number;
  /** Sum of each browser's answers squared, for the variance. */
  sq?: number;
  /** Browsers that reached each milestone. */
  reached?: Record<string, number>;
};

export type LandingTryMeans = {
  /** Mean answers per enrolled browser, per arm. */
  card: number;
  control: number;
  /** Mean answers among browsers that answered at least one. */
  cardPerAnswerer: number;
  controlPerAnswerer: number;
  /** Welch test of the per-visitor means. */
  p: number;
};

function normalP(z: number): number {
  const t = 1 / (1 + 0.3275911 * (Math.abs(z) / Math.SQRT2));
  const erfc =
    t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429)))) * Math.exp(-(z * z) / 2);
  return Math.min(1, Math.max(0, erfc));
}

/** Mean answers per new visitor in each arm and whether they differ. */
export function landingTryMeans(card: LandingTryAnswerCounts, control: LandingTryAnswerCounts): LandingTryMeans {
  const stats = (a: LandingTryAnswerCounts) => {
    const n = a.enrolled ?? 0;
    const mean = n ? (a.total ?? 0) / n : 0;
    const variance = n > 1 ? Math.max(0, ((a.sq ?? 0) - n * mean * mean) / (n - 1)) : 0;
    const answerers = a.reached?.["1"] ?? 0;
    return { n, mean, variance, perAnswerer: answerers ? (a.total ?? 0) / answerers : 0 };
  };
  const a = stats(card);
  const b = stats(control);
  const se = a.n && b.n ? Math.sqrt(a.variance / a.n + b.variance / b.n) : 0;
  return {
    card: a.mean,
    control: b.mean,
    cardPerAnswerer: a.perAnswerer,
    controlPerAnswerer: b.perAnswerer,
    p: se ? normalP((a.mean - b.mean) / se) : 1,
  };
}
