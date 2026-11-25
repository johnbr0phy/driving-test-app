import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { requireAdmin } from '@/lib/server/adminAuth';
import { RANK_TEST_DOC } from '@/lib/dailyRankTest';
import { cachedAdminPayload, cachedJson, wantsRefresh } from '@/lib/server/adminCache';

// The daily rank A/B test card on the /admin A/B tests tab
// (lib/dailyRankTest.ts): raw counts per arm, and today's enrolments so the
// card can leave out browsers that cannot have come back yet.
export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  try {
    const { payload, cache, at } = await cachedAdminPayload({
      key: 'rank-test-1',
      ttlMs: 60_000,
      staleMs: 24 * 3_600_000,
      refresh: wantsRefresh(request),
      build: async () => {
        const d = (await getAdminDb().doc(RANK_TEST_DOC).get()).data() ?? {};
        const today = new Date().toISOString().slice(0, 10);
        const daily = (d.daily ?? {}) as Record<string, Record<string, { enrolled?: number }>>;
        return {
          test: d.test ?? null,
          since: d.since ?? null,
          arms: d.arms ?? {},
          enrolledToday: {
            control: daily[today]?.control?.enrolled ?? 0,
            rank: daily[today]?.rank?.enrolled ?? 0,
          },
        };
      },
    });
    return cachedJson(payload, cache, at);
  } catch (error) {
    console.error('[admin/rank-test]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
