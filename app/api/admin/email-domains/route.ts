import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/adminAuth';
import { listEmailDomains, setDomainManual } from '@/lib/server/emailDomains';

// Email domains we stop sending to because they only bounce
// (lib/emailDomainBlock.ts). Uncached: one small collection read.
export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const domains = await listEmailDomains();
  return NextResponse.json({ generatedAt: new Date().toISOString(), domains });
}

// Body: { domain, action: 'block' | 'allow' | 'auto' }. 'auto' hands the
// domain back to the bounce rule.
export async function PATCH(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const body = await request.json().catch(() => ({}));
  const domain = typeof body.domain === 'string' ? body.domain.trim().toLowerCase() : '';
  const manual = body.action === 'block' ? 'blocked' : body.action === 'allow' ? 'allowed' : body.action === 'auto' ? null : undefined;
  if (!domain || manual === undefined) return NextResponse.json({ error: 'domain and action (block, allow, auto) required' }, { status: 400 });
  try {
    await setDomainManual(domain, manual);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Failed' }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
