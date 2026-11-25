import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { mergeGuestDay, personIdForBrowser, statusFor } from '@/lib/server/dailyRank';
import { rankCaller } from '@/lib/server/dailyRankRequest';

// At sign-in: today's guest answers on this browser move onto the account
// (lib/server/dailyRank.ts mergeGuestDay), so "Sign in to keep your rank"
// keeps it. Runs once per guest day; later calls just return the status.
// POST { tz, browserId } with the account's ID token.
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const caller = await rankCaller(request, body);
  if (!caller.uid || !caller.browserId || !caller.personId) {
    return NextResponse.json({ error: 'sign in first' }, { status: 401 });
  }
  try {
    const db = getAdminDb();
    const correct = await mergeGuestDay(db, caller.day, personIdForBrowser(caller.browserId), caller.personId);
    return NextResponse.json(await statusFor(db, caller.day, correct), { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    console.error('[rank/merge] failed:', error);
    return NextResponse.json({ error: 'unavailable' }, { status: 500 });
  }
}
