import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { isInternalEmail } from '@/lib/internal';
import { getInternalUids } from '@/lib/server/internalUsers';
import { getCatalogEntry } from '@/lib/testCatalog';
import { paywallHitFeature, purchaseExam, purchaseLocationLabel } from '@/lib/purchaseAttribution';
import { dayNumber, grid, isLive, pack, payChance, type ConvRow, type PackedRow, type Sale } from '@/lib/conversion';
import { REGIONS, isRegion, regionFromCountry, regionOfTest } from '@/lib/region';
import { formatPrice, paymentNetUsdCents, premiumPriceFor } from '@/lib/pricing';

// The Conversion tab on /admin (components/admin/ConversionTab.tsx): one row
// per account that answered a question, saw a paywall or paid, cut every way
// in the browser by lib/conversion.ts.
//
// Every account is read with a narrow field mask (counters, dates, paywall
// hits), which is quick. Only buyers need their answer history, to work out
// what they had done when they paid, so only buyers' histories are fetched.

export interface ConversionPayload {
  generatedAt: string;
  /** Every non-internal account, including the ones with no row. */
  totalAccounts: number;
  /** Exam ids, indexed by a row's `exam`; names for the filter. */
  exams: string[];
  examNames: Record<string, string>;
  rows: PackedRow[];
  /** Indexed by a row's `market`: a country Tigertest has a homepage for, "OTHER" or "UNKNOWN". */
  markets: { code: string; name: string; price: string }[];
  /** Every purchase, for period comparisons and revenue by market. */
  sales: Sale[];
  daily: {
    paywallHits: Record<string, number>;
    purchases: Record<string, number>;
    /** Hits by signed-in accounts and hits by market code, counted since TRACKED_SINCE. */
    signedIn: Record<string, number>;
    /** Before TRACKED_SINCE, an estimate: each account's hits on a paywall, put on the day of its latest hit there. */
    signedInEst: Record<string, number>;
    byMarket: Record<string, Record<string, number>>;
  };
  trackedSince: string;
  /** Indexed by a buyer row's `soldBy`. */
  paywalls: {
    feature: string;
    label: string;
    exam: string;
    /** Every open, guests included (analytics/paywalls). */
    viewsAll: number;
    views30d: number;
    /** Opens by signed-in accounts. */
    signedInViews: number;
    accountsSaw: number;
    /** Of the accounts that saw it, how many paid (through any paywall). */
    accountsPaid: number;
    /** Purchases that came through this paywall. */
    sold: number;
    /** Hits per day, last 90 days. */
    daily: Record<string, number>;
    /** Signed-in accounts whose latest hit here was in the last 7, 14 and 30 days. */
    people: [number, number, number];
  }[];
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

export async function buildConversion(): Promise<ConversionPayload> {
  const db = getAdminDb();
  const [usersSnap, paymentsSnap, paywallsDoc, originsSnap, internalUids] = await Promise.all([
    db.collection('users')
      .select('createdAt', 'activeDates', 'lastUpdated', 'subscription', 'paywallHits', '_stats', 'primaryExam', 'selectedState', 'paywallCountry', 'region')
      .get(),
    db.collection('payments').get(),
    db.doc('analytics/paywalls').get(),
    db.collection('signupOrigins').select('country').get(),
    getInternalUids(),
  ]);
  const originCountry = new Map<string, string>();
  for (const doc of originsSnap.docs) {
    const c = doc.get('country');
    if (typeof c === 'string' && c) originCountry.set(doc.id, c);
  }
  const todayKey = new Date().toISOString().slice(0, 10);
  const today = dayNumber(todayKey);

  // ── Payments: who paid, when, and through which paywall ────────────────
  const paidAt = new Map<string, number>();
  const paidLocation = new Map<string, string>();
  const paidExam = new Map<string, string>();
  const purchasesByDay: Record<string, number> = {};
  const paidCountry = new Map<string, string>();
  const paidUids = new Set<string>();
  type RawSale = { day: number; uid: string | null; location: string | null; country: string | null; cents: number };
  const rawSales: RawSale[] = [];
  for (const doc of paymentsSnap.docs) {
    const p = doc.data();
    const uid = typeof p.userId === 'string' ? p.userId : null;
    if ((uid && internalUids.has(uid)) || isInternalEmail(p.email as string | undefined)) continue;
    const day = dayKey(p.createdAt);
    if (day) purchasesByDay[day] = (purchasesByDay[day] || 0) + 1;
    if (p.status === 'succeeded' || p.status === 'partially_refunded') {
      rawSales.push({
        day: dayNumber(day),
        uid,
        location: typeof p.location === 'string' && p.location ? p.location : null,
        country: typeof p.country === 'string' && p.country ? p.country : null,
        cents: paymentNetUsdCents(p, typeof p.refundedCents === 'number' ? p.refundedCents : 0),
      });
    }
    if (!uid) continue;
    paidUids.add(uid);
    if (typeof p.country === 'string' && p.country) paidCountry.set(uid, p.country);
    const at = ms(p.createdAt);
    if (at !== null && (!paidAt.has(uid) || at < paidAt.get(uid)!)) paidAt.set(uid, at);
    if (typeof p.location === 'string' && p.location) paidLocation.set(uid, p.location);
    if (typeof p.exam === 'string' && p.exam) paidExam.set(uid, p.exam);
  }

  // ── Every paywall, from the site-wide counters ─────────────────────────
  type Wall = ConversionPayload['paywalls'][number];
  const walls = new Map<string, Wall>();
  const wall = (feature: string) => {
    let w = walls.get(feature);
    if (!w) {
      w = { feature, label: purchaseLocationLabel(feature), exam: purchaseExam(feature), viewsAll: 0, views30d: 0, signedInViews: 0, accountsSaw: 0, accountsPaid: 0, sold: 0, daily: {}, people: [0, 0, 0] };
      walls.set(feature, w);
    }
    return w;
  };
  const paywallsData = (paywallsDoc.data() || {}) as {
    daily?: Record<string, unknown>;
    signedInDaily?: Record<string, unknown>;
    byCountry?: Record<string, Record<string, unknown>>;
    byPaywall?: Record<string, { total?: unknown; daily?: Record<string, unknown> }>;
  };
  const signedInByDay: Record<string, number> = {};
  for (const [day, n] of Object.entries(paywallsData.signedInDaily || {})) if (typeof n === 'number') signedInByDay[day] = n;
  const signedInEstByDay: Record<string, number> = {};
  const hitsByMarket: Record<string, Record<string, number>> = {};
  for (const [iso, days] of Object.entries(paywallsData.byCountry || {})) {
    const m = iso === 'ZZ' ? UNKNOWN : marketOf(iso) ?? UNKNOWN;
    const into = (hitsByMarket[m] ??= {});
    for (const [day, n] of Object.entries(days || {})) if (typeof n === 'number') into[day] = (into[day] || 0) + n;
  }
  const paywallHitsByDay: Record<string, number> = {};
  for (const [day, n] of Object.entries(paywallsData.daily || {})) if (typeof n === 'number') paywallHitsByDay[day] = n;
  const from30 = new Date(Date.now() - 29 * 86_400_000).toISOString().slice(0, 10);
  const from90 = new Date(Date.now() - 90 * 86_400_000).toISOString().slice(0, 10);
  for (const [key, rec] of Object.entries(paywallsData.byPaywall || {})) {
    const w = wall(paywallHitFeature(key));
    w.viewsAll += num(rec?.total);
    for (const [day, n] of Object.entries(rec?.daily || {})) {
      if (day >= from30) w.views30d += num(n);
      if (day >= from90) w.daily[day] = (w.daily[day] || 0) + num(n);
    }
  }

  // ── One pass over the accounts ─────────────────────────────────────────
  type Account = {
    uid: string;
    row: ConvRow;
    examId: string;
    hits: Hit[];
    purchasedAt: number | null;
    purchaseDay: string | null;
    dates: string[];
    statsAnswers: number;
    lastActive: string | null;
    soldFeature: string | null;
    market: string;
  };
  const accounts: Account[] = [];
  let totalAccounts = 0;
  for (const doc of usersSnap.docs) {
    if (internalUids.has(doc.id)) continue;
    totalAccounts++;
    const d = doc.data() as Record<string, unknown>;
    const sub = (d.subscription || {}) as Record<string, unknown>;
    const paid = sub.isPremium === true || paidAt.has(doc.id);
    const stats = (d._stats || {}) as Record<string, unknown>;
    const statsAnswers = num(stats.trainingQuestionsAnswered) + num(stats.testQuestionsAnswered);
    const hits: Hit[] = Object.entries((d.paywallHits || {}) as Record<string, Record<string, unknown>>).map(([key, rec]) => ({
      key,
      feature: paywallHitFeature(key),
      count: Math.max(1, num(rec?.count)),
      lastAt: ms(rec?.lastAt),
      label: typeof rec?.label === 'string' ? rec.label : key,
    }));
    if (!paid && statsAnswers === 0 && hits.length === 0) continue;

    const dates = (Array.isArray(d.activeDates) ? (d.activeDates as unknown[]) : [])
      .filter((x): x is string => typeof x === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(x))
      .sort();
    const signupDay = dayKey(d.createdAt) ?? dates[0] ?? dayKey(d.lastUpdated);
    const lastActive = dates[dates.length - 1] ?? dayKey(d.lastUpdated);
    const purchasedAt = paid ? ms(sub.purchasedAt) ?? paidAt.get(doc.id) ?? null : null;
    const purchaseDay = purchasedAt !== null ? new Date(purchasedAt).toISOString().slice(0, 10) : null;

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

    const features = new Map<string, number>();
    for (const h of hits) features.set(h.feature, Math.max(features.get(h.feature) ?? 0, h.lastAt ?? 0));
    for (const [f, lastAt] of features) {
      const w = wall(f);
      w.accountsSaw++;
      if (paid) w.accountsPaid++;
      const ago = lastAt ? (Date.now() - lastAt) / 86_400_000 : Infinity;
      if (ago <= 7) w.people[0]++;
      if (ago <= 14) w.people[1]++;
      if (ago <= 30) w.people[2]++;
    }
    const lastHit = hits.reduce((m, h) => Math.max(m, h.lastAt ?? 0), 0);
    for (const h of hits) wall(h.feature).signedInViews += h.count;
    for (const h of hits) {
      if (h.lastAt === null) continue;
      const day = new Date(h.lastAt).toISOString().slice(0, 10);
      if (day < TRACKED_SINCE) signedInEstByDay[day] = (signedInEstByDay[day] || 0) + h.count;
    }
    if (soldFeature) wall(soldFeature).sold++;

    accounts.push({
      uid: doc.id,
      examId,
      hits,
      purchasedAt,
      purchaseDay,
      dates,
      statsAnswers,
      lastActive,
      soldFeature,
      market,
      row: {
        paid,
        answers: statsAnswers,
        tests: num(stats.testsCompleted),
        activeDays: Math.max(1, daysBefore),
        paywallViews: hits.reduce((n, h) => n + h.count, 0),
        paywalls: features.size,
        exam: 0,
        signupDay: dayNumber(signupDay),
        lastActiveDay: dayNumber(lastActive),
        daysToBuy: paid && purchaseDay && signupDay ? Math.max(0, dayNumber(purchaseDay) - dayNumber(signupDay)) : -1,
        answersAfter: 0,
        activeDaysAfter: paid && purchaseDay ? dates.filter((x) => x > purchaseDay).length : 0,
        soldBy: -1,
        market: 0,
        lastPaywallDay: lastHit ? Math.floor(lastHit / 86_400_000) : -1,
      },
    });
  }

  // ── Buyers: what they had done when they paid ──────────────────────────
  // The counters above are totals. A buyer keeps practicing after paying, so
  // their history says what share of it came first.
  const buyers = accounts.filter((a) => a.row.paid);
  for (let i = 0; i < buyers.length; i += 100) {
    const chunk = buyers.slice(i, i + 100);
    const docs = await db.getAll(...chunk.map((a) => db.doc(`users/${a.uid}`)), { fieldMask: ['trainingAnswerHistory', 'completedTests'] });
    docs.forEach((snap, j) => {
      const a = chunk[j];
      const b = beforePurchase((snap.data() || {}) as Record<string, unknown>, a.purchasedAt);
      a.row.answers = Math.round(a.statsAnswers * b.share);
      a.row.answersAfter = Math.max(a.statsAnswers - a.row.answers, 0);
      a.row.tests = Math.min(a.row.tests, b.testsBefore);
    });
  }

  // ── Index exams and paywalls, pack the rows ────────────────────────────
  const paywalls = [...walls.values()].sort((a, b) => b.sold - a.sold || b.viewsAll - a.viewsAll);
  const wallIndex = new Map(paywalls.map((w, i) => [w.feature, i]));
  const examCounts = new Map<string, number>();
  for (const a of accounts) examCounts.set(a.examId, (examCounts.get(a.examId) || 0) + 1);
  const exams = [...examCounts.entries()].sort((a, b) => b[1] - a[1]).map(([id]) => id);
  const examIndex = new Map(exams.map((id, i) => [id, i]));
  const examNames: Record<string, string> = {};
  for (const id of exams) examNames[id] = getCatalogEntry(id)?.shortName ?? id;
  // Markets, biggest first; names and the local Premium price for the table.
  const marketCounts = new Map<string, number>();
  for (const a of accounts) marketCounts.set(a.market, (marketCounts.get(a.market) || 0) + 1);
  for (const m of Object.keys(hitsByMarket)) if (!marketCounts.has(m)) marketCounts.set(m, 0);
  const marketCodes = [...marketCounts.entries()].sort((a, b) => b[1] - a[1]).map(([code]) => code);
  const marketIndex = new Map(marketCodes.map((code, i) => [code, i]));
  const markets = marketCodes.map((code) => ({
    code,
    name: code === OTHER ? 'Other countries' : code === UNKNOWN ? 'Unknown' : REGIONS.find((r) => r.code === code)?.name ?? code,
    price: code === OTHER || code === UNKNOWN ? '' : formatPrice(premiumPriceFor(isoOfMarket(code))),
  }));
  const byUid = new Map(accounts.map((a) => [a.uid, a]));
  for (const a of accounts) {
    a.row.exam = examIndex.get(a.examId) ?? 0;
    a.row.soldBy = a.soldFeature ? wallIndex.get(a.soldFeature) ?? -1 : -1;
    a.row.market = marketIndex.get(a.market) ?? 0;
  }

  // Every purchase: its day, the paywall it came through, its market, US cents.
  // Premium accounts with no payment record (before payments were stored)
  // count at list price on their purchase day, like the other tabs.
  const sales: Sale[] = rawSales
    .filter((x) => x.day >= 0)
    .map((x) => {
      const a = x.uid ? byUid.get(x.uid) : undefined;
      const feature = x.location ?? a?.soldFeature ?? null;
      const market = marketOf(x.country) ?? a?.market ?? UNKNOWN;
      return [x.day, feature ? wallIndex.get(feature) ?? -1 : -1, marketIndex.get(market) ?? marketIndex.get(UNKNOWN) ?? 0, x.cents];
    });
  for (const a of accounts) {
    if (!a.row.paid || paidUids.has(a.uid) || !a.purchaseDay) continue;
    sales.push([dayNumber(a.purchaseDay), a.row.soldBy, a.row.market, 999]);
  }

  // ── Warm leads: unpaid, seen a paywall, active lately, most like buyers ─
  const cells = grid(accounts.map((a) => a.row));
  const ranked = accounts
    .filter((a) => isLive(a.row, today))
    .map((a) => ({ a, chance: payChance(cells, a.row) }))
    .sort((x, y) => y.chance - x.chance || y.a.row.lastActiveDay - x.a.row.lastActiveDay || y.a.row.answers - x.a.row.answers)
    .slice(0, 30);
  const emails = new Map<string, string>();
  if (ranked.length > 0) {
    const found = await getAdminAuth().getUsers(ranked.map(({ a }) => ({ uid: a.uid })));
    for (const u of found.users) if (u.email) emails.set(u.uid, u.email);
  }
  const leads = ranked.map(({ a, chance }) => {
    const last = [...a.hits].sort((x, y) => (y.lastAt ?? 0) - (x.lastAt ?? 0))[0];
    return {
      email: emails.get(a.uid) ?? '(no email)',
      market: markets[a.row.market]?.name ?? '',
      exam: examNames[a.examId] ?? a.examId,
      answers: a.row.answers,
      tests: a.row.tests,
      activeDays: a.row.activeDays,
      paywallViews: a.row.paywallViews,
      lastPaywall: last ? purchaseLocationLabel(last.feature) : '',
      lastPaywallAt: last?.lastAt ? new Date(last.lastAt).toISOString() : null,
      lastActive: a.lastActive,
      chance,
    };
  });

  return {
    generatedAt: new Date().toISOString(),
    totalAccounts,
    exams,
    examNames,
    rows: accounts.map((a) => pack(a.row)),
    markets,
    sales,
    daily: { paywallHits: paywallHitsByDay, purchases: purchasesByDay, signedIn: signedInByDay, signedInEst: signedInEstByDay, byMarket: hitsByMarket },
    trackedSince: TRACKED_SINCE,
    paywalls,
    leads,
  };
}
