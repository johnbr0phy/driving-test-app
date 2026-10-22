import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth } from '@/lib/firebase-admin';
import { isAdminEmail } from '@/lib/admin';

// The one gate for /api/admin/* GET routes: a Firebase ID token in the
// Authorization header whose email is in lib/admin. Returns the error
// response to send, or null when the caller is an admin.
export async function requireAdmin(request: NextRequest): Promise<NextResponse | null> {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  let email: string | undefined;
  try {
    email = (await getAdminAuth().verifyIdToken(authHeader.slice('Bearer '.length))).email;
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  if (!isAdminEmail(email)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  return null;
}
