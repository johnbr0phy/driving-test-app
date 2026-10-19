import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { isAdminEmail } from '@/lib/admin';
import { getInternalUids } from '@/lib/server/internalUsers';
import { buildTeachAdmin } from '@/lib/server/teachAdmin';

// Data for /admin/teach (lib/server/teachAdmin). Read-only and read fresh:
// it is a handful of classes, and a teacher's first students should show at once.
export const maxDuration = 60;

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
    const payload = await buildTeachAdmin(getAdminDb(), await getInternalUids());
    return NextResponse.json(payload, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('[admin/teach]', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 },
    );
  }
}
