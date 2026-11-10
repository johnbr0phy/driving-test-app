import { NextRequest, NextResponse } from 'next/server';
import { recoverDelivery, recoveryPage } from '@/lib/server/emailRecovery';
export const maxDuration = 300;
/** Not scheduled. Activation requires a separate reviewed production change. */
export async function POST(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const mode = process.env.EMAIL_RECOVERY_MODE;
  if (mode !== 'retry' && mode !== 'reconcile') return NextResponse.json({ disabled: true });
  const cursor = req.nextUrl.searchParams.get('cursor') ?? undefined;
  if (cursor && !/^[a-f0-9]{64}$/.test(cursor)) return NextResponse.json({ error: 'Invalid cursor' }, { status: 400 });
  try {
    const page = await recoveryPage(cursor);
    const results: { id: string; outcome: string }[] = [];
    // Process one bounded page. Callers retain the cursor, then wrap to the
    // beginning after null; no unbounded in-request scan or provider loop.
    for (const row of page.rows.slice(0, 20)) {
      try { results.push({ id: row.id, outcome: await recoverDelivery(row.id, mode === 'retry') }); }
      catch { results.push({ id: row.id, outcome: 'retry_error' }); }
    }
    return NextResponse.json({ mode, results, nextCursor: page.rows.length > 20 ? page.rows[19].id : page.nextCursor }, { headers: { 'Cache-Control': 'no-store' } });
  } catch { return NextResponse.json({ error: 'Recovery unavailable' }, { status: 503 }); }
}
