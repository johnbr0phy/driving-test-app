import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb } from '@/lib/firebase-admin';
import { isBotRequest } from '@/lib/botUserAgent';
import { STATS_VIEWS_DOC, isStatsSource } from '@/lib/statsViews';

// One stats page view (lib/statsViews.ts): counted in STATS_VIEWS_DOC overall,
// by UTC day and source, and by exam. No identity is stored.
export async function POST(request: NextRequest) {
  if (isBotRequest(request)) return NextResponse.json({ ok: true });
  try {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    if (!isStatsSource(body.source)) return NextResponse.json({ ok: false }, { status: 400 });
    const exam = typeof body.exam === 'string' && /^[a-z0-9-]{1,40}$/.test(body.exam) ? body.exam : null;
    const day = new Date().toISOString().slice(0, 10);
    const inc = FieldValue.increment(1);
    await getAdminDb()
      .doc(STATS_VIEWS_DOC)
      .set(
        {
          total: inc,
          bySource: { [body.source]: inc },
          daily: { [day]: { total: inc, [body.source]: inc } },
          ...(exam && { byExam: { [exam]: inc } }),
        },
        { merge: true },
      );
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[analytics/stats-view]', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
