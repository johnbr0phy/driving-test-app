/**
 * Weekly exam upkeep (.github/workflows/exam-upkeep.yml): the two jobs that
 * used to wait for a person on the /admin Questions tab, handed to Claude Code.
 *
 *   1. Dated changes to real exams (lib/examFreshness.json) that are due or
 *      take effect within 7 days and are not done.
 *   2. Yearly reviews: exams whose bank last changed (lib/landingDates.json)
 *      and that were last reviewed (lib/examReviews.json) over reviewAfterDays ago.
 *
 *   npx tsx scripts/exam-upkeep.ts --pick <out.json> [--max 3]
 *     Writes the tasks for this run, changes first, then reviews oldest first,
 *     and prints the count. A task whose fix failed MAX_FAILURES times
 *     (examUpkeep/{key} in Firestore) is skipped, so one hard task never blocks
 *     the rest. Without FIREBASE_SERVICE_ACCOUNT_KEY nothing is skipped.
 *
 *   npx tsx scripts/exam-upkeep.ts --failed <tasks.json>
 *     The fix PR was closed unmerged: counts one failure for each task.
 *
 * Claude Code finishes a change by setting `done` on its event (or `recheck`
 * to a later date when the official body has not published it yet), and a
 * review by writing today's date for the exam in lib/examReviews.json.
 */
import { readFileSync, writeFileSync } from "node:fs";
import FRESHNESS from "@/lib/examFreshness.json";
import LANDING_DATES from "@/lib/landingDates.json";
import REVIEWS from "@/lib/examReviews.json";

const MAX_FAILURES = 3;
const DAY = 86_400_000;

const args = process.argv.slice(2);
const arg = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};

interface FreshEvent {
  exam: string;
  date: string;
  kind: string;
  what: string;
  action: string;
  source: string;
  done?: string;
  recheck?: string;
}

export interface UpkeepTask {
  key: string;
  type: "change" | "review";
  exam: string;
  /** change: the event as it is in lib/examFreshness.json. */
  event?: FreshEvent;
  /** review: when the bank last changed or was last reviewed. */
  lastChecked?: string;
}

async function db() {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) return null;
  const { getAdminDb } = await import("@/lib/firebase-admin");
  return getAdminDb();
}

async function main() {
  const pickTo = arg("pick");
  if (pickTo) {
    const max = parseInt(arg("max") ?? "3", 10);
    const today = new Date().toISOString().slice(0, 10);
    const ahead = new Date(Date.now() + 7 * DAY).toISOString().slice(0, 10);
    const cutoff = new Date(Date.now() - FRESHNESS.reviewAfterDays * DAY).toISOString().slice(0, 10);
    const reviews = REVIEWS as Record<string, string>;

    const changes: UpkeepTask[] = (FRESHNESS.events as FreshEvent[])
      .filter((e) => !e.done && (e.recheck ?? e.date) <= ahead)
      .sort((a, b) => (a.recheck ?? a.date).localeCompare(b.recheck ?? b.date))
      .map((e) => ({ key: `change:${e.exam}:${e.date}`, type: "change", exam: e.exam, event: e }));
    const due: UpkeepTask[] = Object.entries(LANDING_DATES as Record<string, string>)
      .map(([exam, changed]) => ({ exam, last: reviews[exam] && reviews[exam] > changed ? reviews[exam] : changed }))
      .filter((r) => r.last < cutoff)
      .sort((a, b) => a.last.localeCompare(b.last))
      .map((r) => ({ key: `review:${r.exam}`, type: "review", exam: r.exam, lastChecked: r.last }));

    const store = await db();
    const out: UpkeepTask[] = [];
    for (const t of [...changes, ...due]) {
      if (out.length >= max) break;
      if (store) {
        const failures = ((await store.collection("examUpkeep").doc(t.key).get()).data()?.failures as number | undefined) ?? 0;
        if (failures >= MAX_FAILURES) continue;
      }
      out.push(t);
    }
    writeFileSync(pickTo, JSON.stringify({ today, tasks: out }, null, 1) + "\n");
    console.log(out.length);
    return;
  }

  const failedFrom = arg("failed");
  if (failedFrom) {
    const store = await db();
    if (!store) throw new Error("--failed needs FIREBASE_SERVICE_ACCOUNT_KEY");
    const { FieldValue } = await import("firebase-admin/firestore");
    const { tasks } = JSON.parse(readFileSync(failedFrom, "utf8")) as { tasks: UpkeepTask[] };
    for (const t of tasks) {
      await store.collection("examUpkeep").doc(t.key).set({ failures: FieldValue.increment(1), lastFailedAt: new Date().toISOString(), exam: t.exam, type: t.type }, { merge: true });
    }
    console.log(`[exam-upkeep] counted a failure on ${tasks.length} tasks`);
    return;
  }

  console.error("usage: --pick <out.json> [--max 3] | --failed <tasks.json>");
  process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
