// The "Try one now" A/B test (lib/landingTryTest.ts): the decision rule and
// the inline arm script.
require("tsx/cjs");
const test = require("node:test");
const assert = require("node:assert");
const { landingTryResult, LANDING_TRY_INIT_SCRIPT, LANDING_TRY_TARGET_PER_ARM, LANDING_TRY_STORAGE_KEY, LANDING_TRY_TEST_ID } = require("../lib/landingTryTest.ts");

test("too early under 100 new visitors an arm", () => {
  assert.strictEqual(landingTryResult({ enrolled: 99, answered: 90 }, { enrolled: 500, answered: 100 }).verdict, "too_early");
});

test("ships a clear lift that costs no sign-ups", () => {
  const r = landingTryResult({ enrolled: 1000, answered: 450, signup: 50 }, { enrolled: 1000, answered: 350, signup: 50 });
  assert.strictEqual(r.verdict, "ship");
  assert.ok(Math.abs(r.lift - 0.1) < 1e-9);
});

test("a lift that costs sign-ups does not ship", () => {
  const r = landingTryResult({ enrolled: 1000, answered: 450, signup: 20 }, { enrolled: 1000, answered: 350, signup: 60 });
  assert.notStrictEqual(r.verdict, "ship");
});

test("a lift under 3 points does not ship, and drops at the target", () => {
  const n = LANDING_TRY_TARGET_PER_ARM;
  assert.strictEqual(landingTryResult({ enrolled: 600, answered: 222 }, { enrolled: 600, answered: 210 }).verdict, "running");
  assert.strictEqual(landingTryResult({ enrolled: n, answered: 0.37 * n }, { enrolled: n, answered: 0.35 * n }).verdict, "drop");
});

test("the inline script assigns an arm, honours a pin and marks <html>", () => {
  const store = {};
  const attrs = {};
  const run = (search) =>
    new Function("localStorage", "location", "document", LANDING_TRY_INIT_SCRIPT)(
      { getItem: (k) => store[k] ?? null, setItem: (k, v) => (store[k] = v) },
      { search },
      { documentElement: { setAttribute: (k, v) => (attrs[k] = v) } },
    );
  run("");
  const first = JSON.parse(store["tigertest-landing-try-test"]);
  assert.ok(["card", "control"].includes(first.arm));
  assert.strictEqual(attrs["data-ltq"], first.arm);
  run("");
  assert.strictEqual(JSON.parse(store["tigertest-landing-try-test"]).arm, first.arm, "the arm sticks");
  const other = first.arm === "card" ? "control" : "card";
  run(`?tryq=${other}`);
  const pinned = JSON.parse(store["tigertest-landing-try-test"]);
  assert.strictEqual(pinned.arm, other);
  assert.strictEqual(pinned.pinned, true);
  assert.strictEqual(attrs["data-ltq"], other);
  delete store["tigertest-landing-try-test"];
  run("?tryq=card");
  assert.strictEqual(JSON.parse(store["tigertest-landing-try-test"]).pinned, true, "any pin is never counted");
});

test("init script uses the same storage key and test id as the module", () => {
  assert.ok(LANDING_TRY_INIT_SCRIPT.includes(`k=${JSON.stringify(LANDING_TRY_STORAGE_KEY)}`));
  assert.ok(LANDING_TRY_INIT_SCRIPT.includes(`t=${JSON.stringify(LANDING_TRY_TEST_ID)}`));
});
