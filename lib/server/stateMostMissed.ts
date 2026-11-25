import { getAdminDb } from "@/lib/firebase-admin";
import { COMMUNITY_MIN_ANSWERS } from "@/lib/communityStats";

/**
 * Miss rates of state-specific DMV questions for the state landings, from the
 * nightly globalStats/questionDifficulty doc (/api/cron/aggregate-stats: real
 * accounts only). A question needs COMMUNITY_MIN_ANSWERS answers to be shown.
 * One read serves every state page in a build or revalidation. Null without a
 * Firestore credential (a local build) or on any error, so the page falls back
 * to its fixed sample.
 */
type Difficulty = { rates: Map<string, { total: number; errorRate: number }>; updatedAt: string | null };

let cached: Promise<Difficulty | null> | null = null;
let cachedAt = 0;

async function readDifficulty(): Promise<Difficulty | null> {
  try {
    const snap = await getAdminDb().collection("globalStats").doc("questionDifficulty").get();
    const data = snap.data();
    const qs = data?.questions as Record<string, { total?: number; errorRate?: number }> | undefined;
    if (!qs) return null;
    const rates = new Map<string, { total: number; errorRate: number }>();
    for (const [id, v] of Object.entries(qs)) {
      if (typeof v?.total === "number" && typeof v?.errorRate === "number") rates.set(id, { total: v.total, errorRate: v.errorRate });
    }
    const u = data?.updatedAt;
    const updatedAt = typeof u === "string" ? u.slice(0, 10) : typeof u?.toDate === "function" ? u.toDate().toISOString().slice(0, 10) : null;
    return { rates, updatedAt };
  } catch {
    return null;
  }
}

function difficulty(): Promise<Difficulty | null> {
  // Reuse one read for an hour: a build renders all 51 states at once.
  if (!cached || Date.now() - cachedAt > 3600_000) {
    cached = readDifficulty();
    cachedAt = Date.now();
  }
  return cached;
}

export type StateMissed = { questionId: string; errorRate: number; total: number };

/**
 * The `count` questions among `questionIds` that people miss most, highest
 * miss rate first. Empty when fewer than `min` questions have enough answers.
 */
export async function stateMostMissed(
  questionIds: string[],
  count: number,
  min = 3
): Promise<{ questions: StateMissed[]; updatedAt: string | null }> {
  const d = await difficulty();
  if (!d) return { questions: [], updatedAt: null };
  const ranked = questionIds
    .map((id) => ({ questionId: id, ...(d.rates.get(id) ?? { total: 0, errorRate: 0 }) }))
    .filter((q) => q.total >= COMMUNITY_MIN_ANSWERS && q.errorRate > 0)
    .sort((a, b) => b.errorRate - a.errorRate || b.total - a.total || a.questionId.localeCompare(b.questionId))
    .slice(0, count);
  return { questions: ranked.length >= min ? ranked : [], updatedAt: d.updatedAt };
}
