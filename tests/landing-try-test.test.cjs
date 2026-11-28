// The "Try one now" layout A/B test (lib/landingTryTest.ts): the decision
// rule and the inline arm script.
require("tsx/cjs");
const test = require("node:test");
const assert = require("node:assert");
const { landingTryResult, LANDING_TRY_INIT_SCRIPT, LANDING_TRY_TARGET_PER_ARM, LANDING_TRY_STORAGE_KEY, LANDING_TRY_TEST_ID } = require("../lib/landingTryTest.ts");

test("too early under 100 new visitors an arm", () => {
  assert.strictEqual(landingTryResult({ enrolled: 99, answered: 90 }, { enrolled: 500, answered: 100 }).verdict, "too_early");
});

test("either arm can win a clear lift that costs no sign-ups", () => {
  const r = landingTryResult({ enrolled: 1000, answered: 650, signup: 50 }, { enrolled: 1000, answered: 550, signup: 50 });
  assert.strictEqual(r.verdict, "a");
  assert.ok(Math.abs(r.lift - 0.1) < 1e-9);
  assert.strictEqual(landingTryResult({ enrolled: 1000, answered: 550, signup: 50 }, { enrolled: 1000, answered: 650, signup: 50 }).verdict, "b");
});

test("a lift that costs sign-ups does not win", () => {
  // B gets more answers but fewer accounts, then the other way round.
  assert.notStrictEqual(landingTryResult({ enrolled: 1000, answered: 450, signup: 60 }, { enrolled: 1000, answered: 650, signup: 20 }).verdict, "b");
  assert.notStrictEqual(landingTryResult({ enrolled: 1000, answered: 650, signup: 20 }, { enrolled: 1000, answered: 450, signup: 60 }).verdict, "a");
});

test("a gap under 3 points keeps running, and ties at the target", () => {
  const n = LANDING_TRY_TARGET_PER_ARM;
  assert.strictEqual(landingTryResult({ enrolled: 600, answered: 342 }, { enrolled: 600, answered: 330 }).verdict, "running");
  assert.strictEqual(landingTryResult({ enrolled: n, answered: 0.57 * n }, { enrolled: n, answered: 0.55 * n }).verdict, "tie");
});

test("the inline script assigns an arm, honours a pin and marks <html>", () => {
  const store = {};
  const attrs = {};
  const doc = { documentElement: { setAttribute: (k, v) => (attrs[k] = v) } };
  const run = (search) =>
    new Function("localStorage", "location", "document", LANDING_TRY_INIT_SCRIPT)(
      { getItem: (k) => store[k] ?? null, setItem: (k, v) => (store[k] = v) },
      { search },
      doc,
    );
  run("");
  const first = JSON.parse(store["tigertest-landing-try-test"]);
  assert.ok(["a", "b"].includes(first.arm));
  assert.strictEqual(attrs["data-ltq"], first.arm);
  assert.strictEqual(doc.__ltq, first.arm, "keeps a per-document copy for reapplyLandingTryArm");
  run("");
  assert.strictEqual(JSON.parse(store["tigertest-landing-try-test"]).arm, first.arm, "the arm sticks");
  const other = first.arm === "a" ? "b" : "a";
  run(`?tryq=${other}`);
  const pinned = JSON.parse(store["tigertest-landing-try-test"]);
  assert.strictEqual(pinned.arm, other);
  assert.strictEqual(pinned.pinned, true);
  assert.strictEqual(attrs["data-ltq"], other);
  delete store["tigertest-landing-try-test"];
  run("?tryq=a");
  assert.strictEqual(JSON.parse(store["tigertest-landing-try-test"]).pinned, true, "any pin is never counted");
});

test("init script uses the same storage key and test id as the module", () => {
  assert.ok(LANDING_TRY_INIT_SCRIPT.includes(`k=${JSON.stringify(LANDING_TRY_STORAGE_KEY)}`));
  assert.ok(LANDING_TRY_INIT_SCRIPT.includes(`t=${JSON.stringify(LANDING_TRY_TEST_ID)}`));
});

test("answers per visitor: means and a Welch test from totals and squares", () => {
  const { landingTryMeans } = require("../lib/landingTryTest.ts");
  // A: four browsers with 0, 1, 5, 10 answers. B: 0, 0, 2, 2.
  const a = { enrolled: 4, total: 16, sq: 0 + 1 + 25 + 100, reached: { 1: 3, 3: 2, 5: 2, 10: 1 } };
  const b = { enrolled: 4, total: 4, sq: 8, reached: { 1: 2 } };
  const m = landingTryMeans(a, b);
  assert.strictEqual(m.a, 4);
  assert.strictEqual(m.b, 1);
  assert.ok(Math.abs(m.aPerAnswerer - 16 / 3) < 1e-9);
  assert.strictEqual(m.bPerAnswerer, 2);
  assert.ok(m.p > 0 && m.p < 1);
  assert.strictEqual(landingTryMeans({}, {}).p, 1);
});

test("the fit script keeps the arm when b's last answer fits, else falls back to today's layout", () => {
  const { LANDING_TRY_FIT_SCRIPT } = require("../lib/landingTryTest.ts");
  const run = (arm, bottom, innerHeight = 664) => {
    const attrs = {};
    const seen = [];
    const doc = {
      __ltq: arm,
      querySelector: () => null,
      documentElement: { setAttribute: (k, v) => { attrs[k] = v; seen.push(v); } },
      querySelectorAll: () => [{ closest: () => ({ getBoundingClientRect: () => ({ bottom }) }) }],
    };
    new Function("document", "window", "location", LANDING_TRY_FIT_SCRIPT)(doc, { innerHeight, scrollY: 0 }, { pathname: "/x" });
    return { attr: attrs["data-ltq"], fit: doc.__ltqFit, measuredAsB: seen[0] === "b", path: doc.__ltqFitPath };
  };
  assert.deepStrictEqual(run("a", 600), { attr: "a", fit: true, measuredAsB: true, path: "/x" });
  assert.deepStrictEqual(run("b", 600), { attr: "b", fit: true, measuredAsB: true, path: "/x" });
  assert.deepStrictEqual(run("a", 700), { attr: "off", fit: false, measuredAsB: true, path: "/x" }, "both arms fall back alike");
  assert.deepStrictEqual(run("b", 700), { attr: "off", fit: false, measuredAsB: true, path: "/x" });
  assert.strictEqual(run("b", 660).attr, "off", "keeps a margin under the last answer");
  assert.strictEqual(run(undefined, 600).attr, undefined, "no arm, nothing to do");
});
