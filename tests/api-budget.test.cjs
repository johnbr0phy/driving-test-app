// Claude API budget (lib/apiBudget.ts): every job that calls the API stays
// inside its monthly share and the whole month stops short of the Console limit.
require("tsx/cjs");
const test = require("node:test");
const assert = require("node:assert");
const {
  JOB_BUDGETS_USD,
  MONTHLY_LIMIT_USD,
  STOP_AT_USD,
  allowanceUsd,
  claudeCodeRunCostUsd,
  usageCostUsd,
} = require("../lib/apiBudget.ts");

const spend = (totalUsd, jobs = {}) => ({ totalUsd, jobs });

test("job shares fit under the stop line, which is under the Console limit", () => {
  const sum = Object.values(JOB_BUDGETS_USD).reduce((a, b) => a + b, 0);
  assert.ok(sum <= STOP_AT_USD, `job budgets sum to ${sum}`);
  assert.ok(STOP_AT_USD < MONTHLY_LIMIT_USD);
});

test("a run gets its per-run cap when the month has room", () => {
  assert.strictEqual(allowanceUsd(spend(10), "source-triage", 3), 3);
});

test("a run never gets more than what is left of its job's share", () => {
  const share = JOB_BUDGETS_USD["source-triage"];
  assert.strictEqual(allowanceUsd(spend(10, { "source-triage": share - 2 }), "source-triage", 8), 2);
});

test("a run never takes the month past the stop line", () => {
  assert.strictEqual(allowanceUsd(spend(STOP_AT_USD - 2), "search-gaps", 8), 2);
});

test("too little left, a spent share, a spent month or an unknown job means skip", () => {
  assert.strictEqual(allowanceUsd(spend(STOP_AT_USD - 0.5), "search-gaps", 8), 0);
  assert.strictEqual(allowanceUsd(spend(10, { "exam-upkeep": JOB_BUDGETS_USD["exam-upkeep"] }), "exam-upkeep", 8), 0);
  assert.strictEqual(allowanceUsd(spend(STOP_AT_USD + 4), "daily-brief", 3), 0);
  assert.strictEqual(allowanceUsd(spend(0), "not-a-job", 8), 0);
});

test("usage is priced at Opus 5.5 rates, web searches included", () => {
  const usd = usageCostUsd({
    input_tokens: 1_000_000,
    output_tokens: 100_000,
    cache_read_input_tokens: 1_000_000,
    cache_creation_input_tokens: 0,
    server_tool_use: { web_search_requests: 10 },
  });
  assert.strictEqual(Math.round(usd * 100) / 100, 4 + 2 + 0.2 + 0.1);
  assert.strictEqual(usageCostUsd(null), 0);
});

test("a Claude Code execution file's cost is the sum of its result messages", () => {
  const file = [
    { type: "system", subtype: "init" },
    { type: "assistant", message: {} },
    { type: "result", subtype: "success", total_cost_usd: 4.25 },
  ];
  assert.strictEqual(claudeCodeRunCostUsd(file), 4.25);
  assert.strictEqual(claudeCodeRunCostUsd({ type: "result", total_cost_usd: 1.5 }), 1.5);
  assert.strictEqual(claudeCodeRunCostUsd([]), 0);
});
