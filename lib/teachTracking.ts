import { auth } from "@/lib/firebase";
import { isInternalBrowser } from "@/lib/internal";
import { visitSource } from "@/lib/funnel";

// ─── Teacher funnel ──────────────────────────────────────────────────────────
// What classes alone can't show on the /admin Teachers tab: how many people saw the
// /teach pitch and how many got partway into making a class. Each step counts
// a browser once (a localStorage flag), into analytics/teach, total and per
// UTC day. Classes made and students joined are read from the classes
// collection itself.
//
//   landing_view  the /teach landing was shown, with its source and referrer host
//   new_open      a "Create a free class" click on /teach, or /teach/new opened, signed in or not
//   new_form      the class form was shown to a signed-in account
//   join_view     a class link (/c/<code>) was opened and the class was found;
//                 once per browser per class, also counted on the class doc
//   nudge_shown   the "Teachers can use it free" row (components/TeachNudge.tsx)
//                 appeared at the top of a dashboard
//   nudge_copy    its Copy link button copied tigertest.io/teach
//   nudge_link    its tigertest.io/teach link was tapped
//                 The nudge steps also count by exam, in nudgeExams.
//
// Internal browsers (lib/internal) send nothing.

export type TeachStep = "landing_view" | "new_open" | "new_form";

const FLAG_PREFIX = "tigertest-teach:";

function once(key: string): boolean {
  try {
    if (localStorage.getItem(FLAG_PREFIX + key) !== null) return false;
    localStorage.setItem(FLAG_PREFIX + key, new Date().toISOString());
  } catch {
    // Storage blocked: counted on every load, rare enough to ignore.
  }
  return true;
}

function referrerHost(): string | undefined {
  try {
    if (!document.referrer) return undefined;
    const host = new URL(document.referrer).hostname.toLowerCase().replace(/^www\./, "");
    return host && host !== window.location.hostname ? host : undefined;
  } catch {
    return undefined;
  }
}

export function trackTeachStep(step: TeachStep) {
  if (typeof window === "undefined" || isInternalBrowser(auth.currentUser?.email) || !once(step)) return;
  if (step === "landing_view") return void post({ step, source: visitSource(), referrer: referrerHost() });
  void post({ step });
}

export type TeachNudgeAction = "shown" | "copy" | "link";

/** The dashboard teacher nudge, once per browser per action, tagged with the exam it was on. */
export function trackTeachNudge(action: TeachNudgeAction, examId: string) {
  const step = `nudge_${action}`;
  if (typeof window === "undefined" || isInternalBrowser(auth.currentUser?.email) || !once(step)) return;
  void post({ step, exam: examId });
}

export function trackClassJoinView(code: string) {
  if (typeof window === "undefined" || isInternalBrowser(auth.currentUser?.email) || !once(`join:${code}`)) return;
  void post({ step: "join_view", code, referrer: referrerHost() });
}

async function post(body: Record<string, unknown>) {
  try {
    await fetch("/api/analytics/teach", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
    });
  } catch {
    // Analytics must never surface errors to the user.
  }
}
