import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { isAdminEmail } from '@/lib/admin';
import { states } from '@/data/states';

const STATE_PASS_PCT: Record<string, number> = states.reduce(
  (acc, s) => {
    acc[s.code] = s.passingScore;
    return acc;
  },
  {} as Record<string, number>,
);

function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

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

  // Per-state pass/fail tally across this user's completed tests
  const stateResults: Record<string, { passed: number; failed: number }> = {};
  for (const test of completedTests) {
    const stateCode = test.state as string | undefined;
    if (!stateCode) continue;
    const passPct = STATE_PASS_PCT[stateCode];
    if (passPct == null) continue; // skip CDL / unknown
    const total = (test.totalQuestions as number) || 50;
    let score = test.score as number | undefined;
    if (score == null) {
      // Fall back to counting correct answers
      const answers = (test.answers || []) as Record<string, unknown>[];
      score = answers.filter((a) => a.isCorrect === true).length;
    }
    if (total <= 0) continue;
    const pct = (score / total) * 100;
    const bucket = (stateResults[stateCode] ||= { passed: 0, failed: 0 });
    if (pct >= passPct) bucket.passed++;
    else bucket.failed++;
  }

  return {
    testsCompleted: completedTests.length,
    trainingQuestionsAnswered,
    testQuestionsAnswered,
    isPremium: (data.subscription as Record<string, unknown>)?.isPremium === true,
    stateResults,
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

    const [lightSnap, fullSnap, sharesDoc] = await Promise.all([
      db.collection('users')
        .select('selectedState', 'lastUpdated', 'activeDates', 'subscription', 'createdAt')
        .get(),
      db.collection('users')
        .orderBy('lastUpdated', 'desc')
        .limit(100)
        .get(),
      db.doc('analytics/shares').get(),
    ]);

    // ── Conversion stats: time from signup → purchase ──────────────────────
    // `createdAt` is sparsely populated (older accounts predate it), so we
    // fall back to the earliest activeDate or lastUpdated as a signup proxy.
    // This keeps the conversion card meaningful instead of stuck at 0.0%.
    const daysToPurchase: number[] = [];
    lightSnap.docs.forEach((doc) => {
      const data = doc.data() as Record<string, unknown>;
      const createdAt = data.createdAt as string | undefined;
      const activeDatesRaw = (data.activeDates as string[]) || [];
      const lastUpdated = data.lastUpdated as string | undefined;
      const signupISO =
        createdAt ||
        (activeDatesRaw.length > 0
          ? [...activeDatesRaw].sort()[0] + 'T00:00:00.000Z'
          : undefined) ||
        lastUpdated;
      const sub = (data.subscription || {}) as Record<string, unknown>;
      const purchasedAt = sub.purchasedAt as string | undefined;
      if (signupISO && purchasedAt) {
        const ms = new Date(purchasedAt).getTime() - new Date(signupISO).getTime();
        if (ms >= 0) daysToPurchase.push(ms / (1000 * 60 * 60 * 24));
      }
    });

    // ── Aggregate stats from ALL users ─────────────────────────────────────
    const stateCounts: Record<string, number> = {};
    let payingUsers = 0;
    let newUsers7d = 0;
    const usersForDau: { activeDates: string[]; lastUpdated: string | null }[] = [];
    const signupDates: string[] = [];
    // Per-user data for advanced charts
    const userRecords: { activeDates: string[]; lastUpdated: string | null; state: string | null; signupDate: string | null }[] = [];

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
    });

    // ── Build user list from top-100 full docs + aggregate pass-by-state ──
    const passByStateAgg: Record<string, { passed: number; failed: number }> = {};
    const users = fullSnap.docs.map(doc => {
      const data = doc.data() as Record<string, unknown>;
      const stats = processFullDoc(data);
      for (const [code, r] of Object.entries(stats.stateResults)) {
        const bucket = (passByStateAgg[code] ||= { passed: 0, failed: 0 });
        bucket.passed += r.passed;
        bucket.failed += r.failed;
      }
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

    const passRateByState = Object.entries(passByStateAgg)
      .map(([code, r]) => {
        const attempts = r.passed + r.failed;
        return {
          code,
          attempts,
          passed: r.passed,
          passRate: attempts > 0 ? r.passed / attempts : 0,
        };
      })
      .sort((a, b) => b.attempts - a.attempts);

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

    const payload = {
      users,
      dailyActiveUsers,
      dailyCumulativeUsers,
      weeklyRetention,
      dailyByState,
      dailyNewVsReturning,
      top5States,
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
        conversion: {
          paidCount: payingUsers,
          baselineUsers: totalUsers,
          conversionRate: totalUsers > 0 ? payingUsers / totalUsers : 0,
          medianDaysToPurchase: median(daysToPurchase),
          purchasesWithKnownSignup: daysToPurchase.length,
        },
      },
      passRateByState,
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
