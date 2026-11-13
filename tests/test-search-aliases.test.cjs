require("tsx/cjs");
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { searchAllTests } = require("../lib/testSearch.ts");

// Searches from the /admin build list that name a test we already have.
// The daily search-gaps run (.github/workflows/search-gaps.yml) adds a case here
// for every alias it wires, so an alias never quietly stops working.
const CASES = [
  // [query, visitor region, test id that must come first]
  ["test de citoyenneté canadienne", "CA", "cacit"],
  ["test de citoyennete canadienne", "US", "cacit"],
  ["hazard", "UK", "ukcar"],
  ["hazard perception", "UK", "ukcar"],
  ["jkssb", "IN", "jkssbja"],
  ["jkssb junior assistant", "IN", "jkssbja"],
  ["jkssb patwari", "IN", "jkssbja"],
  ["jkssb", "US", "jkssbja"],
];

for (const [q, region, id] of CASES) {
  test(`"${q}" (${region}) opens ${id}`, () => {
    const res = searchAllTests(q, region);
    assert.ok(!res.partial, `"${q}" is only a partial match`);
    assert.equal(res.hits[0]?.test.id, id, `first hit for "${q}" is ${res.hits[0]?.test.id}`);
  });
}
