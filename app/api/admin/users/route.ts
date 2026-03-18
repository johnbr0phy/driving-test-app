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

    // ── Cache miss — three parallel Firestore queries ───────────────────────
    //
    // Query A: lightweight scan of ALL users for stats
    //   — uses _stats counters (denormalized on save) for question/test counts
    //   — falls back to processFullDoc for users without _stats
    //
    // Query B: full docs for the 100 most recently active users (table)
    //
    // Query C: analytics/shares doc
    //
    const db = getAdminDb();

    const [lightSnap, fullSnap, sharesDoc] = await Promise.all([
      db.collection('users')
        .select(
          'selectedState', 'lastUpdated', 'activeDates', 'subscription', '_stats'
        )
        .get(),
      db.collection('users')
        .orderBy('lastUpdated', 'desc')
        .limit(100)
        .get(),
      db.doc('analytics/shares').get(),
    ]);

    // ── Aggregate stats from ALL users ─────────────────────────────────────
    const stateCounts: Record<string, number> = {};
    let payingUsers = 0;
    let totalTrainingQuestions = 0;
    let totalTestQuestions = 0;
    let totalTestsCompleted = 0;
    const usersForDau: { activeDates: string[]; lastUpdated: string | null }[] = [];
    // Track users missing _stats so we can compute from full docs
    const usersNeedingFullStats = new Set<string>();

    lightSnap.docs.forEach((doc) => {
      const data = doc.data() as Record<string, unknown>;
      const state = data.selectedState as string | null;
      if (state) stateCounts[state] = (stateCounts[state] || 0) + 1;
      if ((data.subscription as Record<string, unknown>)?.isPremium === true) payingUsers++;

      const stats = data._stats as Record<string, number> | undefined;
      if (stats) {
        totalTrainingQuestions += stats.trainingQuestionsAnswered || 0;
        totalTestQuestions += stats.testQuestionsAnswered || 0;
        totalTestsCompleted += stats.testsCompleted || 0;
      } else {
        usersNeedingFullStats.add(doc.id);
      }

      usersForDau.push({
        activeDates: (data.activeDates as string[]) || [],
        lastUpdated: (data.lastUpdated as string) || null,
      });
    });

    // ── Build user list from top-100 full docs ─────────────────────────────
    // Also backfill stats for users that don't have _stats yet
    const users = fullSnap.docs.map(doc => {
      const data = doc.data() as Record<string, unknown>;
      const stats = processFullDoc(data);

      // Backfill aggregate totals for users missing _stats
      if (usersNeedingFullStats.has(doc.id)) {
        totalTrainingQuestions += stats.trainingQuestionsAnswered;
        totalTestQuestions += stats.testQuestionsAnswered;
        totalTestsCompleted += stats.testsCompleted;
        usersNeedingFullStats.delete(doc.id);
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

    const totalUsers = lightSnap.size;
    const dailyActiveUsers = calculateDailyActiveUsers(usersForDau);

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(); d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    });
    const sevenDaysAgo = new Date(); sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const activeUsers7d = usersForDau.filter(u => {
      if (u.activeDates.length > 0) return u.activeDates.some(d => last7Days.includes(d));
      if (u.lastUpdated) return new Date(u.lastUpdated) >= sevenDaysAgo;
      return false;
    }).length;

    const totalQuestionsAnswered = totalTrainingQuestions + totalTestQuestions;
    const sharesData = sharesDoc.exists ? sharesDoc.data() : null;

    const payload = {
      users,
      dailyActiveUsers,
      totalUsers,
      stats: {
        totalUsers,
        usersWithState: Object.values(stateCounts).reduce((a, b) => a + b, 0),
        byState: stateCounts,
        totalQuestionsAnswered,
        totalTrainingQuestions,
        totalTestQuestions,
        activeUsers7d,
        totalTestsCompleted,
        avgQuestionsPerUser: totalUsers > 0 ? Math.round(totalQuestionsAnswered / totalUsers) : 0,
        payingUsers,
        totalShareClicks: (sharesData?.total as number) || 0,
        shareClicksDaily: (sharesData?.daily as Record<string, number>) || {},
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
