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
  // Before Nov 2 2026 every pause while typing was logged, so one search left
  // "written clin", "written clinical", "written clinical exam co"... Hide a
  // row nobody opened a test from when a longer query that starts with it was
  // logged within a few minutes of it: that was the same search, still typing.
  const PREFIX_WINDOW_MS = 5 * 60_000;
  const byLength = [...top.docs.map(row), ...recent.docs.map(row)].sort((a, b) => b.q.length - a.q.length);
  const partial = new Set<string>();
  for (const r of byLength) {
    if (Object.keys(r.picks).length > 0) continue;
    const t = Date.parse(r.lastAt);
    const continued = byLength.some(
      (o) => o.q.length > r.q.length && o.q.startsWith(r.q) && Math.abs(Date.parse(o.lastAt) - t) < PREFIX_WINDOW_MS,
    );
    if (continued) partial.add(r.q);
  }
  const keep = (r: Row) => !partial.has(r.q);
  const all = top.docs.map(row).filter(keep);
  const t = totals.data() ?? {};
  return NextResponse.json({
    totals: { total: t.total ?? 0, misses: t.misses ?? 0, picks: t.picks ?? 0 },
    // A search that showed only closest matches counts as found nothing, but
    // if the visitor opened one of them the test was there: not one to build.
    misses: all.filter((r) => r.lastResults === 0 && Object.keys(r.picks).length === 0).slice(0, 100),
    top: all.slice(0, 100),
    recent: recent.docs.map(row).filter(keep),
  });
}
