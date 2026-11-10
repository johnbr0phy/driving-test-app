import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/adminAuth';
import { recoveryPage } from '@/lib/server/emailRecovery';
export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;
  const cursor = req.nextUrl.searchParams.get('cursor') ?? undefined;
  if (cursor && !/^[a-f0-9]{64}$/.test(cursor)) return NextResponse.json({ error: 'Invalid cursor' }, { status: 400 });
  try { return NextResponse.json(await recoveryPage(cursor), { headers: { 'Cache-Control': 'no-store' } }); }
  catch { return NextResponse.json({ error: 'Recovery report unavailable' }, { status: 503 }); }
}
