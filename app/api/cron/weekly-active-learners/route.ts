/**
 * Cron: Weekly Active Learners rollup
 * Schedule: daily at 03:20 UTC (vercel.json)
 *
 * Uses verifyCronSecret from lib/cron-email, the same check as the other
 * cron routes: Authorization must be "Bearer $CRON_SECRET". An unset secret
 * fails closed in production.
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
