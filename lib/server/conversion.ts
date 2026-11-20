import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { isInternalEmail } from '@/lib/internal';
import { getInternalUids } from '@/lib/server/internalUsers';
import { getCatalogEntry } from '@/lib/testCatalog';
import { paywallHitFeature, purchaseExam, purchaseLocationLabel } from '@/lib/purchaseAttribution';
import { byGroup, dayNumber, grid, isLive, payChance, type ConvRow } from '@/lib/conversion';
import { emptyTopPrepperResult, inTopPrepperHoldout, tallyTopPrepper, topPrepperPct, type TopPrepperResult } from '@/lib/topPrepper';
import { REGIONS, isRegion, regionFromCountry, regionOfTest } from '@/lib/region';
import { formatPrice, paymentNetUsdCents, premiumPriceFor, priceFromStripe } from '@/lib/pricing';

// The Conversion tab on /admin (components/admin/ConversionTab.tsx): the
// headline numbers, pay rate by country, the latest payers and the unpaid
// accounts closest to paying, with what each will be emailed next.
//
// Every account is read with a narrow field mask (counters, dates, paywall
// hits), which is quick. Buyers' answer histories (to count what they had
// done when they paid) are read once and kept in analytics/conversionBuyers,
// so a build only fetches the histories of new buyers.

export interface ConversionPayload {
  generatedAt: string;
  /** Every non-internal account, including the ones with no activity. */
  totalAccounts: number;
  /** Accounts that answered a question, saw a paywall or paid. */
  activeAccounts: number;
  overview: {
    revenue30dCents: number;
    revenuePrev30dCents: number;
    purchases7d: number;
    purchasesPrev7d: number;
    purchases30d: number;
    purchasesPrev30d: number;
    /** Every paywall open in 30 days, guests included. */
    hits30d: number;
    hitsPrev30d: number;
    /** First visits in 30 days (lib/funnel.ts), null before tracking. */
    visits30d: number | null;
    /** All time: accounts asked to pay (saw a paywall, or paid) and of them, buyers. */
    asked: number;
    buyers: number;
  };
  /** One row per market: Tigertest's countries, "OTHER" and "UNKNOWN", biggest first. */
  countries: {
    code: string;
    name: string;
    price: string;
    visitors30d: number | null;
    accounts: number;
    asked: number;
    buyers: number;
    /** Unpaid, saw a paywall in the last 30 days. */
    open: number;
    purchases30d: number;
    revenue30dCents: number;
    revenueAllCents: number;
  }[];
  /** The latest purchases, newest first, with where each buyer came from. */
  recentPayers: {
    at: string | null;
    email: string;
    market: string;
    country: string | null;
    paid: string;
    usdCents: number;
    /** Signed in when paying, or a guest checkout (new account made, or matched an existing one). */
    account: 'signed_in' | 'guest_new' | 'guest_existing';
    status: string;
    exam: string;
    paywall: string;
    variant: string | null;
    paywallHit: number | null;
    source: string | null;
    landing: string | null;
    signupAt: string | null;
    daysToBuy: number | null;
    answersBefore: number | null;
    testsBefore: number | null;
    paywallsSeen: number | null;
  }[];
  daily: {
    paywallHits: Record<string, number>;
    purchases: Record<string, number>;
    /** Hits by signed-in accounts, counted since TRACKED_SINCE. */
    signedIn: Record<string, number>;
    /** Before TRACKED_SINCE, an estimate: each account's hits on a paywall, put on the day of its latest hit there. */
    signedInEst: Record<string, number>;
  };
  trackedSince: string;
  /** The top prepper email against its holdout (lib/topPrepper.ts). */
  topPrepper: TopPrepperResult;
  /** Who the email crons would pick next, a best guess from the same rules. */
  nextEmails: { topPrepper: number; topPrepperHoldout: number; topPrepperLive: boolean; paywallFollowUp: number };
  /** Unpaid accounts most like buyers, active in the last 14 days. */
  leads: {
    email: string;
    market: string;
    exam: string;
    answers: number;
    tests: number;
    activeDays: number;
    paywallViews: number;
    lastPaywall: string;
    lastPaywallAt: string | null;
    lastActive: string | null;
    chance: number;
    /** "ok", "no_consent" or "unsubscribed". */
    emailStatus: 'ok' | 'no_consent' | 'unsubscribed';
    emailsHad: string[];
    lastEmailAt: string | null;
    /** The email they would get next and when, or why none. */
    nextEmail: string;
  }[];
}

const dayKey = (v: unknown): string | null => {
  if (typeof v !== 'string') return null;
  const t = Date.parse(v);
  return Number.isNaN(t) ? null : new Date(t).toISOString().slice(0, 10);
};
const ms = (v: unknown): number | null => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') {
    const t = Date.parse(v);
    return Number.isNaN(t) ? null : t;
  }
  if (v && typeof v === 'object' && 'toMillis' in v && typeof (v as { toMillis: unknown }).toMillis === 'function') {
    return (v as { toMillis(): number }).toMillis();
  }
  return null;
};
const num = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? v : 0);

/** Guest and by-country paywall counters started on this day (app/api/analytics/paywall). */
export const TRACKED_SINCE = '2026-11-12';

const OTHER = 'OTHER';
const UNKNOWN = 'UNKNOWN';
/** An ISO country to a market: one of Tigertest's countries, else "OTHER". */
const marketOf = (iso: string | null | undefined) => (iso ? regionFromCountry(iso) ?? OTHER : null);
const isoOfMarket = (code: string) => (code === 'UK' ? 'GB' : code);

type Hit = { key: string; feature: string; count: number; lastAt: number | null; label: string };

/**
 * What share of a buyer's answers, and how many of their finished tests,
 * came before the purchase. Answers with no time on them (old data) count as
 * before. Exported for tests.
 */
export function beforePurchase(
  doc: { trainingAnswerHistory?: unknown; completedTests?: unknown },
  purchasedAt: number | null,
): { share: number; testsBefore: number; answersAfter: number } {
  let before = 0;
  let after = 0;
  let testsBefore = 0;
  const isBefore = (t: number | null) => purchasedAt === null || t === null || t <= purchasedAt;
  for (const a of Array.isArray(doc.trainingAnswerHistory) ? (doc.trainingAnswerHistory as { answeredAt?: unknown }[]) : []) {
    if (isBefore(ms(a?.answeredAt))) before++;
    else after++;
  }
  for (const t of Array.isArray(doc.completedTests) ? (doc.completedTests as { completedAt?: unknown; startedAt?: unknown; answers?: unknown }[]) : []) {
    const done = ms(t?.completedAt) ?? ms(t?.startedAt);
    if (isBefore(done)) testsBefore++;
    for (const a of Array.isArray(t?.answers) ? (t.answers as { answeredAt?: unknown }[]) : []) {
      if (isBefore(ms(a?.answeredAt) ?? done)) before++;
      else after++;
    }
  }
  return { share: before + after > 0 ? before / (before + after) : 1, testsBefore, answersAfter: after };
}

/**
 * Answers and finished tests on v2 exams (users/{uid}.v2), which `_stats`
 * never counts: drill tallies, older drill progress with no tally (once
 * each), and every answered item of a finished practice test. Drill answers
 * carry no time, so for a buyer they count as before the purchase, like v1
 * answers with no time. Exported for tests.
 */
export function v2Activity(
  v2: unknown,
  purchasedAt: number | null,
): { answers: number; tests: number; answersBefore: number; testsBefore: number } {
  const d = (v2 && typeof v2 === 'object' ? v2 : {}) as {
    questionStats?: Record<string, Record<string, { n?: unknown }>>;
    drills?: Record<string, { masteredIds?: unknown; wrongQueue?: unknown }>;
    results?: { examId?: unknown; completedAt?: unknown; items?: unknown }[];
  };
  let drill = 0;
  const tallied = new Set<string>();
  for (const [examId, byQ] of Object.entries(d.questionStats || {})) {
    for (const [id, t] of Object.entries(byQ || {})) {
      const n = Math.max(0, Math.floor(num(t?.n)));
      if (n > 0) tallied.add(`${examId}:${id}`);
      drill += n;
    }
  }
  const legacy = new Set<string>();
  for (const [key, st] of Object.entries(d.drills || {})) {
    const examId = key.split(':')[0];
    for (const list of [st?.masteredIds, st?.wrongQueue]) {
      for (const id of Array.isArray(list) ? list : []) {
        if (typeof id === 'string' && !tallied.has(`${examId}:${id}`)) legacy.add(`${examId}:${id}`);
      }
    }
  }
  drill += legacy.size;
  let tests = 0;
  let testsBefore = 0;
  let testAnswers = 0;
  let testAnswersBefore = 0;
  for (const r of Array.isArray(d.results) ? d.results : []) {
    const items = Array.isArray(r?.items) ? (r.items as { answer?: unknown }[]) : [];
    const answered = items.filter((it) => it && it.answer !== undefined && it.answer !== null && it.answer !== '' && !(Array.isArray(it.answer) && it.answer.length === 0)).length;
    const at = ms(r?.completedAt);
    const before = purchasedAt === null || at === null || at <= purchasedAt;
    tests++;
    testAnswers += answered;
    if (before) {
      testsBefore++;
      testAnswersBefore += answered;
    }
  }
  return { answers: drill + testAnswers, tests, answersBefore: drill + testAnswersBefore, testsBefore };
}

/** Buyers' at-purchase counts never change once the purchase is old, so they are kept here between builds. */
const BUYER_CACHE_DOC = 'analytics/conversionBuyers';
/** A purchase this recent may still have answers syncing in, so it is read again next time. */
const BUYER_CACHE_MIN_AGE_MS = 6 * 3_600_000;
/** [purchasedAt ms, v1 answers before, v1 tests before]. */
type BuyerSnap = [number, number, number];

const EMAIL_LABELS: Record<string, string> = {
  welcome: 'Welcome',
  paywallAbandon: 'Paywall follow-up',
  topPrepper: 'Top prepper',
  upgradePitch: 'Upgrade pitch',
  firstTestReminder: 'First test reminder',
  secondTestNudge: 'Second test nudge',
  reengagement: 'Come back',
  exitQuestion: 'Question that got away',
  newTests2026: 'New tests',
  quizzesLaunch2026: 'Quizzes launch',
  superAmazingUnlocked: 'Super Amazing',
  inactiveShareRequest: 'Share request',
};
const emailLabel = (key: string) => EMAIL_LABELS[key] ?? key;

export async function buildConversion(): Promise<ConversionPayload> {
  const db = getAdminDb();
  const [usersSnap, paymentsSnap, paywallsDoc, originsSnap, funnelDoc, buyerCacheDoc, internalUids] = await Promise.all([
    db.collection('users')
      .select(
        'createdAt', 'activeDates', 'lastUpdated', 'subscription', 'paywallHits', '_stats', 'primaryExam', 'selectedState', 'paywallCountry', 'region',
        'topPrepper', 'emailConsent', 'unsubscribed', 'emailsSent', 'lastEmailSent', 'language', 'v2.questionStats', 'v2.drills', 'v2.results',
      )
      .get(),
    db.collection('payments').get(),
    db.doc('analytics/paywalls').get(),
    db.collection('signupOrigins').select('country', 'source', 'landing').get(),
    db.doc('analytics/funnel').get(),
    db.doc(BUYER_CACHE_DOC).get(),
    getInternalUids(),
  ]);
  const now = Date.now();
  const originCountry = new Map<string, string>();
  const originSource = new Map<string, { source: string | null; landing: string | null }>();
  for (const doc of originsSnap.docs) {
    const c = doc.get('country');
    if (typeof c === 'string' && c) originCountry.set(doc.id, c);
    const src = doc.get('source');
    const land = doc.get('landing');
    originSource.set(doc.id, { source: typeof src === 'string' ? src : null, landing: typeof land === 'string' ? land : null });
  }
  const todayKey = new Date(now).toISOString().slice(0, 10);
  const today = dayNumber(todayKey);
  const keyAgo = (days: number) => new Date(now - days * 86_400_000).toISOString().slice(0, 10);

  // ── Payments: who paid, when, and through which paywall ────────────────
  const paidAt = new Map<string, number>();
  const paidLocation = new Map<string, string>();
  const paidExam = new Map<string, string>();
  const purchasesByDay: Record<string, number> = {};
  const paidCountry = new Map<string, string>();
  const paidUids = new Set<string>();
  type RawSale = { day: number; uid: string | null; country: string | null; cents: number };
  const rawSales: RawSale[] = [];
  type RawPayment = { at: number | null; p: Record<string, unknown>; uid: string | null; cents: number };
  const payments: RawPayment[] = [];
  for (const doc of paymentsSnap.docs) {
    const p = doc.data();
    const uid = typeof p.userId === 'string' ? p.userId : null;
    if ((uid && internalUids.has(uid)) || isInternalEmail(p.email as string | undefined)) continue;
    const day = dayKey(p.createdAt);
    if (day) purchasesByDay[day] = (purchasesByDay[day] || 0) + 1;
    const cents = paymentNetUsdCents(p, typeof p.refundedCents === 'number' ? p.refundedCents : 0);
    payments.push({ at: ms(p.createdAt), p, uid, cents });
    if (p.status === 'succeeded' || p.status === 'partially_refunded') {
      rawSales.push({ day: dayNumber(day), uid, country: typeof p.country === 'string' && p.country ? p.country : null, cents });
    }
    if (!uid) continue;
    paidUids.add(uid);
    if (typeof p.country === 'string' && p.country) paidCountry.set(uid, p.country);
    const at = ms(p.createdAt);
    if (at !== null && (!paidAt.has(uid) || at < paidAt.get(uid)!)) paidAt.set(uid, at);
    if (typeof p.location === 'string' && p.location) paidLocation.set(uid, p.location);
    if (typeof p.exam === 'string' && p.exam) paidExam.set(uid, p.exam);
  }

  // ── Paywall hits by day, from the site-wide counters ───────────────────
  const paywallsData = (paywallsDoc.data() || {}) as { daily?: Record<string, unknown>; signedInDaily?: Record<string, unknown> };
  const signedInByDay: Record<string, number> = {};
  for (const [day, n] of Object.entries(paywallsData.signedInDaily || {})) if (typeof n === 'number') signedInByDay[day] = n;
  const signedInEstByDay: Record<string, number> = {};
  const paywallHitsByDay: Record<string, number> = {};
  for (const [day, n] of Object.entries(paywallsData.daily || {})) if (typeof n === 'number') paywallHitsByDay[day] = n;

  // ── One pass over the accounts ─────────────────────────────────────────
  type Account = {
    uid: string;
    row: ConvRow;
    examId: string;
    hits: Hit[];
    purchasedAt: number | null;
    purchaseDay: string | null;
    statsAnswers: number;
    v2: ReturnType<typeof v2Activity>;
    lastActive: string | null;
    soldFeature: string | null;
    market: string;
    signupAt: string | null;
    email: { status: 'ok' | 'no_consent' | 'unsubscribed'; sent: string[]; lastAt: number | null; english: boolean; topPrepper: boolean };
  };
  const accounts: Account[] = [];
  const topPrepper = emptyTopPrepperResult();
  const population: number[] = [];
  let totalAccounts = 0;
  for (const doc of usersSnap.docs) {
    if (internalUids.has(doc.id)) continue;
    totalAccounts++;
    const d = doc.data() as Record<string, unknown>;
    const sub = (d.subscription || {}) as Record<string, unknown>;
    const paid = (sub.isPremium === true && sub.grantedBy !== 'millionth') || paidAt.has(doc.id);
    const stats = (d._stats || {}) as Record<string, unknown>;
    const statsAnswers = num(stats.trainingQuestionsAnswered) + num(stats.testQuestionsAnswered);
    if (statsAnswers > 0) population.push(Math.floor(statsAnswers));
    // v2 exams (SAT, ITIL, PSM...) never write _stats; their progress is in users/{uid}.v2.
    const purchasedAt = paid ? ms(sub.purchasedAt) ?? paidAt.get(doc.id) ?? null : null;
    const v2 = v2Activity(d.v2, purchasedAt);
    const hits: Hit[] = Object.entries((d.paywallHits || {}) as Record<string, Record<string, unknown>>).map(([key, rec]) => ({
      key,
      feature: paywallHitFeature(key),
      count: Math.max(1, num(rec?.count)),
      lastAt: ms(rec?.lastAt),
      label: typeof rec?.label === 'string' ? rec.label : key,
    }));
    if (!paid && statsAnswers === 0 && v2.answers === 0 && hits.length === 0) continue;

    const dates = (Array.isArray(d.activeDates) ? (d.activeDates as unknown[]) : [])
      .filter((x): x is string => typeof x === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(x))
      .sort();
    const signupDay = dayKey(d.createdAt) ?? dates[0] ?? dayKey(d.lastUpdated);
    const lastActive = dates[dates.length - 1] ?? dayKey(d.lastUpdated);
    const purchaseDay = purchasedAt !== null ? new Date(purchasedAt).toISOString().slice(0, 10) : null;
    const tp = d.topPrepper as { group?: unknown; at?: unknown } | undefined;
    const tpAt = ms(tp?.at);
    if (tp && tpAt !== null && (tp.group === 'sent' || tp.group === 'holdout')) {
      tallyTopPrepper(topPrepper, tp.group, tpAt, purchasedAt, now);
    }

    // The paywall that sold: the checkout's own location, else the last one
    // seen before paying (payments from before the webhook stored it).
    let soldFeature: string | null = null;
    if (paid) {
      soldFeature = paidLocation.get(doc.id) ?? null;
      if (!soldFeature) {
        const prior = hits.filter((h) => h.lastAt !== null && (purchasedAt === null || h.lastAt <= purchasedAt + 60_000));
        const last = prior.sort((a, b) => b.lastAt! - a.lastAt!)[0];
        soldFeature = last?.feature ?? null;
      }
    }
    const examId = paidExam.get(doc.id) ?? (typeof d.primaryExam === 'string' && d.primaryExam ? d.primaryExam : d.selectedState ? 'dmv' : hits[0] ? purchaseExam(hits[0].feature) : 'dmv');
    const daysBefore = purchaseDay ? dates.filter((x) => x <= purchaseDay).length : dates.length;

    // Market: where they were when they last saw a paywall, signed up or
    // paid; else the country they picked; else their test's own country.
    const picked = isRegion(d.region) ? d.region : null;
    const ofTest = examId === 'dmv' ? 'US' : regionOfTest(examId.split('-')[0]);
    const market =
      marketOf(typeof d.paywallCountry === 'string' ? d.paywallCountry : null) ??
      marketOf(originCountry.get(doc.id)) ??
      marketOf(paidCountry.get(doc.id)) ??
      picked ??
      (ofTest !== 'GLOBAL' ? ofTest : UNKNOWN);

    const features = new Set(hits.map((h) => h.feature));
    const lastHit = hits.reduce((m, h) => Math.max(m, h.lastAt ?? 0), 0);
    for (const h of hits) {
      if (h.lastAt === null) continue;
      const day = new Date(h.lastAt).toISOString().slice(0, 10);
      if (day < TRACKED_SINCE) signedInEstByDay[day] = (signedInEstByDay[day] || 0) + h.count;
    }
    const createdMs = ms(d.createdAt);

    accounts.push({
      uid: doc.id,
      examId,
      hits,
      purchasedAt,
      purchaseDay,
      statsAnswers,
      v2,
      lastActive,
      soldFeature,
      market,
      signupAt: createdMs !== null ? new Date(createdMs).toISOString() : signupDay,
      email: {
        status: d.unsubscribed === true ? 'unsubscribed' : d.emailConsent === true ? 'ok' : 'no_consent',
        sent: Array.isArray(d.emailsSent) ? (d.emailsSent as unknown[]).filter((x): x is string => typeof x === 'string') : [],
        lastAt: ms(d.lastEmailSent),
        english: typeof d.language !== 'string' || d.language === 'en',
        topPrepper: !!d.topPrepper,
      },
      row: {
        paid,
        answers: statsAnswers + v2.answers,
        tests: num(stats.testsCompleted) + v2.tests,
        activeDays: Math.max(1, daysBefore),
        // Distinct paywalls seen (location and item), not taps.
        paywallViews: hits.length,
        paywalls: features.size,
        exam: 0,
        signupDay: dayNumber(signupDay),
        lastActiveDay: dayNumber(lastActive),
        daysToBuy: paid && purchaseDay && signupDay ? Math.max(0, dayNumber(purchaseDay) - dayNumber(signupDay)) : -1,
        answersAfter: 0,
        activeDaysAfter: 0,
        soldBy: -1,
        market: 0,
        lastPaywallDay: lastHit ? Math.floor(lastHit / 86_400_000) : -1,
      },
    });
  }
  population.sort((a, b) => a - b);

  // ── Buyers: what they had done when they paid ──────────────────────────
  // Read from each buyer's history once, then kept: the part before an old
  // purchase never changes. Only new buyers' histories are fetched.
  const cached = ((buyerCacheDoc.data() || {}).b || {}) as Record<string, BuyerSnap>;
  const fresh: Record<string, BuyerSnap> = {};
  const buyers = accounts.filter((a) => a.row.paid);
  const toRead = buyers.filter((a) => {
    const c = cached[a.uid];
    return !(Array.isArray(c) && c[0] === (a.purchasedAt ?? 0));
  });
  for (let i = 0; i < toRead.length; i += 100) {
    const chunk = toRead.slice(i, i + 100);
    const docs = await db.getAll(...chunk.map((a) => db.doc(`users/${a.uid}`)), { fieldMask: ['trainingAnswerHistory', 'completedTests'] });
    docs.forEach((snap, j) => {
      const a = chunk[j];
      const b = beforePurchase((snap.data() || {}) as Record<string, unknown>, a.purchasedAt);
      const snapRow: BuyerSnap = [a.purchasedAt ?? 0, Math.round(a.statsAnswers * b.share), b.testsBefore];
      cached[a.uid] = snapRow;
      if (a.purchasedAt !== null && now - a.purchasedAt > BUYER_CACHE_MIN_AGE_MS) fresh[a.uid] = snapRow;
    });
  }
  for (const a of buyers) {
    const [, v1Before, v1TestsBefore] = cached[a.uid] ?? [0, a.statsAnswers, a.row.tests - a.v2.tests];
    a.row.answers = v1Before + a.v2.answersBefore;
    a.row.answersAfter = Math.max(a.statsAnswers - v1Before, 0) + (a.v2.answers - a.v2.answersBefore);
    a.row.tests = Math.min(a.row.tests - a.v2.tests, v1TestsBefore) + a.v2.testsBefore;
  }
  if (Object.keys(fresh).length > 0) {
    await db.doc(BUYER_CACHE_DOC).set({ b: fresh, updatedAt: new Date(now).toISOString() }, { merge: true }).catch((err) => {
      console.error('[conversion] buyer cache write failed', err);
    });
  }

  // ── Markets, biggest first ─────────────────────────────────────────────
  const examName = (id: string) => getCatalogEntry(id)?.shortName ?? id;
  const marketCounts = new Map<string, number>();
  for (const a of accounts) marketCounts.set(a.market, (marketCounts.get(a.market) || 0) + 1);
  const marketCodes = [...marketCounts.entries()].sort((a, b) => b[1] - a[1]).map(([code]) => code);
  const marketIndex = new Map(marketCodes.map((code, i) => [code, i]));
  const marketName = (code: string) => (code === OTHER ? 'Other countries' : code === UNKNOWN ? 'Unknown' : REGIONS.find((r) => r.code === code)?.name ?? code);
  for (const a of accounts) a.row.market = marketIndex.get(a.market) ?? 0;
  const byUid = new Map(accounts.map((a) => [a.uid, a]));

  // ── Sales, with their market ───────────────────────────────────────────
  // Premium accounts with no payment record (before payments were stored)
  // count at list price on their purchase day, like the other tabs.
  const sales: { day: number; market: string; cents: number }[] = rawSales
    .filter((x) => x.day >= 0)
    .map((x) => ({ day: x.day, market: marketOf(x.country) ?? (x.uid ? byUid.get(x.uid)?.market : undefined) ?? UNKNOWN, cents: x.cents }));
  for (const a of accounts) {
    if (!a.row.paid || paidUids.has(a.uid) || !a.purchaseDay) continue;
    sales.push({ day: dayNumber(a.purchaseDay), market: a.market, cents: 999 });
  }
  const inDays = (day: number, from: number, to: number) => day >= today - from && day <= today - to;
  const sumSales = (from: number, to: number, f: (s: (typeof sales)[number]) => number) =>
    sales.reduce((n, s) => (inDays(s.day, from, to) ? n + f(s) : n), 0);
  const sumDays = (map: Record<string, number>, from: number, to: number) =>
    Object.entries(map).reduce((n, [d, c]) => (d >= keyAgo(from) && d <= keyAgo(to) ? n + c : n), 0);

  // ── First visits by market (analytics/funnel visit_region_*) ───────────
  const steps = ((funnelDoc.data() || {}).steps || {}) as Record<string, { daily?: Record<string, number> }>;
  const regionTracked = Object.keys(steps).some((k) => k.startsWith('visit_region_'));
  const visits30 = steps.visit?.daily ? sumDays(steps.visit.daily, 29, 0) : null;

  const groups = byGroup(accounts.map((a) => a.row), 'market', today);
  const groupOf = new Map(groups.map((g) => [marketCodes[g.index], g]));
  const countries = marketCodes.map((code) => {
    const g = groupOf.get(code);
    const mine = sales.filter((s) => s.market === code);
    const visitKey = `visit_region_${code === UNKNOWN ? '' : code}`;
    return {
      code,
      name: marketName(code),
      price: code === OTHER || code === UNKNOWN ? '' : formatPrice(premiumPriceFor(isoOfMarket(code))),
      visitors30d: regionTracked && code !== UNKNOWN ? sumDays(steps[visitKey]?.daily || {}, 29, 0) : null,
      accounts: g?.accounts ?? 0,
      asked: g?.sawPaywall ?? 0,
      buyers: g?.paid ?? 0,
      open: g?.open ?? 0,
      purchases30d: mine.filter((s) => inDays(s.day, 29, 0)).length,
      revenue30dCents: mine.reduce((n, s) => (inDays(s.day, 29, 0) ? n + s.cents : n), 0),
      revenueAllCents: mine.reduce((n, s) => n + s.cents, 0),
    };
  }).sort((a, b) => b.revenueAllCents - a.revenueAllCents || b.asked - a.asked);

  const asked = groups.reduce((n, g) => n + g.sawPaywall, 0);
  const buyersAll = groups.reduce((n, g) => n + g.paid, 0);
  const overview = {
    revenue30dCents: sumSales(29, 0, (s) => s.cents),
    revenuePrev30dCents: sumSales(59, 30, (s) => s.cents),
    purchases7d: sumSales(6, 0, () => 1),
    purchasesPrev7d: sumSales(13, 7, () => 1),
    purchases30d: sumSales(29, 0, () => 1),
    purchasesPrev30d: sumSales(59, 30, () => 1),
    hits30d: sumDays(paywallHitsByDay, 29, 0),
    hitsPrev30d: sumDays(paywallHitsByDay, 59, 30),
    visits30d: visits30,
    asked,
    buyers: buyersAll,
  };

  // ── Who the email crons would pick next ────────────────────────────────
  // The same rules as /api/cron/top-prepper and /api/cron/paywall-abandon,
  // minus the class and exam checks: a best guess, said so on the page.
  const topPrepperLive = process.env.TOP_PREPPER_CAMPAIGN === 'send';
  const lastHitOf = (a: Account) => a.hits.reduce((m, h) => Math.max(m, h.lastAt ?? 0), 0);
  const nextEmailFor = (a: Account): { label: string; kind: 'topPrepper' | 'topPrepperHoldout' | 'paywall' | null } => {
    if (a.row.paid) return { label: 'Paid', kind: null };
    if (a.email.status === 'unsubscribed') return { label: 'None: unsubscribed', kind: null };
    if (a.email.status === 'no_consent') return { label: 'None: no marketing consent', kind: null };
    const last = lastHitOf(a);
    const age = last ? now - last : Infinity;
    const recent = a.email.lastAt !== null && now - a.email.lastAt < 86_400_000;
    if (age <= 36 * 3_600_000 && a.statsAnswers >= 10 && !a.email.sent.includes('paywallAbandon')) {
      return { label: recent ? 'Paywall follow-up, after a day since their last email' : 'Paywall follow-up, next 12:00 UTC run', kind: 'paywall' };
    }
    if (
      !a.email.topPrepper &&
      !a.email.sent.includes('topPrepper') &&
      a.email.english &&
      age >= 36 * 3_600_000 &&
      age <= 14 * 86_400_000 &&
      topPrepperPct(population, Math.floor(a.statsAnswers)) !== null
    ) {
      if (inTopPrepperHoldout(a.uid)) return { label: 'Top prepper holdout: no email on purpose', kind: 'topPrepperHoldout' };
      return { label: topPrepperLive ? 'Top prepper, next 16:20 UTC run' : 'Top prepper, once the campaign is switched on', kind: 'topPrepper' };
    }
    return { label: 'Nothing due', kind: null };
  };
  const nextEmails = { topPrepper: 0, topPrepperHoldout: 0, topPrepperLive, paywallFollowUp: 0 };
  for (const a of accounts) {
    const k = nextEmailFor(a).kind;
    if (k === 'topPrepper') nextEmails.topPrepper++;
    else if (k === 'topPrepperHoldout') nextEmails.topPrepperHoldout++;
    else if (k === 'paywall') nextEmails.paywallFollowUp++;
  }

  // ── Warm leads: unpaid, seen a paywall, active lately, most like buyers ─
  const cells = grid(accounts.map((a) => a.row));
  const ranked = accounts
    .filter((a) => isLive(a.row, today))
    .map((a) => ({ a, chance: payChance(cells, a.row) }))
    .sort((x, y) => y.chance - x.chance || y.a.row.lastActiveDay - x.a.row.lastActiveDay || y.a.row.answers - x.a.row.answers)
    .slice(0, 30);

  // ── The latest purchases ───────────────────────────────────────────────
  const latest = payments
    .filter((x) => x.at !== null)
    .sort((x, y) => y.at! - x.at!)
    .slice(0, 10);

  const emails = new Map<string, string>();
  const lookup = [...new Set([...ranked.map(({ a }) => a.uid), ...latest.map((x) => x.uid).filter((u): u is string => !!u)])];
  if (lookup.length > 0) {
    const found = await getAdminAuth().getUsers(lookup.map((uid) => ({ uid })));
    for (const u of found.users) if (u.email) emails.set(u.uid, u.email);
  }
  const leads = ranked.map(({ a, chance }) => {
    const last = [...a.hits].sort((x, y) => (y.lastAt ?? 0) - (x.lastAt ?? 0))[0];
    return {
      email: emails.get(a.uid) ?? '(no email)',
      market: marketName(a.market),
      exam: examName(a.examId),
      answers: a.row.answers,
      tests: a.row.tests,
      activeDays: a.row.activeDays,
      paywallViews: a.row.paywallViews,
      lastPaywall: last ? purchaseLocationLabel(last.feature) : '',
      lastPaywallAt: last?.lastAt ? new Date(last.lastAt).toISOString() : null,
      lastActive: a.lastActive,
      chance,
      emailStatus: a.email.status,
      emailsHad: a.email.sent.map(emailLabel),
      lastEmailAt: a.email.lastAt !== null ? new Date(a.email.lastAt).toISOString() : null,
      nextEmail: nextEmailFor(a).label,
    };
  });
  const recentPayers = latest.map(({ at, p, uid, cents }) => {
    const a = uid ? byUid.get(uid) : undefined;
    const origin = uid ? originSource.get(uid) : undefined;
    const currency = typeof p.currency === 'string' ? p.currency : 'usd';
    const amount = typeof p.amount === 'number' ? p.amount : null;
    const location = typeof p.location === 'string' && p.location ? p.location : a?.soldFeature ?? null;
    const exam = typeof p.exam === 'string' && p.exam ? p.exam : location ? purchaseExam(location) : a?.examId ?? '';
    const country = typeof p.country === 'string' && p.country ? p.country : null;
    return {
      at: at !== null ? new Date(at).toISOString() : null,
      email: (uid && emails.get(uid)) || (typeof p.email === 'string' ? p.email : '(no email)'),
      market: marketName(marketOf(country) ?? a?.market ?? UNKNOWN),
      country,
      paid: amount !== null ? formatPrice(priceFromStripe(currency, amount)) : '',
      usdCents: cents,
      account: p.guestCheckout === 'new_account' ? 'guest_new' as const : p.guestCheckout === 'existing_account' ? 'guest_existing' as const : 'signed_in' as const,
      status: typeof p.status === 'string' ? p.status : '',
      exam: exam ? examName(exam) : '',
      paywall: location ? purchaseLocationLabel(location) : '',
      variant: typeof p.paywallVariant === 'string' ? p.paywallVariant : null,
      paywallHit: typeof p.paywallHit === 'number' ? p.paywallHit : null,
      source: (typeof p.source === 'string' && p.source) || origin?.source || null,
      landing: (typeof p.landing === 'string' && p.landing) || origin?.landing || null,
      signupAt: a?.signupAt ?? null,
      daysToBuy: a && a.row.daysToBuy >= 0 ? a.row.daysToBuy : null,
      answersBefore: a ? a.row.answers : null,
      testsBefore: a ? a.row.tests : null,
      paywallsSeen: a ? a.row.paywallViews : null,
    };
  });

  return {
    generatedAt: new Date(now).toISOString(),
    totalAccounts,
    activeAccounts: accounts.length,
    overview,
    countries,
    recentPayers,
    daily: { paywallHits: paywallHitsByDay, purchases: purchasesByDay, signedIn: signedInByDay, signedInEst: signedInEstByDay },
    trackedSince: TRACKED_SINCE,
    topPrepper,
    nextEmails,
    leads,
  };
}
