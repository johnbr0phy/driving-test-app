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
