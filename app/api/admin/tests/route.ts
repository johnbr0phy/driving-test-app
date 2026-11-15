import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/adminAuth';
import { cachedJson, wantsRefresh } from '@/lib/server/adminCache';
import { cachedOpportunities } from '@/lib/server/opportunitiesPayload';
import { buildAdminTestRows } from '@/lib/adminTests';

// Data for the /admin Tests tab: every test in the catalog with its practice,
// learners, paywall views, purchases and revenue, from the Today tab's cached
// numbers (one rebuild serves both tabs).
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  try {
    const { payload, cache, at } = await cachedOpportunities(wantsRefresh(request));
    return cachedJson({ generatedAt: payload.generatedAt, tests: buildAdminTestRows(payload.exams) }, cache, at);
  } catch (error) {
    console.error('[admin/tests]', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 },
    );
  }
}
