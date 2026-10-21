import { FieldPath, FieldValue, type Firestore } from 'firebase-admin/firestore';
import { getInternalUids } from '@/lib/server/internalUsers';

// Weekly Active Learners (WAL).
//
// A learner is active in a 7-day window when they have at least one qualifying
// day in that window. From GUEST_TRACKING_SINCE, a qualifying day is a UTC day
// on which an answer batch was accepted: the account uid when the learner is
// signed in, or the browser id when they are logged out. The browser id is the
// same first-party id enrollments use (localStorage tigertest-enrolled). There
// is no Firebase anonymous auth user.
//
// Before that date the app did not store a per-guest id. Signed-in history
// comes from users/{uid}.activeDates (the day a signed-in account saved
// progress). The job does not read Auth last sign-in time.
//
// A browser id linked to an account (written on signup, and again on a
// signed-in answer) counts as that account, so the person counts once.
//
// /admin reads analytics/weeklyActiveLearners only. This module's rebuild
// scans users. The page does not.

const DAY_MS = 86_400_000;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Same shape as the enrollments browser id. */
export const BROWSER_ID_RE = /^[A-Za-z0-9-]{8,64}$/;

export const WAL_WEEKS = 8;
export const WAL_WINDOW_DAYS = 7;

/** First UTC day a logged-out answer stores a browser id. */
export const GUEST_TRACKING_SINCE = '2026-10-21';

export const LEARNER_DAYS_COLLECTION = 'learnerDays';
export const LEARNER_LINKS_COLLECTION = 'learnerLinks';
export const WAL_DOC_PATH = 'analytics/weeklyActiveLearners';

export interface WalCounts {
  total: number;
  signedIn: number;
  guests: number;
}

export interface WalWeek extends WalCounts {
  startDate: string;
  endDate: string;
  /** The window includes a day before guest browser ids were stored. */
  guestsIncomplete: boolean;
}

export interface WalRollup {
  updatedAt: string;
  asOfDate: string;
  guestTrackingSince: string;
  current: WalCounts;
  previous: WalCounts;
  /** current.total - previous.total */
  change: number;
  weeks: WalWeek[];
}

export interface WalSource {
  asOfMs: number;
  /** Non-internal uid -> activeDates. Days on or after guest tracking are ignored. */
  activeDatesByUser: ReadonlyMap<string, readonly string[]>;
  /** UTC day -> ids recorded when an answer batch was accepted. */
  answerDays: ReadonlyMap<string, { users: readonly string[]; guests: readonly string[] }>;
  /** browser id -> uid. Written when a guest creates an account or answers while signed in. */
  links: ReadonlyMap<string, string>;
  internalUids: ReadonlySet<string>;
}

export function utcDayKey(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

export function shiftDay(key: string, days: number): string {
  return utcDayKey(Date.parse(`${key}T00:00:00.000Z`) + days * DAY_MS);
}

/** Eight non-overlapping 7-day windows ending on asOfDate. Oldest first. */
export function walWindowBounds(asOfDate: string): { startDate: string; endDate: string }[] {
  const weeks = [];
  for (let i = WAL_WEEKS - 1; i >= 0; i--) {
    const endDate = shiftDay(asOfDate, -WAL_WINDOW_DAYS * i);
    const startDate = shiftDay(endDate, -(WAL_WINDOW_DAYS - 1));
    weeks.push({ startDate, endDate });
  }
  return weeks;
}

function eachDay(start: string, end: string): string[] {
  const out: string[] = [];
  for (let day = start; day <= end; day = shiftDay(day, 1)) out.push(day);
  return out;
}

function activeUsersByDay(source: WalSource): Map<string, Set<string>> {
  const map = new Map<string, Set<string>>();
  for (const [uid, dates] of source.activeDatesByUser) {
    if (source.internalUids.has(uid)) continue;
    for (const day of dates) {
      if (!DATE_RE.test(day) || day >= GUEST_TRACKING_SINCE) continue;
      let set = map.get(day);
      if (!set) map.set(day, (set = new Set()));
      set.add(uid);
    }
  }
  return map;
}

export function buildWalRollup(source: WalSource): WalRollup {
  const asOfDate = utcDayKey(source.asOfMs);
  const history = activeUsersByDay(source);
  const weeks: WalWeek[] = walWindowBounds(asOfDate).map(({ startDate, endDate }) => {
    const signedIn = new Set<string>();
    const guestIds = new Set<string>();
    for (const day of eachDay(startDate, endDate)) {
      if (day < GUEST_TRACKING_SINCE) {
        const ids = history.get(day);
        if (ids) for (const uid of ids) signedIn.add(uid);
        continue;
      }
      const rec = source.answerDays.get(day);
      if (!rec) continue;
      for (const uid of rec.users) {
        if (!source.internalUids.has(uid)) signedIn.add(uid);
      }
      for (const gid of rec.guests) {
        if (BROWSER_ID_RE.test(gid)) guestIds.add(gid);
      }
    }
    const guests = new Set<string>();
    for (const gid of guestIds) {
      const uid = source.links.get(gid);
      if (uid) {
        if (!source.internalUids.has(uid)) signedIn.add(uid);
        continue;
      }
      guests.add(gid);
    }
    return {
      startDate,
      endDate,
      signedIn: signedIn.size,
      guests: guests.size,
      total: signedIn.size + guests.size,
      guestsIncomplete: startDate < GUEST_TRACKING_SINCE,
    };
  });
  const current = weeks[weeks.length - 1];
  const previous = weeks[weeks.length - 2];
  return {
    updatedAt: new Date(source.asOfMs).toISOString(),
    asOfDate,
    guestTrackingSince: GUEST_TRACKING_SINCE,
    current: { total: current.total, signedIn: current.signedIn, guests: current.guests },
    previous: { total: previous.total, signedIn: previous.signedIn, guests: previous.guests },
    change: current.total - previous.total,
    weeks,
  };
}

export function isWalRollup(data: unknown): data is WalRollup {
  if (!data || typeof data !== 'object') return false;
  const d = data as Partial<WalRollup>;
  return (
    typeof d.asOfDate === 'string' &&
    typeof d.updatedAt === 'string' &&
    typeof d.guestTrackingSince === 'string' &&
    typeof d.change === 'number' &&
    countsOk(d.current) &&
    countsOk(d.previous) &&
    Array.isArray(d.weeks) &&
    d.weeks.length === WAL_WEEKS &&
    d.weeks.every(weekOk)
  );
}

function countsOk(c: WalCounts | undefined): c is WalCounts {
  return !!c && typeof c.total === 'number' && typeof c.signedIn === 'number' && typeof c.guests === 'number';
}

function weekOk(w: WalWeek): boolean {
  return (
    countsOk(w) &&
    typeof w.startDate === 'string' &&
    typeof w.endDate === 'string' &&
    typeof w.guestsIncomplete === 'boolean'
  );
}

function stringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === 'string');
}

/**
 * Record one learner for today's answer. Signed-in: store the uid, and link
 * the browser id to that uid when the client sent one. Logged out: store the
 * browser id. arrayUnion makes a repeat answer the same day a no-op.
 * Returns false when there is no usable id.
 */
export async function recordAnswerActivity(
  db: Firestore,
  input: { uid: string | null; browserId: string | null; now?: Date },
): Promise<boolean> {
  const browserId = input.browserId && BROWSER_ID_RE.test(input.browserId) ? input.browserId : null;
  const uid = input.uid;
  if (!uid && !browserId) return false;
  const day = utcDayKey((input.now ?? new Date()).getTime());
  const dayRef = db.collection(LEARNER_DAYS_COLLECTION).doc(day);
  const batch = db.batch();
  if (uid) {
    batch.set(dayRef, { users: FieldValue.arrayUnion(uid) }, { merge: true });
    if (browserId) {
      batch.set(db.collection(LEARNER_LINKS_COLLECTION).doc(browserId), { uid }, { merge: true });
    }
  } else {
    batch.set(dayRef, { guests: FieldValue.arrayUnion(browserId) }, { merge: true });
  }
  await batch.commit();
  return true;
}

/** Link a guest browser to the account that just signed in. */
export function learnerLinkRef(db: Firestore, browserId: string) {
  return db.collection(LEARNER_LINKS_COLLECTION).doc(browserId);
}

const PAGE = 500;

/**
 * Scan signed-in activeDates plus the answer-day docs and write the one
 * rollup /admin reads. Does not write learner ids into that doc.
 */
export async function rebuildWeeklyActiveLearners(db: Firestore, now = new Date()): Promise<WalRollup> {
  const internalUids = await getInternalUids();
  const asOfDate = utcDayKey(now.getTime());
  const earliest = shiftDay(asOfDate, -(WAL_WEEKS * WAL_WINDOW_DAYS - 1));

  const activeDatesByUser = new Map<string, string[]>();
  let cursor: string | null = null;
  for (;;) {
    let query = db.collection('users').select('activeDates').orderBy(FieldPath.documentId()).limit(PAGE);
    if (cursor) query = query.startAfter(cursor);
    const page = await query.get();
    for (const doc of page.docs) {
      if (internalUids.has(doc.id)) continue;
      const dates = stringList(doc.get('activeDates')).filter(
        (d) => DATE_RE.test(d) && d >= earliest && d < GUEST_TRACKING_SINCE,
      );
      if (dates.length > 0) activeDatesByUser.set(doc.id, dates);
    }
    if (page.size < PAGE) break;
    cursor = page.docs[page.docs.length - 1]!.id;
  }

  const answerDays = new Map<string, { users: string[]; guests: string[] }>();
  const refs = [];
  for (let day = earliest; day <= asOfDate; day = shiftDay(day, 1)) {
    if (day < GUEST_TRACKING_SINCE) continue;
    refs.push(db.collection(LEARNER_DAYS_COLLECTION).doc(day));
  }
  for (let i = 0; i < refs.length; i += 30) {
    const snaps = await db.getAll(...refs.slice(i, i + 30));
    for (const snap of snaps) {
      if (!snap.exists) continue;
      const data = snap.data() ?? {};
      answerDays.set(snap.id, { users: stringList(data.users), guests: stringList(data.guests) });
    }
  }

  const links = new Map<string, string>();
  cursor = null;
  for (;;) {
    let query = db.collection(LEARNER_LINKS_COLLECTION).select('uid').orderBy(FieldPath.documentId()).limit(PAGE);
    if (cursor) query = query.startAfter(cursor);
    const page = await query.get();
    for (const doc of page.docs) {
      const uid = doc.get('uid');
      if (typeof uid === 'string') links.set(doc.id, uid);
    }
    if (page.size < PAGE) break;
    cursor = page.docs[page.docs.length - 1]!.id;
  }

  const rollup = buildWalRollup({
    asOfMs: now.getTime(),
    activeDatesByUser,
    answerDays,
    links,
    internalUids,
  });
  await db.doc(WAL_DOC_PATH).set(rollup);
  return rollup;
}
