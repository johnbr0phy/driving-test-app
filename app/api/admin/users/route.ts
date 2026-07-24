import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { isAdminEmail } from '@/lib/admin';
import { computeAnswersByDay } from '@/lib/server/answersByDay';
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

// ─── Conversion paywall: which paywall a premium user converted through ─────
// Best available attribution: the paywall the user last hit before purchase
// (per-key `lastAt` timestamps). If no hit precedes the purchase (or the
// purchase time is unknown), fall back to the earliest recorded hit.
function deriveConvertedPaywall(data: Record<string, unknown>) {
  const sub = (data.subscription || {}) as Record<string, unknown>;
  if (sub.isPremium !== true) return null;

  const hits = (data.paywallHits || {}) as Record<string, Record<string, unknown>>;
  const entries = Object.entries(hits)
    .map(([key, rec]) => ({
      key,
      label: ((rec?.label as string) || key),
      location: ((rec?.location as string) || key.split(':')[0]),
      lastAt: typeof rec?.lastAt === 'string' ? Date.parse(rec.lastAt as string) : NaN,
    }))
    .filter((e) => !Number.isNaN(e.lastAt));
  if (entries.length === 0) return null;

  const purchasedAtMs = typeof sub.purchasedAt === 'string' ? Date.parse(sub.purchasedAt as string) : NaN;
  const before = Number.isNaN(purchasedAtMs)
    ? entries
    : entries.filter((e) => e.lastAt <= purchasedAtMs);

  const pick = before.length > 0
    ? before.reduce((a, b) => (b.lastAt > a.lastAt ? b : a))
    : entries.reduce((a, b) => (b.lastAt < a.lastAt ? b : a));
  return { key: pick.key, label: pick.label, location: pick.location };
}

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

  // Super Amazing Mode: `enabled` comes from the synced toggle; eligibility
  // (8/8: 4 training sets mastered + 4 tests at 80%+) is recomputed from full
  // progress so it's correct even for users who haven't saved since the
  // denormalized _stats flag shipped.
  const samState = (data.selectedState as string) || 'CA';
  const testAttempts = (data.testAttempts || []) as Record<string, unknown>[];
  let superAmazingEligible = [1, 2, 3, 4].every((setId) => {
    const setData = trainingSets[String(setId)] || trainingSets[setId as unknown as string] || {};
    let mastered = ((setData.masteredIds as unknown[]) || []).length;
    if (setId === 1 && mastered === 0) {
      mastered = Math.min(50, (training.totalCorrectAllTime as number) || 0);
    }
    return mastered >= 50;
  });
  if (superAmazingEligible) {
    superAmazingEligible = [1, 2, 3, 4].every((testNum) =>
      testAttempts.some(
        (a) => a.testNumber === testNum && a.state === samState && ((a.bestScore as number) || 0) >= 40,
      ),
    );
  }

  return {
    testsCompleted: completedTests.length,
    trainingQuestionsAnswered,
    testQuestionsAnswered,
    isPremium: (data.subscription as Record<string, unknown>)?.isPremium === true,
    convertedPaywall: deriveConvertedPaywall(data),
    stateResults,
    superAmazingEligible,
    superAmazingEnabled: ((data.superAmazing || {}) as Record<string, unknown>).enabled === true,
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

// ─── Time-series bucketing helpers ──────────────────────────────────────────
// Each builder turns a `{ 'YYYY-MM-DD': count }` map into a chart-ready series
// at day / week / month granularity.
function fmtDay(dateStr: string) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function dayBuckets(countsByDay: Record<string, number>, days: number) {
  const now = new Date();
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(now); d.setDate(d.getDate() - (days - 1 - i));
    const dateStr = d.toISOString().split('T')[0];
    return { date: dateStr, displayDate: fmtDay(dateStr), count: countsByDay[dateStr] || 0 };
  });
}

function weekBuckets(countsByDay: Record<string, number>, weeks: number) {
  const now = new Date();
  return Array.from({ length: weeks }, (_, i) => {
    const start = new Date(now);
    start.setDate(start.getDate() - ((weeks - 1 - i) * 7 + 6));
    const startStr = start.toISOString().split('T')[0];
    let count = 0;
    for (let d = 0; d < 7; d++) {
      const day = new Date(start); day.setDate(day.getDate() + d);
      count += countsByDay[day.toISOString().split('T')[0]] || 0;
    }
    return { date: startStr, displayDate: fmtDay(startStr), count };
  });
}

function monthBuckets(countsByDay: Record<string, number>, months: number) {
  const now = new Date();
  return Array.from({ length: months }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (months - 1 - i), 1);
    const prefix = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    let count = 0;
    for (const [ds, c] of Object.entries(countsByDay)) {
      if (ds.startsWith(prefix)) count += c;
    }
    return {
      date: prefix,
      displayDate: d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      count,
    };
  });
}

function buildSeries(countsByDay: Record<string, number>) {
  return {
    day: dayBuckets(countsByDay, 30),
    week: weekBuckets(countsByDay, 12),
    month: monthBuckets(countsByDay, 12),
  };
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

    const [lightSnap, fullSnap, sharesDoc, paywallsDoc, questionsDoc] = await Promise.all([
      db.collection('users')
        .select('selectedState', 'lastUpdated', 'activeDates', 'subscription', 'createdAt', 'paywallHits', '_stats', 'superAmazing')
        .get(),
      db.collection('users')
        .orderBy('lastUpdated', 'desc')
        .limit(100)
        .get(),
      db.doc('analytics/shares').get(),
      db.doc('analytics/paywalls').get(),
      db.doc('analytics/questions').get(),
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
    // Super Amazing Mode adoption across ALL users. Eligibility comes from
    // the denormalized _stats flag (written on client save, so it only covers
    // users who saved since it shipped); enabled/ever-enabled come from the
    // synced toggle itself.
    let samEligibleUsers = 0;
    let samEnabledUsers = 0;
    let samEverEnabledUsers = 0;
    // All-time questions answered, summed from every user's denormalized
    // _stats counters (written on each client save).
    let totalQuestionsAnswered = 0;
    const usersForDau: { activeDates: string[]; lastUpdated: string | null }[] = [];
    const signupDates: string[] = [];
    // Per-paywall attribution: distinct logged-in users who hit it, and how
    // many of those became premium.
    const paywallConversion: Record<string, { label: string; location: string; uniqueUsers: number; converted: number }> = {};

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

    lightSnap.docs.forEach((doc) => {
      const data = doc.data() as Record<string, unknown>;
      const state = data.selectedState as string | null;
      if (state) stateCounts[state] = (stateCounts[state] || 0) + 1;
      const isPremium = (data.subscription as Record<string, unknown>)?.isPremium === true;
      if (isPremium) payingUsers++;

      const denormStats = (data._stats || {}) as Record<string, unknown>;
      totalQuestionsAnswered +=
        ((denormStats.trainingQuestionsAnswered as number) || 0) +
        ((denormStats.testQuestionsAnswered as number) || 0);

      const sam = (data.superAmazing || {}) as Record<string, unknown>;
      if (denormStats.superAmazingEligible === true) samEligibleUsers++;
      if (sam.enabled === true) samEnabledUsers++;
      if (typeof sam.firstEnabledAt === 'string') samEverEnabledUsers++;

      // Attribute this user's paywall hits for conversion-by-paywall stats.
      const userPaywallHits = (data.paywallHits || {}) as Record<string, Record<string, unknown>>;
      for (const [key, rec] of Object.entries(userPaywallHits)) {
        if (!rec || typeof rec.count !== 'number' || rec.count <= 0) continue;
        const agg = (paywallConversion[key] ||= {
          label: (rec.label as string) || key,
          location: (rec.location as string) || key.split(':')[0],
          uniqueUsers: 0,
          converted: 0,
        });
        agg.uniqueUsers++;
        if (isPremium) agg.converted++;
      }

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
    });

    // ── Build user list from top-100 full docs + aggregate pass-by-state ──
    const passByStateAgg: Record<string, { passed: number; failed: number }> = {};
    const sampleQuestionsByDay: Record<string, number> = {};
    const users = fullSnap.docs.map(doc => {
      const data = doc.data() as Record<string, unknown>;
      const stats = processFullDoc(data);
      for (const [code, r] of Object.entries(stats.stateResults)) {
        const bucket = (passByStateAgg[code] ||= { passed: 0, failed: 0 });
        bucket.passed += r.passed;
        bucket.failed += r.failed;
      }
      for (const [day, count] of Object.entries(computeAnswersByDay(data))) {
        sampleQuestionsByDay[day] = (sampleQuestionsByDay[day] || 0) + count;
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
        convertedPaywall: stats.convertedPaywall,
        superAmazingEligible: stats.superAmazingEligible,
        superAmazingEnabled: stats.superAmazingEnabled,
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

    // New users over time (day / week / month), bucketed from signup dates.
    const signupsByDay: Record<string, number> = {};
    for (const d of signupDates) signupsByDay[d] = (signupsByDay[d] || 0) + 1;
    const newUsersSeries = buildSeries(signupsByDay);

    // Questions answered over time, from the persistent analytics/questions
    // aggregate (incremented as answers happen; covers ALL users, guests
    // included). Until the history backfill has completed — the admin page
    // triggers /api/admin/backfill-questions when it sees the pending flag —
    // splice in the legacy top-100 sample so the chart is never blank.
    // Per-day max (not sum) because both sources count the same answers.
    const questionsData = questionsDoc.exists
      ? (questionsDoc.data() as Record<string, unknown>)
      : undefined;
    const aggregateQuestionsDaily = (questionsData?.daily as Record<string, number>) || {};
    const questionsBackfillPending = !questionsData?.backfilledAt;
    let questionsDaily = aggregateQuestionsDaily;
    if (questionsBackfillPending) {
      questionsDaily = { ...sampleQuestionsByDay };
      for (const [day, count] of Object.entries(aggregateQuestionsDaily)) {
        questionsDaily[day] = Math.max(questionsDaily[day] || 0, count);
      }
    }
    const questionsAnsweredSeries = buildSeries(questionsDaily);

    const sharesData = sharesDoc.exists ? sharesDoc.data() : null;

    // ── Paywall stats: total hits (aggregate, incl. guests) merged with
    //    per-user conversion attribution ──────────────────────────────────────
    const paywallsData = paywallsDoc.exists ? paywallsDoc.data() : null;
    const byPaywall = (paywallsData?.byPaywall || {}) as Record<
      string,
      { total?: number; label?: string; location?: string }
    >;
    const paywallKeys = new Set([
      ...Object.keys(byPaywall),
      ...Object.keys(paywallConversion),
    ]);
    const paywallStats = Array.from(paywallKeys)
      .map((key) => {
        const meta = byPaywall[key] || {};
        const conv = paywallConversion[key];
        const uniqueUsers = conv?.uniqueUsers || 0;
        const converted = conv?.converted || 0;
        return {
          key,
          label: meta.label || conv?.label || key,
          location: meta.location || conv?.location || key.split(':')[0],
          totalHits: meta.total || 0,
          uniqueUsers,
          converted,
          conversionRate: uniqueUsers > 0 ? converted / uniqueUsers : 0,
        };
      })
      .sort((a, b) => b.totalHits - a.totalHits);

    // Paywall views over time (day / week / month) from the aggregate daily map.
    const paywallDaily = (paywallsData?.daily || {}) as Record<string, number>;
    const paywallViewsSeries = buildSeries(paywallDaily);

    const payload = {
      users,
      dailyActiveUsers,
      newUsersSeries,
      paywallViewsSeries,
      questionsAnsweredSeries,
      questionsBackfillPending,
      totalUsers,
      stats: {
        totalUsers,
        usersWithState: Object.values(stateCounts).reduce((a, b) => a + b, 0),
        byState: stateCounts,
        activeUsers7d,
        activeUsersPrev7d,
        newUsers7d,
        payingUsers,
        totalQuestionsAnswered,
        superAmazing: {
          eligibleUsers: samEligibleUsers,
          enabledUsers: samEnabledUsers,
          everEnabledUsers: samEverEnabledUsers,
        },
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
      paywallStats,
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
