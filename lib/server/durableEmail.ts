/** Durable, immutable provider attempts. Never release an uncertain delivery. */
import { createHash, randomUUID } from 'crypto';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb } from '@/lib/firebase-admin';
import { sendEmail, type SendEmailPayload } from '@/lib/resend';
import { QuotaExhaustedError } from '@/lib/email-quota';

export type DurableOutcome = 'sent' | 'already_sent' | 'in_flight' | 'ineligible' | 'quarantined';
export interface DurableEmailOptions {
  uid: string;
  dedupeKey: string;
  emailKey: string;
  payload: SendEmailPayload;
  record?: Record<string, unknown>;
  gapMs?: number;
  eligible?: (data: Record<string, any>) => boolean;
}
const LEASE_MS = 5 * 60_000;
const RETRY_WINDOW_MS = 23 * 60 * 60_000; // shorter than Resend's 24h retention
// Stable across object construction order. Include the sent marker fields too:
// a new event must not validate a body that belongs to an earlier event.
function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value && typeof value === 'object') return `{${Object.entries(value).filter(([, v]) => v !== undefined)
    .sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => `${JSON.stringify(k)}:${canonical(v)}`).join(',')}}`;
  return JSON.stringify(value) ?? 'null';
}
function candidateFingerprint(payload: SendEmailPayload, record: Record<string, unknown>): string {
  const { idempotencyKey: _transportKey, ...content } = payload;
  return createHash('sha256').update(canonical({ payload: content, record })).digest('hex');
}
const millis = (value: any): number => typeof value?.toMillis === 'function' ? value.toMillis() : new Date(value ?? 0).getTime() || 0;
export function marketingAllowed(data: Record<string, any>): boolean {
  return data.emailConsent === true && data.unsubscribed !== true;
}
export async function sendDurableEmail(opts: DurableEmailOptions): Promise<DurableOutcome> {
  const db = getAdminDb();
  const id = createHash('sha256').update(`${opts.uid}:${opts.dedupeKey}`).digest('hex');
  const ref = db.collection('emailDeliveries').doc(id);
  const userRef = db.collection('users').doc(opts.uid);
  const owner = randomUUID();
  const now = Date.now();
  const campaign = opts.payload.kind === 'campaign';
  const claim = await db.runTransaction(async tx => {
    const [delivery, user] = await Promise.all([tx.get(ref), tx.get(userRef)]);
    const state = delivery.data();
    const data = user.data() ?? {};
    if (state?.status === 'sent' || data.emailsSent?.includes(opts.emailKey)) return { outcome: 'already_sent' as const };
    if (state?.status === 'quarantined' || (state?.firstAttemptAt && !['failed_known', 'cancelled'].includes(state?.status) && now - state.firstAttemptAt >= RETRY_WINDOW_MS)) {
      tx.set(ref, { status: 'quarantined' }, { merge: true });
      return { outcome: 'quarantined' as const };
    }
    if (state?.leaseUntil > now) return { outcome: 'in_flight' as const };
    const retryUncertain = !!state && state.status !== 'failed_known' && state.status !== 'cancelled';
    const fingerprint = candidateFingerprint(opts.payload, opts.record ?? {});
    const previousFingerprint = state?.payload ? candidateFingerprint(state.payload, state.record ?? {}) : null;
    // An incoming eligibility callback describes the incoming event, not the
    // stored event. Never use it to authorize a different uncertain message.
    if (retryUncertain && fingerprint !== previousFingerprint) {
      tx.set(ref, { status: 'quarantined', quarantineReason: 'candidate_changed_after_uncertain_send' }, { merge: true });
      return { outcome: 'quarantined' as const };
    }
    if ((campaign && !marketingAllowed(data)) || (opts.eligible && !opts.eligible(data))) return { outcome: 'ineligible' as const };
    if (campaign) {
      const lock = data.marketingEmailLease;
      if (lock?.deliveryId !== id && (lock?.until > now || lock?.uncertain === true)) return { outcome: 'in_flight' as const };
      if ((!state || ['failed_known', 'cancelled'].includes(state.status)) && now - millis(data.lastEmailSent) < (opts.gapMs ?? 24 * 60 * 60_000)) return { outcome: 'ineligible' as const };
      tx.set(userRef, { marketingEmailLease: { deliveryId: id, until: now + LEASE_MS, uncertain: true } }, { merge: true });
    }
    const generation = (state?.generation ?? 0) + (state && fingerprint !== previousFingerprint ? 1 : 0);
    const payload = retryUncertain ? state.payload : { ...opts.payload,
      idempotencyKey: state && fingerprint === previousFingerprint ? state.payload.idempotencyKey : `email/${id}/${generation}` };
    const record = retryUncertain ? state.record ?? {} : opts.record ?? {};
    tx.set(ref, { uid: opts.uid, emailKey: opts.emailKey, status: 'sending', payload, generation, fingerprint,
      record, firstAttemptAt: retryUncertain ? state.firstAttemptAt : now,
      leaseUntil: now + LEASE_MS, owner }, { merge: true });
    return { retryUncertain, payload: payload as SendEmailPayload, record };
  });
  if ('outcome' in claim) return claim.outcome!;
  // Recheck consent immediately before the external call, including retries.
  const fresh = (await userRef.get()).data() ?? {};
  if ((campaign && !marketingAllowed(fresh)) || (opts.eligible && !opts.eligible(fresh))) {
    await db.runTransaction(async tx => {
      const current = (await tx.get(ref)).data();
      if (current?.owner !== owner) return;
      tx.set(ref, { status: claim.retryUncertain ? 'failed_uncertain' : 'failed_known', leaseUntil: 0 }, { merge: true });
      if (campaign && !claim.retryUncertain) tx.set(userRef, { marketingEmailLease: FieldValue.delete() }, { merge: true });
    });
    return 'ineligible';
  }
  const result = await sendEmail(claim.payload!);
  if (!result.ok) {
    const uncertain = result.uncertain === true || claim.retryUncertain;
    await db.runTransaction(async tx => {
      const current = (await tx.get(ref)).data();
      if (current?.owner !== owner) return;
      tx.set(ref, { status: uncertain ? 'failed_uncertain' : 'failed_known', leaseUntil: 0,
        lastError: result.error ?? 'Send failed' }, { merge: true });
      if (campaign && !uncertain) tx.set(userRef, { marketingEmailLease: FieldValue.delete() }, { merge: true });
    });
    if (result.quotaExhausted) throw new QuotaExhaustedError(result.error);
    throw new Error(result.error ?? 'Send failed');
  }
  await db.runTransaction(async tx => {
    const current = (await tx.get(ref)).data();
    if (current?.owner !== owner) throw new Error('Delivery lease changed; reconciliation required');
    tx.set(ref, { status: 'sent', providerId: result.id ?? null, sentAt: Date.now(), leaseUntil: 0 }, { merge: true });
    tx.set(userRef, { ...claim.record, emailsSent: FieldValue.arrayUnion(opts.emailKey),
      ...(campaign ? { lastEmailSent: FieldValue.serverTimestamp(), marketingEmailLease: FieldValue.delete() } : {}) }, { merge: true });
  });
  return 'sent';
}
