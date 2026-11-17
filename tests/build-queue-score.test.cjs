// The build queue's live-test score (lib/buildQueueScore.ts, scripts/build-queue.ts).
require("tsx/cjs");
const test = require("node:test");
const assert = require("node:assert");
const { PURCHASES_SINCE, purchaseWindowStart, purchaseWeight, liveScore } = require("../lib/buildQueueScore.ts");

const W = "2026-11-10";

test("purchases count from Nov 10 2026, then at most 60 days back", () => {
  assert.strictEqual(PURCHASES_SINCE, "2026-11-10");
  assert.strictEqual(purchaseWindowStart(new Date("2026-11-16T12:00:00Z")), "2026-11-10");
  assert.strictEqual(purchaseWindowStart(new Date("2027-03-01T12:00:00Z")), "2026-12-31");
  assert.strictEqual(purchaseWeight({ status: "succeeded", createdAt: "2026-11-09T23:59:00Z", amount: 999, currency: "usd" }, W), 0);
  assert.strictEqual(purchaseWeight({ status: "succeeded", createdAt: "2026-11-10T00:01:00Z", amount: 999, currency: "usd" }, W), 1);
});

test("a purchase is weighted by its dollars over the US $9.99 price", () => {
  const day = "2026-11-12T10:00:00Z";
  assert.strictEqual(purchaseWeight({ status: "succeeded", createdAt: day, amount: 999, currency: "usd" }, W), 1);
  // INR 499 settled at about $5.
  const inr = purchaseWeight({ status: "succeeded", createdAt: day, amount: 49900, currency: "inr", amountUsdCents: 500 }, W);
  assert.ok(Math.abs(inr - 0.5) < 0.01);
  // A partial refund comes off; refunded and failed sales do not count.
  assert.ok(Math.abs(purchaseWeight({ status: "succeeded", createdAt: day, amount: 999, currency: "usd", refundedCents: 499 }, W) - 500 / 999) < 1e-9);
  assert.strictEqual(purchaseWeight({ status: "refunded", createdAt: day, amount: 999, currency: "usd" }, W), 0);
});

test("score is answers / 100 + views + weighted purchases x 40", () => {
  assert.strictEqual(liveScore({ answers: 1000, views: 5, purchases: 1.5 }), 75);
  assert.strictEqual(liveScore({ answers: 0, views: 0, purchases: 0.5 }), 20);
});
