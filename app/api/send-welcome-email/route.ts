import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { sendWelcomeEmail, WELCOME_MAX_AGE_MS } from '@/lib/server/welcomeEmail';
import { signupOrigin } from '@/lib/server/signupOrigin';

export async function POST(request: NextRequest) {
  const bearer = request.headers.get('authorization')?.match(/^Bearer (.+)$/)?.[1];
  if (!bearer) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  let uid: string;
  try { uid = (await getAdminAuth().verifyIdToken(bearer, true)).uid; }
  catch { return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); }
  try {
    const body = await request.json();
    if (body.userId !== uid) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    const record = await getAdminAuth().getUser(uid);
    const createdAt = new Date(record.metadata.creationTime).getTime();
    if (!Number.isFinite(createdAt) || Date.now() - createdAt > WELCOME_MAX_AGE_MS || createdAt > Date.now()) {
      return NextResponse.json({ success: false, reason: 'not_new' });
    }
    const origin = signupOrigin(body.signupUrl);
    const db = getAdminDb();
    const ref = db.collection('users').doc(uid);
    await db.runTransaction(async tx => {
      const data = (await tx.get(ref)).data() ?? {};
      if (data.signupOrigin) return; // immutable first authenticated signup event
      tx.set(ref, { signupOrigin: { source: 'authenticated_signup', recordedAt: new Date().toISOString(), teacher: origin.teacher },
        ...(origin.examId && !data.firstSignupExamId ? { firstSignupExamId: origin.examId } : {}),
        ...(!data.createdAt ? { createdAt: new Date(createdAt).toISOString() } : {}) }, { merge: true });
    });
    const result = await sendWelcomeEmail(uid);
    return NextResponse.json(result.ok ? { success: true } : { success: false, reason: result.reason },
      { status: !result.ok && result.reason === 'send_failed' ? 503 : 200 });
  } catch (error) {
    console.error('[welcome]', error);
    return NextResponse.json({ error: 'Welcome processing failed' }, { status: 500 });
  }
}
