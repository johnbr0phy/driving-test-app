/**
 * The order a training set asks its fresh questions in.
 *
 * Banks are written topic by topic, so question IDs run in clusters (ten
 * roundabout questions, then ten lane questions). Asking them in ID order
 * means a run of the same subtopic. This mixes them, deterministically, so a
 * reload asks the same next question:
 *
 * 1. Within each category, a golden-ratio stride over the ID order: the k-th
 *    question asked is ID position (k * stride) mod n, with stride about
 *    0.618 n and coprime with n. Neighbouring IDs land far apart, so a run of
 *    one subtopic is spread through the whole set.
 * 2. Across categories, each one's questions are spread evenly through the
 *    set (question j of a category with c questions sits at (j + 0.5) / c), so
 *    a two-topic set alternates instead of finishing one topic first.
 *
 * Only the order changes: which questions are in a set or part, and the
 * progress stored per question, are untouched.
 */

function gcd(a: number, b: number): number {
  while (b) [a, b] = [b, a % b];
  return a;
}

/** Positions 0..n-1 visited by a golden-ratio stride. */
export function strideOrder(n: number): number[] {
  if (n <= 2) return Array.from({ length: n }, (_, i) => i);
  let k = Math.max(1, Math.round(n * 0.618));
  // Nearest stride coprime with n, so every position is visited once.
  for (let d = 0; d < n; d++) {
    if (k + d < n && gcd(k + d, n) === 1) { k += d; break; }
    if (k - d > 0 && gcd(k - d, n) === 1) { k -= d; break; }
  }
  return Array.from({ length: n }, (_, i) => (i * k) % n);
}

export function mixTrainingOrder<T>(items: T[], id: (t: T) => string, group: (t: T) => string): T[] {
  const sorted = [...items].sort((a, b) => id(a).localeCompare(id(b)));
  const groups = new Map<string, T[]>();
  for (const t of sorted) {
    const g = group(t);
    const list = groups.get(g);
    if (list) list.push(t);
    else groups.set(g, [t]);
  }
  const placed: { t: T; at: number; g: number }[] = [];
  let gi = 0;
  for (const list of groups.values()) {
    const order = strideOrder(list.length);
    order.forEach((pos, j) => placed.push({ t: list[pos], at: (j + 0.5) / list.length, g: gi }));
    gi++;
  }
  placed.sort((a, b) => a.at - b.at || a.g - b.g);
  return placed.map((p) => p.t);
}
