// The guest checkout end to end against fake Stripe, Firebase Auth and
// Firestore: checkout, webhook, success page and purchase check, in the
// orders they can really arrive in.
require('tsx/cjs');
const assert = require('node:assert/strict');
const { test, beforeEach } = require('node:test');
const Module = require('node:module');

// ---- fakes -------------------------------------------------------------
const rows = new Map();
const docRef = key => ({
  key,
  get: async () => ({ exists: rows.has(key), data: () => rows.get(key) }),
  set: async (data, opts) => rows.set(key, opts?.merge ? { ...rows.get(key), ...data } : data),
  create: async data => { await tick(); if (rows.has(key)) { const e = new Error('ALREADY_EXISTS'); e.code = 6; throw e; } rows.set(key, data); },
  update: async data => rows.set(key, { ...rows.get(key), ...data }),
});
const db = {
  collection: name => ({
    doc: id => docRef(`${name}/${id}`),
    where: (field, _op, value) => ({ limit: () => ({ get: async () => ({ docs: [...rows].filter(([k, v]) => k.startsWith(`${name}/`) && v[field] === value).map(([k, v]) => ({ id: k.slice(name.length + 1), data: () => v })) }) }) }),
  }),
  runTransaction: async fn => fn({ get: r => r.get(), set: (r, d, o) => r.set(d, o) }),
};
const tick = () => new Promise(r => setImmediate(r));

let users = new Map(); // uid -> user
let uidSeq = 0;
const authErr = code => Object.assign(new Error(code), { code });
const auth = {
  verifyIdToken: async t => { const u = users.get(t.replace('tok-', '')); if (!u) throw authErr('auth/argument-error'); return { uid: u.uid, email: u.email }; },
  getUserByEmail: async email => { await tick(); for (const u of users.values()) if (u.email === email.toLowerCase()) return u; throw authErr('auth/user-not-found'); },
  createUser: async ({ email }) => {
    await tick();
    for (const u of users.values()) if (u.email === email) throw authErr('auth/email-already-exists');
    const u = { uid: `u${++uidSeq}`, email, providerData: [], metadata: { creationTime: new Date().toUTCString() } };
    users.set(u.uid, u); return u;
  },
  getUser: async uid => { const u = users.get(uid); if (!u) throw authErr('auth/user-not-found'); return u; },
  createCustomToken: async uid => `custom-${uid}`,
};
const addUser = (email, providers = ['password'], createdAgoMs = 86400000 * 30) => {
  const u = { uid: `u${++uidSeq}`, email, providerData: providers.map(p => ({ providerId: p })), metadata: { creationTime: new Date(Date.now() - createdAgoMs).toUTCString() } };
  users.set(u.uid, u); return u;
};

const sessions = new Map();
let created = []; // checkout params
let event;
const stripe = {
  customers: { list: async () => ({ data: [] }), create: async ({ email }) => ({ id: `cus_${email}` }) },
  checkout: { sessions: {
    create: async params => { created.push(params); const id = `cs_test_${created.length}`; sessions.set(id, { id, created: Math.floor(Date.now() / 1000), metadata: params.metadata, payment_status: 'unpaid', currency: 'usd', amount_total: 999, payment_intent: `pi_${id}` }); return { url: `https://checkout.stripe.test/${id}` }; },
    retrieve: async id => { const s = sessions.get(id); if (!s) throw new Error('No such checkout.session'); return s; },
  } },
  webhooks: { constructEvent: () => event },
  paymentIntents: { retrieve: async () => ({}) },
};
let receipts = [];

const oldLoad = Module._load;
let checkout, webhook, guestSession, verify;
try {
  Module._load = function (request, parent, main) {
    if (request === '@/lib/firebase-admin') return { getAdminDb: () => db, getAdminAuth: () => auth };
    if (request === '@/lib/stripe') return { getStripe: () => stripe, getPremiumProductId: async () => 'prod', PREMIUM_PRICE_ID: 'price_usd', PREMIUM_PRODUCT: { name: 'Premium' } };
    if (request === '@/lib/server/durableEmail') return { sendDurableEmail: async o => { receipts.push(o); return 'sent'; } };
    if (request === '@/lib/server/visitorCountry') return { visitorCountry: () => 'US' };
    return oldLoad.call(this, request, parent, main);
  };
  process.env.STRIPE_SECRET_KEY = 'sk_test';
  checkout = require('../app/api/stripe/checkout/route.ts').POST;
  webhook = require('../app/api/stripe/webhook/route.ts').POST;
  guestSession = require('../app/api/stripe/guest-session/route.ts').POST;
  verify = require('../app/api/stripe/verify-purchase/route.ts').POST;
} finally { Module._load = oldLoad; }

const { NextRequest } = require('next/server');
const post = (fn, path, body, token) => fn(new NextRequest(`https://www.tigertest.io${path}`, { method: 'POST', headers: { 'content-type': 'application/json', ...(token ? { authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(body) }));
const json = async r => ({ status: r.status, body: await r.json() });

async function startGuest(body = {}) {
  const r = await json(await post(checkout, '/api/stripe/checkout', { location: 'stats_page', returnPath: '/cdl/stats', ...body }));
  assert.equal(r.status, 200, JSON.stringify(r.body));
  return [...sessions.keys()].pop();
}
function pay(id, email, status = 'paid') {
  const s = sessions.get(id);
  s.payment_status = status;
  s.customer_details = { email };
}
const fireWebhook = async (id, type = 'checkout.session.completed') => {
  event = { id: `evt_${id}_${type}`, type, data: { object: sessions.get(id) } };
  return json(await webhook(new NextRequest('https://www.tigertest.io/api/stripe/webhook', { method: 'POST', headers: { 'stripe-signature': 's' }, body: '{}' })));
};
const back = async id => json(await post(guestSession, '/api/stripe/guest-session', { sessionId: id }));
const verifyAs = async (id, uid) => json(await post(verify, '/api/stripe/verify-purchase', { sessionId: id }, `tok-${uid}`));
const premium = uid => rows.get(`users/${uid}`)?.subscription?.isPremium === true;

beforeEach(() => { rows.clear(); users = new Map(); sessions.clear(); created = []; receipts = []; });

// ---- scenarios ----------------------------------------------------------
test('guest checkout: no customer, Stripe makes one, metadata has no userId', async () => {
  const id = await startGuest();
  const p = created[0];
  assert.equal(p.customer, undefined);
  assert.equal(p.customer_creation, 'always');
  assert.deepEqual([p.metadata.guest, p.metadata.userId, p.metadata.email], ['1', undefined, undefined]);
  assert.match(p.success_url, /\/cdl\/stats\?session_id=\{CHECKOUT_SESSION_ID\}&success=true$/);
  assert.ok(id);
});

test('signed-in checkout is unchanged', async () => {
  const u = addUser('me@example.com');
  const r = await json(await post(checkout, '/api/stripe/checkout', { location: 'stats_page' }, `tok-${u.uid}`));
  assert.equal(r.status, 200);
  assert.equal(created[0].customer, 'cus_me@example.com');
  assert.equal(created[0].metadata.userId, u.uid);
  assert.equal(created[0].metadata.guest, undefined);
});

test('a bad token is refused, not silently turned into a guest checkout', async () => {
  const r = await json(await post(checkout, '/api/stripe/checkout', {}, 'tok-nobody'));
  assert.equal(r.status, 401);
  assert.equal(created.length, 0);
});

test('new email, webhook first: account made, Premium on, buyer signed in, verify passes', async () => {
  const id = await startGuest(); pay(id, 'New@Example.com ');
  assert.equal((await fireWebhook(id)).status, 200);
  const [u] = users.values();
  assert.equal(u.email, 'new@example.com');
  assert.ok(premium(u.uid));
  assert.equal(rows.get(`payments/pi_${id}`).guestCheckout, 'new_account');
  assert.equal(receipts.length, 1);
  assert.match(receipts[0].payload.html, /new@example\.com/);
  const r = await back(id);
  assert.deepEqual([r.body.status, r.body.customToken], ['sign_in', `custom-${u.uid}`]);
  assert.equal((await verifyAs(id, u.uid)).body.isPremium, true);
});

test('new email, success page first, then webhook: same single account', async () => {
  const id = await startGuest(); pay(id, 'first@example.com');
  const r = await back(id);
  assert.equal(r.body.status, 'sign_in');
  assert.equal((await fireWebhook(id)).status, 200);
  assert.equal(users.size, 1);
  assert.ok(premium([...users.values()][0].uid));
});

test('webhook and success page at the same instant: one account, both agree, sign-in allowed', async () => {
  const id = await startGuest(); pay(id, 'race@example.com');
  const [w, b] = await Promise.all([fireWebhook(id), back(id)]);
  assert.equal(w.status, 200);
  assert.equal(users.size, 1);
  const u = [...users.values()][0];
  assert.equal(b.body.status, 'sign_in');
  assert.equal(rows.get(`guestCheckouts/${id}`).uid, u.uid);
  assert.ok(premium(u.uid));
});

test('webhook retried: Premium granted once, one receipt, one account', async () => {
  const id = await startGuest(); pay(id, 'retry@example.com');
  await fireWebhook(id); await fireWebhook(id);
  assert.equal(users.size, 1);
  assert.equal(receipts.length, 2); // durable email dedupes by key
  assert.equal(new Set(receipts.map(r => r.dedupeKey)).size, 1);
});

test('email that already has an account: Premium goes to it, no sign-in token', async () => {
  const owner = addUser('owner@example.com', ['password']);
  const id = await startGuest(); pay(id, 'OWNER@example.com');
  await fireWebhook(id);
  assert.equal(users.size, 1);
  assert.ok(premium(owner.uid));
  assert.equal(rows.get(`payments/pi_${id}`).guestCheckout, 'existing_account');
  const r = await back(id);
  assert.equal(r.body.status, 'existing_account');
  assert.equal(r.body.customToken, undefined);
  assert.equal(r.body.email, 'ow***@example.com');
  // After signing in normally the page's purchase check passes for the owner only.
  assert.equal((await verifyAs(id, owner.uid)).body.isPremium, true);
  const other = addUser('other@example.com');
  assert.equal((await verifyAs(id, other.uid)).body.isPremium, false);
});

test('attacker pays with a victim\'s Google-only email: never signed in to it', async () => {
  const victim = addUser('victim@gmail.com', ['google.com']);
  const id = await startGuest(); pay(id, 'victim@gmail.com');
  await fireWebhook(id);
  const r = await back(id);
  assert.equal(r.body.status, 'existing_account');
  assert.ok(premium(victim.uid));
});

test('second guest purchase on an account an earlier guest checkout made but never signed in to', async () => {
  const a = await startGuest(); pay(a, 'twice@example.com');
  await fireWebhook(a);
  // Seconds later, inside the clock-skew allowance on the account's age.
  const b = await startGuest(); pay(b, 'twice@example.com');
  await fireWebhook(b);
  assert.equal(users.size, 1);
  // The account was made for session a, so b may not sign in from a payment.
  assert.equal((await back(b)).body.status, 'existing_account');
  assert.equal((await back(a)).body.status, 'sign_in');
});

test('success URL used after the buyer set a password: no more sign-in from it', async () => {
  const id = await startGuest(); pay(id, 'later@example.com');
  await fireWebhook(id);
  const u = [...users.values()][0];
  u.providerData = [{ providerId: 'password' }];
  assert.equal((await back(id)).body.status, 'existing_account');
});

test('success URL older than a day: no sign-in from it', async () => {
  const id = await startGuest(); pay(id, 'old@example.com');
  await fireWebhook(id);
  sessions.get(id).created -= 25 * 3600;
  assert.equal((await back(id)).body.status, 'existing_account');
});

test('async payment: nothing until it succeeds, then the account and Premium', async () => {
  const id = await startGuest(); pay(id, 'slow@example.com', 'unpaid');
  assert.equal((await fireWebhook(id)).body.skipped, 'unpaid');
  assert.equal((await back(id)).body.status, 'unpaid');
  assert.equal(users.size, 0);
  sessions.get(id).payment_status = 'paid';
  assert.equal((await fireWebhook(id, 'checkout.session.async_payment_succeeded')).status, 200);
  assert.equal(users.size, 1);
  assert.equal((await back(id)).body.status, 'sign_in');
});

test('a signed-in session id is not a guest voucher', async () => {
  const u = addUser('me@example.com');
  await json(await post(checkout, '/api/stripe/checkout', {}, `tok-${u.uid}`));
  const id = [...sessions.keys()].pop(); pay(id, 'me@example.com');
  assert.equal((await back(id)).body.status, 'not_guest');
});

test('junk or unknown session ids are refused', async () => {
  assert.equal((await back('../../x')).status, 400);
  assert.equal((await back(123)).status, 400);
  assert.equal((await back('cs_test_nope')).status, 500);
});
