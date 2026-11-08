// Builds the questionPicks/{examId} writes for POST /api/analytics/question-picks.
// Firestore allows at most 500 field transforms (FieldValue.increment) on one
// document per commit, and a 200-item batch can need more than that. So the
// sums are split into several merge writes, each under MAX_TRANSFORMS_PER_WRITE.
// Every question's counters stay together in one write, and the stored shape
// (n, c, w.{i}, s, sc, sw.{i} per question) is unchanged for the readers.

export type PickItem = { q: string; p: number; ok: boolean; s: boolean };
export type PickSum = { n: number; c: number; w: Record<string, number>; s: number; sc: number; sw: Record<string, number> };

/** Firestore's hard limit is 500; stay well under it. */
export const MAX_TRANSFORMS_PER_WRITE = 450;

export function sumPicks(items: PickItem[]): Record<string, PickSum> {
  const sums: Record<string, PickSum> = {};
  for (const it of items) {
    const q = (sums[it.q] ??= { n: 0, c: 0, w: {}, s: 0, sc: 0, sw: {} });
    const p = String(it.p);
    q.n++;
    if (it.ok) q.c++;
    const wrongPick = !it.ok && it.p >= 0;
    if (wrongPick) q.w[p] = (q.w[p] || 0) + 1;
    if (it.s === true) {
      q.s++;
      if (it.ok) q.sc++;
      if (wrongPick) q.sw[p] = (q.sw[p] || 0) + 1;
    }
  }
  return sums;
}

/** Number of increments one question's update carries. */
export function transformCount(q: PickSum): number {
  return 1 + (q.c ? 1 : 0) + Object.keys(q.w).length + (q.s ? 1 + (q.sc ? 1 : 0) + Object.keys(q.sw).length : 0);
}

function questionUpdate<T>(q: PickSum, inc: (x: number) => T): Record<string, unknown> {
  const incAll = (m: Record<string, number>) => Object.fromEntries(Object.entries(m).map(([k, v]) => [k, inc(v)]));
  return {
    n: inc(q.n),
    ...(q.c && { c: inc(q.c) }),
    ...(Object.keys(q.w).length && { w: incAll(q.w) }),
    ...(q.s && {
      s: inc(q.s),
      ...(q.sc && { sc: inc(q.sc) }),
      ...(Object.keys(q.sw).length && { sw: incAll(q.sw) }),
    }),
  };
}

/**
 * Splits the summed picks into merge-write payloads, each carrying at most
 * `limit` increments. One question is never split across writes.
 */
export function pickUpdateChunks<T>(
  sums: Record<string, PickSum>,
  inc: (x: number) => T,
  limit: number = MAX_TRANSFORMS_PER_WRITE,
): Record<string, unknown>[] {
  const chunks: Record<string, unknown>[] = [];
  let current: Record<string, unknown> = {};
  let used = 0;
  for (const [qid, q] of Object.entries(sums)) {
    const cost = transformCount(q);
    if (used > 0 && used + cost > limit) {
      chunks.push(current);
      current = {};
      used = 0;
    }
    current[qid] = questionUpdate(q, inc);
    used += cost;
  }
  if (used > 0) chunks.push(current);
  return chunks;
}
