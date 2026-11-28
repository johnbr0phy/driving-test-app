require('tsx/cjs');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const Module = require('node:module');

const user = { getIdToken: async () => 'test-token' };
let eligible = true;
const load = Module._load;
let reportConfirmedPurchase;
try {
  Module._load = function (id, ...args) {
    if (id === '@/lib/firebase') return { auth: { currentUser: user } };
    if (id === '@/lib/funnel') return { checkoutAttribution: () => ({ source: 'search' }) };
    if (id === '@/lib/checkoutEligibility') return { checkoutMeasurementAllowed: () => eligible };
    return load.call(this, id, ...args);
  };
  ({ reportConfirmedPurchase } = require('../lib/confirmedPurchase.ts'));
} finally {
  Module._load = load;
}

function browser(t, fetchReceipt, wait = (resolve) => resolve()) {
  const events = [];
  const values = new Map();
  const globals = {
    window: { location: { pathname: '/rbt/dashboard' }, setTimeout: wait, gtag: (...args) => events.push(args) },
    localStorage: { getItem: (k) => values.get(k) ?? null, setItem: (k,v) => values.set(k,v) },
    fetch: fetchReceipt,
  };
  for (const [name, value] of Object.entries(globals)) {
    const original = Object.getOwnPropertyDescriptor(globalThis, name);
    Object.defineProperty(globalThis, name, { configurable: true, value });
    t.after(() => original ? Object.defineProperty(globalThis, name, original) : delete globalThis[name]);
  }
  t.after(() => { eligible = true; });
  return events;
}

function receipt(transactionId) {
  return Response.json({ transactionId, currency: 'GBP', value: 7.99, examId: 'rbt',
    paywallLocation: 'rbt_dashboard', checkoutItem: 'set_4', checkoutDevice: 'desktop', buyerState: 'guest' });
}

test('pending webhook and network errors retry, then concurrent handlers and repeat visits emit once', async t => {
  const id = 'cs_test_settled';
  let calls = 0;
  const events = browser(t, async (_url, options) => {
    calls++;
    assert.equal(options.headers.Authorization, 'Bearer test-token');
    if (calls === 1) throw new TypeError('offline');
    if (calls === 2) return new Response(null, { status: 202 });
    return receipt(id);
  });
  await Promise.all([reportConfirmedPurchase(id), reportConfirmedPurchase(id)]);
  await reportConfirmedPurchase(id);
  assert.equal(calls, 3);
  assert.equal(events.length, 1);
  const [command, name, payload] = events[0];
  assert.deepEqual([command, name, payload.transaction_id, payload.value, payload.currency], ['event', 'purchase', id, 7.99, 'GBP']);
  assert.deepEqual([payload.exam_id, payload.checkout_item, payload.checkout_device, payload.buyer_state, payload.first_source],
    ['rbt', 'set_4', 'desktop', 'guest', 'search']);
  assert.equal(JSON.parse(localStorage.getItem('tigertest-reported-purchases'))[0], id);
});

test('ineligible browsers make no receipt request and do not report a purchase', async t => {
  eligible = false;
  let calls = 0;
  const events = browser(t, () => { calls++; });
  await reportConfirmedPurchase('cs_test_denied');
  assert.equal(calls, 0);
  assert.equal(events.length, 0);
});

test('eligibility is rechecked before emission and a different transaction cannot be reported', async t => {
  const id = 'cs_test_revoked';
  const events = browser(t, () => { eligible = false; return receipt(id); });
  await reportConfirmedPurchase(id);
  assert.equal(events.length, 0);
  eligible = true;
  Object.defineProperty(globalThis, 'fetch', { configurable: true, value: () => receipt('cs_wrong') });
  await reportConfirmedPurchase(id);
  assert.equal(events.length, 0);
});
