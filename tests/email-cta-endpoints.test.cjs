require('tsx/cjs');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const Module = require('node:module');
const { readFileSync } = require('node:fs');
const writes = [];
const db = { collection: collection => ({ doc: id => ({
  get: async () => ({ exists: true, data: () => ({ firstSignupExamId: 'realestate-ca' }) }),
  set: async (data, options) => writes.push({ collection, id, data, options }),
}) }) };
process.env.EMAIL_UNSUBSCRIBE_SECRET = 'offline-cta-regression-test-only';
const originalLoad = Module._load;
let NextRequest, feedback, click, unsubscribe, tokenFor, headersFor, testRequestButtons, variants, voiceFor;
try {
  Module._load = function(request, parent, main) {
    if (request === '@/lib/firebase-admin') return { getAdminDb: () => db };
    if (request === '@/lib/resend') return { sendEmail: async () => { throw new Error('A CTA test must never send mail'); } };
    if (request === '@/lib/cron-email') return { CAMPAIGN_REPLY_TO: 'offline@example.invalid' };
    return originalLoad.call(this, request, parent, main);
  };
  ({ NextRequest } = require('next/server'));
  ({ unsubscribeToken: tokenFor, listUnsubscribeHeaders: headersFor } = require('../lib/unsubscribe.ts'));
  feedback = require('../app/api/feedback/test-request/route.ts');
  click = require('../app/api/email/click/route.ts');
  unsubscribe = require('../app/api/unsubscribe/route.ts');
  ({ testRequestButtons } = require('../lib/email-templates.ts'));
  ({ LAUNCH_VARIANTS: variants } = require('../lib/email-launch.ts'));
  ({ voiceFor } = require('../lib/email-voice.ts'));
} finally { Module._load = originalLoad; }
const uid = 'offline-cta-user';
const token = tokenFor(uid);
const links = html => [...html.replaceAll('{{unsubscribeToken}}', encodeURIComponent(token)).matchAll(/href="([^"]+)"/g)]
  .map(m => new URL(m[1].replaceAll('&amp;', '&')));

test('all feedback choices reach the requested category with token and tracking intact, without real writes', async () => {
  let count = 0;
  for (const url of links(testRequestButtons('cta_review'))) {
    const response = await feedback.GET(new NextRequest(url));
    assert.equal(response.status, 307);
    const dest = new URL(response.headers.get('location'));
    assert.equal(dest.pathname, '/request-test');
    for (const key of ['pick', 't', 'src', 'utm_source', 'utm_medium', 'utm_campaign']) assert.equal(dest.searchParams.get(key), url.searchParams.get(key), key);
    count++;
  }
  assert.equal(count, 9);
});

test('all historical launch tracked CTAs redirect to their intended same-site page', async () => {
  let count = 0;
  for (const variant of variants) for (const url of links(variant.html())) {
    if (url.pathname !== '/api/email/click') continue;
    const response = await click.GET(new NextRequest(url, { headers: { 'user-agent': 'offline-cta-regression' } }));
    assert.equal(response.status, 307);
    const dest = new URL(response.headers.get('location'));
    assert.equal(dest.origin, url.origin);
    assert.equal(dest.pathname, url.searchParams.get('to'));
    assert.equal(dest.searchParams.get('utm_campaign'), `newTests2026_${variant.id}`);
    count++;
  }
  assert.equal(count, 37);
  const unsafe = await click.GET(new NextRequest('https://tigertest.io/api/email/click?to=https://example.invalid'));
  assert.equal(new URL(unsafe.headers.get('location')).pathname, '/');
});

test('signed list unsubscribe works through one-click and browser flows against a mock account', async () => {
  const url = headersFor(uid)['List-Unsubscribe'].slice(1, -1);
  const post = await unsubscribe.POST(new NextRequest(url, { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: 'List-Unsubscribe=One-Click' }));
  assert.equal(post.status, 200);
  const body = await post.json();
  assert.equal(body.success, true);
  assert.equal(body.testName, voiceFor('realestate-ca').testName);
  const get = await unsubscribe.GET(new NextRequest(url));
  assert.equal(get.status, 307);
  const dest = new URL(get.headers.get('location'));
  assert.equal(dest.pathname, '/unsubscribe');
  assert.equal(dest.searchParams.get('done'), '1');
  assert.equal(dest.searchParams.get('token'), token);
  assert.ok(writes.some(w => w.collection === 'users' && w.id === uid && w.data.unsubscribed === true));
});

test('unsubscribe completion sends every exam back to the neutral test directory', () => {
  const page = readFileSync('app/unsubscribe/page.tsx', 'utf8');
  assert.match(page, /<Link href="\/tests">\s*Back to Tigertest/);
  assert.doesNotMatch(page, /href="\/dmv\/dashboard"/);
});
