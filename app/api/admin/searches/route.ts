import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { requireAdmin } from '@/lib/server/adminAuth';
import { cachedAdminPayload, cachedJson, wantsRefresh } from '@/lib/server/adminCache';
import { buildSearchGroups as build, readSearchTriage as readTriage, searchTriageId as triageId, type SearchTriageStatus as Status } from '@/lib/server/searchGroups';

// Admin read of test searches (the Searches tab on /admin). The grouping lives
// in lib/server/searchGroups.ts, shared with scripts/search-gaps.ts.

export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  try {
    const [triage, { payload, cache, at }] = await Promise.all([
      readTriage(),
      cachedAdminPayload({ key: 'searches', ttlMs: 2 * 60_000, staleMs: 24 * 3_600_000, refresh: wantsRefresh(request), build }),
    ]);
    return cachedJson({ ...payload, triage, builtAt: new Date(at).toISOString() }, cache, at);
  } catch (error) {
    console.error('[admin/searches]', error);
    return NextResponse.json({ error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown' }, { status: 500 });
  }
}

// Mark a search group Planned or Ignored, or clear it ({ key, status: null }).
export async function POST(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const body = await request.json().catch(() => ({}));
  const key = typeof body.key === 'string' ? body.key.slice(0, 120) : '';
  const status: Status | null = body.status === 'planned' || body.status === 'ignored' ? body.status : null;
  if (!key) return NextResponse.json({ error: 'key required' }, { status: 400 });
  const ref = getAdminDb().doc(`searchTriage/${triageId(key)}`);
  if (status) await ref.set({ key, status, at: new Date().toISOString() });
  else await ref.delete();
  return NextResponse.json({ ok: true });
}
