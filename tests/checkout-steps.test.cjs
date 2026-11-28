// Exercise the real checkout click handler without sending a payment or analytics.
require('tsx/cjs');
const assert = require('node:assert/strict');
const { beforeEach, test } = require('node:test');
const Module = require('node:module');
const { checkoutDeviceFor, checkoutItemId, checkoutExamId } = require('../lib/checkoutSteps.ts');

const auth = {};
const originalLoad = Module._load;
let startCheckout, trackPaywallDismissed;
try {
  Module._load = function(request, parent, main) {
    if (request === '@/lib/firebase') return { auth };
    if (request === '@/lib/funnel') return { checkoutAttribution: () => ({}) };
    if (request === '@/lib/paywallTest') return { paywallVariantForCheckout: () => null, paywallHitForCheckout: () => null, paywallReturnForCheckout: () => null };
    if (request === '@/lib/enrollment') return {};
    return originalLoad.call(this, request, parent, main);
  };
  ({ startCheckout } = require('../lib/startCheckout.ts'));
  ({ trackPaywallDismissed } = require('../lib/analytics.ts'));
} finally { Module._load = originalLoad; }

const opts = { location: 'rbt_dashboard', feature: 'rbt_premium', itemId: 'exam_rbt_test_5' };
const mobileUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1';
let events, requests, storage, response;
beforeEach(() => {
  events = []; requests = []; storage = new Map();
  auth.authStateReady = async () => {};
  auth.currentUser = null;
  global.window = { location: { hostname: 'www.tigertest.io', pathname: '/rbt/dashboard', origin: 'https://www.tigertest.io' },
    gtag(_type, name, params) { events.push({ name, params }); } };
  Object.defineProperty(global, 'navigator', { configurable: true, value: { userAgent: mobileUA, maxTouchPoints: 5 } });
  global.document = { cookie: 'tt-cc=US' };
  global.localStorage = { getItem: k => storage.get(k) ?? null };
  global.alert = () => {};
  response = () => Response.json({ checkoutUrl: 'https://checkout.stripe.test/' });
  global.fetch = async (url, options) => { requests.push(JSON.parse(options.body)); return response(); };
});

test('preserves the tapped RBT step and feature on dismissal, click and successful handoff', async () => {
  trackPaywallDismissed(opts.location, opts.itemId);
  await startCheckout(opts);
  assert.deepEqual(events.map(e => e.name), ['paywall_dismissed', 'checkout_click', 'begin_checkout']);
  for (const { params } of events) {
    assert.equal(params.exam_id, 'rbt');
    assert.equal(params.paywall_location, opts.location);
    assert.equal(params.checkout_item, opts.itemId);
    assert.equal(params.buyer_state, 'guest');
    assert.equal(params.checkout_device, 'mobile');
  }
  assert.equal(events[2].params.location, opts.feature);
  assert.equal(requests[0].checkoutItem, opts.itemId);
  assert.equal(requests[0].checkoutDevice, 'mobile');
  assert.equal(window.location.href, 'https://checkout.stripe.test/');
});

test('reports bounded failure reasons and only one click per attempt', async t => {
  t.mock.method(console, 'error', () => {});
  for (const [expected, fail] of [
    ['auth_restore', () => { auth.authStateReady = async () => { throw Error('sensitive'); }; }],
    ['auth_token', () => { auth.currentUser = { getIdToken: async () => { throw Error('sensitive'); } }; }],
    ['network', () => { response = () => { throw Error('sensitive'); }; }],
    ['rate_limited', () => { response = () => Response.json({ error: 'sensitive' }, { status: 429 }); }],
    ['server', () => { response = () => new Response('sensitive', { status: 503 }); }],
    ['invalid_response', () => { response = () => Response.json({}); }],
  ]) {
    auth.authStateReady = async () => {}; auth.currentUser = null; events.length = 0;
    fail();
    await startCheckout(opts);
    assert.deepEqual(events.map(e => e.name), ['checkout_click', 'checkout_error']);
    assert.equal(events[1].params.error_reason, expected);
    assert.equal(events[1].params.buyer_state, expected === 'auth_restore' ? 'unknown' : expected === 'auth_token' ? 'signed_in' : 'guest');
    assert.ok(!JSON.stringify(events).includes('sensitive'));
  }
});

test('ineligible browsers still buy without sending checkout analytics or metadata', async () => {
  for (const block of [
    () => { document.cookie = 'tt-cc=DE'; },
    () => { document.cookie = ''; },
    () => { document.cookie = 'tt-cc=US; tt-consent=denied'; },
    () => { window.location.pathname = '/cogat-practice-test'; },
    () => { storage.set('tigertest-classes', '[{"code":"class"}]'); },
    () => { storage.set('tigertest-classes', 'malformed'); },
    () => { storage.set('tigertest-internal', '1'); },
    () => { navigator.webdriver = true; },
  ]) {
    document.cookie = 'tt-cc=US'; storage.clear(); window.location.pathname = '/rbt/dashboard'; navigator.webdriver = false;
    block();
    await startCheckout(opts);
    assert.equal(events.length, 0);
    assert.ok(!('checkoutDevice' in requests.at(-1)));
    assert.ok(!('checkoutItem' in requests.at(-1)));
    assert.equal(window.location.href, 'https://checkout.stripe.test/');
  }
});

test('signed-in token and successful navigation survive an analytics exception', async () => {
  auth.currentUser = { getIdToken: async () => 'private-token', email: 'learner@example.test' };
  window.gtag = () => { throw Error('analytics blocked'); };
  await startCheckout(opts);
  assert.equal(window.location.href, 'https://checkout.stripe.test/');
  assert.equal(requests[0].checkoutItem, opts.itemId);
});

test('only predefined feature patterns cross the payment boundary', () => {
  assert.equal(checkoutExamId('practice_test_4'), 'dmv');
  assert.equal(checkoutExamId('rbt_test'), 'rbt');
  assert.equal(checkoutItemId('exam_rbt_set_4', 'rbt_dashboard'), 'exam_rbt_set_4');
  assert.equal(checkoutItemId('exam_other_test_5', 'rbt_dashboard'), undefined);
  assert.equal(checkoutItemId('exam_rbt_learner_name', 'rbt_dashboard'), undefined);
  assert.equal(checkoutItemId('v2_sat_drill_algebra', 'sat_drill'), 'v2_sat_drill');
  assert.equal(checkoutItemId('v2_sat_drill', 'sat_drill'), 'v2_sat_drill');
  assert.equal(checkoutDeviceFor('Mozilla Mac OS X (Macintosh)', 5), 'tablet');
  assert.equal(checkoutDeviceFor('Mozilla/5.0 (Android 14; Tablet)', 5), 'tablet');
  assert.equal(checkoutDeviceFor('Mozilla/5.0 (Windows NT 10.0)', 0), 'desktop');
});
