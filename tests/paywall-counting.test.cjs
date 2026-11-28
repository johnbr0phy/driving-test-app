require('tsx/cjs');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { maskEmail } = require('../lib/guestPaidHint.ts');

const read = (p) => fs.readFileSync(p, 'utf8');

test('every DMV page that opens the paywall from its header records a hit', () => {
  for (const [page, loc, item] of [['app/test/[id]/page.tsx', 'practice_test_4', 'test_header_stats'], ['app/training/page.tsx', 'training_set_4', 'training_header_stats']]) {
    const src = read(page);
    // Counted under the location the page's checkout uses, so hits and sales line up.
    assert.match(src, new RegExp(`trackPaywallHit\\("${item}", "[^"]+", "${loc}"\\);\\s*trackViewItem\\("${loc}"\\);\\s*setPaywallOpen\\(true\\)`));
    assert.match(src, new RegExp(`startCheckout\\(\\{ location: "${loc}", itemId: "${item}" \\}\\)`));
  }
});

test('a paywall hit waits for auth, so a signed-in tap is not booked as a guest', () => {
  const src = read('lib/analytics.ts');
  const body = src.slice(src.indexOf('async function recordPaywallHit'), src.indexOf('const PAYWALL_DAY_KEY'));
  assert.ok(body.indexOf('await auth.authStateReady()') < body.indexOf('auth.currentUser'));
  // A browser that already paid as a guest is not counted.
  assert.match(body, /!auth\.currentUser && guestPaidEmail\(\)\) return;/);
});

test('the paywall counter counts browsers per day without storing ids', () => {
  const route = read('app/api/analytics/paywall/route.ts');
  assert.match(route, /browsersDaily: \{ \[today\]: FieldValue\.increment\(1\) \}/);
  assert.match(route, /uid \? 'signedInBrowsersDaily' : 'guestBrowsersDaily'/);
  assert.doesNotMatch(route, /arrayUnion/);
  const conv = read('lib/server/conversion.ts');
  assert.match(conv, /browsers: browsersByDay/);
  assert.match(conv, /signedInBrowsers: signedInBrowsersByDay/);
});

test('a guest who paid for an account they are not signed in to is told to sign in, never granted Premium', () => {
  assert.equal(maskEmail('john.smith@gmail.com'), 'jo***@gmail.com');
  assert.equal(maskEmail('jo***@gmail.com'), 'jo***@gmail.com'); // the server already masks it
  assert.equal(maskEmail('nope'), '***');
  const ret = read('components/GuestPurchaseReturn.tsx');
  for (const status of ['existing_account', 'already_premium', 'sign_in_used']) {
    const at = ret.indexOf(`data?.status === "${status}"`);
    const next = ret.indexOf('} else if', at + 1);
    assert.match(ret.slice(at, next), /markGuestPaid\(data\.email\)/, status);
  }
  // The hint is a message only: nothing here sets Premium.
  const hint = read('lib/guestPaidHint.ts');
  assert.doesNotMatch(hint, /setPremiumStatus|subscription|isPremium/);
  for (const modal of ['components/PaywallModal.tsx', 'components/SupportPaywallModal.tsx']) {
    assert.match(read(modal), /paidEmail \? \(\s*<GuestPaidNotice/);
  }
  assert.match(read('contexts/AuthContext.tsx'), /if \(user\) clearGuestPaid\(\);/);
});

test('the already-bought paywall strings exist in every site language', () => {
  for (const f of fs.readdirSync('i18n').filter((f) => /^[a-z]{2}\.ts$/.test(f))) {
    const src = read(`i18n/${f}`);
    assert.match(src, /alreadyBought: "[^"]*\{email\}[^"]*"/, f);
    assert.match(src, /signInToUse: "/, f);
  }
});
