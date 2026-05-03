import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { consumePendingAuth, saveAuthCode, getClient, PendingAuth } from '@/lib/server/oauth-store';
import { randomUUID } from 'crypto';

// GET: fetch display info for the consent screen without consuming the pending auth.
export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const pendingId = searchParams.get('pendingId');
  if (!pendingId) {
    return NextResponse.json({ error: 'pendingId is required' }, { status: 400 });
  }

  const db = getAdminDb();
  const snap = await db.collection('oauth_pending_auth').doc(pendingId).get();
  if (!snap.exists) {
    return NextResponse.json({ error: 'Invalid or expired authorization request' }, { status: 404 });
  }

  const pending = snap.data() as PendingAuth;
  if (Date.parse(pending.expiresAt) <= Date.now()) {
    return NextResponse.json({ error: 'Authorization request has expired' }, { status: 404 });
  }

  const client = await getClient(pending.clientId);
  const clientName = client?.clientName ?? 'Unknown Client';

  return NextResponse.json({ clientName, scope: pending.scope }, { status: 200 });
}

// POST: verify Firebase ID token and mint the OAuth authorization code.
export async function POST(request: NextRequest): Promise<NextResponse> {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Missing Firebase ID token' }, { status: 401 });
  }

  const idToken = authHeader.slice(7).trim();
  if (!idToken) {
    return NextResponse.json({ error: 'Missing Firebase ID token' }, { status: 401 });
  }

  let uid: string;
  try {
    const decoded = await getAdminAuth().verifyIdToken(idToken);
    uid = decoded.uid;
  } catch {
    return NextResponse.json({ error: 'Invalid or expired Firebase ID token' }, { status: 401 });
  }

  let body: { pendingId?: unknown };
  try {
    body = await request.json() as { pendingId?: unknown };
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { pendingId } = body;
  if (typeof pendingId !== 'string' || !pendingId) {
    return NextResponse.json({ error: 'pendingId is required' }, { status: 400 });
  }

  // Atomically consume the pending auth request (read + delete in one transaction).
  // Returns null if the record is missing or expired.
  const pending = await consumePendingAuth(pendingId);
  if (!pending) {
    return NextResponse.json({ error: 'Invalid or expired authorization request' }, { status: 400 });
  }

  const code = randomUUID();

  await saveAuthCode({
    code,
    userId: uid,
    clientId: pending.clientId,
    codeChallenge: pending.codeChallenge,
    redirectUri: pending.redirectUri,
    scope: pending.scope,
  });

  const redirectUrl = new URL(pending.redirectUri);
  redirectUrl.searchParams.set('code', code);
  // Echo the original OAuth client's state param (not the pending-auth state).
  if (pending.clientState) {
    redirectUrl.searchParams.set('state', pending.clientState);
  }

  return NextResponse.json({ redirect_url: redirectUrl.toString() }, { status: 200 });
}
