import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { requireAdmin } from '@/lib/server/adminAuth';
import { STATS_VIEWS_DOC } from '@/lib/statsViews';
import { cachedAdminPayload, cachedJson, wantsRefresh } from '@/lib/server/adminCache';

// The stats page traffic card on the /admin Growth tab (lib/statsViews.ts):
// views by day and source, and the top exams.
export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  try {
    const { payload, cache, at } = await cachedAdminPayload({
      key: 'stats-views-1',
      ttlMs: 60_000,
      staleMs: 24 * 3_600_000,
      refresh: wantsRefresh(request),
      build: async () => {
        const d = (await getAdminDb().doc(STATS_VIEWS_DOC).get()).data() ?? {};
        return {
          total: typeof d.total === 'number' ? d.total : 0,
          bySource: (d.bySource ?? {}) as Record<string, number>,
          daily: (d.daily ?? {}) as Record<string, Record<string, number>>,
          byExam: (d.byExam ?? {}) as Record<string, number>,
        };
      },
    });
    return cachedJson(payload, cache, at);
  } catch (error) {
    console.error('[admin/stats-views]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
