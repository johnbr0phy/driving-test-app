// The in-training sign-up step never shows on children's tests.
require("tsx/cjs");
const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const { isChildPath } = require("../lib/privacyRegion.ts");

test("useGuestPrompt is off on child paths", () => {
  const src = fs.readFileSync(require.resolve("../hooks/useGuestPrompt.ts"), "utf8");
  assert.match(src, /guest && !isChildPath\(/);
});

test("the kids' practice pages count as child paths", () => {
  for (const p of ["/times-tables/practice/1", "/ks2-sats/practice/2", "/eleven-plus/practice/1", "/oc-test/practice/3", "/nsw-selective/practice/1", "/naplan-year-7/practice/2", "/jnvst/practice/1", "/aissee/practice/1"]) {
    assert.ok(isChildPath(p), p);
  }
  for (const p of ["/cdl/practice/1", "/sat/practice/1", "/naplan/practice/1"]) assert.ok(!isChildPath(p), p);
});
