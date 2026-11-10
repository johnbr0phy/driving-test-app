// Statistical question flags (lib/questionQuality.ts): only signs of a wrong
// or second answer are flags, and a flag the audit reviewed and found right is
// cleared until the question's answers double.
require("tsx/cjs");
const test = require("node:test");
const assert = require("node:assert");
const { flagQuestion, applyFlagReviews, reviewClears, reviewFresh } = require("../lib/questionQuality.ts");

const review = (verdict, n, daysAgo = 1) => ({ at: new Date(Date.now() - daysAgo * 86_400_000).toISOString(), verdict, confidence: "high", reason: "r", n });

test("a hard or an easy question is not a flag", () => {
  // 20% right with the wrong picks spread evenly: hard, not a wrong key.
  assert.strictEqual(flagQuestion("x", "Q1", { n: 100, c: 20, w: { 0: 27, 1: 27, 2: 26 } }, 0), null);
  assert.strictEqual(flagQuestion("x", "Q2", { n: 100, c: 24, w: { 0: 4, 1: 4, 2: 4 } }, 0), null);
  assert.strictEqual(flagQuestion("x", "Q3", { n: 100, c: 99, w: { 0: 1 } }, 0), null);
});

test("strong students picking one wrong option as often as the key is a key suspect", () => {
  const f = flagQuestion("x", "Q", { n: 50, c: 20, w: { 1: 25 }, s: 14, sc: 5, sw: { 1: 8 } }, 0);
  assert.deepStrictEqual(f.kinds, ["splitAnswer", "keySuspect"]);
});

test("an ok review clears a flag until its answers double or 180 days pass", () => {
  assert.strictEqual(reviewClears(review("ok", 40), 60), true);
  assert.strictEqual(reviewClears(review("ok", 40), 80), false);
  assert.strictEqual(reviewClears(review("ok", 40, 181), 41), false);
  assert.strictEqual(reviewClears(review("wrong_key", 40), 41), false);
  // Any fresh review stops the audit judging the same statistics again.
  assert.strictEqual(reviewFresh(review("wrong_key", 40), 41), true);
  assert.strictEqual(reviewFresh(undefined, 41), false);
});

test("applyFlagReviews counts only what still needs someone and drops retired kinds", () => {
  const base = { n: 50, correctPct: 40, strongN: 14, strongCorrectPct: 30, topWrong: 0, topWrongPct: 20, reports: 0 };
  const flags = [
    { ...base, examId: "rbt", questionId: "A", kinds: ["keySuspect"], score: 101 },
    { ...base, examId: "rbt", questionId: "B", kinds: ["keySuspect"], score: 100 },
    { ...base, examId: "rbt", questionId: "C", kinds: ["tooEasy"], score: 5 },
    { ...base, examId: "rbt", questionId: "D", kinds: ["keySuspect", "reported"], reports: 1, score: 115 },
    { ...base, examId: "rbt", questionId: "E", kinds: ["tooHard", "splitAnswer"], score: 65 },
  ];
  const out = applyFlagReviews(flags, { rbt: { A: review("ok", 50), D: review("ok", 50) } });
  assert.deepStrictEqual(out.flags.map((f) => f.questionId), ["D", "B", "E", "A"]);
  assert.strictEqual(out.flags.find((f) => f.questionId === "A").cleared, true);
  // An open report keeps a question open even after an ok review.
  assert.strictEqual(out.flags.find((f) => f.questionId === "D").cleared, undefined);
  assert.deepStrictEqual(out.flags.find((f) => f.questionId === "E").kinds, ["splitAnswer"]);
  assert.deepStrictEqual(out.byKind, { keySuspect: 2, reported: 1, splitAnswer: 1 });
  assert.strictEqual(out.open, 3);
  assert.strictEqual(out.cleared, 1);
});
