require('tsx/cjs');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const quotaPath = require.resolve('../lib/email-quota.ts');
let reserved = 0, released = 0, exhausted = 0, allowed = true;
require.cache[quotaPath] = { id: quotaPath, filename: quotaPath, loaded: true, exports: {
  reserveSend: async () => { reserved++; return allowed; },
  releaseSend: async () => { released++; }, markQuotaExhausted: async () => { exhausted++; },
} };
const resendPath = require.resolve('resend');
let response = { data: { id: 'provider-id' }, error: null }, call;
require.cache[resendPath] = { id: resendPath, filename: resendPath, loaded: true, exports: {
  Resend: class { emails = { send: async (...args) => { call = args; if (response instanceof Error) throw response; return response; } }; },
} };
process.env.RESEND_API_KEY = 'test-key';
process.env.EMAIL_POSTAL_ADDRESS = 'Test postal address';
const { sendEmail } = require('../lib/resend.ts');
const payload = { to: 'test@example.com', subject: 'Test', html: '<p>Verified content</p>', kind: 'campaign', idempotencyKey: 'event/session-1' };

test('provider gets a stable idempotency key outside the body', async () => {
  const result = await sendEmail(payload);
  assert.equal(result.ok, true); assert.equal(result.id, 'provider-id');
  assert.equal(call[1].idempotencyKey, 'event/session-1');
  assert.equal(call[0].idempotencyKey, undefined);
});
test('preview fixtures, unresolved values and absent postal address fail before quota', async () => {
  const before = reserved;
  for (const html of ['{{name}}', '<img src="asset:ccma03">', 'https://example.invalid/link']) {
    assert.equal((await sendEmail({ ...payload, html })).ok, false);
  }
  delete process.env.EMAIL_POSTAL_ADDRESS;
  assert.equal((await sendEmail(payload)).ok, false);
  assert.equal(reserved, before);
  assert.equal((await sendEmail({ ...payload, kind: 'transactional' })).ok, true);
  process.env.EMAIL_POSTAL_ADDRESS = 'Test postal address';
});
test('transient rate limit does not exhaust the day or block transactional reserve', async () => {
  response = { error: { name: 'rate_limit_exceeded', message: 'Too many requests' } };
  const before = released;
  const result = await sendEmail(payload);
  assert.equal(result.quotaExhausted, false); assert.equal(result.uncertain, false);
  assert.equal(exhausted, 0); assert.equal(released, before + 1);
});
test('daily quota latches, network ambiguity and missing provider id remain uncertain', async () => {
  response = { error: { name: 'daily_quota_exceeded', message: 'Daily quota exceeded' } };
  assert.equal((await sendEmail(payload)).quotaExhausted, true); assert.equal(exhausted, 1);
  const before = released;
  response = new Error('timeout after request');
  assert.equal((await sendEmail(payload)).uncertain, true); assert.equal(released, before);
  response = { data: null, error: null };
  const result = await sendEmail(payload);
  assert.equal(result.ok, false); assert.equal(result.uncertain, true); assert.equal(released, before);
});
test('missing provider configuration is a definite preflight failure, not uncertain delivery', async () => {
  const before = reserved;
  delete process.env.RESEND_API_KEY;
  const result = await sendEmail(payload);
  assert.equal(result.ok, false); assert.equal(result.uncertain, false); assert.equal(reserved, before);
  process.env.RESEND_API_KEY = 'test-key';
});
test('idempotency conflicts may refer to an accepted original and stay uncertain', async () => {
  const before = released;
  for (const name of ['concurrent_idempotent_requests','invalid_idempotent_request']) {
    response = { error: {name,message:'Existing idempotent request'} };
    const result = await sendEmail(payload);
    assert.equal(result.ok,false); assert.equal(result.uncertain,true);
  }
  assert.equal(released,before);
});
