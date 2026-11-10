require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const Module = require('node:module');
const original = Module._load;
let rows = new Map(), fail = false, chain = Promise.resolve(), afterTransaction = () => {};
const db = { doc: key => ({ key }), runTransaction(fn) {
  const task = chain.then(async () => {
    if (fail) throw new Error('database unavailable');
    const changes = [];
    const result = await fn({ get: async ref => ({ data: () => rows.get(ref.key) }), set: (ref, update, opts) => changes.push([ref.key, update, opts]) });
    for (const [key, update, opts] of changes) rows.set(key, opts?.merge ? { ...rows.get(key), ...update } : update);
    afterTransaction(); return result;
  }); chain = task.catch(() => {}); return task;
} };
let quota;
try {
  Module._load = function(request, parent, main) {
    if (request === '@/lib/firebase-admin') return { getAdminDb: () => db };
    return original.call(this, request, parent, main);
  };
  quota = require('../lib/email-quota.ts');
} finally { Module._load = original; }
const day = () => new Date().toISOString().slice(0, 10);
test('campaign reserve and DB failures fail closed', async () => {
  rows = new Map([['system/emailQuota', { date: day(), count: quota.CAMPAIGN_BUDGET }]]);
  assert.equal(await quota.reserveSend('campaign'), false);
  assert.ok(await quota.reserveSend('transactional'));
  fail = true; assert.equal(await quota.reserveSend('campaign'), false); fail = false;
});
test('concurrent same-key requests charge once and cannot release one anothers slot', async () => {
  rows = new Map();
  const [a, b] = await Promise.all([quota.reserveSend('campaign', 'key'), quota.reserveSend('campaign', 'key')]);
  assert.equal(rows.get('system/emailQuota').count, 1);
  await quota.releaseSend(a); await quota.releaseSend(b);
  assert.equal(rows.get('system/emailQuota').count, 1);
});
test('uncertain replay retains original charge even when current response is known rejection', async () => {
  rows = new Map();
  await quota.reserveSend('campaign', 'key');
  const replay = await quota.reserveSend('campaign', 'key', true);
  await quota.releaseSend(replay);
  assert.equal(rows.get('system/emailQuota').count, 1);
});
test('known rejection releases exactly once and a subsequent attempt reserves again', async () => {
  rows = new Map(); const claim = await quota.reserveSend('campaign', 'known');
  await quota.releaseSend(claim); await quota.releaseSend(claim);
  assert.equal(rows.get('system/emailQuota').count, 0);
  assert.ok(await quota.reserveSend('campaign', 'known'));
  assert.equal(rows.get('system/emailQuota').count, 1);
});
test('UTC rollover creates a new reservation; late release/latch never changes newer budget', async () => {
  const RealDate = Date;
  let now = Date.parse('2026-11-09T23:59:59Z');
  global.Date = class extends RealDate { constructor(...args) { super(...(args.length ? args : [now])); } static now() { return now; } };
  try {
    rows = new Map(); const old = await quota.reserveSend('transactional', 'midnight');
    now += 2000;
    const next = await quota.reserveSend('transactional', 'midnight', true);
    assert.notEqual(next.id, old.id);
    await quota.releaseSend(old); await quota.markQuotaExhausted(old);
    assert.equal(rows.get('system/emailQuota').count, 1);
    assert.equal(rows.get('system/emailQuota').exhausted, false);
    await quota.releaseSend(next);
    assert.equal(rows.get('system/emailQuota').count, 1);
  } finally { global.Date = RealDate; }
});


test('sender reacquires after quota transaction crosses midnight and obeys new day ceiling', async () => {
  let calls = 0;
  let sendEmail;
  try {
    Module._load = function(request, parent, main) {
      if (request === 'resend') return { Resend: class { emails = { send: async () => { calls++; return { data: { id: 'id' }, error: null }; } }; } };
      return original.call(this, request, parent, main);
    };
    ({ sendEmail } = require('../lib/resend.ts'));
  } finally { Module._load = original; }
  process.env.RESEND_API_KEY = 'offline-test'; process.env.EMAIL_POSTAL_ADDRESS = 'Offline test fixture';
  const RealDate = Date; let now = Date.parse('2026-11-09T23:59:59Z');
  global.Date = class extends RealDate { constructor(...args) { super(...(args.length ? args : [now])); } static now() { return now; } };
  try {
    rows = new Map();
    afterTransaction = () => {
      afterTransaction = () => {}; now += 2000;
      rows.set('system/emailQuota', { date: '2026-11-10', count: quota.CAMPAIGN_BUDGET, exhausted: false });
    };
    const result = await sendEmail({ to: 'test@example.com', subject: 'test', html: 'test', kind: 'campaign', idempotencyKey: 'rollover-send' });
    assert.equal(result.ok, false); assert.equal(calls, 0);
    assert.equal(rows.get('system/emailQuota').count, quota.CAMPAIGN_BUDGET);
    assert.equal(rows.get('system/emailQuota').date, '2026-11-10');
    rows = new Map(); now = Date.parse('2026-11-10T12:00:00Z');
    const eventDeadline = now + 30_000;
    afterTransaction = () => { afterTransaction = () => {}; now += 60_000; };
    const expired = await sendEmail({ to: 'test@example.com', subject: 'test', html: 'test', kind: 'campaign', idempotencyKey: 'event-expired' }, { notAfter: eventDeadline });
    assert.equal(expired.ok, false); assert.equal(calls, 0);
    assert.match(expired.error, /deadline elapsed/);
    assert.equal(rows.get('system/emailQuota').count, 0);
  } finally { global.Date = RealDate; afterTransaction = () => {}; }
});
