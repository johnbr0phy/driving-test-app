import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { MILLIONTH_DOC } from '@/lib/server/millionth';
import { BROWSER_ID_RE } from '@/lib/server/weeklyActiveLearners';

// The winning browser's own id (a random secret in its localStorage) proves it
// won, for when the answer batch's response never reached the page.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const browserId = typeof body.browserId === 'string' && BROWSER_ID_RE.test(body.browserId) ? body.browserId : null;
  if (!browserId) return NextResponse.json({ won: false });
  const winner = (await getAdminDb().doc(MILLIONTH_DOC).get()).data()?.winner;
  if (!winner || winner.browserId !== browserId) return NextResponse.json({ won: false });
  return NextResponse.json({
    won: true,
    claimToken: winner.claimToken,
    signedIn: !!winner.uid,
    claimed: !!winner.claimedBy,
  });
}
