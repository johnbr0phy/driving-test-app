import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { verifyCronSecret } from '@/lib/cron-email';
import { getInternalUids } from '@/lib/server/internalUsers';
import { buildOpportunities } from '@/lib/server/opportunities';
import { briefDate, createBrief } from '@/lib/server/dailyBrief';
import { getStripe } from '@/lib/stripe';

/**
 * Cron: the daily update on /admin/opportunities (lib/server/dailyBrief).
 * Schedule: weekdays 10:00 UTC (vercel.json). Hobby crons fire somewhere in
 * the hour, so it is ready by 7am Eastern in summer and 6am in winter.
 * Writes once per Eastern day; ?force=1 rewrites.
 */
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    console.log('[daily-brief] skipped: ANTHROPIC_API_KEY is not set');
    return NextResponse.json({ skipped: 'ANTHROPIC_API_KEY is not set' });
  }
  try {
    const db = getAdminDb();
    const date = briefDate();
    if (request.nextUrl.searchParams.get('force') !== '1' && (await db.doc(`dailyBriefs/${date}`).get()).exists) {
      return NextResponse.json({ skipped: `already written for ${date}` });
    }
    let stripe = null;
    try {
      stripe = getStripe();
    } catch {
      // The update is written from Firestore alone.
    }
    const payload = await buildOpportunities(db, stripe, await getInternalUids());
    const brief = await createBrief(db, payload);
    console.log(`[daily-brief] wrote ${brief.date}: ${brief.headline}`);
    return NextResponse.json({ ok: true, date: brief.date });
  } catch (error) {
    console.error('[daily-brief]', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown' }, { status: 500 });
  }
}
