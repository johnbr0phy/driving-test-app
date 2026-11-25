// Daily rank: where a person stands today by correct answers.
//
// Pure maths shared by the server (lib/server/dailyRank.ts), the browser
// (lib/dailyRankClient.ts) and tests/daily-rank.test.cjs. No Firestore, no DOM.
//
// Rules:
// - A person is a signed-in uid or, for a guest, the browser id
//   (lib/enrollment.ts getBrowserId). A guest's day moves onto the account
//   at sign-in (mergePeople).
// - Only the first answer to each question in a local day counts, and only
//   if it was right. Speed never counts.
// - Tiger Time: one day for everyone, midnight to midnight Eastern time
//   (America/New_York, so it follows daylight saving). Everyone on the
//   site is ranked against everyone else that day, and the signed-in account
//   with the most correct answers when the clock hits zero wins the day's
//   trophy (app/api/cron/tiger-time).
// - The distribution is a histogram: correct count -> people with that count.
//   Nobody's identity is in it, and the browser only ever gets percentile
//   cutoffs (never the head count) plus their own "N more" line.

/** Counts above this all share one bucket (keeps the histogram small). */
export const RANK_COUNT_CAP = 1000;
/** "N more correct to pass the next 1,000 people". */
export const RANK_PASS_BLOCK = 1000;
/** Questions remembered per person per day (seen set), so a doc stays small. */
export const RANK_MAX_SEEN = 3000;
/** How long a day's distribution is cached before it is read again. */
export const RANK_DISTRIBUTION_TTL_MS = 15 * 60_000;
/** Places are shown only this high up ("2nd"); below, the percentile ("Top 6%"). */
export const RANK_SHOW_PLACE_MAX = 100;
/** Percentiles above this are not shown ("Top 80%" reads as a put-down). */
export const RANK_SHOW_TOP_PERCENT_MAX = 50;

/** correct count (as a string key) -> people with that count today. */
export type RankHistogram = Record<string, number>;

/** One person's day: hashed question keys answered right / wrong first time. */
export type RankPerson = { k: string[]; w: string[] };

export type RankAnswer = { key: string; ok: boolean };

export type RankNext =
  | { kind: "block"; need: number; people: number }
  | { kind: "everyone"; need: number; people: number }
  | { kind: "top" };

export type RankStatus = {
  day: string;
  correct: number;
  /** 1 to 100, null with 0 correct. */
  topPercent: number | null;
  next: RankNext | null;
  /** cutoffs[p - 1]: fewest correct answers that reach the top p%, null if none can. */
  cutoffs: (number | null)[];
  /** Place today (ties share the better one), only in the top RANK_SHOW_PLACE_MAX. */
  place: number | null;
  /** In the top 100 but not first: the next place up and how many more correct reach it. */
  placeGoal: { place: number; need: number } | null;
  /** Below the top 100: how many more correct reach it (null when nobody is ahead). */
  enterTop: { need: number } | null;
};

// ── Tiger Time and local days ────────────────────────────────────────────────

/** Tiger Time's clock: US Eastern time, daylight saving included. */
export const TIGER_TIME_ZONE = "America/New_York";
/** Fewest correct answers that can win a day's trophy. */
export const TIGER_TIME_MIN_TO_WIN = 10;

/** The Tiger Time day (YYYY-MM-DD, Eastern) at `now`. */
export function tigerDay(now: Date = new Date()): string {
  return localDay(now, TIGER_TIME_ZONE);
}

/**
 * Milliseconds until the current Tiger Time day ends (the next midnight in
 * Eastern time). Walks whole hours from the wall-clock guess, so the 23- and
 * 25-hour days when daylight saving starts and ends come out right.
 */
export function tigerTimeLeftMs(now: Date = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIGER_TIME_ZONE,
    hourCycle: "h23",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(now);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  const intoDay = ((get("hour") * 60 + get("minute")) * 60 + get("second")) * 1000 + now.getMilliseconds();
  const today = tigerDay(now);
  let end = now.getTime() - intoDay + 86_400_000;
  const HOUR = 3_600_000;
  while (tigerDay(new Date(end)) === today) end += HOUR;
  while (tigerDay(new Date(end - HOUR)) !== today) end -= HOUR;
  return Math.max(0, end - now.getTime());
}

/** "3:07:45" for the countdown. */
export function formatCountdown(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const sec = total % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export type TigerCandidate = { uid: string | null; correct: number; reachedAt: string | null };

/**
 * The day's winner: the signed-in account with the most correct answers, at
 * least TIGER_TIME_MIN_TO_WIN, ties going to whoever got there first. Guests
 * cannot win (there is no account to give the trophy to), nor can accounts
 * `excluded` says no to (internal accounts).
 */
export function pickTigerTimeWinner(
  candidates: TigerCandidate[],
  excluded: (uid: string) => boolean = () => false,
  min = TIGER_TIME_MIN_TO_WIN,
): TigerCandidate | null {
  const eligible = candidates.filter((c) => c.uid && c.correct >= min && !excluded(c.uid));
  eligible.sort((a, b) => b.correct - a.correct || (a.reachedAt ?? "\uffff").localeCompare(b.reachedAt ?? "\uffff"));
  return eligible[0] ?? null;
}

// Local calendar days (the A/B test's next-day return uses the person's own).

/** YYYY-MM-DD in the given IANA time zone; UTC when the zone is unknown. */
export function localDay(now: Date, timeZone?: string | null): string {
  try {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: timeZone || "UTC",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(now);
  } catch {
    return now.toISOString().slice(0, 10);
  }
}

/** Every zone on Earth is within a day of UTC, so a real local day is too. */
export function isPlausibleLocalDay(day: string, now: Date): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) return false;
  const t = Date.parse(`${day}T00:00:00Z`);
  const today = Date.parse(`${now.toISOString().slice(0, 10)}T00:00:00Z`);
  return Number.isFinite(t) && Math.abs(t - today) <= 86_400_000;
}

/** The day after a YYYY-MM-DD day. */
export function nextDay(day: string): string {
  const t = Date.parse(`${day}T00:00:00Z`);
  return new Date(t + 86_400_000).toISOString().slice(0, 10);
}

// ── One person's counter ────────────────────────────────────────────────────

export function emptyPerson(): RankPerson {
  return { k: [], w: [] };
}

export function correctOf(p: RankPerson): number {
  return p.k.length;
}

/**
 * Adds answers to a person's day. A question already seen today (right or
 * wrong) is ignored, so a retry after a miss never counts and the same
 * question twice never counts twice.
 */
export function applyAnswers(person: RankPerson, answers: RankAnswer[], maxSeen = RANK_MAX_SEEN): RankPerson {
  const seen = new Set([...person.k, ...person.w]);
  const k = [...person.k];
  const w = [...person.w];
  for (const a of answers) {
    if (seen.size >= maxSeen) break;
    if (!a.key || seen.has(a.key)) continue;
    seen.add(a.key);
    (a.ok ? k : w).push(a.key);
  }
  return { k, w };
}

/**
 * A guest's day joined to the account's (sign-in). Today's count carries
 * over. A question both answered is counted once: right if either side got
 * it right first.
 */
export function mergePeople(account: RankPerson, guest: RankPerson): RankPerson {
  const k = [...new Set([...account.k, ...guest.k])];
  const right = new Set(k);
  const w = [...new Set([...account.w, ...guest.w])].filter((q) => !right.has(q));
  return { k, w };
}

// ── Histogram ───────────────────────────────────────────────────────────────

export function bucketOf(correct: number): number {
  return Math.max(0, Math.min(Math.floor(correct), RANK_COUNT_CAP));
}

/**
 * The change to the histogram when one person goes from `from` to `to`
 * correct. People with 0 correct are not in it.
 */
export function histogramDelta(from: number, to: number): RankHistogram {
  const a = bucketOf(from);
  const b = bucketOf(to);
  if (a === b) return {};
  const delta: RankHistogram = {};
  if (a > 0) delta[String(a)] = -1;
  if (b > 0) delta[String(b)] = (delta[String(b)] ?? 0) + 1;
  return delta;
}

/** Sum of several histograms (the shards of one day). Drops empty buckets. */
export function addHistograms(...hs: (RankHistogram | undefined | null)[]): RankHistogram {
  const out: RankHistogram = {};
  for (const h of hs) {
    if (!h) continue;
    for (const [k, v] of Object.entries(h)) {
      const n = typeof v === "number" && Number.isFinite(v) ? v : 0;
      out[k] = (out[k] ?? 0) + n;
    }
  }
  for (const k of Object.keys(out)) if (!(out[k] > 0) || !(Number(k) > 0)) delete out[k];
  return out;
}

type Sorted = { counts: number[]; people: number[]; total: number };

function sortHistogram(h: RankHistogram): Sorted {
  const counts = Object.keys(h)
    .map(Number)
    .filter((c) => c > 0 && h[String(c)] > 0)
    .sort((a, b) => a - b);
  const people = counts.map((c) => h[String(c)]);
  return { counts, people, total: people.reduce((a, b) => a + b, 0) };
}

/** People with more than `mine` correct. */
function peopleAbove(s: Sorted, mine: number): number {
  let n = 0;
  for (let i = s.counts.length - 1; i >= 0 && s.counts[i] > mine; i--) n += s.people[i];
  return n;
}

/** People with at least `mine` correct. */
function peopleAtOrAbove(s: Sorted, mine: number): number {
  let n = 0;
  for (let i = s.counts.length - 1; i >= 0 && s.counts[i] >= mine; i--) n += s.people[i];
  return n;
}

/**
 * Top X%: the share of today's people with at least your count, you
 * included, rounded up. Ties share the honest rank: 100 of 300 people tied
 * at the top are each top 34%, not top 1%. With 0 correct there is no rank.
 */
export function topPercent(h: RankHistogram, mine: number): number | null {
  const c = bucketOf(mine);
  if (c <= 0) return null;
  const s = sortHistogram(h);
  const atOrAbove = peopleAtOrAbove(s, c) + ((h[String(c)] ?? 0) > 0 ? 0 : 1);
  const total = Math.max(s.total, atOrAbove);
  return Math.max(1, Math.min(100, Math.ceil((100 * atOrAbove) / total)));
}

/**
 * How many more correct answers move you past the next 1,000 people (or,
 * with fewer than 1,000 people level with or ahead of you, past all of them).
 * Assumes you are in the histogram at `mine`.
 */
export function nextTarget(h: RankHistogram, mine: number, block = RANK_PASS_BLOCK): RankNext | null {
  const c = bucketOf(mine);
  if (c <= 0) return null;
  if (c >= RANK_COUNT_CAP) return { kind: "top" };
  const s = sortHistogram(h);
  // Everyone level with or ahead of you, not counting you.
  let others = -1;
  for (let i = 0; i < s.counts.length; i++) if (s.counts[i] >= c) others += s.people[i];
  others = Math.max(0, others);
  if (others === 0) return { kind: "top" };
  const target = Math.min(block, others);
  // Reaching c + d passes everyone with c .. c + d - 1 (minus you at c).
  let passed = -1;
  for (let i = 0; i < s.counts.length; i++) {
    if (s.counts[i] < c) continue;
    passed += s.people[i];
    if (passed >= target) {
      const need = s.counts[i] + 1 - c;
      return { kind: target === block ? "block" : "everyone", need, people: target };
    }
  }
  // Only reachable if you were not in the histogram; treat as top.
  return { kind: "top" };
}

/**
 * cutoffs[p - 1] is the fewest correct answers whose topPercent is p or
 * better, or null when no count gets there (fewer than 100 people make the
 * top 1% impossible). Lets the browser update "Top X%" after every answer
 * without knowing how many people answered today.
 */
export function percentileCutoffs(h: RankHistogram): (number | null)[] {
  const s = sortHistogram(h);
  const out: (number | null)[] = Array(100).fill(null);
  // topPercent only changes at a histogram count and one past it.
  const candidates = [...new Set([1, ...s.counts, ...s.counts.map((c) => Math.min(c + 1, RANK_COUNT_CAP))])]
    .filter((c) => c > 0)
    .sort((a, b) => a - b);
  for (const c of candidates) {
    const tp = topPercent(h, c);
    if (tp === null) continue;
    for (let p = tp; p <= 100; p++) if (out[p - 1] === null) out[p - 1] = c;
  }
  return out;
}

/** topPercent from the cutoffs alone (the browser's live estimate). */
export function topPercentFromCutoffs(cutoffs: (number | null)[], mine: number): number | null {
  const c = bucketOf(mine);
  if (c <= 0) return null;
  for (let p = 1; p <= cutoffs.length; p++) {
    const cut = cutoffs[p - 1];
    if (cut !== null && c >= cut) return p;
  }
  return 100;
}

/** The whole status the API returns. */
export function rankStatus(day: string, h: RankHistogram, mine: number): RankStatus {
  const correct = Math.max(0, Math.floor(mine));
  if (correct <= 0) return { day, correct: 0, topPercent: null, next: null, cutoffs: [], place: null, placeGoal: null, enterTop: null };
  const place = placeOf(h, correct);
  const shown = place <= RANK_SHOW_PLACE_MAX ? place : null;
  return {
    day,
    correct,
    topPercent: topPercent(h, correct),
    next: nextTarget(h, correct),
    cutoffs: percentileCutoffs(h),
    place: shown,
    placeGoal: shown !== null ? nextPlaceUp(h, correct) : null,
    enterTop: shown === null ? toEnterTop(h, correct) : null,
  };
}

/** More correct answers that put you in the top RANK_SHOW_PLACE_MAX places. */
export function toEnterTop(h: RankHistogram, mine: number, max = RANK_SHOW_PLACE_MAX): { need: number } | null {
  const c = bucketOf(mine);
  const s = sortHistogram(h);
  for (const x of s.counts) if (x > c && peopleAbove(s, x) + 1 <= max) return { need: x - c };
  return null;
}

/** Place today: everyone with more correct, plus one. Ties share the better place. */
export function placeOf(h: RankHistogram, mine: number): number {
  return peopleAbove(sortHistogram(h), bucketOf(mine)) + 1;
}

/**
 * The next place up: the next higher count anyone has today. Reaching it
 * ties them, and ties share the better place. Null when nobody is ahead.
 */
export function nextPlaceUp(h: RankHistogram, mine: number): { place: number; need: number } | null {
  const c = bucketOf(mine);
  const s = sortHistogram(h);
  const higher = s.counts.find((x) => x > c);
  if (higher === undefined) return null;
  return { place: peopleAbove(s, higher) + 1, need: higher - c };
}

// ── Next goal (the stats panel) ─────────────────────────────────────────────

/** The percentile steps a person climbs: Top 50%, 25%, 10%, 5%, 1%. */
export const GOAL_TIERS = [50, 25, 10, 5, 1] as const;

export type RankGoal =
  /** In the top 100: the next place up, `need` more correct. */
  | { kind: "place"; place: number; need: number }
  /** Top 1% but outside the top 100: `need` more gets in. */
  | { kind: "top100"; need: number }
  /** Sharing first place with others: one more takes it alone. */
  | { kind: "tiedFirst" }
  /** The next step up: reach `cutoff` correct (`need` more) for Top `p`%. */
  | { kind: "tier"; p: number; cutoff: number; need: number }
  /** Nobody has more today. */
  | { kind: "first" }
  /** Past every step: `need` more passes everyone still ahead. */
  | { kind: "chase"; need: number };

/**
 * What to aim for next. In the top 100, the next place up (5th aims at
 * 4th); below, the closest percentile step (Top 6% aims at Top 5%); in first
 * place, holding it.
 */
export function nextGoal(
  cutoffs: (number | null)[],
  mine: number,
  next: RankNext | null,
  place: number | null = null,
  placeGoal: { place: number; need: number } | null = null,
  enterTop: { need: number } | null = null,
): RankGoal | null {
  const c = bucketOf(mine);
  if (c <= 0) return null;
  if (next?.kind === "top") return { kind: "first" };
  if (place === 1) return { kind: "tiedFirst" };
  if (place !== null && placeGoal) return { kind: "place", place: placeGoal.place, need: placeGoal.need };
  const now = cutoffs.length ? topPercentFromCutoffs(cutoffs, c) ?? 100 : 100;
  for (const p of GOAL_TIERS) {
    if (p >= now) continue;
    const cutoff = cutoffs[p - 1];
    if (cutoff !== null && cutoff !== undefined && cutoff > c) return { kind: "tier", p, cutoff, need: cutoff - c };
  }
  if (enterTop) return { kind: "top100", need: enterTop.need };
  return next ? { kind: "chase", need: next.need } : null;
}
