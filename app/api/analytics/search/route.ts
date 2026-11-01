import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb } from '@/lib/firebase-admin';
import { normalizeQuery } from '@/lib/testSearch';
import { getCatalogEntry } from '@/lib/testCatalog';
import { isRegion } from '@/lib/region';

// What people type into the search-first homepage (/home-v2). One doc per
// normalised query in `searchQueries` (count, how many found nothing, which
// test was picked, by day and by visitor country), plus totals in
// analytics/search. Searches that find nothing are the list of tests to build
// next. Internal browsers never send (components/home/SearchHome).
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const q = normalizeQuery(String(body.q ?? ''));
    const kind = body.kind === 'pick' ? 'pick' : 'query';
    const results = Number.isFinite(body.results) ? Math.max(0, Math.min(99, Math.floor(body.results))) : null;
    const pick = typeof body.pick === 'string' ? body.pick.slice(0, 40) : null;
    const region = isRegion(body.region) ? body.region : 'OTHER';
    if (q.length < 2 || (kind === 'query' && results === null) || (kind === 'pick' && !pick)) {
      return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
    }
    // A pick is a test id or `dmv:XX`; anything else is noise.
    if (pick && !getCatalogEntry(pick.split(':')[0])) {
      return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
    }

    const now = new Date().toISOString();
    const today = now.slice(0, 10);
    const inc = FieldValue.increment(1);
    const id = createHash('sha1').update(q).digest('hex').slice(0, 20);
    const db = getAdminDb();
    const batch = db.batch();

    if (kind === 'query') {
      const miss = results === 0;
      batch.set(
        db.doc(`searchQueries/${id}`),
        {
          q,
          count: inc,
          ...(miss && { misses: inc }),
          lastResults: results,
          lastAt: now,
          daily: { [today]: inc },
          byRegion: { [region]: inc },
        },
        { merge: true },
      );
      batch.set(
        db.doc('analytics/search'),
        { total: inc, ...(miss && { misses: inc }), daily: { [today]: { total: inc, ...(miss && { misses: inc }) } } },
        { merge: true },
      );
    } else {
      // Test ids and `dmv:XX` have no dots, so they are safe as map keys.
      batch.set(db.doc(`searchQueries/${id}`), { q, picks: { [pick!]: inc }, lastAt: now }, { merge: true });
      batch.set(db.doc('analytics/search'), { picks: inc, daily: { [today]: { picks: inc } } }, { merge: true });
    }
    await batch.commit();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error tracking search:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
