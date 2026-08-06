import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { isAdminEmail } from '@/lib/admin';

// Growth/revenue metrics for /admin/v2. Everything here is derived from two
// sources of truth: the users collection (signups, activity, subscription) and
// the payments collection (real Stripe amounts). The client only buckets and
// renders; all uniqueness-sensitive aggregation (active users) happens here.

const PREMIUM_FALLBACK_CENTS = 999; // premium users who predate the payments collection

const CACHE_TTL_MS = 120_000;
let cachedPayload: Record<string, unknown> | null = null;
let cacheTimestamp = 0;

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
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let decodedToken;
    try {
      decodedToken = await getAdminAuth().verifyIdToken(authHeader.split('Bearer ')[1]);
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    if (!isAdminEmail(decodedToken.email)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const forceRefresh = request.nextUrl.searchParams.get('refresh') === 'true';
    const cacheAge = Date.now() - cacheTimestamp;
    if (!forceRefresh && cachedPayload && cacheAge < CACHE_TTL_MS) {
      const res = NextResponse.json(cachedPayload);
      res.headers.set('X-Cache', 'HIT');
      return res;
    }

    const db = getAdminDb();
    const [usersSnap, paymentsSnap, questionsDoc] = await Promise.all([
      db.collection('users')
        .select('selectedState', 'lastUpdated', 'activeDates', 'subscription', 'createdAt', 'paywallHits', '_stats')
        .get(),
      db.collection('payments').get(),
      db.doc('analytics/questions').get(),
    ]);

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
      if (p.status !== 'succeeded') return;
      const amount = typeof p.amount === 'number' ? p.amount : 0;
      const day = typeof p.createdAt === 'string' ? dayKey(p.createdAt) : null;
      if (p.userId) paidUserIds.add(p.userId as string);
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
      if (Object.keys((data.paywallHits as Record<string, unknown>) || {}).length > 0) paywallUsers++;

      // Purchases / revenue
      if (isPremium) {
        payingUsers++;
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

    const totalUsers = usersSnap.size;
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
      funnel: {
        signups: totalUsers,
        engaged: engagedUsers,
        hitPaywall: paywallUsers,
        purchased: payingUsers,
        stateChosen: stateChosenUsers,
      },
    };

    cachedPayload = payload;
    cacheTimestamp = Date.now();
    const res = NextResponse.json(payload);
    res.headers.set('Cache-Control', 'private, max-age=120');
    res.headers.set('X-Cache', 'MISS');
    return res;
  } catch (error) {
    console.error('[admin/metrics]', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 },
    );
  }
}
