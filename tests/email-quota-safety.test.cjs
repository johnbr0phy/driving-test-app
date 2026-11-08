require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const Module = require('node:module');
const original = Module._load;
let data = {}, fail = false;
let quota;
try {
  Module._load = function(request, parent, main) {
    if (request === '@/lib/firebase-admin') return { getAdminDb: () => ({
      doc: () => ({}),
      runTransaction: async fn => { if (fail) throw new Error('database unavailable'); return fn({ get: async () => ({ data: () => data }), set: (_ref, update) => { data = {...data, ...update}; } }); },
    }) };
    return original.call(this, request, parent, main);
  };
  quota = require('../lib/email-quota.ts');
} finally { Module._load = original; }
test('campaign budget preserves service reserve and DB errors fail closed', async () => {
  data = { date: new Date().toISOString().slice(0,10), count: quota.CAMPAIGN_BUDGET };
  assert.equal(await quota.reserveSend('campaign'), false);
  assert.equal(await quota.reserveSend('transactional'), true);
  fail = true;
  assert.equal(await quota.reserveSend('campaign'), false);
  assert.equal(await quota.reserveSend('transactional'), false);
});
