/** Serializable, fail-closed eligibility guards for an already attempted email.
 * These guards never select a new recipient or rebuild a different event.
 */
import { createHash } from 'crypto';

type CampaignGate = 'NEW_TESTS_CAMPAIGN' | 'QUIZZES_CAMPAIGN' | 'EXIT_QUESTION_CAMPAIGN' | 'TOP_PREPPER_CAMPAIGN';
type Window = { version: 1; capturedAt: number; expiresAt: number; fingerprint: string };
export type EmailRetryPolicy = Window & (
  { kind: 'snapshot'; campaignGate?: CampaignGate } |
  { kind: 'welcome'; teacher: boolean } |
  { kind: 'purchase' }
);

// Use tagged values: a Firestore timestamp must not collide with an ordinary
// object/string. Timestamps and Dates retain their represented instant.
function canonical(value: unknown): string {
  if (value === null) return 'null';
  if (value instanceof Date) {
    if (!Number.isFinite(value.getTime())) throw new Error('Invalid date');
    return `date:${value.getTime()}`;
  }
  if (typeof value === 'object' && typeof (value as { toMillis?: unknown }).toMillis === 'function') {
    const at = (value as { toMillis(): number }).toMillis();
    if (!Number.isFinite(at)) throw new Error('Invalid timestamp');
    return `timestamp:${at}`;
  }
  if (Array.isArray(value)) return `array:[${value.map(canonical).join(',')}]`;
  if (value && typeof value === 'object') {
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) throw new Error('Unsupported snapshot value');
    return `map:{${Object.entries(value).filter(([, v]) => v !== undefined)
      .sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([k, v]) => `${JSON.stringify(k)}:${canonical(v)}`).join(',')}}`;
  }
  if (typeof value === 'number' && !Number.isFinite(value)) throw new Error('Invalid number');
  if (['string', 'number', 'boolean'].includes(typeof value)) return `${typeof value}:${JSON.stringify(value)}`;
  throw new Error('Unsupported snapshot value');
}

function fingerprint(value: unknown): string {
  try { return createHash('sha256').update(canonical(value)).digest('hex'); }
  catch { return ''; } // unsupported/malformed values can never authorize retry
}

function snapshot(raw: Record<string, unknown>): Record<string, unknown> {
  // The claim itself is the only user field our failed attempt may mutate.
  // Any other change (even an unrelated profile edit) conservatively holds it.
  const { marketingEmailLease: _claim, ...eligibilityData } = raw;
  return eligibilityData;
}

function welcomeIdentity(raw: Record<string, any>) {
  return { signupOrigin: raw.signupOrigin ?? null, firstSignupExamId: raw.firstSignupExamId ?? null };
}

export function makeSnapshotRetryPolicy(
  raw: Record<string, unknown>,
  options: { expiresAt: number; campaignGate?: CampaignGate },
  now = Date.now(),
): EmailRetryPolicy {
  return { version: 1, kind: 'snapshot', capturedAt: now, expiresAt: options.expiresAt,
    fingerprint: fingerprint(snapshot(raw)), ...(options.campaignGate ? { campaignGate: options.campaignGate } : {}) };
}

export function makeWelcomeRetryPolicy(raw: Record<string, any>, teacher: boolean, expiresAt: number, now = Date.now()): EmailRetryPolicy {
  return { version: 1, kind: 'welcome', teacher, capturedAt: now, expiresAt,
    fingerprint: fingerprint(welcomeIdentity(raw)) };
}

export function makePurchaseRetryPolicy(subscription: unknown, now = Date.now()): EmailRetryPolicy {
  return { version: 1, kind: 'purchase', capturedAt: now, expiresAt: now + 23 * 60 * 60_000,
    fingerprint: fingerprint(subscription) };
}

export function retryPolicyEligible(policy: unknown, freshUser: Record<string, any>, now = Date.now()): boolean {
  if (!policy || typeof policy !== 'object' || Array.isArray(policy)) return false;
  const p = policy as EmailRetryPolicy;
  if (p.version !== 1 || !Number.isFinite(p.capturedAt) || !Number.isFinite(p.expiresAt) ||
    !Number.isFinite(now) || p.capturedAt <= 0 || now < p.capturedAt || now > p.expiresAt ||
    p.expiresAt < p.capturedAt || typeof p.fingerprint !== 'string' || !/^[a-f0-9]{64}$/.test(p.fingerprint)) return false;
  if (p.kind === 'snapshot') {
    if (p.campaignGate !== undefined &&
      (!['NEW_TESTS_CAMPAIGN', 'QUIZZES_CAMPAIGN', 'EXIT_QUESTION_CAMPAIGN', 'TOP_PREPPER_CAMPAIGN'].includes(p.campaignGate) ||
        process.env[p.campaignGate] !== 'send')) return false;
    return fingerprint(snapshot(freshUser)) === p.fingerprint;
  }
  if (p.kind === 'welcome') {
    if (typeof p.teacher !== 'boolean' ||
      (p.teacher && (freshUser.signupOrigin?.source !== 'authenticated_signup' || freshUser.signupOrigin?.teacher !== true))) return false;
    return fingerprint(welcomeIdentity(freshUser)) === p.fingerprint;
  }
  if (p.kind === 'purchase') {
    return freshUser.subscription?.isPremium === true && fingerprint(freshUser.subscription) === p.fingerprint;
  }
  return false;
}
