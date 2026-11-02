import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { requireAdmin } from '@/lib/server/adminAuth';

// Admin read of test searches (the Searches tab on /admin): totals, the most
// searched queries, and the ones that found nothing (tests to build next).
export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const db = getAdminDb();
  const [totals, top, recent] = await Promise.all([
    db.doc('analytics/search').get(),
    db.collection('searchQueries').orderBy('count', 'desc').limit(300).get(),
    db.collection('searchQueries').orderBy('lastAt', 'desc').limit(50).get(),
  ]);
  type Row = { q: string; count: number; misses: number; lastResults: number; lastAt: string; picks: Record<string, number>; byRegion: Record<string, number> };
  const row = (d: FirebaseFirestore.QueryDocumentSnapshot): Row => {
    const v = d.data();
    return {
      q: v.q,
      count: v.count ?? 0,
      misses: v.misses ?? 0,
      lastResults: v.lastResults ?? 0,
      lastAt: v.lastAt ?? '',
      picks: v.picks ?? {},
      byRegion: v.byRegion ?? {},
    };
  };
  const all = top.docs.map(row);
  const t = totals.data() ?? {};
  return NextResponse.json({
    totals: { total: t.total ?? 0, misses: t.misses ?? 0, picks: t.picks ?? 0 },
    misses: all.filter((r) => r.lastResults === 0).slice(0, 100),
    top: all.slice(0, 100),
    recent: recent.docs.map(row),
  });
}
