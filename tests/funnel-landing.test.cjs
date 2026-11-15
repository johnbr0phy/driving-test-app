// The funnel by landing page (lib/funnelLanding.ts): one row per page people
// arrive on, class and quiz codes folded together.
require("tsx/cjs");
const test = require("node:test");
const assert = require("node:assert");
const { normalizeLanding, landingKey, landingFromKey, sumLandingDays } = require("../lib/funnelLanding.ts");

test("normalizeLanding cuts a path to the page", () => {
  assert.strictEqual(normalizeLanding("/"), "/");
  assert.strictEqual(normalizeLanding("/CDL-Practice-Test/"), "/cdl-practice-test");
  assert.strictEqual(normalizeLanding("/dmv?state=TX"), "/dmv");
  assert.strictEqual(normalizeLanding("/q/abc123/dashboard"), "/q/*");
  assert.strictEqual(normalizeLanding("/c/HK7QZ"), "/c/*");
  assert.strictEqual(normalizeLanding(""), null);
  assert.strictEqual(normalizeLanding("/bad path"), null);
  assert.strictEqual(normalizeLanding(42), null);
});

test("keys round-trip without dots or slashes", () => {
  const key = landingKey("/es/test-dgt-permiso-b.x");
  assert.ok(!/[./]/.test(key));
  assert.strictEqual(landingFromKey(key), "/es/test-dgt-permiso-b.x");
});

test("sumLandingDays adds days, drops thin pages, busiest first", () => {
  const k = landingKey;
  const rows = sumLandingDays(
    [
      { visit: { [k("/a")]: 8, [k("/b")]: 30, [k("/c")]: 2 }, answered: { [k("/a")]: 2 } },
      { visit: { [k("/a")]: 4 }, answered: { [k("/a")]: 1, [k("/b")]: 9 } },
    ],
    10,
  );
  assert.deepStrictEqual(rows, [
    { landing: "/b", visits: 30, answered: 9 },
    { landing: "/a", visits: 12, answered: 3 },
  ]);
});
