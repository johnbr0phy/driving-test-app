// AI answer check (lib/aiAnswers.ts): reads Claude's answers for mentions and
// citations of Tigertest, and the questions stay neutral.
require("tsx/cjs");
const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const { AI_QUESTIONS, AI_ANSWERS_JOB, analyzeAnswer, summarize } = require("../lib/aiAnswers.ts");
const { JOB_BUDGETS_USD, SONNET_PRICES, usageCostUsd } = require("../lib/apiBudget.ts");

const answer = [
  { type: "server_tool_use", name: "web_search", input: { query: "free ca permit test" } },
  {
    type: "web_search_tool_result",
    content: [
      { type: "web_search_result", url: "https://www.dmv-written-test.com/california", title: "x" },
      { type: "web_search_result", url: "https://www.tigertest.io/california-dmv-practice-test/", title: "y" },
    ],
  },
  { type: "text", text: "Good options: " },
  {
    type: "text",
    text: "DMV Written Test has free tests",
    citations: [{ type: "web_search_result_location", url: "https://www.dmv-written-test.com/california", cited_text: "" }],
  },
  {
    type: "text",
    text: ", and Tigertest offers 4 free practice tests.",
    citations: [{ type: "web_search_result_location", url: "https://www.tigertest.io/california-dmv-practice-test", cited_text: "" }],
  },
];

test("an answer that names and cites Tigertest is counted, with its rank among cited sites", () => {
  const r = analyzeAnswer(answer);
  assert.strictEqual(r.mentioned, true);
  assert.strictEqual(r.cited, true);
  assert.strictEqual(r.inResults, true);
  assert.strictEqual(r.rank, 2);
  assert.deepStrictEqual(r.citedHosts, ["dmv-written-test.com", "tigertest.io"]);
  assert.deepStrictEqual(r.ourPaths, ["/california-dmv-practice-test"]);
  assert.strictEqual(r.searches, 1);
  assert.strictEqual(r.saidAboutUs.length, 1);
  assert.match(r.saidAboutUs[0], /Tigertest offers 4 free practice tests\.$/);
});

test("the summary lists questions where our page was found but not cited", () => {
  const base = { family: "DMV", mentioned: false, rank: 0, ourPaths: [], citedHosts: [], searches: 1, costUsd: 0, excerpt: "" };
  const s = summarize([
    { ...base, id: "found", inResults: true, cited: false },
    { ...base, id: "used", inResults: true, cited: true },
    { ...base, id: "absent", inResults: false, cited: false },
  ]);
  assert.deepStrictEqual(s.foundNotCited, ["found"]);
});

test("a page in the search results that the answer never used is not a citation", () => {
  const r = analyzeAnswer(answer.slice(0, 4));
  assert.strictEqual(r.mentioned, false);
  assert.strictEqual(r.cited, false);
  assert.strictEqual(r.inResults, true);
  assert.strictEqual(r.rank, 0);
});

test("a search error object and other blocks do not break the reader", () => {
  const r = analyzeAnswer([
    { type: "web_search_tool_result", content: { type: "web_search_tool_result_error", error_code: "max_uses_exceeded" } },
    { type: "code_execution_tool_result", content: {} },
    { type: "text", text: "Try TigerTest.io." },
  ]);
  assert.strictEqual(r.mentioned, true);
  assert.strictEqual(r.cited, true);
  assert.strictEqual(r.blockTypes.web_search_tool_result, 1);
});

test("sites recommended by name or link without a citation still count, in order", () => {
  const r = analyzeAnswer([
    { type: "text", text: "Start with Driving-Tests.org, then the DMV at https://www.dmv.ca.gov/portal/ and StateofFlorida.com. Node.js, e.g. not sites." },
  ]);
  assert.deepStrictEqual(r.citedHosts, ["driving-tests.org", "dmv.ca.gov", "stateofflorida.com"]);
  assert.strictEqual(r.cited, false);
  const ours = analyzeAnswer([{ type: "text", text: "See https://www.tigertest.io/teas-practice-test or ATI." }]);
  assert.strictEqual(ours.cited, true);
  assert.strictEqual(ours.rank, 1);
  assert.deepStrictEqual(ours.ourPaths, ["/teas-practice-test"]);
});

test("the summary counts answered questions only and ranks cited sites", () => {
  const base = { family: "DMV", inResults: false, rank: 0, ourPaths: [], searches: 1, costUsd: 0.05, excerpt: "" };
  const s = summarize([
    { ...base, id: "a", mentioned: true, cited: true, citedHosts: ["tigertest.io", "x.com"] },
    { ...base, id: "b", mentioned: false, cited: false, citedHosts: ["x.com"] },
    { ...base, id: "c", mentioned: false, cited: false, citedHosts: [], error: "declined" },
  ]);
  assert.strictEqual(s.asked, 3);
  assert.strictEqual(s.answered, 2);
  assert.strictEqual(s.mentioned, 1);
  assert.strictEqual(s.cited, 1);
  assert.deepStrictEqual(s.topHosts[0], { host: "x.com", answers: 2 });
  assert.deepStrictEqual(s.byFamily.DMV, { asked: 3, mentioned: 1, cited: 1 });
  assert.strictEqual(s.costUsd, 0.15);
});

test("questions are unique, never name Tigertest, and point at pages that exist", () => {
  const ids = new Set(AI_QUESTIONS.map((q) => q.id));
  assert.strictEqual(ids.size, AI_QUESTIONS.length);
  for (const q of AI_QUESTIONS) {
    assert.ok(!/tiger/i.test(q.text), `${q.id} names Tigertest`);
    if (/-dmv-practice-test$/.test(q.path)) continue; // state landings come from data/states.ts
    if (q.path === "/") continue;
    assert.ok(fs.existsSync(path.join(__dirname, "..", "app", q.path)), `${q.id}: no app${q.path}`);
  }
});

test("the job has a budget share and is priced at Sonnet rates", () => {
  assert.ok(JOB_BUDGETS_USD[AI_ANSWERS_JOB] > 0);
  const usd = usageCostUsd({ input_tokens: 1_000_000, output_tokens: 100_000, server_tool_use: { web_search_requests: 2 } }, SONNET_PRICES);
  assert.strictEqual(Math.round(usd * 100) / 100, 2 + 1 + 0.02);
});
