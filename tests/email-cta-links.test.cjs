require('tsx/cjs');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { ALL_EXAMS } = require('../lib/exams.ts');
const { EXAMS_V2 } = require('../lib/v2/registry.ts');
const { EMAIL_TEMPLATES, exitQuestionEmail } = require('../lib/email-templates.ts');
const { voiceFor, dashboardUrl, statsUrl } = require('../lib/email-voice.ts');
const { TEST_REQUEST_PICKS } = require('../lib/test-requests.ts');

const ids = [...new Set(['dmv', ...ALL_EXAMS.map(e => e.id), ...EXAMS_V2.map(e => e.id), 'unknown'])];
const hrefs = html => [...html.matchAll(/href="([^"]+)"/g)].map(m => new URL(m[1].replaceAll('&amp;', '&')));

// Check actual app files, including the three registered state-family routes.
// This deliberately does not GET unsubscribe, feedback or tracked-click URLs:
// those endpoints can mutate data, even if they are links in an email.
function routeFile(pathname) {
  const exact = path.join('app', pathname, pathname.startsWith('/api/') ? 'route.ts' : 'page.tsx');
  if (fs.existsSync(exact)) return exact;
  const variant = /^\/(real-estate|life-health-insurance|property-casualty-insurance)\/[a-z]{2}\/(dashboard|stats)$/.exec(pathname);
  if (variant) {
    const file = `app/${variant[1]}/[state]/${variant[2]}/page.tsx`;
    if (fs.existsSync(file)) return file;
  }
  return null;
}

test('every exam email dashboard and stats URL has a real destination with intact tracking', () => {
  for (const id of ids) {
    const v = voiceFor(id);
    for (const [url, pathname] of [[dashboardUrl(v, 'cta_audit'), v.dashboardPath], [statsUrl(v, 'cta_audit'), v.statsPath]]) {
      const parsed = new URL(url);
      assert.equal(parsed.pathname, pathname, id);
      assert.ok(routeFile(parsed.pathname), `${id}: ${parsed.pathname}`);
      assert.equal(parsed.searchParams.get('utm_source'), 'tigertest');
      assert.equal(parsed.searchParams.get('utm_medium'), 'email');
      assert.equal(parsed.searchParams.get('utm_campaign'), 'cta_audit');
      assert.equal(parsed.protocol, 'https:');
      assert.equal(parsed.hostname, 'www.tigertest.io');
    }
  }
  assert.equal(voiceFor('realestate-ca').statsPath, '/real-estate/ca/stats');
  assert.equal(voiceFor('insurance-nj').dashboardPath, '/life-health-insurance/nj/dashboard');
  assert.equal(voiceFor('unknown').dashboardPath, '/tests');
});

test('all rendered template links resolve locally and never point to preview or invented routes', () => {
  const picks = new Set(TEST_REQUEST_PICKS.map(p => p.id));
  for (const id of ids) {
    for (const [name, render] of Object.entries(EMAIL_TEMPLATES)) {
      const links = hrefs(render(voiceFor(id)));
      assert.ok(links.length > 0, `${id}/${name}`);
      for (const url of links) {
        assert.equal(url.protocol, 'https:', `${id}/${name}: ${url}`);
        assert.ok(['tigertest.io', 'www.tigertest.io'].includes(url.hostname), `${id}/${name}: ${url}`);
        assert.ok(routeFile(url.pathname), `${id}/${name}: ${url.pathname}`);
        if (url.pathname === '/unsubscribe') assert.equal(url.searchParams.get('token'), '{{unsubscribeToken}}');
        if (url.pathname === '/api/feedback/test-request') {
          assert.ok(picks.has(url.searchParams.get('pick')));
          assert.equal(url.searchParams.get('t'), '{{unsubscribeToken}}');
          assert.equal(url.searchParams.get('src'), 'email');
        }
      }
    }
  }
});

test('receipt, achievement and question buttons retain their exact event exam and access promise', () => {
  for (const id of ids) {
    const v = voiceFor(id);
    const isV2 = EXAMS_V2.some(e => e.id === id);
    const receipt = hrefs(EMAIL_TEMPLATES.purchaseWelcome(v)).find(u => u.searchParams.get('utm_campaign') === 'purchase_welcome');
    assert.equal(receipt.pathname, id !== 'unknown' && !isV2 ? v.statsPath : v.dashboardPath, id);
    assert.ok(hrefs(EMAIL_TEMPLATES.superAmazingUnlocked(v)).some(u => u.pathname === v.dashboardPath && u.searchParams.get('utm_campaign') === 'super_amazing'), id);
    for (const isCorrect of [true, false]) {
      const html = exitQuestionEmail(v, { question: 'Question?', options: ['Yes', 'No'], answer: 'Yes', explanation: 'Because.', isCorrect });
      const primary = hrefs(html).find(u => u.searchParams.has('utm_campaign'));
      assert.equal(primary.pathname, v.dashboardPath, id);
      assert.equal(primary.searchParams.get('utm_medium'), 'email');
    }
  }
});
