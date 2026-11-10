/** Durable, immutable provider attempts. Never release an uncertain delivery. */
import { createHash, randomUUID } from 'crypto';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { DEFAULT_FROM, sendEmail, type SendEmailPayload } from '@/lib/resend';
import { QuotaExhaustedError } from '@/lib/email-quota';
import { retryPolicyEligible, type EmailRetryPolicy } from '@/lib/server/emailRetryPolicy';

export type DurableOutcome = 'sent' | 'already_sent' | 'in_flight' | 'ineligible' | 'quarantined';
export interface DurableEmailOptions {
  uid: string;
  dedupeKey: string;
  emailKey: string;
  payload: SendEmailPayload;
  record?: Record<string, unknown>;
  successTimestampPaths?: string[];
  gapMs?: number;
  retryPolicy?: EmailRetryPolicy;
  /** Recovery may resume only this exact existing attempt; never enroll a send. */
  recovery?: { deliveryId: string; firstAttemptAt: number; generation: number; fingerprint: string };
  eligible?: (data: Record<string, any>) => boolean;
}
const LEASE_MS = 5 * 60_000;
export const MAX_RECOVERY_ATTEMPTS = 8;
export const RETRY_WINDOW_MS = 23 * 60 * 60_000; // shorter than Resend's 24h retention
// Stable across object construction order. Include the sent marker fields too:
// a new event must not validate a body that belongs to an earlier event.
function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value && typeof value === 'object') return `{${Object.entries(value).filter(([, v]) => v !== undefined)
    .sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => `${JSON.stringify(k)}:${canonical(v)}`).join(',')}}`;
  return JSON.stringify(value) ?? 'null';
}
export function candidateFingerprint(payload: SendEmailPayload, record: Record<string, unknown>, successTimestampPaths: string[] = []): string {
  const { idempotencyKey: _transportKey, ...content } = payload;
  return createHash('sha256').update(canonical({ payload: content, record, successTimestampPaths })).digest('hex');
}
export const millis = (value: any): number => typeof value?.toMillis === 'function' ? value.toMillis() : new Date(value ?? 0).getTime() || 0;
export function marketingAllowed(data: Record<string, any>): boolean {
  return data.emailConsent === true && data.unsubscribed !== true;
}
/** Stable completion fields are filled only after verified acceptance. */
export function completionRecord(record: Record<string, any>, paths: string[], acceptedAt: number) {
  const result = JSON.parse(JSON.stringify(record));
  for (const path of paths) {
    const parts = path.split('.');
    if (parts.some(part => !/^[A-Za-z0-9_-]+$/.test(part) || ['__proto__', 'prototype', 'constructor'].includes(part))) throw new Error('Invalid completion path');
    let target = result;
    for (const part of parts.slice(0, -1)) target = target[part] ??= {};
    target[parts[parts.length - 1]] = new Date(acceptedAt).toISOString();
  }
  return result;
}
export function hasAcceptanceProof(state: Record<string, any>): boolean {
  const proof = state.providerAcceptance;
  return typeof proof?.id === 'string' && proof.id.length > 0 &&
    Number.isFinite(proof.acceptedAt) && proof.acceptedAt >= state.firstAttemptAt &&
    Number.isSafeInteger(state.generation) && state.generation >= 0 &&
    !!state.payload?.idempotencyKey && proof.idempotencyKey === state.payload.idempotencyKey &&
    proof.generation === state.generation && proof.fingerprint === state.fingerprint &&
    state.fingerprint === candidateFingerprint(state.payload, state.record ?? {}, state.successTimestampPaths ?? []);
}
export function acceptedUserUpdate(state: Record<string, any>, data: Record<string, any>, id: string) {
  const acceptedAt = state.providerAcceptance.acceptedAt;
  return { ...completionRecord(state.record ?? {}, state.successTimestampPaths ?? [], acceptedAt),
    emailsSent: FieldValue.arrayUnion(state.emailKey),
    ...(state.payload.kind === 'campaign' ? { lastEmailSent: new Date(Math.max(millis(data.lastEmailSent), acceptedAt)),
      ...(data.marketingEmailLease?.deliveryId === id ? { marketingEmailLease: FieldValue.delete() } : {}) } : {}) };
}
export async function sendDurableEmail(opts: DurableEmailOptions): Promise<DurableOutcome> {
  const db = getAdminDb();
  const id = createHash('sha256').update(`${opts.uid}:${opts.dedupeKey}`).digest('hex');
  const ref = db.collection('emailDeliveries').doc(id);
  const userRef = db.collection('users').doc(opts.uid);
  const owner = randomUUID();
  const now = Date.now();
  const candidatePayload = { ...opts.payload, from: opts.payload.from ?? DEFAULT_FROM };
  const campaign = opts.payload.kind === 'campaign';
  const eligible = (data: Record<string, any>) => (!opts.eligible || opts.eligible(data)) &&
    (!opts.retryPolicy || retryPolicyEligible(opts.retryPolicy, data, Date.now())) && (!opts.recovery || !!opts.retryPolicy);
  if (opts.recovery) {
    if (opts.recovery.deliveryId !== id) return 'quarantined';
    const account = await getAdminAuth().getUser(opts.uid);
    if (account.disabled || account.email !== opts.payload.to) return 'ineligible';
  }
  const claim = await db.runTransaction(async tx => {
    const [delivery, user] = await Promise.all([tx.get(ref), tx.get(userRef)]);
    const state = delivery.data();
    const data = user.data() ?? {};
    if (opts.recovery && (!state || !['sending', 'failed_uncertain'].includes(state.status) ||
      state.firstAttemptAt !== opts.recovery.firstAttemptAt || state.generation !== opts.recovery.generation ||
      state.fingerprint !== opts.recovery.fingerprint || state.nextAttemptAt > now ||
      !state.retryPolicy || canonical(state.retryPolicy) !== canonical(opts.retryPolicy))) return { outcome: 'in_flight' as const };
    if (state?.status === 'sent' || data.emailsSent?.includes(opts.emailKey)) return { outcome: 'already_sent' as const };
    if (state && state.leaseUntil <= now && hasAcceptanceProof(state)) {
      tx.set(ref, { status: 'sent', providerId: state.providerAcceptance.id,
        sentAt: state.providerAcceptance.acceptedAt, reconciledAt: now, leaseUntil: 0 }, { merge: true });
      if (user.data()) tx.set(userRef, acceptedUserUpdate(state, data, id), { merge: true });
      return { outcome: 'already_sent' as const };
    }
    if (state?.status === 'quarantined' || (state && !['failed_known', 'cancelled'].includes(state.status) && (!Number.isFinite(state.firstAttemptAt) || state.firstAttemptAt <= 0 || now < state.firstAttemptAt || now - state.firstAttemptAt >= RETRY_WINDOW_MS))) {
      tx.set(ref, { status: 'quarantined' }, { merge: true });
      return { outcome: 'quarantined' as const };
    }
    if (state?.leaseUntil > now) return { outcome: 'in_flight' as const };
    const retryUncertain = !!state && state.status !== 'failed_known' && state.status !== 'cancelled';
    const fingerprint = candidateFingerprint(candidatePayload, opts.record ?? {}, opts.successTimestampPaths);
    const previousFingerprint = state?.payload ? candidateFingerprint(state.payload, state.record ?? {}, state.successTimestampPaths ?? []) : null;
    // An incoming eligibility callback describes the incoming event, not the
    // stored event. Never use it to authorize a different uncertain message.
    if (retryUncertain && (state.attemptCount ?? 0) >= MAX_RECOVERY_ATTEMPTS) {
      tx.set(ref, { status: 'quarantined', quarantineReason: 'attempt_limit' }, { merge: true });
      return { outcome: 'quarantined' as const };
    }
    if (retryUncertain && fingerprint !== previousFingerprint) {
      tx.set(ref, { status: 'quarantined', quarantineReason: 'candidate_changed_after_uncertain_send' }, { merge: true });
      return { outcome: 'quarantined' as const };
    }
    if (retryUncertain && (!state.retryPolicy || !retryPolicyEligible(state.retryPolicy, data, now))) return { outcome: 'ineligible' as const };
    if ((campaign && !marketingAllowed(data)) || !eligible(data)) return { outcome: 'ineligible' as const };
    if (retryUncertain && state.nextAttemptAt > now) return { outcome: 'in_flight' as const };
    if (campaign) {
      const lock = data.marketingEmailLease;
      if (lock?.deliveryId !== id && (lock?.until > now || lock?.uncertain === true)) return { outcome: 'in_flight' as const };
      if ((!state || ['failed_known', 'cancelled'].includes(state.status)) && now - millis(data.lastEmailSent) < (opts.gapMs ?? 24 * 60 * 60_000)) return { outcome: 'ineligible' as const };
      tx.set(userRef, { marketingEmailLease: { deliveryId: id, until: now + LEASE_MS, uncertain: true } }, { merge: true });
    }
    const generation = (state?.generation ?? 0) + (state && fingerprint !== previousFingerprint ? 1 : 0);
    const payload = retryUncertain ? state.payload : { ...candidatePayload,
      idempotencyKey: state && fingerprint === previousFingerprint ? state.payload.idempotencyKey : `email/${id}/${generation}` };
    const record = retryUncertain ? state.record ?? {} : opts.record ?? {};
    tx.set(ref, { uid: opts.uid, dedupeKey: opts.dedupeKey, emailKey: opts.emailKey, status: 'sending', payload, generation, fingerprint,
      successTimestampPaths: retryUncertain ? state.successTimestampPaths ?? [] : opts.successTimestampPaths ?? [],
      retryPolicy: retryUncertain ? state.retryPolicy ?? null : opts.retryPolicy ?? null,
      attemptCount: retryUncertain ? (state.attemptCount ?? 0) + 1 : 1,
      nextAttemptAt: now + Math.min(60, 5 * 2 ** Math.min(state?.attemptCount ?? 0, 4)) * 60_000,
      record, firstAttemptAt: retryUncertain ? state.firstAttemptAt : now,
      leaseUntil: now + LEASE_MS, owner }, { merge: true });
    return { retryUncertain, firstAttemptAt: retryUncertain ? state.firstAttemptAt : now, payload: payload as SendEmailPayload, record, retryPolicy: retryUncertain ? state.retryPolicy : opts.retryPolicy, successTimestampPaths: retryUncertain ? state.successTimestampPaths ?? [] : opts.successTimestampPaths ?? [] };
  });
  if ('outcome' in claim) return claim.outcome!;
  if (claim.retryUncertain || opts.recovery) {
    const account = await getAdminAuth().getUser(opts.uid);
    if (account.disabled || account.email !== claim.payload!.to) return 'ineligible';
  }
  // Recheck consent immediately before the external call, including retries.
  const fresh = (await userRef.get()).data() ?? {};
  if ((campaign && !marketingAllowed(fresh)) || !eligible(fresh) || (claim.retryPolicy && !retryPolicyEligible(claim.retryPolicy, fresh, Date.now()))) {
    await db.runTransaction(async tx => {
      const [currentDoc, freshUser] = await Promise.all([tx.get(ref), tx.get(userRef)]);
      const current = currentDoc.data();
      if (current?.owner !== owner) return;
      tx.set(ref, { status: claim.retryUncertain ? 'failed_uncertain' : 'failed_known', leaseUntil: 0 }, { merge: true });
      if (campaign && !claim.retryUncertain && freshUser.data()?.marketingEmailLease?.deliveryId === id) tx.set(userRef, { marketingEmailLease: FieldValue.delete() }, { merge: true });
    });
    return 'ineligible';
  }
  if (Date.now() - claim.firstAttemptAt >= RETRY_WINDOW_MS) return 'quarantined';
  const result = await sendEmail(claim.payload!, { previousUncertain: claim.retryUncertain, notAfter: Math.min(claim.firstAttemptAt + RETRY_WINDOW_MS, claim.retryPolicy?.expiresAt ?? Infinity) });
  if (!result.ok) {
    const uncertain = result.uncertain === true || claim.retryUncertain;
    await db.runTransaction(async tx => {
      const [currentDoc, freshUser] = await Promise.all([tx.get(ref), tx.get(userRef)]);
      const current = currentDoc.data();
      if (current?.owner !== owner) return;
      tx.set(ref, { status: uncertain ? 'failed_uncertain' : 'failed_known', leaseUntil: 0,
        lastError: result.error ?? 'Send failed' }, { merge: true });
      if (campaign && !uncertain && freshUser.data()?.marketingEmailLease?.deliveryId === id) tx.set(userRef, { marketingEmailLease: FieldValue.delete() }, { merge: true });
    });
    if (result.quotaExhausted) throw new QuotaExhaustedError(result.error);
    throw new Error(result.error ?? 'Send failed');
  }
  if (!result.id) throw new Error('Provider acceptance missing message ID');
  // Persist provider acceptance separately so a later marker failure can be
  // reconciled without another provider call, even after retention expires.
  await db.runTransaction(async tx => {
    const current = (await tx.get(ref)).data();
    if (current?.owner !== owner) throw new Error('Delivery lease changed; reconciliation required');
    tx.set(ref, { providerAcceptance: { id: result.id ?? null, acceptedAt: Date.now(),
      fingerprint: current.fingerprint, generation: current.generation, idempotencyKey: claim.payload!.idempotencyKey } }, { merge: true });
  });
  await db.runTransaction(async tx => {
    const [delivery, user] = await Promise.all([tx.get(ref), tx.get(userRef)]);
    const current = delivery.data(); const data = user.data();
    if (current?.status === 'sent') return; // recovery already finalized it
    if (current?.owner !== owner) throw new Error('Delivery lease changed; reconciliation required');
    const acceptedAt = current.providerAcceptance.acceptedAt;
    tx.set(ref, { status: 'sent', providerId: result.id, sentAt: acceptedAt, leaseUntil: 0 }, { merge: true });
    if (data) tx.set(userRef, { ...completionRecord(claim.record, claim.successTimestampPaths, acceptedAt), emailsSent: FieldValue.arrayUnion(opts.emailKey),
      ...(campaign ? { lastEmailSent: new Date(Math.max(millis(data.lastEmailSent), acceptedAt)),
        ...(data.marketingEmailLease?.deliveryId === id ? { marketingEmailLease: FieldValue.delete() } : {}) } : {}) }, { merge: true });
  });
  return 'sent';
}
