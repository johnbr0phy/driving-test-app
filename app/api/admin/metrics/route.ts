import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { requireAdmin } from '@/lib/server/adminAuth';
import { cachedAdminPayload, cachedJson, wantsRefresh } from '@/lib/server/adminCache';
import { isInternalEmail } from '@/lib/internal';
import { getInternalUids } from '@/lib/server/internalUsers';
import type { DocumentSnapshot, QuerySnapshot } from 'firebase-admin/firestore';
import { FieldPath } from 'firebase-admin/firestore';
import { sumLandingDays } from '@/lib/funnelLanding';
import { paymentNetUsdCents } from '@/lib/pricing';

// Growth/revenue metrics for the /admin Growth tab. Everything here is derived from two
// sources of truth: the users collection (signups, activity, subscription) and
// the payments collection (real Stripe amounts). The client only buckets and
// renders; all uniqueness-sensitive aggregation (active users) happens here.

const PREMIUM_FALLBACK_CENTS = 999; // premium users who predate the payments collection

// The payload is kept in lib/server/adminCache: fresh for two minutes, and
// an older copy is served at once while a rebuild runs after the response.
export const maxDuration = 60;

function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

function dayKey(iso: string): string | null {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d.toISOString().split('T')[0];
}

// The "today" range buckets in John's timezone, not UTC: a UTC day rolls over
// at 8pm Eastern, so an evening check would show a near-empty day. Only the
// today range uses this — the other ranges stay on UTC dayKey() as before.
const ADMIN_TZ = 'America/New_York';

function etParts(iso: string): { date: string; hour: number } | null {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: ADMIN_TZ,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', hour12: false,
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const hour = parseInt(get('hour'), 10);
  if (Number.isNaN(hour)) return null;
  // Some ICU builds render midnight as "24" under hour12:false
  return { date: `${get('year')}-${get('month')}-${get('day')}`, hour: hour % 24 };
}

export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  try {
    const { payload, cache, at } = await cachedAdminPayload({
      key: 'metrics',
      ttlMs: 2 * 60_000,
      staleMs: 24 * 3_600_000,
      refresh: wantsRefresh(request),
      build: buildMetrics,
    });
    return cachedJson(payload, cache, at);
  } catch (error) {
    console.error('[admin/metrics]', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 },
    );
  }
}

async function buildMetrics() {
  const db = getAdminDb();
  const landingSince = new Date(Date.now() - 89 * 86_400_000).toISOString().slice(0, 10);
  const [usersSnapRaw, paymentsSnap, questionsDoc, studyTimesDoc, funnelDoc, originsSnap, internalUids, paywallsDoc, enrolledSnap, landingSnap] = await Promise.all([
    db.collection('users')
      .select('selectedState', 'lastUpdated', 'activeDates', 'subscription', 'createdAt', 'paywallHits', '_stats')
      .get(),
    db.collection('payments').get(),
    db.doc('analytics/questions').get(),
    db.doc('globalStats/studyTimes').get(),
    db.doc('analytics/funnel').get(),
    db.collection('signupOrigins').get(),
    getInternalUids(),
    db.doc('analytics/paywalls').get(),
    // Accounts that answered at least one question on any test (DMV, v1, v2):
    // one enrollments doc per (exam, uid), guest docs claimed on sign-in
    // (lib/enrollment.ts). `_stats` alone misses v1 exam training and all v2.
    db.collection('enrollments').where('uid', '>', '').select('uid').get(),
    // Visits and first answers by landing page, one doc per UTC day (lib/funnelLanding.ts).
    db.collection('funnelLandings').where(FieldPath.documentId(), '>=', landingSince).get(),
  ]);
  const enrolledUids = new Set<string>();
  enrolledSnap.forEach((d) => {
    const uid = d.get('uid');
    if (typeof uid === 'string') enrolledUids.add(uid);
  });
  // Every paywall open per UTC day, guests included (/api/analytics/paywall).
  const paywallHitsByDay: Record<string, number> = {};
  for (const [day, n] of Object.entries((paywallsDoc.data()?.daily as Record<string, unknown>) || {})) {
    if (typeof n === 'number') paywallHitsByDay[day] = n;
  }
  // Internal accounts (lib/internal) never count: drop their users, payments
  // and signup origins before anything is aggregated.
  const usersSnap = { docs: usersSnapRaw.docs.filter((d) => !internalUids.has(d.id)) };
  const isInternalPayment = (p: Record<string, unknown>) =>
    (typeof p.userId === 'string' && internalUids.has(p.userId)) || isInternalEmail(p.email as string | undefined);

  // ── Per-day maps (YYYY-MM-DD → number) ──────────────────────────────────
  const signupsByDay: Record<string, number> = {};
  const revenueCentsByDay: Record<string, number> = {};
  const purchasesByDay: Record<string, number> = {};
  const activeByDay: Record<string, number> = {};

  // ── "Today" (Eastern) hourly buckets ────────────────────────────────────
  const etToday = etParts(new Date().toISOString())?.date ?? '';
  const hourlySignups = new Array(24).fill(0) as number[];
  const hourlyRevenueCents = new Array(24).fill(0) as number[];
  const hourlyPurchases = new Array(24).fill(0) as number[];
  let activeUsersToday = 0;

  // ── Real payments first ─────────────────────────────────────────────────
  const paidUserIds = new Set<string>();
  let revenueAllTimeCents = 0;
  paymentsSnap.docs.forEach((doc) => {
    const p = doc.data() as Record<string, unknown>;
    if (isInternalPayment(p)) return;
    // A refunded payment (Stripe webhook) still marks its buyer as paid, so
    // the $9.99 fallback below never counts them, but adds only what was kept.
    if (p.userId) paidUserIds.add(p.userId as string);
    if (p.status !== 'succeeded' && p.status !== 'partially_refunded') return;
    const amount = paymentNetUsdCents(p, typeof p.refundedCents === 'number' ? p.refundedCents : 0);
    const day = typeof p.createdAt === 'string' ? dayKey(p.createdAt) : null;
    revenueAllTimeCents += amount;
    if (day) {
      revenueCentsByDay[day] = (revenueCentsByDay[day] || 0) + amount;
      purchasesByDay[day] = (purchasesByDay[day] || 0) + 1;
    }
    const et = typeof p.createdAt === 'string' ? etParts(p.createdAt) : null;
    if (et && et.date === etToday) {
      hourlyRevenueCents[et.hour] += amount;
      hourlyPurchases[et.hour] += 1;
    }
  });

  // ── Scan all users ──────────────────────────────────────────────────────
  let payingUsers = 0;
  let engagedUsers = 0;
  let paywallUsers = 0;
  let stateChosenUsers = 0;
  let totalQuestions = 0;
  let estimatedPurchases = 0; // premium users with no payment record ($9.99 assumed)
  const daysToPurchase: number[] = [];
  const premiumIds = new Set<string>();
  // Post-signup stages per account, for the visitor funnel's tracked cohort.
  const accountStages = new Map<string, { answered: boolean; paywall: boolean }>();
  // Per-user activity for unique-active series
  const perUserActivity: { dates: Set<string> }[] = [];

  usersSnap.docs.forEach((doc) => {
    const data = doc.data() as Record<string, unknown>;
    const sub = (data.subscription || {}) as Record<string, unknown>;
    // A prize (the millionth question, lib/server/millionth) is not a sale.
    const isPremium = sub.isPremium === true && sub.grantedBy !== 'millionth';
    const createdAt = data.createdAt as string | undefined;
    const activeDates = ((data.activeDates as string[]) || []).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d));
    const lastUpdated = data.lastUpdated as string | undefined;

    // Signup date: createdAt > earliest activeDate > lastUpdated
    const signupDay =
      (createdAt && dayKey(createdAt)) ||
      (activeDates.length > 0 ? [...activeDates].sort()[0] : null) ||
      (lastUpdated ? dayKey(lastUpdated) : null);
    if (signupDay) signupsByDay[signupDay] = (signupsByDay[signupDay] || 0) + 1;

    // Hourly signups for today. Only createdAt carries a clock time; the
    // activeDate/lastUpdated fallbacks are date-only, so accounts old enough
    // to lack createdAt simply can't land in an hour bucket. They never would
    // anyway — every account created since May 2026 has one.
    if (createdAt) {
      const et = etParts(createdAt);
      if (et && et.date === etToday) hourlySignups[et.hour] += 1;
    }
    if (activeDates.includes(etToday)) activeUsersToday++;

    // Activity
    const dates = new Set(activeDates);
    if (dates.size === 0 && lastUpdated) {
      const d = dayKey(lastUpdated);
      if (d) dates.add(d);
    }
    dates.forEach((d) => (activeByDay[d] = (activeByDay[d] || 0) + 1));
    perUserActivity.push({ dates });

    // Funnel + engagement
    if (data.selectedState) stateChosenUsers++;
    const stats = (data._stats || {}) as Record<string, unknown>;
    const answered =
      ((stats.trainingQuestionsAnswered as number) || 0) + ((stats.testQuestionsAnswered as number) || 0);
    totalQuestions += answered;
    const answeredAny = answered > 0 || enrolledUids.has(doc.id);
    if (answeredAny) engagedUsers++;
    // A buyer saw a paywall even when the view was not on the account (made
    // as a guest before signing up), so every buyer counts at this step.
    const hitPaywall = Object.keys((data.paywallHits as Record<string, unknown>) || {}).length > 0 || isPremium;
    if (hitPaywall) paywallUsers++;
    accountStages.set(doc.id, { answered: answeredAny, paywall: hitPaywall });

    // Purchases / revenue
    if (isPremium) {
      payingUsers++;
      premiumIds.add(doc.id);
      const purchasedAt = typeof sub.purchasedAt === 'string' ? sub.purchasedAt : undefined;
      if (!paidUserIds.has(doc.id)) {
        // No Stripe record (legacy / comped) — count at the fallback price
        estimatedPurchases++;
        revenueAllTimeCents += PREMIUM_FALLBACK_CENTS;
        const day = purchasedAt ? dayKey(purchasedAt) : null;
        if (day) {
          revenueCentsByDay[day] = (revenueCentsByDay[day] || 0) + PREMIUM_FALLBACK_CENTS;
          purchasesByDay[day] = (purchasesByDay[day] || 0) + 1;
        }
      }
      if (purchasedAt && signupDay) {
        const ms = new Date(purchasedAt).getTime() - new Date(signupDay + 'T00:00:00.000Z').getTime();
        if (ms >= 0) daysToPurchase.push(ms / 86_400_000);
      }
    }
  });

  // ── Unique-active series (must be computed here, not re-bucketed) ───────
  const now = new Date();
  const todayKey = now.toISOString().split('T')[0];

  const uniqueActiveInWindow = (startKey: string, endKey: string) =>
    perUserActivity.reduce((n, u) => {
      for (const d of u.dates) if (d >= startKey && d <= endKey) return n + 1;
      return n;
    }, 0);

  // Rolling 7-day buckets ending today, oldest first (covers ~90 days)
  const activeWeekly = Array.from({ length: 13 }, (_, i) => {
    const end = new Date(now);
    end.setDate(end.getDate() - (12 - i) * 7);
    const start = new Date(end);
    start.setDate(start.getDate() - 6);
    const startKey = start.toISOString().split('T')[0];
    const endKey = end.toISOString().split('T')[0];
    return { date: startKey, count: uniqueActiveInWindow(startKey, endKey) };
  });

  // Calendar months, full history
  const allDays = Object.keys({ ...signupsByDay, ...activeByDay }).sort();
  const firstMonth = allDays.length > 0 ? allDays[0].slice(0, 7) : todayKey.slice(0, 7);
  const activeMonthly: { date: string; count: number }[] = [];
  {
    const cursor = new Date(firstMonth + '-01T12:00:00Z');
    const thisMonth = todayKey.slice(0, 7);
    while (cursor.toISOString().slice(0, 7) <= thisMonth) {
      const prefix = cursor.toISOString().slice(0, 7);
      activeMonthly.push({
        date: prefix,
        count: uniqueActiveInWindow(prefix + '-01', prefix + '-31'),
      });
      cursor.setUTCMonth(cursor.getUTCMonth() + 1);
    }
  }

  // ── KPIs ────────────────────────────────────────────────────────────────
  const sumWindow = (map: Record<string, number>, startKey: string, endKey: string) =>
    Object.entries(map).reduce((n, [d, c]) => (d >= startKey && d <= endKey ? n + c : n), 0);
  const daysAgoKey = (days: number) => {
    const d = new Date(now);
    d.setDate(d.getDate() - days);
    return d.toISOString().split('T')[0];
  };

  const thisMonthPrefix = todayKey.slice(0, 7);
  const prevMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 15);
  const prevMonthPrefix = `${prevMonthDate.getFullYear()}-${String(prevMonthDate.getMonth() + 1).padStart(2, '0')}`;
  const sumPrefix = (map: Record<string, number>, prefix: string) =>
    Object.entries(map).reduce((n, [d, c]) => (d.startsWith(prefix) ? n + c : n), 0);
  // Month-to-date vs the SAME number of days into last month — comparing a
  // partial month against a full one would always read as a crash.
  const dayOfMonth = todayKey.slice(8, 10);
  const sumPrefixToDay = (map: Record<string, number>, prefix: string) =>
    Object.entries(map).reduce(
      (n, [d, c]) => (d.startsWith(prefix) && d.slice(8, 10) <= dayOfMonth ? n + c : n),
      0,
    );

  const questionsData = questionsDoc.exists ? (questionsDoc.data() as Record<string, unknown>) : undefined;
  const questionsByDay = (questionsData?.daily as Record<string, number>) || {};
  const questionsAllTime = Object.values(questionsByDay).reduce((a, b) => a + b, 0);

  // v2BackfilledAt: re-seeds once more now that the backfill counts v2 (SAT, ACT...) history.
  // enrollmentsBackfilledAt: one more pass to seed enrollments from account records.
  const questionsByExamBackfillPending = !questionsData?.v2BackfilledAt || !questionsData?.enrollmentsBackfilledAt;

  const totalUsers = usersSnap.docs.length;
  const payload = {
    generatedAt: new Date().toISOString(),
    kpis: {
      revenueAllTimeCents,
      revenueThisMonthCents: sumPrefix(revenueCentsByDay, thisMonthPrefix),
      revenuePrevMonthCents: sumPrefixToDay(revenueCentsByDay, prevMonthPrefix),
      estimatedPurchases,
      payingUsers,
      purchasesThisMonth: sumPrefix(purchasesByDay, thisMonthPrefix),
      conversionRate: totalUsers > 0 ? payingUsers / totalUsers : 0,
      medianDaysToPurchase: median(daysToPurchase),
      totalUsers,
      newUsers7d: sumWindow(signupsByDay, daysAgoKey(6), todayKey),
      newUsersPrev7d: sumWindow(signupsByDay, daysAgoKey(13), daysAgoKey(7)),
      wau: uniqueActiveInWindow(daysAgoKey(6), todayKey),
      wauPrev: uniqueActiveInWindow(daysAgoKey(13), daysAgoKey(7)),
      // Prefer the all-users aggregate (guests included); _stats sum as fallback
      totalQuestions: Math.max(questionsAllTime, totalQuestions),
      questions7d: sumWindow(questionsByDay, daysAgoKey(6), todayKey),
    },
    daily: {
      signups: signupsByDay,
      revenueCents: revenueCentsByDay,
      purchases: purchasesByDay,
      active: activeByDay,
      questions: questionsByDay,
      paywallHits: paywallHitsByDay,
    },
    activeWeekly,
    activeMonthly,
    questionsByExamBackfillPending,
    // Built nightly by /api/cron/aggregate-stats.
    studyTimes: studyTimesDoc.exists ? studyTimesDoc.data() : null,
    // The "today" range. Signups and revenue are bucketed by the hour in
    // Eastern time off real timestamps. Questions and active users have no
    // clock time anywhere in their write path, so they can only be day
    // totals — and each is stamped in a different zone, hence the separate
    // date fields. The UI footnotes both rather than implying they're Eastern.
    today: {
      date: etToday,
      hours: {
        signups: hourlySignups,
        revenueCents: hourlyRevenueCents,
        purchases: hourlyPurchases,
      },
      activeUsers: activeUsersToday,
      // Keyed by the Eastern date, not the current UTC date. Eastern day D
      // spans UTC D 04:00 → UTC D+1 04:00, so 20 of its 24 hours sit in UTC
      // day D. Using the live UTC key instead would, after 8pm Eastern, show
      // the handful of answers since the UTC rollover (592) in place of the
      // day's real total (2,886).
      questions: questionsByDay[etToday] || 0,
    },
    visitorFunnel: {
      ...buildVisitorFunnel(funnelDoc, originsSnap, premiumIds, accountStages, internalUids),
      byLanding: buildLandingFunnel(landingSnap),
    },
    funnel: {
      signups: totalUsers,
      engaged: engagedUsers,
      hitPaywall: paywallUsers,
      purchased: payingUsers,
      stateChosen: stateChosenUsers,
    },
  };

  return payload;
}

// Visit to first answer by landing page, for the funnel's 7d, 30d and
// since-start (90 days) windows. Pages under 10 visits are left out.
function buildLandingFunnel(snap: QuerySnapshot) {
  const days = snap.docs.map((d) => ({ day: d.id, data: d.data() as { visit?: Record<string, number>; answered?: Record<string, number> } }));
  const window = (n: number) => {
    const since = new Date(Date.now() - (n - 1) * 86_400_000).toISOString().slice(0, 10);
    return sumLandingDays(days.filter((d) => d.day >= since).map((d) => d.data), 10);
  };
  return {
    startedAt: days.map((d) => d.day).sort()[0] ?? null,
    '7d': window(7),
    '30d': window(30),
    all: window(90),
  };
}

// ─── Visitor funnel (lib/funnel.ts) ──────────────────────────────────────────
// Per-step daily counts for the client to window, plus the tracked accounts
// (signupOrigins/{uid}) carried past signup: answered, paywall, purchased.
// Account stages are keyed by signup day, split by whether the account
// practiced before signing up.
type CohortStage = 'accounts' | 'answered' | 'paywall' | 'purchased';

function buildVisitorFunnel(
  funnelDoc: DocumentSnapshot,
  originsSnap: QuerySnapshot,
  premiumIds: Set<string>,
  accountStages: Map<string, { answered: boolean; paywall: boolean }>,
  internalUids: Set<string>,
) {
  const steps = (funnelDoc.exists ? funnelDoc.get('steps') : null) as
    | Record<string, { daily?: Record<string, number> }>
    | null;
  const daily: Record<string, Record<string, number>> = {};
  for (const key of ['visit', 'answered', 'signup_view', 'signup', 'signup_tried', 'signup_cold', 'dmv_picker', 'dmv_state', 'dashboard', 'dashboard_by_visit']) {
    daily[key] = steps?.[key]?.daily || {};
  }
  // Visits by source (visit_chatgpt, visit_search...), counted from the AI
  // referrer tracking deploy on, so they sum to less than all-time visits.
  for (const key of Object.keys(steps || {})) {
    if (key.startsWith('visit_')) daily[key] = steps?.[key]?.daily || {};
  }
  const emptyCohort = (): Record<CohortStage, Record<string, number>> => ({
    accounts: {},
    answered: {},
    paywall: {},
    purchased: {},
  });
  const cohort = { tried: emptyCohort(), cold: emptyCohort() };
  const origins = {
    tried: { accounts: 0, purchased: 0 },
    cold: { accounts: 0, purchased: 0 },
  };
  originsSnap.forEach((doc) => {
    if (internalUids.has(doc.id)) return;
    const origin = doc.get('origin') === 'tried' ? 'tried' : 'cold';
    const purchased = premiumIds.has(doc.id);
    origins[origin].accounts++;
    if (purchased) origins[origin].purchased++;
    const at = doc.get('at');
    const day = typeof at === 'string' ? at.slice(0, 10) : null;
    if (!day) return;
    const stages = accountStages.get(doc.id);
    const bump = (stage: CohortStage) => {
      cohort[origin][stage][day] = (cohort[origin][stage][day] || 0) + 1;
    };
    bump('accounts');
    if (stages?.answered) bump('answered');
    if (stages?.paywall) bump('paywall');
    if (purchased) bump('purchased');
  });
  const startDays = Object.keys(daily.visit).sort();
  return { startedAt: startDays[0] ?? null, daily, origins, cohort };
}
