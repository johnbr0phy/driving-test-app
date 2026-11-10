require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const Module = require('node:module');
let event, sends = [], welcomes = 0, receiptOutcome = 'sent';
const rows = new Map();
const ref = key => ({ get: async () => ({ exists: rows.has(key), data: () => rows.get(key) }), key,
  set: async (data, opts) => rows.set(key, opts?.merge ? { ...rows.get(key), ...data } : data),
  update: async data => rows.set(key, { ...rows.get(key), ...data }) });
const db = { collection: name => ({ doc: id => ref(`${name}/${id}`) }),
  runTransaction: async fn => fn({ get: r => r.get(), set: (r, data, opts) => r.set(data, opts) }) };
const auth = { verifyIdToken: async token => { if (token !== 'valid') throw new Error('bad token'); return { uid: 'u' }; },
  getUser: async () => ({ email: 'account@example.com', metadata: { creationTime: new Date().toISOString() } }) };
const oldLoad = Module._load;
let welcome, webhook, tokens;
try {
  Module._load = function(request, parent, main) {
    if (request === '@/lib/firebase-admin') return { getAdminDb: () => db, getAdminAuth: () => auth };
    if (request === '@/lib/server/welcomeEmail') return { WELCOME_MAX_AGE_MS: 86400000, sendWelcomeEmail: async () => { welcomes++; return { ok: true }; } };
    if (request === '@/lib/stripe') return { getStripe: () => ({ webhooks: { constructEvent: () => event } }) };
    if (request === '@/lib/server/durableEmail') return { sendDurableEmail: async options => { sends.push(options); if (receiptOutcome instanceof Error) throw receiptOutcome; return receiptOutcome; } };
    if (request === '@/lib/email-templates') return { EMAIL_TEMPLATES: { purchaseWelcome: voice => `Receipt ${voice.id}` } };
    return oldLoad.call(this, request, parent, main);
  };
  welcome = require('../app/api/send-welcome-email/route.ts').POST;
  webhook = require('../app/api/stripe/webhook/route.ts').POST;
  tokens = require('../lib/unsubscribe.ts');
} finally { Module._load = oldLoad; }
const req = (body, token) => new Request('https://tigertest.io/api/send-welcome-email', { method: 'POST', headers: token ? { authorization: `Bearer ${token}` } : {}, body: JSON.stringify(body) });
const stripeReq = () => new Request('https://tigertest.io/api/stripe/webhook', { method: 'POST', headers: { 'stripe-signature': 'test' }, body: '{}' });
test('welcome rejects unauthenticated, bad-token and mismatched UID', async () => {
  for (const [token, uid, status] of [[undefined,'u',401], ['invalid','u',401], ['valid','other',403]]) {
    assert.equal((await welcome(req({ userId: uid }, token))).status, status);
  }
  assert.equal(welcomes, 0);
});
test('authenticated signup freezes original exam, ignores current exam and request consent', async () => {
  rows.clear();
  await welcome(req({ userId: 'u', signupUrl: 'https://tigertest.io/signup?redirect=/ccma/dashboard', emailConsent: true }, 'valid'));
  assert.equal(rows.get('users/u').firstSignupExamId, 'ccma');
  assert.equal(rows.get('users/u').emailConsent, undefined);
  await welcome(req({ userId: 'u', signupUrl: 'https://tigertest.io/sat/dashboard' }, 'valid'));
  assert.equal(rows.get('users/u').firstSignupExamId, 'ccma');
});
test('unpaid checkout does not grant entitlement or send mail', async () => {
  rows.clear(); sends = [];
  event = { id: 'evt_1', type: 'checkout.session.completed', data: { object: { id: 'cs_1', payment_status: 'unpaid', metadata: { userId: 'u' } } } };
  assert.equal((await webhook(stripeReq())).status, 200);
  assert.equal(rows.size, 0); assert.equal(sends.length, 0);
});
test('paid replay preserves opt-out, entitlement timestamp and refunded payment; receipt is transactional', async () => {
  rows.clear(); sends = [];
  rows.set('users/u', { emailConsent: false, unsubscribed: true, firstSignupExamId: 'ccma' });
  event = { id: 'evt_2', type: 'checkout.session.completed', data: { object: { id: 'cs_1', payment_status: 'paid', currency: 'usd', amount_total: 999, payment_intent: 'pi_1', customer: 'cus_1', metadata: { userId: 'u', email: 'untrusted@example.com' } } } };
  assert.equal((await webhook(stripeReq())).status, 200);
  const purchaseTime = rows.get('users/u').subscription.purchasedAt;
  rows.set('payments/pi_1', { ...rows.get('payments/pi_1'), status: 'refunded' });
  await webhook(stripeReq());
  assert.equal(rows.get('users/u').unsubscribed, true);
  assert.equal(rows.get('users/u').subscription.purchasedAt, purchaseTime);
  assert.equal(rows.get('payments/pi_1').status, 'refunded');
  assert.equal(sends[0].payload.kind, 'transactional');
  assert.equal(sends[0].payload.replyTo, process.env.EMAIL_REPLY_TO ?? 'john@johnbrophy.net');
  assert.equal(sends[0].payload.to, 'account@example.com');
  assert.equal(sends[0].dedupeKey, sends[1].dedupeKey);
  assert.equal(rows.get('fulfilledCheckouts/cs_1').examId, 'ccma');
});
test('signed unsubscribe rejects tampering, accepts old inbox links, fails closed without secret', () => {
  process.env.EMAIL_UNSUBSCRIBE_SECRET = 'local-test-key';
  const token = tokens.unsubscribeToken('u');
  assert.equal(tokens.uidFromToken(token), 'u');
  assert.equal(tokens.uidFromToken(token + 'x'), null);
  assert.equal(tokens.uidFromToken(Buffer.from('u').toString('base64')), 'u');
  delete process.env.EMAIL_UNSUBSCRIBE_SECRET;
  assert.throws(() => tokens.unsubscribeToken('u'), /required/);
  assert.equal(tokens.uidFromToken(token), null);
});

function legacyPaidEvent() {
  return { id: 'evt_legacy_replay', type: 'checkout.session.completed', data: { object: {
    id: 'cs_legacy', payment_status: 'paid', currency: 'usd', amount_total: 999,
    payment_intent: 'pi_legacy', customer: 'cus_1', metadata: { userId: 'u' },
  } } };
}
test('legacy refunded payment replay preserves revoked entitlement and never resends marked receipt', async () => {
  rows.clear(); sends = [];
  const user = { subscription: { isPremium: false, stripePaymentId: 'pi_legacy', purchasedAt: '2025-01-01' }, emailsSent: ['purchaseWelcome'] };
  const payment = { userId: 'u', stripePaymentIntentId: 'pi_legacy', status: 'refunded', createdAt: '2025-01-01' };
  rows.set('users/u', structuredClone(user)); rows.set('payments/pi_legacy', structuredClone(payment));
  event = legacyPaidEvent();
  assert.equal((await webhook(stripeReq())).status, 200);
  assert.equal((await webhook(stripeReq())).status, 200);
  assert.deepEqual(rows.get('users/u'), user);
  assert.deepEqual(rows.get('payments/pi_legacy'), payment);
  assert.equal(sends.length, 0);
  assert.equal(rows.get('fulfilledCheckouts/cs_legacy').receiptDisposition, 'legacy_receipt_marked');
});
test('legacy succeeded payment with unknown receipt outcome is reconciled without backfill', async () => {
  rows.clear(); sends = [];
  const user = { subscription: { isPremium: true, purchasedAt: '2025-02-02' } };
  rows.set('users/u', structuredClone(user));
  rows.set('payments/pi_legacy', { userId: 'u', status: 'succeeded' });
  event = legacyPaidEvent();
  assert.equal((await webhook(stripeReq())).status, 200);
  assert.deepEqual(rows.get('users/u'), user);
  assert.equal(sends.length, 0);
  assert.equal(rows.get('fulfilledCheckouts/cs_legacy').receiptDisposition, 'legacy_outcome_unknown_no_backfill');
});
test('legacy entitlement payment ID alone protects partial historical fulfillment', async () => {
  rows.clear(); sends = [];
  const user = { subscription: { isPremium: false, stripePaymentId: 'pi_legacy', purchasedAt: '2025-03-03' } };
  rows.set('users/u', structuredClone(user));
  event = legacyPaidEvent();
  assert.equal((await webhook(stripeReq())).status, 200);
  assert.deepEqual(rows.get('users/u'), user);
  assert.equal(sends.length, 0);
  assert.equal(rows.get('fulfilledCheckouts/cs_legacy').legacyProcessed, true);
});


test('delayed successful checkout grants once and requests receipt retry until confirmed', async () => {
  rows.clear(); sends = [];
  event = legacyPaidEvent();
  event.type = 'checkout.session.async_payment_succeeded';
  for (const outcome of ['in_flight', 'quarantined', 'ineligible', new Error('provider unavailable')]) {
    receiptOutcome = outcome;
    assert.equal((await webhook(stripeReq())).status, 503);
    assert.equal(rows.get('users/u').subscription.isPremium, true);
  }
  const purchasedAt = rows.get('users/u').subscription.purchasedAt;
  for (const outcome of ['sent', 'already_sent']) {
    receiptOutcome = outcome;
    assert.equal((await webhook(stripeReq())).status, 200);
    assert.equal(rows.get('users/u').subscription.purchasedAt, purchasedAt);
  }
  assert.equal(new Set(sends.map(send => send.dedupeKey)).size, 1);
  receiptOutcome = 'sent';
});
