/**
 * Read-only referral engagement analysis.
 *
 * Pulls every user with `referredBy` set, classifies their engagement, groups
 * by referrer, and flags clusters that look like throwaway signups.
 *
 * Usage:
 *   FIREBASE_SERVICE_ACCOUNT_KEY='{...}' npx tsx scripts/analyze-referrals.ts
 *
 * Optional flags:
 *   --json            Emit machine-readable JSON instead of the text report.
 *   --csv <path>      Also write a per-referee CSV to <path>.
 *   --min-cluster N   Min referees per referrer to flag a cluster (default 3).
 */
import { getAdminDb, getAdminAuth } from "../lib/firebase-admin";
import { writeFileSync } from "node:fs";

type Bucket =
  | "never_opened"
  | "signed_up_only"
  | "picked_state_only"
  | "answered_some"
  | "engaged"
  | "completed_test";

interface Referee {
  uid: string;
  email: string | null;
  referredBy: string;
  referredAt: string | null;
  createdAt: string | null;
  lastUpdated: string | null;
  selectedState: string | null;
  activeDays: number;
  testsCompleted: number;
  trainingQuestionsAnswered: number;
  testQuestionsAnswered: number;
  totalQuestionsAnswered: number;
  bucket: Bucket;
}

interface ReferrerSummary {
  uid: string;
  email: string | null;
  refereeCount: number;
  zeroActivityCount: number;
  pickedStateOnlyCount: number;
  engagedCount: number;
  completedTestCount: number;
  zeroActivityShare: number;
  suspicious: boolean;
  suspicionReasons: string[];
  signupSpreadMinutes: number | null;
}

function tsToIso(v: unknown): string | null {
  if (!v) return null;
  if (typeof v === "string") return v;
  if (typeof v === "object" && v !== null && typeof (v as { toDate?: () => Date }).toDate === "function") {
    try { return (v as { toDate: () => Date }).toDate().toISOString(); } catch { return null; }
  }
  return null;
}

function classify(r: Omit<Referee, "bucket">): Bucket {
  if (r.testsCompleted > 0) return "completed_test";
  if (r.totalQuestionsAnswered >= 10) return "engaged";
  if (r.totalQuestionsAnswered >= 1) return "answered_some";
  if (r.selectedState) return "picked_state_only";
  if (r.activeDays > 0 || r.lastUpdated) return "signed_up_only";
  return "never_opened";
}

async function resolveEmails(uids: string[]): Promise<Map<string, string | null>> {
  const auth = getAdminAuth();
  const out = new Map<string, string | null>();
  const unique = Array.from(new Set(uids));
  for (let i = 0; i < unique.length; i += 100) {
    const batch = unique.slice(i, i + 100).map((uid) => ({ uid }));
    try {
      const result = await auth.getUsers(batch);
      for (const u of result.users) out.set(u.uid, u.email ?? null);
      for (const nf of result.notFound) out.set((nf as { uid: string }).uid, null);
    } catch (err) {
      console.error(`Auth lookup failed for batch starting ${i}:`, err instanceof Error ? err.message : err);
      for (const b of batch) out.set(b.uid, null);
    }
  }
  return out;
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const wantJson = args.includes("--json");
  const csvIdx = args.indexOf("--csv");
  const csvPath = csvIdx >= 0 ? args[csvIdx + 1] : null;
  const minClusterIdx = args.indexOf("--min-cluster");
  const minCluster = minClusterIdx >= 0 ? Math.max(2, Number(args[minClusterIdx + 1]) || 3) : 3;

  const db = getAdminDb();

  console.error("Fetching users with referredBy...");
  const snap = await db
    .collection("users")
    .where("referredBy", "!=", null)
    .get();
  console.error(`Found ${snap.size} referred users.`);

  const referees: Referee[] = [];
  for (const doc of snap.docs) {
    const data = doc.data() as Record<string, unknown>;
    const referredBy = data.referredBy as string | null;
    if (!referredBy) continue;

    const training = (data.training || {}) as Record<string, unknown>;
    const onboardingMastered = (training.masteredQuestionIds as unknown[] | undefined)?.length ?? 0;

    const trainingSets = (data.trainingSets || {}) as Record<string, Record<string, unknown>>;
    let trainingQuestionsAnswered = onboardingMastered;
    for (const setId of ["1", "2", "3", "4"]) {
      const s = trainingSets[setId] || {};
      trainingQuestionsAnswered += (s.masteredIds as unknown[] | undefined)?.length ?? 0;
      trainingQuestionsAnswered += (s.wrongQueue as unknown[] | undefined)?.length ?? 0;
    }

    const completedTests = (data.completedTests as Record<string, unknown>[] | undefined) ?? [];
    let testQuestionsAnswered = 0;
    for (const t of completedTests) {
      const answers = t.answers as unknown[] | Record<string, unknown> | undefined;
      if (Array.isArray(answers)) testQuestionsAnswered += answers.length;
      else if (answers && typeof answers === "object") testQuestionsAnswered += Object.keys(answers).length;
      else testQuestionsAnswered += (t.totalQuestions as number) || 0;
    }
    const currentTests = (data.currentTests || {}) as Record<string, Record<string, unknown>>;
    for (const ct of Object.values(currentTests)) {
      const answers = ct.answers as Record<string, unknown> | undefined;
      if (answers) testQuestionsAnswered += Object.keys(answers).length;
    }

    const activeDates = (data.activeDates as string[] | undefined) ?? [];
    const base = {
      uid: doc.id,
      email: (data.email as string | null) ?? null,
      referredBy,
      referredAt: tsToIso(data.referredAt),
      createdAt: tsToIso(data.createdAt),
      lastUpdated: (data.lastUpdated as string | null) ?? null,
      selectedState: (data.selectedState as string | null) ?? null,
      activeDays: activeDates.length,
      testsCompleted: completedTests.length,
      trainingQuestionsAnswered,
      testQuestionsAnswered,
      totalQuestionsAnswered: trainingQuestionsAnswered + testQuestionsAnswered,
    };
    referees.push({ ...base, bucket: classify(base) });
  }

  // Resolve emails for referees (some user docs may not store email) and referrers.
  const uidsForEmail = [
    ...referees.filter((r) => !r.email).map((r) => r.uid),
    ...Array.from(new Set(referees.map((r) => r.referredBy))),
  ];
  console.error(`Resolving ${uidsForEmail.length} emails via Auth...`);
  const emails = await resolveEmails(uidsForEmail);
  for (const r of referees) if (!r.email) r.email = emails.get(r.uid) ?? null;

  // Aggregate buckets.
  const bucketCounts: Record<Bucket, number> = {
    never_opened: 0,
    signed_up_only: 0,
    picked_state_only: 0,
    answered_some: 0,
    engaged: 0,
    completed_test: 0,
  };
  for (const r of referees) bucketCounts[r.bucket]++;

  // Group by referrer.
  const byReferrer = new Map<string, Referee[]>();
  for (const r of referees) {
    const arr = byReferrer.get(r.referredBy) ?? [];
    arr.push(r);
    byReferrer.set(r.referredBy, arr);
  }

  const referrers: ReferrerSummary[] = [];
  for (const [uid, list] of byReferrer.entries()) {
    const zero = list.filter((r) => r.bucket === "never_opened" || r.bucket === "signed_up_only").length;
    const pickedOnly = list.filter((r) => r.bucket === "picked_state_only").length;
    const engaged = list.filter((r) => r.bucket === "answered_some" || r.bucket === "engaged").length;
    const completed = list.filter((r) => r.bucket === "completed_test").length;
    const zeroShare = list.length > 0 ? zero / list.length : 0;

    const stamps = list
      .map((r) => r.referredAt ?? r.createdAt)
      .filter((s): s is string => !!s)
      .map((s) => new Date(s).getTime())
      .filter((n) => Number.isFinite(n));
    const spreadMin = stamps.length >= 2 ? (Math.max(...stamps) - Math.min(...stamps)) / 60000 : null;

    const reasons: string[] = [];
    if (list.length >= minCluster && zeroShare >= 0.8) {
      reasons.push(`${Math.round(zeroShare * 100)}% of ${list.length} referees never answered a question`);
    }
    if (list.length >= minCluster && spreadMin !== null && spreadMin <= 30) {
      reasons.push(`${list.length} referees signed up within ${Math.round(spreadMin)} min`);
    }

    referrers.push({
      uid,
      email: emails.get(uid) ?? null,
      refereeCount: list.length,
      zeroActivityCount: zero,
      pickedStateOnlyCount: pickedOnly,
      engagedCount: engaged,
      completedTestCount: completed,
      zeroActivityShare: zeroShare,
      suspicious: reasons.length > 0,
      suspicionReasons: reasons,
      signupSpreadMinutes: spreadMin,
    });
  }
  referrers.sort((a, b) => b.refereeCount - a.refereeCount);

  if (csvPath) {
    const header = "uid,email,referredBy,referredAt,selectedState,activeDays,testsCompleted,trainingQuestionsAnswered,testQuestionsAnswered,totalQuestionsAnswered,bucket\n";
    const rows = referees.map((r) => [
      r.uid, r.email ?? "", r.referredBy, r.referredAt ?? "", r.selectedState ?? "",
      r.activeDays, r.testsCompleted, r.trainingQuestionsAnswered, r.testQuestionsAnswered, r.totalQuestionsAnswered, r.bucket,
    ].map((v) => {
      const s = String(v);
      return s.includes(",") || s.includes('"') ? `"${s.replace(/"/g, '""')}"` : s;
    }).join(","));
    writeFileSync(csvPath, header + rows.join("\n") + "\n");
    console.error(`Wrote CSV to ${csvPath}`);
  }

  if (wantJson) {
    console.log(JSON.stringify({ bucketCounts, referrers, referees }, null, 2));
    return;
  }

  // Text report.
  const total = referees.length;
  const pct = (n: number) => (total === 0 ? "0%" : `${Math.round((n / total) * 100)}%`);
  console.log("\n=== Referral Engagement Report ===");
  console.log(`Total referred users: ${total}\n`);
  console.log("Engagement breakdown:");
  console.log(`  never_opened       ${bucketCounts.never_opened.toString().padStart(5)}  ${pct(bucketCounts.never_opened)}   (no state, no activity)`);
  console.log(`  signed_up_only     ${bucketCounts.signed_up_only.toString().padStart(5)}  ${pct(bucketCounts.signed_up_only)}   (opened app, no state)`);
  console.log(`  picked_state_only  ${bucketCounts.picked_state_only.toString().padStart(5)}  ${pct(bucketCounts.picked_state_only)}   (state set, 0 questions)`);
  console.log(`  answered_some      ${bucketCounts.answered_some.toString().padStart(5)}  ${pct(bucketCounts.answered_some)}   (1-9 questions)`);
  console.log(`  engaged            ${bucketCounts.engaged.toString().padStart(5)}  ${pct(bucketCounts.engaged)}   (10+ questions, no completed test)`);
  console.log(`  completed_test     ${bucketCounts.completed_test.toString().padStart(5)}  ${pct(bucketCounts.completed_test)}   (>=1 completed test)`);

  const anyAnswers = bucketCounts.answered_some + bucketCounts.engaged + bucketCounts.completed_test;
  console.log(`\nReferees who answered >= 1 question: ${anyAnswers} (${pct(anyAnswers)})`);

  console.log("\nTop referrers:");
  console.log("  " + ["referrer email", "uid", "refs", "0-act", "pickOnly", "engaged", "done"].join("\t"));
  for (const r of referrers.slice(0, 20)) {
    console.log("  " + [
      r.email ?? "(no email)",
      r.uid,
      r.refereeCount,
      r.zeroActivityCount,
      r.pickedStateOnlyCount,
      r.engagedCount,
      r.completedTestCount,
    ].join("\t"));
  }

  const flagged = referrers.filter((r) => r.suspicious);
  console.log(`\nSuspicious clusters (min ${minCluster} referees): ${flagged.length}`);
  for (const r of flagged) {
    console.log(`  - ${r.email ?? r.uid}: ${r.refereeCount} referees`);
    for (const reason of r.suspicionReasons) console.log(`      • ${reason}`);
  }
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.stack ?? err.message : err);
  process.exit(1);
});
