/**
 * Cron: Weekly Active Learners rollup
 *
 * NOT scheduled. vercel.json does not list this route. John adds the schedule
 * after he approves it. Until then the route does not run in production.
 *
 * Suggested schedule, after approval:
 *   { "path": "/api/cron/weekly-active-learners", "schedule": "20 3 * * *" }
 *
 * Reads users/{uid}.activeDates (history before guest tracking) and the
 * learnerDays answer docs, then writes analytics/weeklyActiveLearners.
 * The response has counts only.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { verifyCronSecret } from '@/lib/cron-email';
import { rebuildWeeklyActiveLearners } from '@/lib/server/weeklyActiveLearners';

export const maxDuration = 60;

export async function GET(req: NextRequest) {
  if (!verifyCronSecret(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const rollup = await rebuildWeeklyActiveLearners(getAdminDb());
    return NextResponse.json({
      ok: true,
      asOfDate: rollup.asOfDate,
      guestTrackingSince: rollup.guestTrackingSince,
      current: rollup.current,
      previous: rollup.previous,
      change: rollup.change,
      weeks: rollup.weeks,
    });
  } catch (err) {
    console.error('[weekly-active-learners]', err);
    return NextResponse.json({ error: 'WAL rebuild failed' }, { status: 500 });
  }
}
