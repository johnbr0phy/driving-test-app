import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { requireAdmin } from '@/lib/server/adminAuth';
import { cachedAdminPayload, cachedJson, wantsRefresh } from '@/lib/server/adminCache';
import { isInternalEmail } from '@/lib/internal';
import { getInternalUids } from '@/lib/server/internalUsers';
import { examAnalyticsLabel } from '@/lib/exams';
import { EXAMS_V2 } from '@/lib/v2/registry';
import { TEST_REQUEST_PICKS } from '@/lib/test-requests';
import { LAUNCH_EXPERIMENT, LAUNCH_VARIANTS } from '@/lib/email-launch';
import type { DocumentSnapshot, QuerySnapshot } from 'firebase-admin/firestore';

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
  const [usersSnapRaw, paymentsSnap, questionsDoc, testRequestsSnap, studyTimesDoc, funnelDoc, originsSnap, internalUids] = await Promise.all([
    db.collection('users')
      .select('selectedState', 'lastUpdated', 'activeDates', 'subscription', 'createdAt', 'paywallHits', '_stats', 'emailVariants', 'emailClicks')
      .get(),
    db.collection('payments').get(),
    db.doc('analytics/questions').get(),
    db.collection('testRequests').get(),
    db.doc('globalStats/studyTimes').get(),
    db.doc('analytics/funnel').get(),
    db.collection('signupOrigins').get(),
    getInternalUids(),
  ]);
  // Internal accounts (lib/internal) never count: drop their users, payments,
  // test requests and signup origins before anything is aggregated.
  const usersSnap = { docs: usersSnapRaw.docs.filter((d) => !internalUids.has(d.id)) };
  const isInternalPayment = (p: Record<string, unknown>) =>
    (typeof p.userId === 'string' && internalUids.has(p.userId)) || isInternalEmail(p.email as string | undefined);

  // ── "What test should we build next?" answers ───────────────────────────
  // One doc per user per category (lib/test-requests). Counts per category
  // plus every free-text answer, newest first: the text is what names the
  // exam to build.
  const requestCounts = new Map<string, { clicks: number; withDetails: number }>();
  const requestDetails: { pick: string; details: string; examId: string | null; source: string; at: string }[] = [];
  let testRequestsTotal = 0;
  testRequestsSnap.forEach((doc) => {
    const d = doc.data();
    if (typeof d.uid === 'string' && internalUids.has(d.uid)) return;
    testRequestsTotal += 1;
    const pick = typeof d.pick === 'string' ? d.pick : 'other';
    const entry = requestCounts.get(pick) ?? { clicks: 0, withDetails: 0 };
    entry.clicks += 1;
    if (typeof d.details === 'string' && d.details.trim()) {
      entry.withDetails += 1;
      requestDetails.push({
        pick,
        details: d.details.trim(),
        examId: typeof d.examId === 'string' ? d.examId : null,
        source: typeof d.source === 'string' ? d.source : 'page',
        at: typeof d.updatedAt === 'string' ? d.updatedAt : (typeof d.createdAt === 'string' ? d.createdAt : ''),
      });
    }
    requestCounts.set(pick, entry);
  });
  // ── SAT/ACT launch email split test ───────────────────────────────────────
  // Sent = users stamped with a variant at send time. Clicked = clicked any
  // tracked link in that email. Bought = Premium purchased after the send.
  const variantStats = new Map(LAUNCH_VARIANTS.map((v) => [v.id, { sent: 0, clicked: 0, bought: 0 }]));
  usersSnap.docs.forEach((doc) => {
    const d = doc.data();
    const sent = d.emailVariants?.[LAUNCH_EXPERIMENT];
    const row = sent && variantStats.get(sent.variant);
    if (!row) return;
    row.sent += 1;
    if (d.emailClicks?.[LAUNCH_EXPERIMENT]) row.clicked += 1;
    const purchasedAt = d.subscription?.isPremium ? d.subscription?.purchasedAt : null;
    if (typeof purchasedAt === 'string' && typeof sent.sentAt === 'string' && purchasedAt > sent.sentAt) row.bought += 1;
  });
  const launchTest = LAUNCH_VARIANTS.map((v) => ({
    id: v.id,
    name: v.name,
    subject: v.subject,
    ...variantStats.get(v.id)!,
  }));

  const testRequests = {
    total: testRequestsTotal,
    byPick: TEST_REQUEST_PICKS.map((p) => ({
      id: p.id,
      label: p.label,
      clicks: requestCounts.get(p.id)?.clicks ?? 0,
      withDetails: requestCounts.get(p.id)?.withDetails ?? 0,
    })).sort((a, b) => b.clicks - a.clicks),
    details: requestDetails.sort((a, b) => b.at.localeCompare(a.at)).slice(0, 50),
  };

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
    const amount = (typeof p.amount === 'number' ? p.amount : 0) - (typeof p.refundedCents === 'number' ? p.refundedCents : 0);
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
    const isPremium = sub.isPremium === true;
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
    if (answered > 0) engagedUsers++;
    const hitPaywall = Object.keys((data.paywallHits as Record<string, unknown>) || {}).length > 0;
    if (hitPaywall) paywallUsers++;
    accountStages.set(doc.id, { answered: answered > 0, paywall: hitPaywall });

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

  // Per-exam split of the same aggregate (DMV + every registry exam). Totals
  // are summed from the per-day map, like the headline, so a backfilled
  // history and live increments read consistently. Answers recorded before
  // the split shipped (and before the backfill ran) only count in the headline.
  const byExamRaw =
    (questionsData?.byExam as Record<string, { daily?: Record<string, number> }>) || {};
  // Enrolled: distinct people (accounts + guest browsers) with at least one
  // answer in the exam, one doc each in enrollments (lib/enrollment). A
  // count() aggregation per exam; internal accounts are never written there.
  const enrolledEntries = await Promise.all(
    Object.keys(byExamRaw).map(async (id) => {
      try {
        const snap = await db.collection('enrollments').where('exam', '==', id).count().get();
        return [id, snap.data().count] as const;
      } catch {
        return [id, 0] as const;
      }
    })
  );
  const enrolledByExam = Object.fromEntries(enrolledEntries);
  const questionsByExam = Object.entries(byExamRaw)
    .map(([id, rec]) => {
      const days = rec?.daily || {};
      return {
        id,
        label: EXAMS_V2.find((e) => e.id === id)?.shortName ?? examAnalyticsLabel(id),
        total: Object.values(days).reduce((a, b) => a + b, 0),
        last7d: sumWindow(days, daysAgoKey(6), todayKey),
        prev7d: sumWindow(days, daysAgoKey(13), daysAgoKey(7)),
        today: days[etToday] || 0,
        enrolled: enrolledByExam[id] || 0,
      };
    })
    .filter((row) => row.total > 0)
    .sort((a, b) => b.total - a.total);
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
    },
    activeWeekly,
    activeMonthly,
    questionsByExam,
    questionsByExamBackfillPending,
    testRequests,
    // Built nightly by /api/cron/aggregate-stats.
    studyTimes: studyTimesDoc.exists ? studyTimesDoc.data() : null,
    launchTest,
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
    visitorFunnel: buildVisitorFunnel(funnelDoc, originsSnap, premiumIds, accountStages, internalUids),
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
  for (const key of ['visit', 'answered', 'signup_view', 'signup', 'signup_tried', 'signup_cold']) {
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
