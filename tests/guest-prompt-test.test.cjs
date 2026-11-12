// The sign-up step's message test (lib/guestPromptTest.ts): every browser's
// order holds all ten designs once, and the comparison maths behave.
require("tsx/cjs");
const test = require("node:test");
const assert = require("node:assert");
const g = require("../lib/guestPromptTest.ts");
const fs = require("node:fs");

test("a shuffled order holds each of the ten designs once", () => {
  for (let seed = 1; seed < 50; seed++) {
    let x = seed;
    const rnd = () => ((x = (x * 9301 + 49297) % 233280) / 233280);
    const order = g.shuffledVariants(rnd);
    assert.strictEqual(order.length, 10);
    assert.deepStrictEqual([...order].sort(), [...g.GUEST_PROMPT_VARIANTS]);
  }
});

test("every design has a name and a component", () => {
  const designs = fs.readFileSync(require.resolve("../components/guestPrompt/designs.tsx"), "utf8");
  for (const v of g.GUEST_PROMPT_VARIANTS) {
    assert.ok(g.GUEST_PROMPT_VARIANT_NAMES[v], v);
    assert.match(designs, new RegExp(`${v}: V${v.slice(1)}`), v);
  }
});

test("two-proportion p-value", () => {
  assert.strictEqual(g.twoProportionP(5, 0, 5, 100), 1);
  assert.ok(g.twoProportionP(10, 100, 10, 100) > 0.99);
  const p = g.twoProportionP(60, 500, 30, 500); // 12% vs 6%
  assert.ok(p > 0 && p < 0.01, String(p));
});

test("guards on the actions and designs the route accepts", () => {
  assert.ok(g.isGuestPromptVariant("v07"));
  assert.ok(!g.isGuestPromptVariant("v11"));
  assert.ok(g.isGuestPromptAction("signup"));
  assert.ok(!g.isGuestPromptAction("bought"));
});
