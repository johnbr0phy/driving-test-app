import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { isAdminEmail } from '@/lib/admin';
import { getInternalUids } from '@/lib/server/internalUsers';
import { buildOpportunities } from '@/lib/server/opportunities';
import { createBrief } from '@/lib/server/dailyBrief';
import { getStripe } from '@/lib/stripe';

// "Write a fresh one" on /admin/opportunities: today's update on demand,
// replacing the morning's (lib/server/dailyBrief).
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  let email: string | undefined;
  try {
    email = (await getAdminAuth().verifyIdToken(authHeader.split('Bearer ')[1])).email;
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  if (!isAdminEmail(email)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  try {
    let stripe = null;
    try {
      stripe = getStripe();
    } catch {
      // The update is written from Firestore alone.
    }
    const db = getAdminDb();
    const brief = await createBrief(db, await buildOpportunities(db, stripe, await getInternalUids()));
    return NextResponse.json(brief, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('[admin/daily-brief]', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown' }, { status: 500 });
  }
}
