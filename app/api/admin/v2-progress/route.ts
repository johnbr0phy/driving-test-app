import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { isAdminEmail } from '@/lib/admin';
import { getInternalUids } from '@/lib/server/internalUsers';
import { buildV2Progress, V2ProgressPayload } from '@/lib/server/v2Progress';

// The "Basics" card on the /admin Growth tab (lib/server/v2Progress): how far
// students get through the v2 exams with Basics, and whether they use Basics.
export const maxDuration = 60;

const CACHE_TTL_MS = 120_000;
let cached: V2ProgressPayload | null = null;
let cachedAt = 0;

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
    const refresh = request.nextUrl.searchParams.get('refresh') === 'true';
    if (refresh || !cached || Date.now() - cachedAt > CACHE_TTL_MS) {
      cached = await buildV2Progress(getAdminDb(), await getInternalUids());
      cachedAt = Date.now();
    }
    return NextResponse.json(cached, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('[admin/v2-progress]', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 },
    );
  }
}
