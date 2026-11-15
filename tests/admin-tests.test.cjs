// The /admin Tests tab rows (lib/adminTests.ts): one per catalog test, zeros
// for tests with no practice, joined by exam id to the Today tab's numbers.
require("tsx/cjs");
const test = require("node:test");
const assert = require("node:assert");
const { buildAdminTestRows } = require("../lib/adminTests.ts");
const { TEST_CATALOG } = require("../lib/testCatalog.ts");

test("every catalog test gets exactly one row, the busiest first", () => {
  const exams = [
    { id: "cdl", region: "US", group: "x", answers7d: 5, answersPrev7d: 2, answers30d: 50, answersAll: 900, enrolled: 7, paywallHits30d: 3, purchases30d: 1, purchasesAll: 2, revenue30dCents: 999, revenueAllCents: 1998 },
  ];
  const rows = buildAdminTestRows(exams);
  assert.strictEqual(rows.length, TEST_CATALOG.length);
  assert.strictEqual(new Set(rows.map((r) => r.id)).size, rows.length);
  assert.strictEqual(rows[0].id, "cdl");
  assert.strictEqual(rows[0].learners, 7);
  assert.strictEqual(rows[0].revenueAllCents, 1998);
  const quiet = rows.find((r) => r.id === "dmv");
  assert.strictEqual(quiet.answers30d, 0);
  assert.strictEqual(quiet.pricing, "2 free, 2 premium");
  assert.ok(rows.every((r) => r.group && r.region));
});
