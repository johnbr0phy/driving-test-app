// Run: node --test tests/indexnow.test.cjs
require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const { recentUrls, cutoffDate } = require('../lib/indexNow.ts');

const now = new Date('2026-11-08T08:00:00Z');

test('cutoff is the UTC date N days back', () => {
  assert.equal(cutoffDate(2, now), '2026-11-06');
  assert.equal(cutoffDate(0, now), '2026-11-08');
});

test('only URLs changed on or after the cutoff are sent, once each', () => {
  const urls = recentUrls([
    { url: 'https://www.tigertest.io/a', lastModified: '2026-11-07' },
    { url: 'https://www.tigertest.io/b', lastModified: '2026-11-06' },
    { url: 'https://www.tigertest.io/c', lastModified: '2026-11-05' },
    { url: 'https://www.tigertest.io/a', lastModified: '2026-11-07' },
  ], 2, now);
  assert.deepEqual(urls, ['https://www.tigertest.io/a', 'https://www.tigertest.io/b']);
});

test('the nightly cron sends recent pages only, and a deploy workflow pings too', () => {
  const vercel = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  assert.ok(vercel.crons.some((c) => c.path === '/api/indexnow/ping?days=2'));
  const wf = fs.readFileSync('.github/workflows/indexnow.yml', 'utf8');
  assert.match(wf, /deployment_status/);
  assert.match(wf, /scripts\/indexnow-recent\.mjs/);
});

// The record the /admin New tests tab reads (lib/indexNowSent.mjs), written by
// both senders.
test('a page keeps its first-sent time, gets a new last-sent time and counts each send', async () => {
  const { mergeSent, sentKey, pathFromSentKey, pathOfUrl, runRecord } = await import('../lib/indexNowSent.mjs');
  assert.equal(pathOfUrl('https://www.tigertest.io/ap-calculus-ab-practice-test/'), '/ap-calculus-ab-practice-test');
  assert.equal(pathOfUrl('https://www.tigertest.io'), '/');
  const key = sentKey('/questions/cdl/air.brakes');
  assert.ok(!key.includes('/') && !key.includes('.'));
  assert.equal(pathFromSentKey(key), '/questions/cdl/air.brakes');

  const first = mergeSent({}, ['https://www.tigertest.io/a', 'https://www.tigertest.io/a/'], 't1');
  assert.deepEqual(first, { '|a': { first: 't1', last: 't1', n: 1 } });
  const again = mergeSent(first, ['https://www.tigertest.io/a', 'https://www.tigertest.io/b'], 't2');
  assert.deepEqual(again['|a'], { first: 't1', last: 't2', n: 2 });
  assert.deepEqual(again['|b'], { first: 't2', last: 't2', n: 1 });

  const run = runRecord({ source: 'deploy', urls: ['https://www.tigertest.io/a'], status: 200, ok: true, at: 't3', days: 2 });
  assert.equal(run.count, 1);
  assert.deepEqual(run.paths, ['/a']);
});

test('a test counts as sent when any of its pages was, and says whether its landing was', () => {
  const { bingSentFor, testPages } = require('../lib/newTests.ts');
  const pages = testPages(['/cdl-practice-test'], '/cdl', 'cdl');
  const sent = [
    { path: '/questions/cdl/air-brakes', first: '2026-11-17T01:00:00Z', last: '2026-11-19T09:00:00Z' },
    { path: '/cdl-practice-test', first: '2026-11-18T01:00:00Z', last: '2026-11-18T01:00:00Z' },
    { path: '/cdl-endorsement-practice-test', first: '2026-11-01T00:00:00Z', last: '2026-11-01T00:00:00Z' },
  ];
  assert.deepEqual(bingSentFor(sent, pages, '/cdl-practice-test'), {
    first: '2026-11-17T01:00:00Z', last: '2026-11-19T09:00:00Z', pages: 2, landing: true,
  });
  assert.equal(bingSentFor(sent.slice(2), pages, '/cdl-practice-test'), null);
  assert.equal(bingSentFor(sent.slice(0, 1), pages, '/cdl-practice-test').landing, false);
});

test('both senders record their runs for /admin', () => {
  const script = fs.readFileSync('scripts/indexnow-recent.mjs', 'utf8');
  const route = fs.readFileSync('app/api/indexnow/ping/route.ts', 'utf8');
  const wf = fs.readFileSync('.github/workflows/indexnow.yml', 'utf8');
  assert.match(script, /lib\/indexNowSent\.mjs/);
  assert.match(route, /recordIndexNowRun/);
  assert.match(wf, /lib\/indexNowSent\.mjs/, 'the sparse checkout must include the shared record module');
  assert.match(wf, /FIREBASE_SERVICE_ACCOUNT_KEY/);
});
