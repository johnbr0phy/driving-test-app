/**
 * Daily source triage: the official pages the banks were written from
 * (sourceWatch, filled by /api/cron/source-watch) that changed or keep failing,
 * handed to Claude Code so nobody has to read them by hand.
 *
 *   npx tsx scripts/source-triage.ts --export <file>
 *     Writes the pages that need a decision: changed or broken (2+ failures),
 *     still watched (in lib/examSources.json), and not triaged since they last
 *     changed. A page left as needs_person is retried after 7 days. Prints the
 *     count. Each entry carries the exam's sources.md paths.
 *
 *   npx tsx scripts/source-triage.ts --apply <decisions.json> [--merged] [--run <id>]
 *     Writes Claude Code's decisions back to sourceWatch. The file is an array of
 *     { id, url, verdict, reason }, verdict one of noise | updated | replaced |
 *     needs_person. noise re-baselines the page now (today's page becomes the one
 *     the next check compares to). updated and replaced are recorded as pending
 *     until the fix PR merges; with --merged (the workflow's push job) they
 *     re-baseline too. needs_person stays on the /admin Questions tab with the
 *     reason. Rules shared with /admin: sourceNeedsPerson in lib/questionQuality.ts.
 *
 * Needs FIREBASE_SERVICE_ACCOUNT_KEY.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import SOURCES from "@/lib/examSources.json";
import { sourceNeedsPerson, type SourceTriage, type WatchedSource } from "@/lib/questionQuality";

const args = process.argv.slice(2);
const arg = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const RETRY_DAYS = 7;
const VERDICTS = new Set(["noise", "updated", "replaced", "needs_person"]);

interface Decision {
  id: string;
  url: string;
  verdict: "noise" | "updated" | "replaced" | "needs_person";
  reason: string;
}

/** Every tools/**\/sources.md, by the exam folder it sits in. */
let SOURCES_MD: Map<string, string[]> | null = null;
function sourcesMdFor(exam: string): string[] {
  if (!SOURCES_MD) {
    SOURCES_MD = new Map();
    for (const rel of readdirSync("tools", { recursive: true }) as string[]) {
      const parts = rel.split(/[\\/]/);
      if (parts.at(-1) !== "sources.md" || parts.length < 2) continue;
      const path = join("tools", rel);
      if (!existsSync(path)) continue;
      const key = parts.at(-2)!;
      SOURCES_MD.set(key, [...(SOURCES_MD.get(key) ?? []), path].sort());
    }
  }
  return SOURCES_MD.get(exam) ?? [];
}

async function main() {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    console.error("FIREBASE_SERVICE_ACCOUNT_KEY is not set");
    process.exit(1);
  }
  const { getAdminDb } = await import("@/lib/firebase-admin");
  const db = getAdminDb();
  const now = new Date().toISOString();

  const exportTo = arg("export");
  if (exportTo) {
    const watched = new Set(Object.values(SOURCES as Record<string, string[]>).flat());
    const retryBefore = new Date(Date.now() - RETRY_DAYS * 86_400_000).toISOString();
    const [changed, broken] = await Promise.all([
      db.collection("sourceWatch").where("changed", "==", true).get(),
      db.collection("sourceWatch").where("failures", ">=", 2).get(),
    ]);
    const seen = new Set<string>();
    const out = [];
    for (const d of [...changed.docs, ...broken.docs]) {
      if (seen.has(d.id)) continue;
      seen.add(d.id);
      const v = d.data();
      const s: WatchedSource = { url: v.url, changed: v.changed === true, changedAt: v.changedAt ?? null, failures: v.failures ?? 0, triage: v.triage ?? null };
      if (!sourceNeedsPerson(s, watched)) continue;
      // Already judged needs_person: try again once a week, not every morning.
      if (s.triage?.verdict === "needs_person" && s.triage.at > retryBefore && !(s.changedAt && s.triage.at < s.changedAt)) continue;
      const exams: string[] = v.exams ?? [];
      out.push({
        id: d.id,
        url: s.url,
        exams,
        kind: s.changed ? "changed" : "broken",
        percentChanged: Math.round((v.ratio ?? 0) * 100),
        changedAt: s.changedAt,
        failures: s.failures,
        error: v.error ?? null,
        previousTriage: s.triage ?? null,
        sourcesMd: Object.fromEntries(exams.map((e) => [e, sourcesMdFor(e)])),
      });
    }
    writeFileSync(exportTo, JSON.stringify(out, null, 1) + "\n");
    console.log(out.length);
    return;
  }

  const applyFrom = arg("apply");
  if (applyFrom) {
    const merged = args.includes("--merged");
    const runId = arg("run");
    const decisions = JSON.parse(readFileSync(applyFrom, "utf8")) as Decision[];
    let n = 0;
    for (const d of decisions) {
      if (!d || typeof d.id !== "string" || !/^[0-9a-f]{40}$/.test(d.id) || !VERDICTS.has(d.verdict)) {
        console.warn(`[source-triage] skipped a bad entry: ${JSON.stringify(d).slice(0, 200)}`);
        continue;
      }
      // After the merge only the PR's own pages move; noise and needs_person were written the day of the run.
      if (merged && d.verdict !== "updated" && d.verdict !== "replaced") continue;
      const ref = db.collection("sourceWatch").doc(d.id);
      const snap = await ref.get();
      if (!snap.exists) continue;
      const v = snap.data()!;
      const reason = String(d.reason || "").slice(0, 300);
      const settled = d.verdict === "noise" || (merged && (d.verdict === "updated" || d.verdict === "replaced"));
      const verdict: SourceTriage["verdict"] = d.verdict === "noise" || d.verdict === "needs_person" ? d.verdict : merged ? d.verdict : "pending";
      const triage: SourceTriage = { verdict, reason, at: now, ...(runId && { runId }) };
      if (settled && v.latest) {
        await ref.update({ triage, baseline: v.latest, baselineAt: now, changed: false, ratio: 0, reviewedAt: now });
      } else {
        await ref.update({ triage });
      }
      n++;
    }
    console.log(`[source-triage] applied ${n} of ${decisions.length} decisions${merged ? " (merged)" : ""}`);
    return;
  }

  console.error("usage: --export <file> | --apply <file> [--merged] [--run <id>]");
  process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
