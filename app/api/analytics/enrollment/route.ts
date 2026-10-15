import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { EXAM_ANALYTICS_KEYS } from '@/lib/exams';
import { EXAMS_V2 } from '@/lib/v2/registry';
import { isInternalEmail } from '@/lib/internal';
import { enrollmentDocId } from '@/lib/server/enrollments';

// Records that a person answered a question in an exam (lib/enrollment).
// Signed in: one doc per (exam, uid), and the browser's guest docs for the
// same exams are deleted so a converted guest counts once. Signed out: one
// doc per (exam, browser id). Writes are idempotent sets.

const KNOWN_EXAM_KEYS = new Set<string>([...EXAM_ANALYTICS_KEYS, ...EXAMS_V2.map((e) => e.id)]);
const BROWSER_ID = /^[A-Za-z0-9-]{8,64}$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const exams = (Array.isArray(body.exams) ? body.exams : [])
      .filter((e: unknown): e is string => typeof e === 'string' && KNOWN_EXAM_KEYS.has(e))
      .slice(0, 80);
    const browserId = typeof body.browserId === 'string' && BROWSER_ID.test(body.browserId) ? body.browserId : null;
    if (exams.length === 0 || !browserId) return NextResponse.json({ ok: true });

    let uid: string | null = null;
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      try {
        const token = await getAdminAuth().verifyIdToken(authHeader.split('Bearer ')[1]);
        if (isInternalEmail(token.email)) return NextResponse.json({ ok: true });
        uid = token.uid;
      } catch {
        return NextResponse.json({ ok: false }, { status: 401 });
      }
    }

    const db = getAdminDb();
    const batch = db.batch();
    const col = db.collection('enrollments');
    for (const exam of exams) {
      if (uid) {
        batch.set(col.doc(enrollmentDocId(exam, 'u', uid)), { exam, uid }, { merge: true });
        batch.delete(col.doc(enrollmentDocId(exam, 'b', browserId)));
      } else {
        batch.set(col.doc(enrollmentDocId(exam, 'b', browserId)), { exam }, { merge: true });
      }
    }
    await batch.commit();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error tracking enrollment:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
