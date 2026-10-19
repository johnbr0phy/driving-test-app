/**
 * Training sets that were split into smaller ones. Progress is stored per set id,
 * so a retired set's mastered and missed questions are handed to the new sets by
 * question id, once: a new set that already has progress of its own is left alone.
 */
type SetProgress = { masteredIds: string[]; wrongQueue: string[] };

const SPLITS: { from: number; prefix: string; to: Record<number, number[]> }[] = [
  // HTL Staining (204) became six sets by tissue type in Oct 2026.
  {
    from: 204,
    prefix: "HTL-STN-",
    to: {
    206: [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 66, 67, 68, 69, 71, 72],
    207: [13, 14, 15, 16, 17, 18, 25, 70],
    208: [19, 20, 21, 23, 24, 31, 37, 38, 39, 41],
    209: [27, 28, 29, 30],
    210: [9, 11, 22, 26, 32, 33, 34, 35, 36, 40],
    211: [42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65],
    },
  },
];

export function splitLegacySets<T extends Record<string | number, SetProgress>>(sets: T): T {
  if (!sets) return sets;
  let out: Record<string | number, SetProgress> | null = null;
  for (const { from, prefix, to } of SPLITS) {
    const old = sets[from];
    if (!old) continue;
    for (const [setId, nums] of Object.entries(to)) {
      if (sets[setId]) continue;
      const ids = new Set(nums.map((n) => `${prefix}${String(n).padStart(3, "0")}`));
      const masteredIds = (old.masteredIds ?? []).filter((id) => ids.has(id));
      const wrongQueue = (old.wrongQueue ?? []).filter((id) => ids.has(id));
      if (masteredIds.length === 0 && wrongQueue.length === 0) continue;
      out = out ?? { ...sets };
      out[setId] = { masteredIds, wrongQueue };
    }
  }
  return (out ?? sets) as T;
}
