import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { requireAdmin } from '@/lib/server/adminAuth';
import { cachedAdminPayload, cachedJson, wantsRefresh } from '@/lib/server/adminCache';
import { getInternalUids } from '@/lib/server/internalUsers';
import { states } from '@/data/states';
import { resolveUserExamId } from '@/lib/email-voice';
import { getCatalogEntry, getCatalogEntryByPath } from '@/lib/testCatalog';

const STATE_PASS_PCT: Record<string, number> = states.reduce(
  (acc, s) => {
    acc[s.code] = s.passingScore;
    return acc;
  },
  {} as Record<string, number>,
);

// The payload is kept in lib/server/adminCache: fresh for two minutes, and
// an older copy is served at once while a rebuild runs after the response.
export const maxDuration = 60;

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

// ─── Which test an account signed up for ──────────────────────────────────
// The test page their first visit landed on (signupOrigins/{uid}.landing)
// when it names one, else their current test (primaryExam, then whatever
// their progress points at). Landings on the homepage or hub fall back.
function signupTest(data: Record<string, unknown>, landing: string | null) {
  const fromLanding = landing ? getCatalogEntryByPath(landing) : null;
  const entry = fromLanding && fromLanding.id !== 'dmv'
    ? fromLanding
    : getCatalogEntry(resolveUserExamId(data));
  return {
    id: entry?.id ?? 'dmv',
    name: entry?.shortName ?? 'DMV',
    source: fromLanding && fromLanding.id !== 'dmv' ? ('landing' as const) : ('current' as const),
  };
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

// ─── Route handler ──────────────────────────────────────────────────────────
// The Users tab on /admin: the 100 most recently active accounts, DMV pass
// rate by state from those accounts, and Super Amazing adoption. Everything
// trend- or revenue-shaped lives on the Growth and Opportunities tabs.
export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  try {
    const { payload, cache, at } = await cachedAdminPayload({
      key: 'users',
      ttlMs: 2 * 60_000,
      staleMs: 24 * 3_600_000,
      refresh: wantsRefresh(request),
      build: buildUsers,
    });
    return cachedJson(payload, cache, at);
  } catch (error) {
    console.error('[admin/users]', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 },
    );
  }
}

async function buildUsers() {
  // Query A: a light scan of every user for the Super Amazing counts.
  // Query B: full docs for the 100 most recently active users (the table).
  const db = getAdminDb();
  const [lightSnapRaw, fullSnapRaw, internalUids] = await Promise.all([
    db.collection('users').select('_stats', 'superAmazing').get(),
    db.collection('users').orderBy('lastUpdated', 'desc').limit(100).get(),
    getInternalUids(),
  ]);
  // Internal accounts (lib/internal) are left out of every stat and the table.
  const lightDocs = lightSnapRaw.docs.filter((d) => !internalUids.has(d.id));
  const fullDocs = fullSnapRaw.docs.filter((d) => !internalUids.has(d.id));

  // Super Amazing Mode adoption across ALL users. Eligibility comes from
  // the denormalized _stats flag (written on client save, so it only covers
  // users who saved since it shipped); enabled/ever-enabled come from the
  // synced toggle itself.
  const superAmazing = { eligibleUsers: 0, enabledUsers: 0, everEnabledUsers: 0 };
  for (const doc of lightDocs) {
    const data = doc.data() as Record<string, unknown>;
    const sam = (data.superAmazing || {}) as Record<string, unknown>;
    if (((data._stats || {}) as Record<string, unknown>).superAmazingEligible === true) superAmazing.eligibleUsers++;
    if (sam.enabled === true) superAmazing.enabledUsers++;
    if (typeof sam.firstEnabledAt === 'string') superAmazing.everEnabledUsers++;
  }

  // Signup landings for the table's accounts, read in one batch.
  const originSnaps = fullDocs.length
    ? await db.getAll(...fullDocs.map((d) => db.doc(`signupOrigins/${d.id}`)))
    : [];
  const landingByUid = new Map(
    originSnaps.map((s) => [s.id, typeof s.get('landing') === 'string' ? (s.get('landing') as string) : null]),
  );

  const passByStateAgg: Record<string, { passed: number; failed: number }> = {};
  const users = fullDocs.map((doc) => {
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
      test: signupTest(data, landingByUid.get(doc.id) ?? null),
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
      return { code, attempts, passed: r.passed, passRate: attempts > 0 ? r.passed / attempts : 0 };
    })
    .sort((a, b) => b.attempts - a.attempts);

  const payload = { users, totalUsers: lightDocs.length, superAmazing, passRateByState };

  return payload;
}
