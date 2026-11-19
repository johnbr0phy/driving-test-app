/**
 * Firestore side of email domain blocking (rules in lib/emailDomainBlock.ts).
 *
 * emailDomains/{domain}: {
 *   domain, bounced: { [sha1(address)]: ISO time }, bouncedAddresses,
 *   delivered, lastBounceAt, lastBounceMessage,
 *   blocked, blockedAt, blockedBy ('auto' | 'admin' | 'seed'),
 *   manual ('blocked' | 'allowed' | null), updatedAt
 * }
 * Addresses are stored hashed, so the doc says how many people bounced, not who.
 */
import { createHash } from 'crypto';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb } from '@/lib/firebase-admin';
import {
  SEED_BLOCKED_DOMAINS, domainDocId, emailDomain, isProtectedDomain, shouldBlockDomain,
} from '@/lib/emailDomainBlock';

const COLLECTION = 'emailDomains';
const CACHE_MS = 5 * 60_000;

let cache: { at: number; blocked: Set<string>; allowed: Set<string> } | null = null;

async function loadSets() {
  if (cache && Date.now() - cache.at < CACHE_MS) return cache;
  const col = getAdminDb().collection(COLLECTION);
  const [blockedSnap, allowedSnap] = await Promise.all([
    col.where('blocked', '==', true).get(),
    col.where('manual', '==', 'allowed').get(),
  ]);
  cache = {
    at: Date.now(),
    blocked: new Set(blockedSnap.docs.map((d) => d.get('domain') as string)),
    allowed: new Set(allowedSnap.docs.map((d) => d.get('domain') as string)),
  };
  return cache;
}

/** Drop the in-memory copy (after an admin change on this instance). */
export function clearBlockedDomainCache() {
  cache = null;
}

/**
 * Whether we should not send to this address because its domain is blocked.
 * Fails open on a Firestore error (except for the seed list), so an outage
 * never stops welcome or purchase emails.
 */
export async function isEmailDomainBlocked(email: string): Promise<boolean> {
  const domain = emailDomain(email);
  if (!domain || isProtectedDomain(domain)) return false;
  try {
    const { blocked, allowed } = await loadSets();
    if (allowed.has(domain)) return false;
    if (blocked.has(domain)) return true;
  } catch (err) {
    console.error('[emailDomains] could not read blocked domains:', err);
  }
  return (SEED_BLOCKED_DOMAINS as readonly string[]).includes(domain);
}

const hashAddress = (email: string) => createHash('sha1').update(email.trim().toLowerCase()).digest('hex');

/** Record a hard bounce; blocks the domain when the rule says so. Returns the new blocked state. */
export async function recordBounce(email: string, message?: string | null): Promise<{ domain: string; blocked: boolean } | null> {
  const domain = emailDomain(email);
  if (!domain || isProtectedDomain(domain)) return null;
  const ref = getAdminDb().collection(COLLECTION).doc(domainDocId(domain));
  const now = new Date().toISOString();
  const blocked = await getAdminDb().runTransaction(async (tx) => {
    const data = (await tx.get(ref)).data() ?? {};
    const bounced: Record<string, string> = { ...(data.bounced ?? {}) };
    bounced[hashAddress(email)] = now;
    const bouncedAddresses = Object.keys(bounced).length;
    const seeded = (SEED_BLOCKED_DOMAINS as readonly string[]).includes(domain);
    const nowBlocked = shouldBlockDomain(domain, {
      bouncedAddresses, delivered: data.delivered ?? 0, manual: data.manual ?? null, seeded,
    });
    tx.set(ref, {
      domain, bounced, bouncedAddresses, lastBounceAt: now,
      lastBounceMessage: (message ?? '').slice(0, 300) || null,
      blocked: nowBlocked,
      ...(nowBlocked && !data.blocked ? { blockedAt: now, blockedBy: seeded ? 'seed' : 'auto' } : {}),
      updatedAt: now,
    }, { merge: true });
    return nowBlocked;
  });
  if (blocked) clearBlockedDomainCache();
  return { domain, blocked };
}

/**
 * Count a delivery. Only touches domains we already track (they have a
 * bounce), so ordinary deliveries cost one read and no write.
 */
export async function recordDelivery(email: string): Promise<void> {
  const domain = emailDomain(email);
  if (!domain || isProtectedDomain(domain)) return;
  const ref = getAdminDb().collection(COLLECTION).doc(domainDocId(domain));
  const snap = await ref.get();
  if (!snap.exists) return;
  const data = snap.data() ?? {};
  const delivered = (data.delivered ?? 0) + 1;
  const seeded = (SEED_BLOCKED_DOMAINS as readonly string[]).includes(domain);
  const blocked = shouldBlockDomain(domain, {
    bouncedAddresses: data.bouncedAddresses ?? 0, delivered, manual: data.manual ?? null, seeded,
  });
  await ref.set({ delivered: FieldValue.increment(1), blocked, updatedAt: new Date().toISOString() }, { merge: true });
  if (blocked !== !!data.blocked) clearBlockedDomainCache();
}

/** An admin blocks or allows a domain; `null` hands it back to the automatic rule. */
export async function setDomainManual(domainInput: string, manual: 'blocked' | 'allowed' | null) {
  const domain = emailDomain(`x@${domainInput}`);
  if (!domain) throw new Error('Not a domain');
  if (isProtectedDomain(domain) && manual === 'blocked') throw new Error('That mailbox provider cannot be blocked');
  const ref = getAdminDb().collection(COLLECTION).doc(domainDocId(domain));
  const now = new Date().toISOString();
  await getAdminDb().runTransaction(async (tx) => {
    const data = (await tx.get(ref)).data() ?? {};
    const seeded = (SEED_BLOCKED_DOMAINS as readonly string[]).includes(domain);
    const blocked = shouldBlockDomain(domain, {
      bouncedAddresses: data.bouncedAddresses ?? 0, delivered: data.delivered ?? 0, manual, seeded,
    });
    tx.set(ref, {
      domain, manual, blocked,
      ...(blocked && !data.blocked ? { blockedAt: now, blockedBy: manual === 'blocked' ? 'admin' : seeded ? 'seed' : 'auto' } : {}),
      updatedAt: now,
    }, { merge: true });
  });
  clearBlockedDomainCache();
}

export interface EmailDomainRow {
  domain: string;
  blocked: boolean;
  blockedBy: string | null;
  blockedAt: string | null;
  manual: 'blocked' | 'allowed' | null;
  bouncedAddresses: number;
  delivered: number;
  lastBounceAt: string | null;
  lastBounceMessage: string | null;
  seeded: boolean;
}

/** Every tracked domain plus the seed list, blocked first, then most bounces. */
export async function listEmailDomains(): Promise<EmailDomainRow[]> {
  const snap = await getAdminDb().collection(COLLECTION).orderBy('updatedAt', 'desc').limit(300).get();
  const rows = new Map<string, EmailDomainRow>();
  for (const d of snap.docs) {
    const x = d.data();
    const domain = x.domain as string;
    const seeded = (SEED_BLOCKED_DOMAINS as readonly string[]).includes(domain);
    rows.set(domain, {
      domain,
      blocked: shouldBlockDomain(domain, { bouncedAddresses: x.bouncedAddresses ?? 0, delivered: x.delivered ?? 0, manual: x.manual ?? null, seeded }),
      blockedBy: x.blockedBy ?? null, blockedAt: x.blockedAt ?? null, manual: x.manual ?? null,
      bouncedAddresses: x.bouncedAddresses ?? 0, delivered: x.delivered ?? 0,
      lastBounceAt: x.lastBounceAt ?? null, lastBounceMessage: x.lastBounceMessage ?? null, seeded,
    });
  }
  for (const domain of SEED_BLOCKED_DOMAINS) {
    if (!rows.has(domain)) rows.set(domain, {
      domain, blocked: true, blockedBy: 'seed', blockedAt: null, manual: null,
      bouncedAddresses: 0, delivered: 0, lastBounceAt: null, lastBounceMessage: null, seeded: true,
    });
  }
  return [...rows.values()].sort((a, b) =>
    Number(b.blocked) - Number(a.blocked) || b.bouncedAddresses - a.bouncedAddresses || a.domain.localeCompare(b.domain));
}
