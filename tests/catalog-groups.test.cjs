require("tsx/cjs");
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { TEST_GROUPS, TEST_CATALOG } = require("../lib/testCatalog.ts");

// Every hub group renders as one section on /, /tests and llms.txt. A merge
// once left two "India government job exams" groups (one with jkssbja, one
// with tgsi), which showed the section twice and split the tests between them.
test("hub group titles are unique", () => {
  const titles = TEST_GROUPS.map((g) => g.title);
  const dupes = titles.filter((t, i) => titles.indexOf(t) !== i);
  assert.deepEqual(dupes, []);
});

test("every test is in exactly one hub group", () => {
  const count = new Map();
  for (const g of TEST_GROUPS) for (const t of g.tests) count.set(t.id, (count.get(t.id) || 0) + 1);
  const twice = [...count].filter(([, n]) => n > 1).map(([id]) => id);
  const missing = TEST_CATALOG.filter((t) => !count.has(t.id)).map((t) => t.id);
  assert.deepEqual(twice, [], "in more than one group");
  assert.deepEqual(missing, [], "in no group");
});
