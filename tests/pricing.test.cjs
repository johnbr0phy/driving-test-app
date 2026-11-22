const test = require("node:test");
const assert = require("node:assert");
require("tsx/cjs");
const { premiumPriceFor, stripeUnitAmount } = require("../lib/pricing.ts");

// Every country with a Tigertest homepage pays in its own currency.
const REGIONS = ["US","GB","IE","CA","AU","NZ","IN","PH","MY","SG","HK","AE","ZA","NG","KE","PK","ES","PT","RO","SE","GR","DK","HU","BE","FI","MT","IT","FR","CH","DE","PL","NL"];
const EXPECT = { US: "usd" };

test("every Tigertest country has a local price", () => {
  for (const c of REGIONS) {
    const p = premiumPriceFor(c);
    if (c !== "US") assert.notStrictEqual(p.currency, "usd", `${c} falls back to dollars`);
    else assert.strictEqual(p.currency, EXPECT.US);
    assert.ok(p.amount > 0);
  }
});

test("Bulgaria pays in euro, Chile in whole pesos, unknown in dollars", () => {
  assert.strictEqual(premiumPriceFor("BG").currency, "eur");
  const clp = premiumPriceFor("CL");
  assert.strictEqual(stripeUnitAmount(clp), 4990);
  assert.strictEqual(premiumPriceFor("ZZ").currency, "usd");
  assert.strictEqual(premiumPriceFor("KW").currency, "usd");
});
