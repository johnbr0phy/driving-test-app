import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { MILLIONTH_DOC, hashBrowserId } from '@/lib/server/millionth';

// Public and CDN-cached: whether the 1,000,000th question has been answered,
// and a hash of the winning browser's id so only that browser recognises
// itself (components/MillionthCard). Never the id or the claim token.
export async function GET() {
  try {
    const data = (await getAdminDb().doc(MILLIONTH_DOC).get()).data();
    const winner = data?.winner;
    const body = winner
      ? { state: winner.claimedBy ? 'claimed' : 'won', h: winner.browserId ? hashBrowserId(winner.browserId) : null }
      : { state: data?.missed ? 'missed' : 'open' };
    return NextResponse.json(body, { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } });
  } catch {
    return NextResponse.json({ state: 'open' }, { headers: { 'Cache-Control': 'no-store' } });
  }
}
