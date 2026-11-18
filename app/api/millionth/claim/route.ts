import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { MILLIONTH_DOC, awardMillionth, type MillionthWinner } from '@/lib/server/millionth';

// A guest who answered the 1,000,000th question claims Premium on the account
// they signed up or signed in with. One account, once.
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return NextResponse.json({ error: 'Sign in first' }, { status: 401 });
  let uid: string;
  try {
    uid = (await getAdminAuth().verifyIdToken(authHeader.slice(7))).uid;
  } catch {
    return NextResponse.json({ error: 'Sign in first' }, { status: 401 });
  }
  const body = await request.json().catch(() => ({}));
  const token = typeof body.claimToken === 'string' ? body.claimToken : '';
  const db = getAdminDb();
  const ref = db.doc(MILLIONTH_DOC);
  const outcome = await db.runTransaction(async (tx) => {
    const winner = (await tx.get(ref)).data()?.winner as MillionthWinner | undefined;
    if (!winner || !token || winner.claimToken !== token) return { status: 'invalid' as const };
    if (winner.claimedBy) return { status: winner.claimedBy === uid ? ('mine' as const) : ('taken' as const) };
    tx.set(ref, { winner: { claimedBy: uid, claimedAt: new Date().toISOString() } }, { merge: true });
    return { status: 'claimed' as const, winner };
  });
  if (outcome.status === 'invalid') return NextResponse.json({ error: 'Not a winning claim' }, { status: 403 });
  if (outcome.status === 'taken') return NextResponse.json({ error: 'Already claimed by another account' }, { status: 409 });
  if (outcome.status === 'claimed') {
    try {
      await awardMillionth(uid, outcome.winner);
    } catch (err) {
      console.error('Millionth claim award failed:', err);
      return NextResponse.json({ error: 'Could not add Premium, try again' }, { status: 500 });
    }
  }
  return NextResponse.json({ ok: true });
}
