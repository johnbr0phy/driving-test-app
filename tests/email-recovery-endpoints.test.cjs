require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const Module = require('node:module');
const { NextRequest, NextResponse } = require('next/server');
const old = Module._load;
let denied = true, scans = 0, recovered = [], rows = [], fail = false;
let report, worker;
try {
  Module._load = function (request, parent, main) {
    if (request === '@/lib/server/adminAuth') return { requireAdmin: async () => denied ? NextResponse.json({ error: 'Forbidden' }, { status: 403 }) : null };
    if (request === '@/lib/server/emailRecovery') return {
      recoveryPage: async () => { scans++; if (fail) throw new Error('secret provider content'); return { rows, nextCursor: null }; },
      recoverDelivery: async (id, allowRetry) => { recovered.push({ id, allowRetry }); return 'due'; },
    };
    return old.call(this, request, parent, main);
  };
  report = require('../app/api/admin/email-recovery/route.ts').GET;
  worker = require('../app/api/cron/email-recovery/route.ts').POST;
} finally { Module._load = old; }
const req = (token, query = '') => new NextRequest(`https://example.com/api/cron/email-recovery${query}`, { method: 'POST', headers: token ? { authorization: `Bearer ${token}` } : {} });
test('report denies nonadmin without scanning and GET never reconciles or sends', async () => {
  assert.equal((await report(req())).status, 403); assert.equal(scans, 0);
  denied = false;
  assert.equal((await report(req())).status, 200); assert.equal(recovered.length, 0);
});
test('worker fails closed without secret even in development; disabled mode performs no reads', async () => {
  delete process.env.CRON_SECRET; process.env.EMAIL_RECOVERY_MODE = 'retry';
  assert.equal((await worker(req())).status, 401);
  process.env.CRON_SECRET = 'offline-test'; delete process.env.EMAIL_RECOVERY_MODE;
  const before = scans;
  assert.deepEqual(await (await worker(req('offline-test'))).json(), { disabled: true });
  assert.equal(scans, before); assert.equal(recovered.length, 0);
});
test('reconcile mode never authorizes retry; bounded cursor does not skip unprocessed rows', async () => {
  rows = Array.from({ length: 25 }, (_, i) => ({ id: i.toString(16).padStart(64, '0'), disposition: 'due' }));
  process.env.EMAIL_RECOVERY_MODE = 'reconcile';
  const response = await worker(req('offline-test')); const body = await response.json();
  assert.equal(recovered.length, 20); assert.ok(recovered.every(row => row.allowRetry === false));
  assert.equal(body.nextCursor, rows[19].id);
  assert.equal(response.headers.get('cache-control'), 'no-store');
});
test('retry mode explicitly authorizes existing-record retry; invalid cursors and failures are safe', async () => {
  recovered = []; rows = [{ id: 'a'.repeat(64) }]; process.env.EMAIL_RECOVERY_MODE = 'retry';
  await worker(req('offline-test')); assert.equal(recovered[0].allowRetry, true);
  assert.equal((await worker(req('offline-test', '?cursor=bad'))).status, 400);
  fail = true; const response = await worker(req('offline-test'));
  assert.equal(response.status, 503); assert.doesNotMatch(JSON.stringify(await response.json()), /secret provider/);
});
