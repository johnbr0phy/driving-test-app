import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/adminAuth';
import { cachedAdminPayload, cachedJson, wantsRefresh } from '@/lib/server/adminCache';
import { buildConversion } from '@/lib/server/conversion';

// The Conversion tab on /admin: paywalls, who pays and how far in they were
// (lib/server/conversion.ts). Kept in lib/server/adminCache like the other
// tabs: fresh for five minutes, then served stale while a rebuild runs.
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  try {
    const { payload, cache, at } = await cachedAdminPayload({
      key: 'conversion',
      ttlMs: 5 * 60_000,
      staleMs: 24 * 3_600_000,
      refresh: wantsRefresh(request),
      build: buildConversion,
    });
    return cachedJson(payload, cache, at);
  } catch (error) {
    console.error('[admin/conversion]', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 },
    );
  }
}
