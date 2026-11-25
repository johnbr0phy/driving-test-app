/**
 * Daily rank storage (maths in lib/dailyRank.ts). Firestore only, no new
 * database:
 *
 *   dailyRank/{day}/people/{personId}  { k: [...], w: [...], c, expiresAt }
 *       One person's local day. k and w are short hashes of the questions
 *       they got right / wrong first time today. personId is "u_<uid>" or
 *       "b_<hash of browser id>"; the raw browser id is never stored.
 *   dailyRank/{day}/shards/{0..SHARDS-1}  { h: { "<correct>": people } }
 *       The day's histogram, split over shards so busy hours never hit
 *       Firestore's one-write-a-second limit on a single doc. Each change
 *       moves the person out of their old bucket and into the new one.
 *
 * Reading the distribution is SHARDS doc reads, cached per day for 15
 * minutes in memory (RANK_DISTRIBUTION_TTL_MS), so no cron and no account
 * scan is needed. Both kinds of doc carry expiresAt (3 days); the /privacy
 * promise needs a Firestore TTL policy on expiresAt for the `people` and
 * `shards` collection groups (set once in the Firebase console).
 */
import { createHash } from 'crypto';
import { FieldValue, type Firestore, type Transaction } from 'firebase-admin/firestore';
import {
  RANK_COUNT_CAP,
  RANK_DISTRIBUTION_TTL_MS,
  applyAnswers,
  addHistograms,
  correctOf,
  emptyPerson,
  histogramDelta,
  mergePeople,
  rankStatus,
  type RankAnswer,
  type RankHistogram,
  type RankPerson,
  type RankStatus,
  type TigerCandidate,
} from '@/lib/dailyRank';

export const RANK_SHARDS = 10;
const KEEP_MS = 3 * 24 * 60 * 60 * 1000;

export function personIdForUid(uid: string): string {
  return `u_${uid}`;
}

export function personIdForBrowser(browserId: string): string {
  return `b_${createHash('sha256').update(`tigertest-rank:${browserId}`).digest('hex').slice(0, 24)}`;
}

/** Short, stable key for "this question" (exam + question id). */
export function questionKey(exam: string, questionId: string): string {
  return createHash('sha256').update(`${exam}\u0000${questionId}`).digest('base64url').slice(0, 10);
}

function personRef(db: Firestore, day: string, id: string) {
  return db.collection('dailyRank').doc(day).collection('people').doc(id);
}

function shardRef(db: Firestore, day: string, shard = Math.floor(Math.random() * RANK_SHARDS)) {
  return db.collection('dailyRank').doc(day).collection('shards').doc(String(shard));
}

function readPerson(data: FirebaseFirestore.DocumentData | undefined): RankPerson {
  if (!data) return emptyPerson();
  const list = (v: unknown) => (Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []);
  return { k: list(data.k), w: list(data.w) };
}

/**
 * One person's day. `reachedAt` is when they reached their current count
 * (Tiger Time ties go to whoever got there first); `uid` is on account days
 * only, for the winner job.
 */
function writePerson(
  tx: Transaction,
  db: Firestore,
  day: string,
  id: string,
  p: RankPerson,
  now: Date,
  reachedAt: string | null,
  extra: Record<string, unknown> = {},
  firstAt: string | null = null,
) {
  tx.set(personRef(db, day, id), {
    k: p.k,
    w: p.w,
    c: correctOf(p),
    reachedAt,
    // When the first answer of the day arrived: the winner job's cheat check.
    firstAt: firstAt ?? now.toISOString(),
    ...(id.startsWith('u_') && { uid: id.slice(2) }),
    at: now.toISOString(),
    expiresAt: new Date(now.getTime() + KEEP_MS),
    ...extra,
  });
}

function firstAtOf(snap: FirebaseFirestore.DocumentSnapshot): string | null {
  const v = snap.get('firstAt');
  return typeof v === 'string' ? v : null;
}

function reachedAtOf(snap: FirebaseFirestore.DocumentSnapshot): string | null {
  const v = snap.get('reachedAt');
  return typeof v === 'string' ? v : null;
}

function writeDelta(tx: Transaction, db: Firestore, day: string, delta: RankHistogram, now = new Date()) {
  if (!Object.keys(delta).length) return;
  const h = Object.fromEntries(Object.entries(delta).map(([k, n]) => [k, FieldValue.increment(n)]));
  tx.set(shardRef(db, day), { h, expiresAt: new Date(now.getTime() + KEEP_MS) }, { merge: true });
}

/** Records first-time answers and returns the person's correct count today. */
export async function recordRankAnswers(db: Firestore, day: string, personId: string, answers: RankAnswer[], now = new Date()): Promise<number> {
  return db.runTransaction(async (tx) => {
    const ref = personRef(db, day, personId);
    const snap = await tx.get(ref);
    if (snap.get('mergedInto')) return 0; // a guest day already moved onto an account
    const before = readPerson(snap.data());
    const after = applyAnswers(before, answers);
    if (after.k.length === before.k.length && after.w.length === before.w.length) return correctOf(before);
    const grew = correctOf(after) > correctOf(before);
    writePerson(tx, db, day, personId, after, now, grew ? now.toISOString() : reachedAtOf(snap), {}, firstAtOf(snap));
    writeDelta(tx, db, day, histogramDelta(correctOf(before), correctOf(after)), now);
    return correctOf(after);
  });
}

/**
 * Moves a guest's day onto the account at sign-in, once. Both old buckets
 * leave the histogram and the merged count enters it.
 */
export async function mergeGuestDay(db: Firestore, day: string, guestId: string, accountId: string, now = new Date()): Promise<number> {
  return db.runTransaction(async (tx) => {
    const gRef = personRef(db, day, guestId);
    const aRef = personRef(db, day, accountId);
    const [gSnap, aSnap] = await Promise.all([tx.get(gRef), tx.get(aRef)]);
    const account = readPerson(aSnap.data());
    if (!gSnap.exists || gSnap.get('mergedInto')) return correctOf(account);
    const guest = readPerson(gSnap.data());
    const merged = mergePeople(account, guest);
    const grew = correctOf(merged) > correctOf(account);
    const firsts = [firstAtOf(aSnap), firstAtOf(gSnap)].filter((x): x is string => !!x).sort();
    writePerson(tx, db, day, accountId, merged, now, grew ? now.toISOString() : reachedAtOf(aSnap), {}, firsts[0] ?? null);
    writePerson(tx, db, day, guestId, emptyPerson(), now, null, { mergedInto: accountId });
    // Out of both old buckets, into the merged one.
    const delta = addHistogramDeltas(
      histogramDelta(correctOf(guest), 0),
      histogramDelta(correctOf(account), correctOf(merged)),
    );
    writeDelta(tx, db, day, delta, now);
    return correctOf(merged);
  });
}

function addHistogramDeltas(a: RankHistogram, b: RankHistogram): RankHistogram {
  const out: RankHistogram = { ...a };
  for (const [k, v] of Object.entries(b)) out[k] = (out[k] ?? 0) + v;
  for (const k of Object.keys(out)) if (out[k] === 0) delete out[k];
  return out;
}

// ── Distribution, cached ────────────────────────────────────────────────────

const cache = new Map<string, { at: number; h: RankHistogram }>();

export async function loadDistribution(db: Firestore, day: string, now = Date.now()): Promise<RankHistogram> {
  const hit = cache.get(day);
  if (hit && now - hit.at < RANK_DISTRIBUTION_TTL_MS) return hit.h;
  const snaps = await db.collection('dailyRank').doc(day).collection('shards').get();
  const h = addHistograms(...snaps.docs.map((d) => d.get('h') as RankHistogram | undefined));
  cache.set(day, { at: now, h });
  if (cache.size > 8) cache.delete(cache.keys().next().value as string);
  return h;
}

export async function personCorrect(db: Firestore, day: string, personId: string): Promise<number> {
  const snap = await personRef(db, day, personId).get();
  return snap.get('mergedInto') ? 0 : correctOf(readPerson(snap.data()));
}

/**
 * The person's status against the cached distribution. The cache can be up
 * to 15 minutes behind the person's own count; the cached histogram is
 * nudged to hold them at their current count so they always rank themselves.
 */
export async function statusFor(db: Firestore, day: string, correct: number): Promise<RankStatus> {
  if (correct <= 0) return rankStatus(day, {}, 0);
  const h = await loadDistribution(db, day);
  const at = String(Math.min(correct, RANK_COUNT_CAP));
  const withMe = (h[at] ?? 0) > 0 ? h : addHistograms(h, { [at]: 1 });
  return rankStatus(day, withMe, correct);
}

// ── Tiger Time winners ──────────────────────────────────────────────────────

/** tigerTimeWinners/{day}: { uid, correct, reachedAt, at, emailed }. Kept (no TTL). */
export const TIGER_WINNERS = 'tigerTimeWinners';

/** The top of a finished day: the 200 highest counts, accounts and guests. */
export async function topOfDay(db: Firestore, day: string): Promise<TigerCandidate[]> {
  const snap = await db.collection('dailyRank').doc(day).collection('people').orderBy('c', 'desc').limit(200).get();
  return snap.docs
    .filter((d) => !d.get('mergedInto'))
    .map((d) => ({
      uid: typeof d.get('uid') === 'string' ? (d.get('uid') as string) : null,
      correct: Number(d.get('c')) || 0,
      reachedAt: typeof d.get('reachedAt') === 'string' ? (d.get('reachedAt') as string) : null,
      firstAt: typeof d.get('firstAt') === 'string' ? (d.get('firstAt') as string) : null,
      wrong: Array.isArray(d.get('w')) ? (d.get('w') as unknown[]).length : undefined,
    }));
}


/**
 * Deletes rank days older than `keepDays` (people and histogram shards), at
 * most `max` days a run. The /privacy page promises three days; this keeps
 * that promise without a Firestore TTL policy. Returns the days deleted.
 */
export async function deleteOldDays(db: Firestore, today: string, keepDays = 3, max = 7): Promise<string[]> {
  const cutoff = new Date(Date.parse(`${today}T00:00:00Z`) - keepDays * 86_400_000).toISOString().slice(0, 10);
  const refs = await db.collection('dailyRank').listDocuments();
  const old = refs.filter((r) => /^\d{4}-\d{2}-\d{2}$/.test(r.id) && r.id < cutoff).slice(0, max);
  for (const r of old) await db.recursiveDelete(r);
  return old.map((r) => r.id);
}
