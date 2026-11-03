"use client";

import { isTestBrowser } from "@/lib/internal";
import { STRONG_ACCURACY, STRONG_MIN_ANSWERS } from "@/lib/questionQuality";

// Anonymous option picks for question quality (lib/questionQuality.ts):
// every answered question on an exam, which bank option was picked, whether
// it was right, and whether this browser is a strong one on that exam. No
// account, browser id or IP is stored with them; they are summed per question
// in questionPicks/{examId}. Sent every 10 seconds and when the page hides.
// Test browsers, internal browsers and anyone who declined analytics never
// send (isTestBrowser), and quizzes are not exams, so they never send either.

const FLUSH_MS = 10_000;
const SKILL_KEY = "tigertest-pick-skill";
const queue = new Map<string, { q: string; p: number; ok: boolean; s: boolean }[]>();
let timer: ReturnType<typeof setTimeout> | null = null;
let listening = false;

function skill(): Record<string, { n: number; c: number }> {
  try {
    return JSON.parse(localStorage.getItem(SKILL_KEY) || "{}");
  } catch {
    return {};
  }
}

/**
 * One answered question. `pick` is the bank index of the option chosen (not
 * its shown letter); formats with no single pick (multi, numeric, matrix...)
 * still count toward right and wrong.
 */
export function recordQuestionPick(examId: string, questionId: string, correct: boolean, pick: number | undefined) {
  if (typeof window === "undefined") return;
  if (examId.startsWith("quiz:")) return;
  if (isTestBrowser()) return;
  let internal = false;
  try {
    internal = localStorage.getItem("tigertest-internal") === "1";
  } catch {
    // Storage blocked: send anyway, nothing here identifies anyone.
  }
  if (internal) return;

  const all = skill();
  const mine = all[examId] ?? { n: 0, c: 0 };
  const strong = mine.n >= STRONG_MIN_ANSWERS && mine.c / mine.n >= STRONG_ACCURACY;
  all[examId] = { n: mine.n + 1, c: mine.c + (correct ? 1 : 0) };
  try {
    localStorage.setItem(SKILL_KEY, JSON.stringify(all));
  } catch {
    // Without storage every browser just counts as not strong.
  }

  const list = queue.get(examId) ?? [];
  list.push({ q: questionId, p: pick ?? -1, ok: correct, s: strong });
  queue.set(examId, list);
  if (!listening) {
    listening = true;
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") flushQuestionPicks();
    });
  }
  if (!timer) timer = setTimeout(flushQuestionPicks, FLUSH_MS);
}

export function flushQuestionPicks() {
  if (timer) clearTimeout(timer);
  timer = null;
  for (const [exam, items] of queue) {
    queue.delete(exam);
    if (!items.length) continue;
    void fetch("/api/analytics/question-picks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ exam, items: items.slice(0, 200) }),
      keepalive: true,
    }).catch(() => {});
  }
}
