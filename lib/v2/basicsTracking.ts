import { auth } from "@/lib/firebase";
import { isInternalBrowser } from "@/lib/internal";

// ─── Basics usage, every browser ─────────────────────────────────────────────
// v2 progress only reaches Firestore for signed-in accounts (lib/v2/sync), and
// most SAT and ACT students never sign in. These events count every browser,
// signed in or not, once per browser per skill or drill (a localStorage flag),
// into analytics/v2Basics, read by the "Basics" card on the /admin Growth tab:
//
//   skill_open      opened a Basics skill
//   skill_learned   finished it (every question right)
//   brushup_shown   a missed exam-level question offered the skill's rule sheet
//   brushup         ...and the student tapped it
//   exam_start      first exam-level answer in a drill that has Basics;
//                   basicsFirst = a skill of that drill was learned before it
//   drill_mastered  every exam-level question of that drill mastered
//
// Counted since BASICS_TRACKING_SINCE (lib/server/v2Progress). Internal
// browsers never send.

export type BasicsEvent = "skill_open" | "skill_learned" | "brushup_shown" | "brushup" | "exam_start" | "drill_mastered";

const FLAG_PREFIX = "tigertest-basics:";

export function trackBasics(event: BasicsEvent, examId: string, drill: string, opts: { skill?: string; basicsFirst?: boolean } = {}) {
  if (typeof window === "undefined" || isInternalBrowser(auth.currentUser?.email)) return;
  const flag = `${FLAG_PREFIX}${event}:${examId}:${opts.skill ?? drill}`;
  try {
    if (localStorage.getItem(flag) !== null) return;
    localStorage.setItem(flag, "1");
  } catch {
    // Storage blocked: count it anyway, rare enough to ignore.
  }
  try {
    void fetch("/api/analytics/basics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, exam: examId, drill, skill: opts.skill, basicsFirst: opts.basicsFirst }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Analytics must never surface errors to the user.
  }
}
