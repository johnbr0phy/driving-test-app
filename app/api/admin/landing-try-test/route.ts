import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { requireAdmin } from '@/lib/server/adminAuth';
import { cachedAdminPayload, cachedJson, wantsRefresh } from '@/lib/server/adminCache';

// The "Try one now" A/B test card on the /admin Conversion tab
// (lib/landingTryTest.ts): raw counts per arm from analytics/landingTryTest.
export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  try {
    const { payload, cache, at } = await cachedAdminPayload({
      key: 'landing-try-test',
      ttlMs: 60_000,
      staleMs: 24 * 3_600_000,
      refresh: wantsRefresh(request),
      build: async () => {
        const d = (await getAdminDb().doc('analytics/landingTryTest').get()).data() ?? {};
        return { test: d.test ?? null, since: d.since ?? null, arms: d.arms ?? {}, byExam: d.byExam ?? {} };
      },
    });
    return cachedJson(payload, cache, at);
  } catch (error) {
    console.error('[admin/landing-try-test]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
