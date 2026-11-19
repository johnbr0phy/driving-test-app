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
  verifyIdToken: async t => {
    const [id, provider = 'password', verified] = t.replace('tok-', '').split('|');
    const u = users.get(id); if (!u) throw authErr('auth/argument-error');
    return { uid: u.uid, email: u.email, email_verified: verified === 'v', firebase: { sign_in_provider: provider } };
  },
  getUserByEmail: async email => { await tick(); for (const u of users.values()) if (u.email === email.toLowerCase()) return u; throw authErr('auth/user-not-found'); },
  createUser: async ({ uid, email }) => {
    await tick();
    if (uid && users.has(uid)) throw authErr('auth/uid-already-exists');
    for (const u of users.values()) if (u.email === email.toLowerCase()) throw authErr('auth/email-already-exists');
    const u = { uid: uid ?? `u${++uidSeq}`, email, providerData: [], metadata: { creationTime: new Date().toUTCString() } };
    users.set(u.uid, u); return u;
  },
  getUser: async uid => { const u = users.get(uid); if (!u) throw authErr('auth/user-not-found'); return u; },
  createCustomToken: async uid => `custom-${uid}`,
  updateUser: async (uid, { providersToUnlink = [], emailVerified }) => { const u = users.get(uid); u.providerData = u.providerData.filter(p => !providersToUnlink.includes(p.providerId)); if (emailVerified !== undefined) u.emailVerified = emailVerified; },
  revokeRefreshTokens: async uid => { users.get(uid).revokedAt = Date.now(); },
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
    create: async params => { created.push(params); const id = `cs_test_${created.length}`; sessions.set(id, { id, created: Math.floor(Date.now() / 1000), metadata: params.metadata, payment_status: 'unpaid', currency: 'usd', amount_total: 999, payment_intent: `pi_${id}` }); return { id, url: `https://checkout.stripe.test/${id}` }; },
    retrieve: async id => { const s = sessions.get(id); if (!s) throw new Error('No such checkout.session'); return s; },
  } },
  webhooks: { constructEvent: () => event },
  refunds: { create: async (p, o) => { if (refundError) throw refundError; refunds.push({ ...p, key: o?.idempotencyKey }); return { id: 're_1' }; } },
  paymentIntents: { retrieve: async () => ({}) },
};
let receipts = [], refunds = [], cookie = '', refundError = null;
const jar = new Map(); // one browser's cookies
const jarHeader = () => [...jar].map(([k, v]) => `${k}=${v}`).join('; ');

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
let claim, linkRoute;
{
  const old = Module._load;
  Module._load = function (request, parent, main) {
    if (request === '@/lib/firebase-admin') return { getAdminDb: () => db, getAdminAuth: () => auth };
    return old.call(this, request, parent, main);
  };
  try {
    claim = require('../app/api/account/guest-claim/route.ts').POST;
    linkRoute = require('../app/api/account/guest-link/route.ts').POST;
  } finally { Module._load = old; }
}
const post = (fn, path, body, token, cookieHeader) => fn(new NextRequest(`https://www.tigertest.io${path}`, { method: 'POST', headers: { 'content-type': 'application/json', ...(token ? { authorization: `Bearer ${token}` } : {}), ...(cookieHeader ? { cookie: cookieHeader } : {}) }, body: JSON.stringify(body) }));
const json = async r => ({ status: r.status, body: await r.json() });

async function startGuest(body = {}) {
  const res = await post(checkout, '/api/stripe/checkout', { location: 'stats_page', returnPath: '/cdl/stats', ...body });
  const set = res.headers.get('set-cookie') || '';
  assert.match(set, /^tt-gc-[0-9a-f]{16}=[^;]+;.*HttpOnly/i);
  assert.match(set, /Path=\/api\/stripe/);
  cookie = set.split(';')[0];
  const [k, v] = cookie.split('=');
  jar.set(k, v);
  const r = await json(res);
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
// The success page, from this browser (all its cookies) or with given ones.
const back = async (id, c = jarHeader()) => json(await post(guestSession, '/api/stripe/guest-session', { sessionId: id }, undefined, c));
const verifyAs = async (id, uid) => json(await post(verify, '/api/stripe/verify-purchase', { sessionId: id }, `tok-${uid}`));
const premium = uid => rows.get(`users/${uid}`)?.subscription?.isPremium === true;

beforeEach(() => { rows.clear(); users = new Map(); sessions.clear(); created = []; receipts = []; refunds = []; cookie = ''; refundError = null; jar.clear(); });

// ---- scenarios ----------------------------------------------------------
test('guest checkout: no customer, Stripe makes one, metadata has no userId', async () => {
  const id = await startGuest();
  const p = created[0];
  assert.equal(p.customer, undefined);
  assert.equal(p.customer_creation, 'always');
  assert.deepEqual([p.metadata.guest, p.metadata.userId, p.metadata.email], ['1', undefined, undefined]);
  assert.match(p.metadata.guestKey, /^[0-9a-f]{64}$/);
  assert.ok(!cookie.includes(p.metadata.guestKey), 'the cookie holds the key, the metadata only its hash');
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
  assert.match(u.uid, /^gc_/);
  const r = await back(id);
  assert.deepEqual([r.body.status, r.body.customToken, r.body.uid], ['sign_in', `custom-${u.uid}`, u.uid]);
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

test('second guest purchase on an account an earlier guest checkout made: Premium only, no sign-in, refunded', async () => {
  const a = await startGuest(); pay(a, 'twice@example.com');
  await fireWebhook(a);
  const b = await startGuest(); pay(b, 'twice@example.com');
  await fireWebhook(b);
  assert.equal(users.size, 1);
  // Already Premium, refunded: told so, never signed in.
  const rb = await back(b);
  assert.deepEqual([rb.body.status, rb.body.customToken], ['already_premium', undefined]);
  assert.equal((await back(a)).body.status, 'sign_in');
  // Already Premium: b is refunded once, never granted twice, no second receipt.
  assert.deepEqual(refunds.map(r => [r.payment_intent, r.key]), [[`pi_${b}`, `guest-duplicate-${b}`]]);
  await fireWebhook(b);
  assert.equal(refunds.length, 2); assert.equal(refunds[1].key, refunds[0].key); // Stripe dedupes by key
  assert.equal(receipts.length, 1);
});

test('attacker opens a checkout early, victim pays as a guest, attacker then pays with the victim\'s email', async () => {
  const attacker = await startGuest(); const attackerCookie = cookie; jar.clear(); // the victim's own browser
  const victim = await startGuest(); pay(victim, 'victim@example.com');
  await fireWebhook(victim);
  pay(attacker, 'victim@example.com');
  await fireWebhook(attacker);
  const r = await back(attacker, attackerCookie);
  assert.equal(r.body.status, 'already_premium'); // and refunded
  assert.equal(r.body.customToken, undefined);
});

test('a leaked success URL opened in another browser gets nothing', async () => {
  const id = await startGuest(); pay(id, 'leak@example.com');
  await fireWebhook(id);
  for (const c of ['', `${[...jar.keys()][0]}=wrong`, 'other=1']) {
    const r = await back(id, c);
    assert.equal(r.body.status, 'other_browser');
    assert.equal(r.body.email, undefined);
  }
  assert.equal((await back(id)).body.status, 'sign_in');
});

test('a sign-in that failed on the way can be asked for again from the same browser', async () => {
  const id = await startGuest(); pay(id, 'again@example.com');
  assert.equal((await back(id)).body.status, 'sign_in');
  assert.equal((await back(id)).body.status, 'sign_in');
});

test('two tabs, two guest checkouts, one browser: paying in the first tab still signs in', async () => {
  const first = await startGuest();
  const second = await startGuest();
  assert.equal(jar.size, 2, 'one cookie per checkout');
  pay(first, 'tabs@example.com');
  assert.equal((await back(first)).body.status, 'sign_in');
  assert.equal((await back(second)).body.status, 'unpaid');
});

test('a refund Stripe refuses for good is recorded once, not retried for days', async () => {
  const a = await startGuest(); pay(a, 'dup@example.com'); await fireWebhook(a);
  const b = await startGuest(); pay(b, 'dup@example.com');
  refundError = Object.assign(new Error('No such payment_intent'), { type: 'StripeInvalidRequestError', code: 'resource_missing' });
  assert.deepEqual((await fireWebhook(b)).body, { received: true, skipped: 'duplicate_refund_failed' });
  assert.equal(rows.get(`guestCheckoutProblems/${b}`).problem, 'duplicate_refund_failed');
  refundError = Object.assign(new Error('Charge already refunded'), { type: 'StripeInvalidRequestError', code: 'charge_already_refunded' });
  assert.equal((await fireWebhook(b)).body.skipped, 'already_premium_refunded');
  refundError = Object.assign(new Error('socket hang up'), { type: 'StripeConnectionError' });
  assert.equal((await fireWebhook(b)).status, 503);
});

test('one network may open only so many guest checkouts a day', async () => {
  for (let i = 0; i < 30; i++) await startGuest();
  const r = await json(await post(checkout, '/api/stripe/checkout', { location: 'stats_page' }));
  assert.equal(r.status, 429);
  // Signed-in buyers are not counted.
  const u = addUser('me@example.com');
  assert.equal((await json(await post(checkout, '/api/stripe/checkout', {}, `tok-${u.uid}`))).status, 200);
});

test('the inbox owner reclaims a guest-made account: other sign-ins unlinked, other sessions out', async () => {
  const id = await startGuest(); pay(id, 'squat@example.com'); await fireWebhook(id);
  const u = [...users.values()][0];
  // The payer (maybe not the owner) linked a Google account of their own.
  u.providerData = [{ providerId: 'google.com' }, { providerId: 'password' }];
  const call = async t => json(await claim(new NextRequest('https://www.tigertest.io/api/account/guest-claim', { method: 'POST', headers: { authorization: `Bearer ${t}` } })));
  // Without a verified email (the payer's own Google or password), nothing happens.
  assert.equal((await call(`tok-${u.uid}|google.com`)).body.claimed, false);
  assert.equal((await call(`tok-${u.uid}|custom|v`)).body.claimed, false);
  // The owner, through the reset email (email verified, password provider):
  const r = await call(`tok-${u.uid}|password|v`);
  assert.equal(r.body.claimed, true);
  assert.deepEqual(r.body.unlinked, ['google.com']);
  assert.ok(u.revokedAt);
  assert.equal(r.body.customToken, `custom-${u.uid}`);
  // Only once.
  assert.equal((await call(`tok-${u.uid}|password|v`)).body.claimed, false);
  // Never for an ordinary account.
  const plain = addUser('plain@example.com', ['google.com']);
  assert.equal((await call(`tok-${plain.uid}|google.com|v`)).body.claimed, false);
});

test('a return path may keep a simple query; anything else falls back', async () => {
  await startGuest({ returnPath: '/cdl/stats?tab=community' });
  assert.match(created[0].success_url, /\/cdl\/stats\?tab=community&session_id=/);
  assert.match(created[0].cancel_url, /\/cdl\/stats\?tab=community&canceled=true$/);
  await startGuest({ returnPath: '/x?a=<script>' });
  assert.match(created[1].success_url, /\/dmv\/dashboard\?session_id=/);
  await startGuest({ returnPath: '//evil.com' });
  assert.match(created[2].success_url, /^https:\/\/www\.tigertest\.io\/dmv\/dashboard/);
});

test('success URL used after the buyer set a password: no more sign-in from it', async () => {
  const id = await startGuest(); pay(id, 'later@example.com');
  await fireWebhook(id);
  const u = [...users.values()][0];
  u.providerData = [{ providerId: 'password' }];
  assert.equal((await back(id)).body.status, 'sign_in_used');
});

test('success URL older than a day: no sign-in from it', async () => {
  const id = await startGuest(); pay(id, 'old@example.com');
  await fireWebhook(id);
  sessions.get(id).created -= 25 * 3600;
  const r = await back(id);
  assert.deepEqual([r.body.status, r.body.customToken], ['sign_in_used', undefined]);
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

// ---- the receipt's one-tap sign-in link --------------------------------
const linkOf = html => { const m = html.match(/href="https:\/\/www\.tigertest\.io\/login\/link#s=([^&"]+)&amp;t=([^"]+)"/) || html.match(/href="https:\/\/www\.tigertest\.io\/login\/link#s=([^&"]+)&t=([^"]+)"/); return m && { s: decodeURIComponent(m[1]), t: m[2] }; };
const useLink = async l => json(await post(linkRoute, '/api/account/guest-link', l));

test('new account: the receipt carries a sign-in link that works on another device', async () => {
  const id = await startGuest();
  pay(id, 'new@example.com');
  await fireWebhook(id);
  const l = linkOf(receipts[0].payload.html);
  assert.ok(l, 'receipt has the link');
  assert.equal(l.s, id);
  const uid = rows.get(`guestCheckouts/${id}`).uid;
  const r = await useLink(l);
  assert.equal(r.body.status, 'sign_in');
  assert.equal(r.body.customToken, `custom-${uid}`);
  assert.equal(users.get(uid).emailVerified, true);
  // Reusable within the week (another device).
  assert.equal((await useLink(l)).body.status, 'sign_in');
});

test('a retried webhook sends the same link, not a new one', async () => {
  const id = await startGuest();
  pay(id, 'new@example.com');
  await fireWebhook(id); await fireWebhook(id);
  assert.equal(receipts.length, 2);
  const links = receipts.map(r => linkOf(r.payload.html)?.t).filter(Boolean);
  assert.equal(links.length, 2);
  assert.equal(new Set(links).size, 1);
});

test('an account that already existed gets no sign-in link', async () => {
  addUser('old@example.com');
  const id = await startGuest();
  pay(id, 'old@example.com');
  await fireWebhook(id);
  assert.equal(linkOf(receipts[0].payload.html), null);
  assert.match(receipts[0].payload.html, /https:\/\/www\.tigertest\.io\/login"/);
});

test('using the link the first time takes the account from whoever else added a sign-in', async () => {
  const id = await startGuest();
  pay(id, 'victim@example.com');
  await fireWebhook(id);
  const uid = rows.get(`guestCheckouts/${id}`).uid;
  users.get(uid).providerData = [{ providerId: 'password' }]; // set by the payer, not the inbox owner
  const r = await useLink(linkOf(receipts[0].payload.html));
  assert.equal(r.body.status, 'sign_in');
  assert.deepEqual(users.get(uid).providerData, []);
  assert.ok(users.get(uid).revokedAt);
  // Later uses do not unlink what the owner adds afterwards.
  users.get(uid).providerData = [{ providerId: 'google.com' }];
  users.get(uid).revokedAt = undefined;
  await useLink(linkOf(receipts[0].payload.html));
  assert.deepEqual(users.get(uid).providerData, [{ providerId: 'google.com' }]);
  assert.equal(users.get(uid).revokedAt, undefined);
});

test('a wrong, unknown or expired link signs no one in', async () => {
  const id = await startGuest();
  pay(id, 'new@example.com');
  await fireWebhook(id);
  const l = linkOf(receipts[0].payload.html);
  assert.equal((await useLink({ s: l.s, t: l.t + 'x' })).body.status, 'invalid');
  assert.equal((await useLink({ s: 'cs_test_999', t: l.t })).body.status, 'invalid');
  assert.equal((await useLink({ s: '../users/x', t: l.t })).status, 400);
  rows.get(`guestLoginLinks/${id}`).expiresAt = new Date(Date.now() - 1000);
  assert.equal((await useLink(l)).body.status, 'expired');
});

test('a link stops working once the account changes its email', async () => {
  const id = await startGuest();
  pay(id, 'new@example.com');
  await fireWebhook(id);
  users.get(rows.get(`guestCheckouts/${id}`).uid).email = 'other@example.com';
  assert.equal((await useLink(linkOf(receipts[0].payload.html))).body.status, 'invalid');
});
