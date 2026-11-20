const { test } = require("node:test");
const assert = require("node:assert/strict");
require("tsx/cjs");
const { recoveryUrl, recoveryEligible, CHECKOUT_RECOVERY_KEY } = require("../lib/checkoutRecovery.ts");
const fs = require("node:fs");

const user = { emailConsent: true, emailsSent: [] };

test("recovery url: only Stripe links that have not expired", () => {
  const now = 1_800_000_000;
  const s = (url, expires_at = now + 100) => ({ after_expiration: { recovery: { url, expires_at } } });
  assert.equal(recoveryUrl(s("https://buy.stripe.com/r/live_abc"), now), "https://buy.stripe.com/r/live_abc");
  assert.equal(recoveryUrl(s("https://evil.example/r"), now), null);
  assert.equal(recoveryUrl(s("http://buy.stripe.com/r"), now), null);
  assert.equal(recoveryUrl(s("https://buy.stripe.com/r/live_abc", now - 1), now), null);
  assert.equal(recoveryUrl({}, now), null);
});

test("eligibility follows campaign rules and sends once", () => {
  assert.equal(recoveryEligible(user, "a@b.com"), true);
  assert.equal(recoveryEligible({ ...user, emailConsent: false }, "a@b.com"), false);
  assert.equal(recoveryEligible({}, "a@b.com"), false);
  assert.equal(recoveryEligible({ ...user, unsubscribed: true }, "a@b.com"), false);
  assert.equal(recoveryEligible({ ...user, subscription: { isPremium: true } }, "a@b.com"), false);
  assert.equal(recoveryEligible({ ...user, language: "es" }, "a@b.com"), false);
  assert.equal(recoveryEligible({ ...user, language: "en" }, "a@b.com"), true);
  assert.equal(recoveryEligible({ ...user, emailsSent: [CHECKOUT_RECOVERY_KEY] }, "a@b.com"), false);
  assert.equal(recoveryEligible(user, "x@johnbrophy.net"), false);
  assert.equal(recoveryEligible(user, null), false);
});

test("checkout turns recovery on for signed-in buyers only, webhook handles expiry", () => {
  const checkout = fs.readFileSync("app/api/stripe/checkout/route.ts", "utf8");
  assert.match(checkout, /isGuest \? \{\} : \{ after_expiration: \{ recovery: \{ enabled: true \} \} \}/);
  const webhook = fs.readFileSync("app/api/stripe/webhook/route.ts", "utf8");
  assert.match(webhook, /case 'checkout\.session\.expired'/);
});
