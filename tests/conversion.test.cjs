// The Conversion tab on /admin (lib/conversion.ts): a buyer is measured at the
// moment they paid, everyone else as they are now.
require("tsx/cjs");
const test = require("node:test");
const assert = require("node:assert");
const { ladder, distribution, grid, payChance, summarize, timeToBuy, pack, unpack, isLive, insights, dayNumber, MIN_CELL } = require("../lib/conversion.ts");
const { beforePurchase } = require("../lib/server/conversion.ts");

const row = (o) => ({
  paid: false, answers: 0, tests: 0, activeDays: 1, paywallViews: 0, paywalls: 0, exam: 0,
  signupDay: 100, lastActiveDay: 100, daysToBuy: -1, answersAfter: 0, activeDaysAfter: 0, soldBy: -1, ...o,
});

test("rows survive packing", () => {
  const r = row({ paid: true, answers: 120, tests: 2, paywallViews: 3, daysToBuy: 0, soldBy: 4 });
  assert.deepStrictEqual(unpack(pack(r)), r);
  assert.strictEqual(dayNumber("1970-01-03"), 2);
  assert.strictEqual(dayNumber(null), -1);
});

test("a ladder step counts everyone who got that far unpaid, and who then paid", () => {
  const rows = [
    row({ answers: 5 }),
    row({ answers: 60 }),
    row({ answers: 150 }),
    row({ answers: 120, paid: true }), // paid at 120
    row({ answers: 30, paid: true }), // paid at 30: never reached 50 unpaid
  ];
  const steps = Object.fromEntries(ladder(rows, "answers").map((s) => [s.min, s]));
  assert.deepStrictEqual([steps[0].reached, steps[0].paid], [5, 2]);
  assert.deepStrictEqual([steps[50].reached, steps[50].paid], [3, 1]);
  assert.deepStrictEqual([steps[100].reached, steps[100].paid], [2, 1]);
  assert.strictEqual(steps[200].reached, 0);
  assert.strictEqual(steps[200].rate, 0);
});

test("distribution puts each buyer in one bucket", () => {
  const buckets = distribution([row({ answers: 0 }), row({ answers: 24 }), row({ answers: 25 }), row({ answers: 5000 })], "answers");
  assert.strictEqual(buckets.reduce((n, b) => n + b.count, 0), 4);
  assert.strictEqual(buckets.find((b) => b.from === 10).count, 1);
  assert.strictEqual(buckets.find((b) => b.from === 25).count, 1);
  assert.strictEqual(buckets[buckets.length - 1].count, 1);
});

test("pay chance reads the reached cell and falls back when it is thin", () => {
  const rows = [];
  // 100 accounts with a paywall view, 10 of them paid.
  for (let i = 0; i < 100; i++) rows.push(row({ answers: 30, paywallViews: 1, paid: i < 10 }));
  // A thin, perfect cell: 3 accounts at 400+ questions and 5+ views, all paid.
  for (let i = 0; i < 3; i++) rows.push(row({ answers: 500, paywallViews: 6, paid: true }));
  const cells = grid(rows);
  assert.ok(cells[4][4].reached < MIN_CELL);
  const chance = payChance(cells, { answers: 500, paywallViews: 6 });
  assert.ok(chance < 1, "three accounts are not proof");
  assert.ok(Math.abs(payChance(cells, { answers: 30, paywallViews: 1 }) - 13 / 103) < 1e-9);
});

test("live means unpaid, seen a paywall, active in 14 days", () => {
  assert.strictEqual(isLive(row({ paywallViews: 1, lastActiveDay: 95 }), 100), true);
  assert.strictEqual(isLive(row({ paywallViews: 1, lastActiveDay: 80 }), 100), false);
  assert.strictEqual(isLive(row({ paywallViews: 0, lastActiveDay: 100 }), 100), false);
  assert.strictEqual(isLive(row({ paywallViews: 1, lastActiveDay: 100, paid: true }), 100), false);
});

test("summary and time to buy", () => {
  const rows = [
    row({ paid: true, answers: 40, tests: 1, paywallViews: 1, daysToBuy: 0, answersAfter: 20 }),
    row({ paid: true, answers: 80, tests: 2, paywallViews: 4, daysToBuy: 9 }),
    row({ paywallViews: 2, answers: 10 }),
    row({ answers: 3 }),
  ];
  const s = summarize(rows, 100);
  assert.strictEqual(s.accounts, 4);
  assert.strictEqual(s.sawPaywall, 3);
  assert.strictEqual(s.buyers, 2);
  assert.strictEqual(s.baseRate, 0.5);
  assert.strictEqual(s.firstViewBuyers, 1);
  assert.strictEqual(s.keptGoing, 1);
  assert.strictEqual(s.live, 1);
  const t = timeToBuy(rows.filter((r) => r.paid));
  assert.strictEqual(t[0].count, 1);
  assert.strictEqual(t[4].count, 1);
  assert.deepStrictEqual(insights(rows, 100), ["Too few purchases in this slice to say anything yet."]);
});

test("insights are sentences once there is data", () => {
  const rows = [];
  for (let i = 0; i < 300; i++) rows.push(row({ answers: 5, paywallViews: i % 2 }));
  for (let i = 0; i < 60; i++) rows.push(row({ answers: 150, tests: 2, paywallViews: 2, paid: i < 20, daysToBuy: i < 20 ? 0 : -1 }));
  const notes = insights(rows, 100);
  assert.ok(notes.length >= 3);
  assert.match(notes[0], /Doing more does make paying more likely/);
  for (const n of notes) assert.ok(!n.includes("NaN") && !n.includes("undefined") && !n.includes("—"), n);
});

test("a buyer's history is split at the purchase", () => {
  const at = Date.parse("2026-11-05T12:00:00Z");
  const doc = {
    trainingAnswerHistory: [
      { answeredAt: "2026-11-05T10:00:00Z" },
      { answeredAt: "2026-11-05T11:00:00Z" },
      {}, // no time: old data, counts as before
      { answeredAt: "2026-11-06T10:00:00Z" },
    ],
    completedTests: [
      { completedAt: "2026-11-04T10:00:00Z", answers: [{}, {}] },
      { completedAt: "2026-11-07T10:00:00Z", answers: [{}, {}] },
    ],
  };
  const b = beforePurchase(doc, at);
  assert.strictEqual(b.testsBefore, 1);
  assert.strictEqual(b.answersAfter, 3);
  assert.strictEqual(b.share, 5 / 8);
  assert.deepStrictEqual(beforePurchase({}, at), { share: 1, testsBefore: 0, answersAfter: 0 });
  assert.strictEqual(beforePurchase(doc, null).share, 1);
});
