// Pins the email domain blocking rules (lib/emailDomainBlock.ts), the Svix
// signature check the Resend webhook uses, and that sendEmail() skips a
// blocked domain before charging the daily budget.
require('tsx/cjs');
const test = require('node:test');
const assert = require('node:assert/strict');
const { createHmac } = require('node:crypto');
const {
  emailDomain, isProtectedDomain, shouldBlockDomain, isHardBounce, BLOCK_AFTER_BOUNCES, SEED_BLOCKED_DOMAINS,
} = require('../lib/emailDomainBlock.ts');
const { verifySvixSignature } = require('../lib/server/svixVerify.ts');

test('emailDomain lower-cases and rejects junk', () => {
  assert.equal(emailDomain('AP174667@DaytonPublic.com'), 'daytonpublic.com');
  assert.equal(emailDomain('a@b'), null);
  assert.equal(emailDomain('no-at-sign'), null);
  assert.equal(emailDomain(''), null);
  assert.equal(emailDomain(null), null);
});

test('big providers and our own domains are never blocked', () => {
  for (const d of ['gmail.com', 'outlook.com', 'hotmail.co.uk', 'yahoo.fr', 'icloud.com', 'tigertest.io']) {
    assert.ok(isProtectedDomain(d), d);
    assert.equal(shouldBlockDomain(d, { bouncedAddresses: 50, delivered: 0 }), false, d);
    assert.equal(shouldBlockDomain(d, { bouncedAddresses: 0, delivered: 0, manual: 'blocked' }), false, d);
  }
});

test('a domain is blocked after enough bounces and no deliveries', () => {
  const d = 'district.k12.oh.us';
  assert.equal(shouldBlockDomain(d, { bouncedAddresses: BLOCK_AFTER_BOUNCES - 1, delivered: 0 }), false);
  assert.equal(shouldBlockDomain(d, { bouncedAddresses: BLOCK_AFTER_BOUNCES, delivered: 0 }), true);
  assert.equal(shouldBlockDomain(d, { bouncedAddresses: 10, delivered: 1 }), false, 'one delivery means the domain takes mail');
});

test('an admin choice wins, and the seed list starts blocked', () => {
  assert.equal(shouldBlockDomain('x.org', { bouncedAddresses: 10, delivered: 0, manual: 'allowed' }), false);
  assert.equal(shouldBlockDomain('x.org', { bouncedAddresses: 0, delivered: 5, manual: 'blocked' }), true);
  assert.ok(SEED_BLOCKED_DOMAINS.includes('daytonpublic.com'));
  assert.equal(shouldBlockDomain('daytonpublic.com', { bouncedAddresses: 0, delivered: 0, seeded: true }), true);
  assert.equal(shouldBlockDomain('daytonpublic.com', { bouncedAddresses: 0, delivered: 0, seeded: true, manual: 'allowed' }), false);
});

test('only hard bounces count', () => {
  assert.equal(isHardBounce({ type: 'Permanent' }), true);
  assert.equal(isHardBounce({ type: 'Transient' }), false);
  assert.equal(isHardBounce({ type: 'Undetermined' }), false);
  assert.equal(isHardBounce(undefined), true, 'email.bounced with no detail is a hard bounce');
});

test('Svix signatures: right one passes, wrong or stale ones fail', () => {
  const key = Buffer.from('test-signing-key-0123456789');
  const secret = `whsec_${key.toString('base64')}`;
  const body = '{"type":"email.bounced"}';
  const now = 1_800_000_000;
  const sign = (id, ts, b) => createHmac('sha256', key).update(`${id}.${ts}.${b}`).digest('base64');
  const good = { id: 'msg_1', timestamp: String(now), signature: `v1,bogus v1,${sign('msg_1', now, body)}` };
  assert.equal(verifySvixSignature(secret, good, body, now), true);
  assert.equal(verifySvixSignature(secret, good, body + ' ', now), false, 'tampered body');
  assert.equal(verifySvixSignature(secret, good, body, now + 600), false, 'too old');
  assert.equal(verifySvixSignature(secret, { ...good, signature: null }, body, now), false);
  assert.equal(verifySvixSignature('', good, body, now), false);
});

test('sendEmail skips a blocked domain before charging the budget', async () => {
  const quotaPath = require.resolve('../lib/email-quota.ts');
  let reserved = 0;
  require.cache[quotaPath] = { id: quotaPath, filename: quotaPath, loaded: true, exports: {
    reserveSend: async () => { reserved++; return { day: new Date().toISOString().slice(0, 10), id: 't', owner: 't' }; },
    releaseSend: async () => {}, markQuotaExhausted: async () => {},
  } };
  const resendPath = require.resolve('resend');
  let calls = 0;
  require.cache[resendPath] = { id: resendPath, filename: resendPath, loaded: true, exports: {
    Resend: class { emails = { send: async () => { calls++; return { data: { id: 'id' }, error: null }; } }; },
  } };
  process.env.RESEND_API_KEY = 'test-key';
  delete process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  const { sendEmail } = require('../lib/resend.ts');
  const payload = { subject: 'Hi', html: '<p>Hi</p>', kind: 'transactional' };
  const blocked = await sendEmail({ ...payload, to: 'ap174667@daytonpublic.com' });
  assert.equal(blocked.ok, false);
  assert.equal(blocked.blockedDomain, true);
  assert.equal(blocked.uncertain, false);
  assert.equal(reserved, 0);
  assert.equal(calls, 0);
  // An uncertain retry must replay the original request, so it is not blocked.
  const retry = await sendEmail({ ...payload, to: 'ap174667@daytonpublic.com' }, { previousUncertain: true });
  assert.equal(retry.ok, true);
  const ok = await sendEmail({ ...payload, to: 'someone@gmail.com' });
  assert.equal(ok.ok, true);
});
