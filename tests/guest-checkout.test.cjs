require('tsx/cjs');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { isGuestSession, guestSessionEmail, maskEmail } = require('../lib/server/guestCheckout.ts');
const { purchaseWelcomeHtml, EMAIL_TEMPLATES } = require('../lib/email-templates.ts');
const { voiceFor } = require('../lib/email-voice.ts');

test('only an unsigned checkout marked guest counts as a guest checkout', () => {
  assert.equal(isGuestSession({ metadata: { guest: '1' } }), true);
  assert.equal(isGuestSession({ metadata: { guest: '1', userId: 'u1' } }), false);
  assert.equal(isGuestSession({ metadata: { userId: 'u1' } }), false);
  assert.equal(isGuestSession({ metadata: {} }), false);
});

test('the guest email comes from what Stripe collected, normalised', () => {
  assert.equal(guestSessionEmail({ customer_details: { email: ' Jo@Example.COM ' } }), 'jo@example.com');
  assert.equal(guestSessionEmail({ customer_email: 'a@b.co' }), 'a@b.co');
  assert.equal(guestSessionEmail({}), null);
  assert.equal(maskEmail('john@gmail.com'), 'jo***@gmail.com');
});

test('a guest receipt names the account and links to sign in', () => {
  const v = voiceFor('dmv');
  const made = purchaseWelcomeHtml(v, { guest: { email: 'new@example.com', createdForGuest: true } });
  assert.match(made, /new@example\.com/);
  assert.match(made, /Forgot password/);
  assert.match(made, /https:\/\/www\.tigertest\.io\/login/);
  const existing = purchaseWelcomeHtml(v, { guest: { email: 'old@example.com', createdForGuest: false } });
  assert.match(existing, /already had/);
  // A signed-in buyer's receipt is unchanged.
  assert.equal(EMAIL_TEMPLATES.purchaseWelcome(v), purchaseWelcomeHtml(v));
  assert.doesNotMatch(purchaseWelcomeHtml(v), /Forgot password/);
});

test('the success page never signs in to an account the checkout did not make', () => {
  const src = fs.readFileSync('app/api/stripe/guest-session/route.ts', 'utf8');
  assert.match(src, /buyer\.createdForGuest && fresh/);
  assert.match(src, /providerData\.length === 0/);
});
