import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { isAdminEmail } from '@/lib/admin';
import { GUEST_TRACKING_SINCE, WAL_DOC_PATH, isWalRollup } from '@/lib/server/weeklyActiveLearners';

// Weekly Active Learners for the /admin Growth tab. Reads the rollup doc only.
// The daily job (app/api/cron/weekly-active-learners) writes that doc.
// This route does not scan users.

export async function GET(request: NextRequest) {
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
    const snap = await getAdminDb().doc(WAL_DOC_PATH).get();
    const data = snap.data();
    if (!snap.exists || !isWalRollup(data)) {
      return NextResponse.json(
        { ready: false, guestTrackingSince: GUEST_TRACKING_SINCE },
        { headers: { 'Cache-Control': 'no-store' } },
      );
    }
    return NextResponse.json({ ready: true, ...data }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('[admin/wal]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
