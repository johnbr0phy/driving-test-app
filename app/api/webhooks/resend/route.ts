import { NextRequest, NextResponse } from 'next/server';
import { verifySvixSignature } from '@/lib/server/svixVerify';
import { recordBounce, recordDelivery } from '@/lib/server/emailDomains';
import { isHardBounce } from '@/lib/emailDomainBlock';

/**
 * Resend webhook (email.bounced, email.delivered). Counts hard bounces per
 * domain and blocks a domain that only bounces (lib/emailDomainBlock.ts).
 * Signed with RESEND_WEBHOOK_SECRET; an unsigned or wrongly signed request
 * gets 401. Any other event type is acknowledged and ignored.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 503 });

  const body = await request.text();
  const ok = verifySvixSignature(secret, {
    id: request.headers.get('svix-id'),
    timestamp: request.headers.get('svix-timestamp'),
    signature: request.headers.get('svix-signature'),
  }, body);
  if (!ok) return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });

  let event: { type?: string; data?: { to?: string[] | string; bounce?: { type?: string; message?: string } } };
  try {
    event = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: 'Bad JSON' }, { status: 400 });
  }
  const to = event.data?.to;
  const recipients = (Array.isArray(to) ? to : to ? [to] : []).filter((x): x is string => typeof x === 'string');

  try {
    if (event.type === 'email.bounced' && isHardBounce(event.data?.bounce)) {
      for (const email of recipients) await recordBounce(email, event.data?.bounce?.message);
    } else if (event.type === 'email.delivered') {
      for (const email of recipients) await recordDelivery(email);
    }
  } catch (err) {
    // A 500 makes Resend retry later, which is what we want for a Firestore blip.
    console.error('[resend webhook] failed to record', event.type, err);
    return NextResponse.json({ error: 'Record failed' }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
