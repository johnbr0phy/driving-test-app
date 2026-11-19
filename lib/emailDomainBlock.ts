/**
 * Which email domains we stop sending to, and why (pure rules, no I/O).
 *
 * Some domains refuse all outside mail: school districts that give students
 * an address on a domain that only takes internal mail (daytonpublic.com was
 * the first). Resend blocks one bounced address at a time, so every new
 * student on such a domain still costs a bounce, and a high bounce rate can
 * get the whole sending account paused.
 *
 * So the Resend webhook (app/api/webhooks/resend) counts hard bounces per
 * domain, and a domain is blocked once BLOCK_AFTER_BOUNCES different
 * addresses on it have hard-bounced and none has ever been delivered to.
 * sendEmail() and sendDurableEmail() skip blocked domains. Big mailbox
 * providers are never blocked or even counted. An admin can block or allow a
 * domain by hand on the /admin Users tab; that choice wins.
 *
 * Pinned by tests/email-domain-block.test.cjs.
 */

/** Different addresses on one domain that must hard-bounce before it is blocked. */
export const BLOCK_AFTER_BOUNCES = 3;

/** Blocked from the start, before any webhook data (seen bouncing in Nov 2026). */
export const SEED_BLOCKED_DOMAINS = ['daytonpublic.com'] as const;

/** Mailbox providers and our own domains: never blocked, never counted. */
const NEVER_BLOCK = new Set([
  'gmail.com', 'googlemail.com', 'icloud.com', 'me.com', 'mac.com', 'aol.com',
  'msn.com', 'proton.me', 'protonmail.com', 'pm.me', 'gmx.com', 'gmx.net', 'gmx.de',
  'web.de', 'mail.com', 'zoho.com', 'yandex.com', 'yandex.ru', 'mail.ru', 'qq.com',
  '163.com', '126.com', 'naver.com', 'daum.net', 'fastmail.com', 'hey.com',
  'comcast.net', 'att.net', 'sbcglobal.net', 'verizon.net', 'cox.net', 'charter.net',
  'tigertest.io', 'johnbrophy.net',
]);
/** Families with a domain per country (yahoo.co.uk, hotmail.fr, outlook.com.au...). */
const NEVER_BLOCK_FAMILY = /^(yahoo|ymail|rocketmail|hotmail|outlook|live|windowslive|btinternet|orange|libero|wanadoo|t-online)\./;

/** The lower-cased domain of an address, or null when it has none. */
export function emailDomain(email: string | null | undefined): string | null {
  if (!email) return null;
  const at = email.lastIndexOf('@');
  if (at < 1 || at === email.length - 1) return null;
  const domain = email.slice(at + 1).trim().toLowerCase().replace(/\.$/, '');
  return /^[a-z0-9.-]+\.[a-z0-9-]{2,}$/.test(domain) ? domain : null;
}

/** True for domains that may never be blocked (and are not tracked). */
export function isProtectedDomain(domain: string): boolean {
  return NEVER_BLOCK.has(domain) || NEVER_BLOCK_FAMILY.test(domain);
}

/** A Firestore doc id for a domain (dots are fine in doc ids, slashes are not). */
export function domainDocId(domain: string): string {
  return domain.replace(/\//g, '_');
}

export interface DomainBounceState {
  /** Different addresses on the domain that hard-bounced. */
  bouncedAddresses: number;
  /** Emails Resend reported delivered to the domain. */
  delivered: number;
  /** An admin's choice, which wins over the counts. */
  manual?: 'blocked' | 'allowed' | null;
  seeded?: boolean;
}

/** Whether a domain should be blocked given its counts. */
export function shouldBlockDomain(domain: string, state: DomainBounceState): boolean {
  if (isProtectedDomain(domain)) return false;
  if (state.manual === 'allowed') return false;
  if (state.manual === 'blocked') return true;
  if (state.seeded) return true;
  return state.bouncedAddresses >= BLOCK_AFTER_BOUNCES && state.delivered === 0;
}

/**
 * Whether a Resend bounce counts toward blocking. Only permanent (hard)
 * bounces count: a full mailbox or a greylist delay says nothing about the
 * domain. Resend sends `bounce.type` "Permanent", "Transient" or "Undetermined".
 */
export function isHardBounce(bounce: { type?: string | null } | null | undefined): boolean {
  const type = (bounce?.type ?? '').toLowerCase();
  return type === '' || type === 'permanent' || type === 'hard';
}
