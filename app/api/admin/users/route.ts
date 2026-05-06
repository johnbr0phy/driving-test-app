import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { isAdminEmail } from '@/lib/admin';

// ─── Server-side in-memory cache ───────────────────────────────────────────
const CACHE_TTL_MS = 120_000; // 2 minutes
let cachedPayload: Record<string, unknown> | null = null;
let cacheTimestamp = 0;

// ─── Per-user stats from full Firestore doc ─────────────────────────────────
function processFullDoc(data: Record<string, unknown>) {
  const training = (data.training || {}) as Record<string, unknown>;
  const onboardingMastered = (training.masteredQuestionIds || []) as unknown[];

  const trainingSets = (data.trainingSets || {}) as Record<string, Record<string, unknown>>;
  let trainingQuestionsAnswered = onboardingMastered.length;
  for (const setId of [1, 2, 3, 4]) {
    const setData = trainingSets[String(setId)] || trainingSets[setId as unknown as string] || {};
    const masteredIds = (setData.masteredIds || []) as unknown[];
    const wrongQueue = (setData.wrongQueue || []) as unknown[];
    trainingQuestionsAnswered += masteredIds.length + wrongQueue.length;
  }

  const completedTests = (data.completedTests || []) as Record<string, unknown>[];
  let testQuestionsAnswered = completedTests.reduce((sum: number, test: Record<string, unknown>) => {
    const answers = test.answers as unknown[] | undefined;
    return sum + (answers?.length || (test.totalQuestions as number) || 0);
  }, 0);

  const currentTests = (data.currentTests || {}) as Record<string, Record<string, unknown>>;
  for (const testId of Object.keys(currentTests)) {
    const testData = currentTests[testId];
    if (testData?.answers) {
      testQuestionsAnswered += Object.keys(testData.answers as Record<string, unknown>).length;
    }
  }

  return {
    testsCompleted: completedTests.length,
    trainingQuestionsAnswered,
    testQuestionsAnswered,
    isPremium: (data.subscription as Record<string, unknown>)?.isPremium === true,
  };
}

// ─── DAU calculation ────────────────────────────────────────────────────────
function calculateDailyActiveUsers(
  usersWithDates: { activeDates: string[]; lastUpdated: string | null }[]
) {
  const today = new Date();
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (29 - i));
    const dateStr = date.toISOString().split('T')[0];
    const startOfDay = new Date(date); startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date); endOfDay.setHours(23, 59, 59, 999);

    const count = usersWithDates.filter(u => {
      if (u.activeDates.length > 0) return u.activeDates.includes(dateStr);
      if (u.lastUpdated) {
        const lu = new Date(u.lastUpdated);
        return lu >= startOfDay && lu <= endOfDay;
      }
      return false;
    }).length;

    return {
      date: dateStr,
      count,
      displayDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
  });
}

// ─── Route handler ──────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const idToken = authHeader.split('Bearer ')[1];
    const auth = getAdminAuth();

    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(idToken);
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    if (!isAdminEmail(decodedToken.email)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // ── Cache hit ──────────────────────────────────────────────────────────
    const forceRefresh = request.nextUrl.searchParams.get('refresh') === 'true';
    const cacheAge = Date.now() - cacheTimestamp;
    if (!forceRefresh && cachedPayload && cacheAge < CACHE_TTL_MS) {
      const res = NextResponse.json(cachedPayload);
      res.headers.set('X-Cache', 'HIT');
      res.headers.set('X-Cache-Age', String(Math.round(cacheAge / 1000)));
      return res;
    }

    // ── Cache miss - three parallel Firestore queries ───────────────────────
    //
    // Query A: lightweight scan of ALL users for stats
    //   - only small fields: no training/test data
    //
    // Query B: full docs for the 100 most recently active users (table)
    //
    // Query C: analytics/shares doc
    //
    const db = getAdminDb();

    const [lightSnap, fullSnap, sharesDoc, referralVisitsDoc] = await Promise.all([
      db.collection('users')
        .select('selectedState', 'lastUpdated', 'activeDates', 'subscription', 'createdAt', 'referredBy', 'referralQualifiedAt', 'referredAt', 'qualifiedReferralCount', 'referralCount')
        .get(),
      db.collection('users')
        .orderBy('lastUpdated', 'desc')
        .limit(100)
        .get(),
      db.doc('analytics/shares').get(),
      db.doc('analytics/referralVisits').get(),
    ]);

    // ── Aggregate stats from ALL users ─────────────────────────────────────
    const stateCounts: Record<string, number> = {};
    let payingUsers = 0;
    let newUsers7d = 0;
    const usersForDau: { activeDates: string[]; lastUpdated: string | null }[] = [];
    const signupDates: string[] = [];
    // Per-user data for advanced charts
    const userRecords: { activeDates: string[]; lastUpdated: string | null; state: string | null; signupDate: string | null }[] = [];
    // Referral aggregates.
    //
    // Counts are computed from the *inviter side* (`referralCount`,
    // `qualifiedReferralCount` on each user). Those fields are written by
    // atomic merged transactions in /api/referrals/{claim,qualify} and have
    // never been clobbered, so they're accurate even for historical data.
    // The referee-side `referredBy` field used to get wiped by the signup
    // race fixed in the prior commit, so summing it would undercount.
    let referredUsers = 0;
    let qualifiedReferredUsers = 0;
    const referredSignupDates: string[] = []; // per-day chart bucket dates
    const referrerCounts: Record<string, number> = {}; // ownerUid → qualified count

    const now = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now); d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    });
    const prev7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now); d.setDate(d.getDate() - 7 - i);
      return d.toISOString().split('T')[0];
    });
    const sevenDaysAgo = new Date(now); sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const fourteenDaysAgo = new Date(now); fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    // Build 30-day date range for chart computations
    const last30Dates = Array.from({ length: 30 }, (_, i) => {
      const d = new Date(now); d.setDate(d.getDate() - (29 - i));
      return d.toISOString().split('T')[0];
    });

    lightSnap.docs.forEach((doc) => {
      const data = doc.data() as Record<string, unknown>;
      const state = data.selectedState as string | null;
      if (state) stateCounts[state] = (stateCounts[state] || 0) + 1;
      if ((data.subscription as Record<string, unknown>)?.isPremium === true) payingUsers++;

      // Determine signup date: createdAt > earliest activeDates > lastUpdated
      const activeDates = (data.activeDates as string[]) || [];
      const createdAt = data.createdAt as string | null;
      const lastUpdated = (data.lastUpdated as string) || null;
      const signupDate = createdAt?.split('T')[0]
        || (activeDates.length > 0 ? [...activeDates].sort()[0] : null)
        || lastUpdated?.split('T')[0]
        || null;

      if (signupDate) {
        signupDates.push(signupDate);
        if (new Date(signupDate) >= sevenDaysAgo) newUsers7d++;
      }

      usersForDau.push({ activeDates, lastUpdated });
      userRecords.push({ activeDates, lastUpdated, state, signupDate });

      // Inviter-side counters (accurate; see comment above the aggregates).
      const inviterReferralCount = (data.referralCount as number) || 0;
      const inviterQualifiedCount = (data.qualifiedReferralCount as number) || 0;
      if (inviterReferralCount > 0) referredUsers += inviterReferralCount;
      if (inviterQualifiedCount > 0) {
        qualifiedReferredUsers += inviterQualifiedCount;
        referrerCounts[doc.id] = inviterQualifiedCount;
      }

      // Per-day chart bucket: prefer the actual `referredAt` stamp; fall back
      // to `createdAt` (≈ signup date) for the historical cohort whose
      // referredAt was wiped by the pre-fix saveToFirestore. Only consider
      // referees (users with `referredBy` set).
      const referredBy = data.referredBy as string | null;
      if (referredBy) {
        const referredAtRaw = data.referredAt as { toDate?: () => Date } | string | null;
        const referredAtIso =
          typeof referredAtRaw === 'string'
            ? referredAtRaw
            : referredAtRaw && typeof referredAtRaw.toDate === 'function'
              ? referredAtRaw.toDate().toISOString()
              : null;
        const bucketDay = referredAtIso?.split('T')[0]
          || (createdAt as string | null)?.split('T')[0]
          || null;
        if (bucketDay) referredSignupDates.push(bucketDay);
      }
    });

    // ── Build user list from top-100 full docs ─────────────────────────────
    const users = fullSnap.docs.map(doc => {
      const data = doc.data() as Record<string, unknown>;
      const stats = processFullDoc(data);
      return {
        uid: doc.id,
        email: (data.email as string) || '',
        selectedState: (data.selectedState as string) || null,
        lastUpdated: (data.lastUpdated as string) || null,
        createdAt: (data.createdAt as string) || null,
        testsCompleted: stats.testsCompleted,
        trainingQuestionsAnswered: stats.trainingQuestionsAnswered,
        testQuestionsAnswered: stats.testQuestionsAnswered,
        isPremium: stats.isPremium,
      };
    });

    const totalUsers = lightSnap.size;
    const dailyActiveUsers = calculateDailyActiveUsers(usersForDau);

    const activeUsers7d = usersForDau.filter(u => {
      if (u.activeDates.length > 0) return u.activeDates.some(d => last7Days.includes(d));
      if (u.lastUpdated) return new Date(u.lastUpdated) >= sevenDaysAgo;
      return false;
    }).length;

    const activeUsersPrev7d = usersForDau.filter(u => {
      if (u.activeDates.length > 0) return u.activeDates.some(d => prev7Days.includes(d));
      if (u.lastUpdated) {
        const lu = new Date(u.lastUpdated);
        return lu >= fourteenDaysAgo && lu < sevenDaysAgo;
      }
      return false;
    }).length;

    // ── Chart data ─────────────────────────────────────────────────────────

    // Helper: is user active on a given date?
    function isActiveOnDate(u: { activeDates: string[]; lastUpdated: string | null }, dateStr: string) {
      if (u.activeDates.length > 0) return u.activeDates.includes(dateStr);
      if (u.lastUpdated) {
        const luDate = u.lastUpdated.split('T')[0];
        return luDate === dateStr;
      }
      return false;
    }

    // 1. Cumulative total users
    const sortedSignups = [...signupDates].sort();
    const dailyCumulativeUsers = last30Dates.map(dateStr => ({
      date: dateStr,
      count: sortedSignups.filter(d => d <= dateStr).length,
      displayDate: new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    }));

    // 2. Weekly retention (8 weeks: what % of week N users returned in week N+1)
    const weeklyRetention = (() => {
      const weeks: string[][] = [];
      for (let w = 7; w >= 0; w--) {
        const weekDates: string[] = [];
        for (let d = 0; d < 7; d++) {
          const date = new Date(now);
          date.setDate(date.getDate() - (w * 7 + (6 - d)));
          weekDates.push(date.toISOString().split('T')[0]);
        }
        weeks.push(weekDates);
      }

      const result: { displayDate: string; count: number }[] = [];
      for (let i = 0; i < weeks.length - 1; i++) {
        const thisWeek = weeks[i];
        const nextWeek = weeks[i + 1];
        const activeThisWeek = userRecords.filter(u =>
          thisWeek.some(d => isActiveOnDate(u, d))
        );
        if (activeThisWeek.length === 0) {
          result.push({
            displayDate: new Date(thisWeek[0] + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            count: 0,
          });
          continue;
        }
        const retained = activeThisWeek.filter(u =>
          nextWeek.some(d => isActiveOnDate(u, d))
        );
        result.push({
          displayDate: new Date(thisWeek[0] + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          count: Math.round((retained.length / activeThisWeek.length) * 100),
        });
      }
      return result;
    })();

    // 3. By State - top 5 states daily active users
    const top5States = Object.entries(stateCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([code]) => code);

    const dailyByState = last30Dates.map(dateStr => {
      const entry: Record<string, unknown> = {
        displayDate: new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      };
      for (const stateCode of top5States) {
        entry[stateCode] = userRecords.filter(u =>
          u.state === stateCode && isActiveOnDate(u, dateStr)
        ).length;
      }
      return entry;
    });

    // 4. New vs Returning daily
    const dailyNewVsReturning = last30Dates.map(dateStr => {
      let newCount = 0;
      let returningCount = 0;
      for (const u of userRecords) {
        if (!isActiveOnDate(u, dateStr)) continue;
        if (u.signupDate === dateStr) {
          newCount++;
        } else {
          returningCount++;
        }
      }
      return {
        displayDate: new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        new: newCount,
        returning: returningCount,
      };
    });

    const sharesData = sharesDoc.exists ? sharesDoc.data() : null;

    // Referral charts: daily count of new referred signups (last 30 days)
    const dailyReferredSignups = last30Dates.map((dateStr) => ({
      date: dateStr,
      count: referredSignupDates.filter((d) => d === dateStr).length,
      displayDate: new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    }));

    // Top-of-funnel referral visits (written by /api/referrals/track-visit on
    // every ?ref= landing). Independent of whether the visitor signs up.
    const referralVisitsData = referralVisitsDoc.exists ? referralVisitsDoc.data() : null;
    const referralVisitsDaily = (referralVisitsData?.daily as Record<string, number>) || {};
    const referralVisitsValidDaily = (referralVisitsData?.validDaily as Record<string, number>) || {};
    const dailyReferralVisits = last30Dates.map((dateStr) => {
      const total = referralVisitsDaily[dateStr] || 0;
      const valid = referralVisitsValidDaily[dateStr] || 0;
      return {
        date: dateStr,
        count: total,
        validCount: valid,
        invalidCount: Math.max(0, total - valid),
        displayDate: new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      };
    });

    // Top referrers, sorted by qualified count desc
    const topReferrers = Object.entries(referrerCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([uid, count]) => ({ uid, qualifiedCount: count }));

    const payload = {
      users,
      dailyActiveUsers,
      dailyCumulativeUsers,
      weeklyRetention,
      dailyByState,
      dailyNewVsReturning,
      top5States,
      dailyReferredSignups,
      dailyReferralVisits,
      topReferrers,
      totalUsers,
      stats: {
        totalUsers,
        usersWithState: Object.values(stateCounts).reduce((a, b) => a + b, 0),
        byState: stateCounts,
        activeUsers7d,
        activeUsersPrev7d,
        newUsers7d,
        payingUsers,
        totalShareClicks: (sharesData?.total as number) || 0,
        shareClicksDaily: (sharesData?.daily as Record<string, number>) || {},
        referredUsers,
        qualifiedReferredUsers,
        totalReferralVisits: (referralVisitsData?.total as number) || 0,
        totalValidReferralVisits: (referralVisitsData?.validTotal as number) || 0,
        referralVisitsDaily,
      },
    };

    cachedPayload = payload;
    cacheTimestamp = Date.now();

    const res = NextResponse.json(payload);
    res.headers.set('Cache-Control', 'private, max-age=120');
    res.headers.set('X-Cache', 'MISS');
    return res;

  } catch (error) {
    console.error('[admin/users]', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}
