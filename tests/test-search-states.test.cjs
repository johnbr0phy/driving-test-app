require("tsx/cjs");
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { searchAllTests } = require("../lib/testSearch.ts");

const hrefs = (q) => searchAllTests(q, "US").hits.map((h) => h.href);

test("a bare state name lists that state's DMV test and its state versions", () => {
  const found = hrefs("washington");
  assert.equal(found[0], "/dmv/dashboard?state=WA");
  for (const h of ["/real-estate/wa/dashboard", "/life-health-insurance/wa/dashboard", "/property-casualty-insurance/wa/dashboard"]) {
    assert.ok(found.includes(h), `${h} missing from ${found.join(", ")}`);
  }
});

test("a driving search on a state stays the permit test only", () => {
  assert.deepEqual(hrefs("washington dmv"), ["/dmv/dashboard?state=WA"]);
});

test("a family search still opens the state's version", () => {
  assert.deepEqual(hrefs("louisiana real estate"), ["/real-estate/la/dashboard"]);
});

test("Texas personal lines searches open the dedicated license exam", () => {
  for (const query of ["Texas personal lines insurance", "TX personal lines agent", "Texas personal lines property and casualty"]) {
    assert.equal(hrefs(query)[0], "/txpersonal/dashboard");
  }
  assert.deepEqual(hrefs("Texas property and casualty"), ["/property-casualty-insurance/tx/dashboard"]);
});
