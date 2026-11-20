import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { requireAdmin } from '@/lib/server/adminAuth';
import { LANDING_TRY_DOC } from '@/lib/landingTryTest';
import { cachedAdminPayload, cachedJson, wantsRefresh } from '@/lib/server/adminCache';

// The "Try one now" layout A/B test card on the /admin A/B tests tab
// (lib/landingTryTest.ts): raw counts per arm from LANDING_TRY_DOC.
export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  try {
    const { payload, cache, at } = await cachedAdminPayload({
      key: 'landing-try-test-2',
      ttlMs: 60_000,
      staleMs: 24 * 3_600_000,
      refresh: wantsRefresh(request),
      build: async () => {
        const d = (await getAdminDb().doc(LANDING_TRY_DOC).get()).data() ?? {};
        return {
          test: d.test ?? null,
          since: d.since ?? null,
          arms: d.arms ?? {},
          byExam: d.byExam ?? {},
          answers: d.answers ?? {},
          answersSince: d.answersSince ?? null,
        };
      },
    });
    return cachedJson(payload, cache, at);
  } catch (error) {
    console.error('[admin/landing-try-test]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
