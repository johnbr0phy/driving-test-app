import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { isAdminEmail } from '@/lib/admin';

// ─── Server-side in-memory cache ───────────────────────────────────────────
// Vercel keeps warm instances alive ~15-30 min. This means subsequent loads
// return in <100ms instead of hitting Firebase every time.
const CACHE_TTL_MS = 120_000; // 2 minutes
let cachedPayload: Record<string, unknown> | null = null;
let cacheTimestamp = 0;

// ─── Firestore document processor ──────────────────────────────────────────
function processFirestoreDoc(data: Record<string, unknown>) {
  const training = (data.training || {}) as Record<string, unknown>;
  const onboardingMastered = (training.masteredQuestionIds || []) as unknown[];

  const trainingSets = (data.trainingSets || {}) as Record<string, Record<string, unknown>>;
  let trainingQuestionsAnswered = onboardingMastered.length;
  for (const setId of [1, 2, 3, 4]) {
    const setData = trainingSets[setId] || {};
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
    activeDates: (data.activeDates || []) as string[],
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

    return { date: dateStr, count, displayDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) };
  });
}

// ─── Route handler ──────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  try {
    // Auth check
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

    // ── Cache miss — fetch from Firebase ──────────────────────────────────
    // No auth.listUsers() — email not displayed in the table, and it's the
    // slowest call (~3-6s). Sort by lastUpdated (Firestore) instead.
    const db = getAdminDb();
    const [usersSnapshot, sharesDoc] = await Promise.all([
      db.collection('users').get(),
      db.doc('analytics/shares').get(),
    ]);

    const stateCounts: Record<string, number> = {};
    let totalTrainingQuestions = 0;
    let totalTestQuestions = 0;
    let totalTestsCompleted = 0;
    let payingUsers = 0;
    const usersForDau: { activeDates: string[]; lastUpdated: string | null }[] = [];

    const users = usersSnapshot.docs.map(doc => {
      const data = doc.data() as Record<string, unknown>;
      const stats = processFirestoreDoc(data);

      const selectedState = (data.selectedState as string) || null;
      const lastUpdated = (data.lastUpdated as string) || null;
      const createdAt = (data.createdAt as string) || null;

      if (selectedState) stateCounts[selectedState] = (stateCounts[selectedState] || 0) + 1;
      totalTrainingQuestions += stats.trainingQuestionsAnswered;
      totalTestQuestions += stats.testQuestionsAnswered;
      totalTestsCompleted += stats.testsCompleted;
      if (stats.isPremium) payingUsers++;
      usersForDau.push({ activeDates: stats.activeDates, lastUpdated });

      return {
        uid: doc.id,
        email: (data.email as string) || '',
        selectedState,
        lastUpdated,
        createdAt,
        testsCompleted: stats.testsCompleted,
        trainingQuestionsAnswered: stats.trainingQuestionsAnswered,
        testQuestionsAnswered: stats.testQuestionsAnswered,
        isPremium: stats.isPremium,
      };
    });

    // Sort newest first by lastUpdated (no Auth SDK needed)
    users.sort((a, b) => {
      if (!a.lastUpdated) return 1;
      if (!b.lastUpdated) return -1;
      return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    });

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
      stats: {
        totalUsers: users.length,
        usersWithState: Object.values(stateCounts).reduce((a, b) => a + b, 0),
        byState: stateCounts,
        totalQuestionsAnswered,
        totalTrainingQuestions,
        totalTestQuestions,
        activeUsers7d,
        totalTestsCompleted,
        avgQuestionsPerUser: users.length > 0 ? Math.round(totalQuestionsAnswered / users.length) : 0,
        payingUsers,
        totalShareClicks: (sharesData?.total as number) || 0,
        shareClicksDaily: (sharesData?.daily as Record<string, number>) || {},
      },
    };

    // Store in cache
    cachedPayload = payload;
    cacheTimestamp = Date.now();

    const res = NextResponse.json(payload);
    res.headers.set('Cache-Control', 'private, max-age=120');
    res.headers.set('X-Cache', 'MISS');
    return res;

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}
