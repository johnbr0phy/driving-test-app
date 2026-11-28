import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { requireAdmin } from '@/lib/server/adminAuth';
import { cachedJson, wantsRefresh } from '@/lib/server/adminCache';
import { cachedOpportunities } from '@/lib/server/opportunitiesPayload';
import { briefBudgetLeft, latestBrief } from '@/lib/server/dailyBrief';

// Data for the /admin Today tab (lib/server/opportunities), cached by
// lib/server/opportunitiesPayload (shared with the Tests tab).
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  try {
    // The daily update is read fresh every time, so a new one shows at once.
    // briefPaused: the API budget left no room for today's update (the cron skipped).
    const [brief, budgetLeft, { payload, cache, at }] = await Promise.all([
      latestBrief(getAdminDb()).catch(() => null),
      briefBudgetLeft(getAdminDb()).catch(() => false),
      cachedOpportunities(wantsRefresh(request)),
    ]);
    return cachedJson({ ...payload, brief, briefPaused: !budgetLeft }, cache, at);
  } catch (error) {
    console.error('[admin/opportunities]', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 },
    );
  }
}
