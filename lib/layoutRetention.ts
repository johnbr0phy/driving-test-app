import { auth } from "@/lib/firebase";
import { isInternalBrowser } from "@/lib/internal";

// ─── Retention by dashboard layout, every browser ────────────────────────────
// Which v1 exam dashboard layout keeps people coming back: interleaved
// (Set 1, Test 1, Set 2, Test 2...) or sets first with the tests at the end?
// And do people who take a practice test on their first day return more?
// Guests are most users and their progress never leaves the browser, so this
// counts every browser, signed in or not. Nothing about the person is sent:
// one localStorage record per exam, and anonymous milestone counts into
// analytics/layoutRetention (app/api/analytics/layout-retention), read by the
// Dashboard layout card on the /admin Growth tab.
//
// A browser joins an exam's cohort the first time it sees that exam's
// dashboard (the layout is what it saw then). Milestones, each sent once:
//   start       first dashboard view
//   test0       opened a practice test on its first day
//   testLater   ...or first on a later day
//   ret1/7/14/30  came back to the exam (any of its pages) 1, 7, 14, 30+ days
//                 after starting; flag t0 says whether it tested on day 0
// Counted since LAYOUT_RETENTION_SINCE (lib/server/layoutRetention). Internal
// and test browsers never send.

export type DashLayout = "I" | "S";
type Rec = { day: number; start: string; layout: DashLayout; tested?: number; sent: string[] };

const KEY = "tigertest-layout-retention";
const RETURNS = [30, 14, 7, 1];

/** Local calendar day number, so "a day later" means the next date where the person is. */
function dayNumber(d = new Date()): number {
  return Math.floor((d.getTime() - d.getTimezoneOffset() * 60_000) / 86_400_000);
}
function localDate(d = new Date()): string {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${String(d.getDate()).padStart(2, "0")}`;
}

function load(): Record<string, Rec> {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function send(exam: string, rec: Rec, event: string) {
  try {
    void fetch("/api/analytics/layout-retention", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ exam, layout: rec.layout, start: rec.start, event, t0: rec.tested === 0 }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Analytics must never surface errors to the user.
  }
}

/**
 * Call on every v1 exam page view. `layout` is passed only by the dashboard,
 * which is what puts a browser into the cohort; other pages (practice, tests,
 * results) only count returns and tests for browsers already in it.
 */
export function trackLayoutRetention(exam: string, opts: { layout?: DashLayout; onTest?: boolean }) {
  if (typeof window === "undefined" || isInternalBrowser(auth.currentUser?.email)) return;
  const all = load();
  const today = dayNumber();
  let rec = all[exam];
  const events: string[] = [];
  if (!rec) {
    if (!opts.layout) return;
    rec = { day: today, start: localDate(), layout: opts.layout, sent: [] };
    events.push("start");
  }
  const since = today - rec.day;
  if (opts.onTest && rec.tested === undefined) {
    rec.tested = since;
    events.push(since === 0 ? "test0" : "testLater");
  }
  // Every return mark passed and not yet sent (a first return on day 9 sends ret1 and ret7).
  for (const d of RETURNS) if (since >= d && !rec.sent.includes(`ret${d}`)) events.push(`ret${d}`);
  if (!events.length) return;
  for (const e of events) if (e.startsWith("ret")) rec.sent.push(e);
  all[exam] = rec;
  try {
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    return; // Storage blocked: every view would look like a first one, so send nothing.
  }
  for (const e of events) send(exam, rec, e);
}
