import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { requireAdmin } from '@/lib/server/adminAuth';
import { cachedAdminPayload, cachedJson, wantsRefresh } from '@/lib/server/adminCache';
import { getInternalUids } from '@/lib/server/internalUsers';
import { buildV2Progress } from '@/lib/server/v2Progress';

// The "Basics" card on the /admin Growth tab (lib/server/v2Progress): how far
// students get through the v2 exams with Basics, and whether they use Basics.
// The payload is kept in lib/server/adminCache: fresh for two minutes, and an
// older copy is served at once while a rebuild runs after the response.
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  try {
    const { payload, cache, at } = await cachedAdminPayload({
      key: 'v2-progress',
      ttlMs: 2 * 60_000,
      staleMs: 24 * 3_600_000,
      refresh: wantsRefresh(request),
      build: async () => buildV2Progress(getAdminDb(), await getInternalUids()),
    });
    return cachedJson(payload, cache, at);
  } catch (error) {
    console.error('[admin/v2-progress]', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 },
    );
  }
}
