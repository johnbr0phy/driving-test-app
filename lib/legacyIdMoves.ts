/**
 * Exams that had to change their test and set ids after shipping. Progress is
 * stored by those ids, so an exam's old records move to its new ids, picked out
 * by question id prefix (every record keeps the question ids it covers).
 *
 * ASWB Clinical (questions ASWBCLIN-) shipped in Nov 2026 on block 16900, which
 * K53 Code 3 (questions ZAC3-) already held: both exams wrote training sets
 * 16901-16905 and tests 16901-16904, and because lookups by id found ASWB
 * Clinical first, K53 Code 3 tests were saved under its state code. ASWB
 * Clinical now lives at 21900. This runs on every load and does nothing once
 * the records are sorted, so it is safe on any data, migrated or not.
 */

type SetProgress = { masteredIds?: unknown[]; wrongQueue?: unknown[] };
type TestLike = {
  testNumber?: number;
  state?: string;
  questions?: { questionId?: string }[];
  answers?: unknown;
  score?: number;
  completedAt?: unknown;
  startedAt?: unknown;
};
type CurrentLike = { questions?: { questionId?: string }[]; answers?: unknown };
type AttemptLike = {
  testNumber: number;
  state: string;
  attemptCount: number;
  firstScore: number;
  bestScore: number;
  lastAttemptDate: unknown;
};

export type MovableProgress = {
  trainingSets?: Record<string, SetProgress>;
  currentTests?: Record<string, CurrentLike>;
  completedTests?: TestLike[];
  testAttempts?: AttemptLike[];
};

type Move = {
  /** The exam that moves: its question id prefix and state code. */
  prefix: string;
  state: string;
  /** The exam that stays on the old block. */
  stayPrefix: string;
  stayState: string;
  fromBase: number;
  toBase: number;
  sets: number;
  tests: number;
};

const MOVES: Move[] = [
  {
    prefix: "ASWBCLIN-",
    state: "ASWBCLIN",
    stayPrefix: "ZAC3-",
    stayState: "ZAK53C3",
    fromBase: 16900,
    toBase: 21900,
    sets: 5,
    tests: 4,
  },
];

const str = (v: unknown): v is string => typeof v === "string";

function testPrefixOf(t: { questions?: { questionId?: string }[]; answers?: unknown }): string | null {
  const q = t.questions?.find((x) => str(x?.questionId))?.questionId;
  if (q) return q;
  if (Array.isArray(t.answers)) {
    const a = (t.answers as { questionId?: unknown }[]).find((x) => str(x?.questionId))?.questionId;
    if (str(a)) return a;
  }
  return null;
}

const time = (v: unknown): number => {
  if (v instanceof Date) return v.getTime();
  if (str(v) || typeof v === "number") return new Date(v).getTime() || 0;
  // Firestore Timestamp
  if (v && typeof (v as { toMillis?: () => number }).toMillis === "function") return (v as { toMillis: () => number }).toMillis();
  return 0;
};

function moveSets(sets: Record<string, SetProgress>, m: Move): Record<string, SetProgress> | null {
  let out: Record<string, SetProgress> | null = null;
  for (let k = 1; k <= m.sets; k++) {
    const oldKey = String(m.fromBase + k);
    const old = sets[oldKey];
    if (!old) continue;
    const mastered = (old.masteredIds ?? []).filter(str);
    const wrong = (old.wrongQueue ?? []).filter(str);
    const movedMastered = mastered.filter((id) => id.startsWith(m.prefix));
    const movedWrong = wrong.filter((id) => id.startsWith(m.prefix));
    if (movedMastered.length === 0 && movedWrong.length === 0) continue;
    out = out ?? { ...sets };
    const newKey = String(m.toBase + k);
    const target = out[newKey] ?? {};
    const targetMastered = (target.masteredIds ?? []).filter(str);
    const masteredIds = [...new Set([...targetMastered, ...movedMastered])];
    const done = new Set(masteredIds);
    const wrongQueue = [...new Set([...(target.wrongQueue ?? []).filter(str), ...movedWrong])].filter((id) => !done.has(id));
    out[newKey] = { ...target, masteredIds, wrongQueue };
    const keepMastered = mastered.filter((id) => !id.startsWith(m.prefix));
    const keepWrong = wrong.filter((id) => !id.startsWith(m.prefix));
    if (keepMastered.length === 0 && keepWrong.length === 0) delete out[oldKey];
    else out[oldKey] = { ...old, masteredIds: keepMastered, wrongQueue: keepWrong };
  }
  return out;
}

function moveCurrent(current: Record<string, CurrentLike>, m: Move): Record<string, CurrentLike> | null {
  let out: Record<string, CurrentLike> | null = null;
  for (let k = 1; k <= m.tests; k++) {
    const oldKey = String(m.fromBase + k);
    const test = current[oldKey];
    if (!test || !testPrefixOf(test)?.startsWith(m.prefix)) continue;
    out = out ?? { ...current };
    const newKey = String(m.toBase + k);
    if (!out[newKey]) out[newKey] = test;
    delete out[oldKey];
  }
  return out;
}

const inOldBlock = (n: unknown, m: Move) => typeof n === "number" && n > m.fromBase && n <= m.fromBase + m.tests;

function moveCompleted(tests: TestLike[], m: Move): TestLike[] | null {
  let changed = false;
  const out = tests.map((t) => {
    if (!inOldBlock(t.testNumber, m)) return t;
    const q = testPrefixOf(t);
    if (q?.startsWith(m.prefix)) {
      changed = true;
      return { ...t, testNumber: (t.testNumber as number) - m.fromBase + m.toBase, state: m.state };
    }
    if (q?.startsWith(m.stayPrefix) && t.state !== m.stayState) {
      changed = true;
      return { ...t, state: m.stayState };
    }
    return t;
  });
  return changed ? out : null;
}

/** First, best, count and last date per test, rebuilt from the sorted history. */
function rebuildAttempts(attempts: AttemptLike[], tests: TestLike[], m: Move): AttemptLike[] {
  const ours = (a: { testNumber?: unknown; state?: unknown }) =>
    (inOldBlock(a.testNumber, m) && (a.state === m.state || a.state === m.stayState)) ||
    (typeof a.testNumber === "number" && a.testNumber > m.toBase && a.testNumber <= m.toBase + m.tests && a.state === m.state);
  const kept = attempts.filter((a) => !ours(a));
  const groups = new Map<string, TestLike[]>();
  for (const t of tests) {
    if (!ours(t)) continue;
    const key = `${t.testNumber}|${t.state}`;
    groups.set(key, [...(groups.get(key) ?? []), t]);
  }
  for (const group of groups.values()) {
    const sorted = [...group].sort((a, b) => time(a.completedAt ?? a.startedAt) - time(b.completedAt ?? b.startedAt));
    const scores = sorted.map((t) => (typeof t.score === "number" ? t.score : 0));
    const last = sorted[sorted.length - 1];
    kept.push({
      testNumber: last.testNumber as number,
      state: last.state as string,
      attemptCount: sorted.length,
      firstScore: scores[0],
      bestScore: Math.max(...scores),
      lastAttemptDate: last.completedAt ?? last.startedAt ?? new Date(),
    });
  }
  return kept;
}

/**
 * Returns the same object when nothing needs moving, so callers can compare by
 * reference and skip a save.
 */
export function applyLegacyIdMoves<T extends MovableProgress>(data: T): T {
  if (!data) return data;
  let out: T | null = null;
  for (const m of MOVES) {
    const cur: T = out ?? data;
    const sets = cur.trainingSets ? moveSets(cur.trainingSets, m) : null;
    const current = cur.currentTests ? moveCurrent(cur.currentTests, m) : null;
    const completed = Array.isArray(cur.completedTests) ? moveCompleted(cur.completedTests, m) : null;
    if (!sets && !current && !completed) continue;
    const next: T = { ...cur };
    if (sets) next.trainingSets = sets;
    if (current) next.currentTests = current;
    if (completed) {
      next.completedTests = completed;
      next.testAttempts = rebuildAttempts(Array.isArray(cur.testAttempts) ? cur.testAttempts : [], completed, m);
    }
    out = next;
  }
  return out ?? data;
}

/** Training sets only, for readers that never touch tests (the MCP practice tools). */
export function applyLegacySetMoves<T extends Record<string, SetProgress>>(sets: T): T {
  if (!sets) return sets;
  let out: Record<string, SetProgress> | null = null;
  for (const m of MOVES) out = moveSets(out ?? sets, m) ?? out;
  return (out ?? sets) as T;
}
