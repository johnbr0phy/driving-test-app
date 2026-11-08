/** Existing-attempt recovery only. No audience enrollment and no new payloads. */
import { FieldPath } from 'firebase-admin/firestore';
import { getAdminDb } from '@/lib/firebase-admin';
import { candidateFingerprint, hasAcceptanceProof, acceptedUserUpdate, MAX_RECOVERY_ATTEMPTS, RETRY_WINDOW_MS, sendDurableEmail } from '@/lib/server/durableEmail';
import { retryPolicyEligible } from '@/lib/server/emailRetryPolicy';

const PENDING = ['sending', 'failed_uncertain', 'quarantined'];
const ID = /^[a-f0-9]{64}$/;
export function recoveryDisposition(state: Record<string, any>, now = Date.now()): string {
  if (!PENDING.includes(state.status)) return 'not_pending';
  if (state.leaseUntil > now) return 'leased';
  if (hasAcceptanceProof(state)) return 'accepted_needs_markers';
  if (state.status === 'quarantined') return 'quarantined';
  if (!Number.isFinite(state.firstAttemptAt) || state.firstAttemptAt <= 0 ||
      now < state.firstAttemptAt || now - state.firstAttemptAt >= RETRY_WINDOW_MS) return 'expired_or_invalid_attempt';
  if ((state.attemptCount ?? 0) >= MAX_RECOVERY_ATTEMPTS) return 'attempt_limit';
  if (!state.retryPolicy || !state.dedupeKey || !state.uid || !state.emailKey ||
      !state.payload?.idempotencyKey || !state.fingerprint ||
      state.fingerprint !== candidateFingerprint(state.payload, state.record ?? {}, state.successTimestampPaths ?? [])) return 'missing_or_invalid_retry_contract';
  if (state.nextAttemptAt > now) return 'backoff';
  return 'due';
}
/** Only locally persisted provider acceptance can settle an attempt. An operator
 * supplied message ID, a sent marker alone, or a provider search is not proof. */
export async function settleAcceptedDelivery(id: string): Promise<boolean> {
  if (!ID.test(id)) return false;
  const db = getAdminDb();
  const ref = db.collection('emailDeliveries').doc(id);
  return db.runTransaction(async tx => {
    const state = (await tx.get(ref)).data();
    if (!state || !PENDING.includes(state.status) || state.leaseUntil > Date.now() || !hasAcceptanceProof(state)) return false;
    const userRef = db.collection('users').doc(state.uid);
    const user = (await tx.get(userRef)).data();
    tx.set(ref, { status: 'sent', providerId: state.providerAcceptance.id,
      sentAt: state.providerAcceptance.acceptedAt, reconciledAt: Date.now(), leaseUntil: 0 }, { merge: true });
    // Do not recreate a deleted user or remove another delivery's newer lock.
    if (user) tx.set(userRef, acceptedUserUpdate(state, user, id), { merge: true });
    return true;
  });
}
export async function quarantineDelivery(id: string, reason: string): Promise<boolean> {
  const db = getAdminDb();
  const ref = db.collection('emailDeliveries').doc(id);
  return db.runTransaction(async tx => {
    const state = (await tx.get(ref)).data();
    if (!state || !['sending', 'failed_uncertain'].includes(state.status) || state.leaseUntil > Date.now() || hasAcceptanceProof(state)) return false;
    const disposition = recoveryDisposition(state);
    // Re-evaluate under the transaction; an intervening retry must not be
    // quarantined on the basis of a stale scan.
    if (disposition !== reason) return false;
    tx.set(ref, { status: 'quarantined', quarantineReason: reason }, { merge: true });
    return true;
  });
}
export async function recoverDelivery(id: string, allowRetry: boolean): Promise<string> {
  if (!ID.test(id)) return 'invalid_id';
  if (await settleAcceptedDelivery(id)) return 'reconciled';
  const db = getAdminDb();
  const state = (await db.collection('emailDeliveries').doc(id).get()).data();
  if (!state) return 'missing';
  const disposition = recoveryDisposition(state);
  if (['expired_or_invalid_attempt', 'missing_or_invalid_retry_contract', 'attempt_limit'].includes(disposition)) {
    await quarantineDelivery(id, disposition);
    return disposition;
  }
  if (disposition !== 'due' || !allowRetry) return disposition;
  const user = (await db.collection('users').doc(state.uid).get()).data();
  if (!user || !retryPolicyEligible(state.retryPolicy, user, Date.now())) return 'ineligible';
  return sendDurableEmail({ uid: state.uid, dedupeKey: state.dedupeKey, emailKey: state.emailKey,
    payload: state.payload, record: state.record ?? {}, successTimestampPaths: state.successTimestampPaths ?? [], retryPolicy: state.retryPolicy,
    recovery: { deliveryId: id, firstAttemptAt: state.firstAttemptAt, generation: state.generation,
      fingerprint: state.fingerprint } });
}
/** Bounded pages, stable document-ID cursor, no addresses, bodies or errors. */
export async function recoveryPage(cursor?: string) {
  if (cursor && !ID.test(cursor)) throw new Error('Invalid cursor');
  let query = getAdminDb().collection('emailDeliveries').where('status', 'in', PENDING)
    .orderBy(FieldPath.documentId()).limit(100);
  if (cursor) query = query.startAfter(cursor);
  const page = await query.get();
  return { rows: page.docs.map(doc => {
    const state = doc.data();
    return { id: doc.id, status: state.status, disposition: recoveryDisposition(state),
      firstAttemptAt: state.firstAttemptAt ?? null, nextAttemptAt: state.nextAttemptAt ?? null };
  }), nextCursor: page.size === 100 ? page.docs[page.docs.length - 1].id : null };
}
