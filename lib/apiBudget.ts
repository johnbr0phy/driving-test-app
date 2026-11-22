/**
 * Claude API spend budget (docs/claude/question-quality.md, "API budget").
 *
 * The Console caps the organization at MONTHLY_LIMIT_USD a month; past it every
 * request fails until the 1st. Every job that calls the API checks its share
 * here before it starts, passes the result as a hard cap (Claude Code's
 * --max-budget-usd, or a running total in scripts), and records what it spent
 * in Firestore apiSpend/{YYYY-MM} (lib/server/apiBudget.ts).
 *
 * Pure functions only, so tests load this without Firebase.
 */

export const MONTHLY_LIMIT_USD = 200;

/** Nothing new starts once the month's total reaches this; the gap covers runs already going and calls outside the ledger. */
export const STOP_AT_USD = 190;

/** Each job's share of a month. Sums to 188, under STOP_AT_USD. */
export const JOB_BUDGETS_USD: Readonly<Record<string, number>> = {
  'daily-brief': 35,
  'source-triage': 45,
  'question-audit': 45,
  'search-gaps': 28,
  'exam-upkeep': 20,
  // AI answer check (lib/aiAnswers.ts): 25 questions twice a week on Sonnet 5.5, about $0.07 each.
  'ai-answers': 15,
};

/** A run with less than this to spend would stop before doing anything useful, so it does not start. */
export const MIN_RUN_USD = 1;

/** Spend before the ledger existed (Console figure, Nov 20 2026), counted in the month's total. */
export const UNTRACKED_USD: Readonly<Record<string, number>> = { '2026-11': 165 };

/** Claude Opus 5.5 list prices, US dollars per million tokens; web search per request. */
export const PRICES = {
  input: 4,
  output: 20,
  cacheWrite: 5,
  cacheRead: 0.2,
  webSearch: 0.01,
};

/** Claude Sonnet 5.5 list prices, same units as PRICES. */
export const SONNET_PRICES: typeof PRICES = {
  input: 2,
  output: 10,
  cacheWrite: 2.5,
  cacheRead: 0.1,
  webSearch: 0.01,
};

export interface MonthSpend {
  totalUsd: number;
  jobs: Record<string, number>;
}

export interface UsageLike {
  input_tokens?: number | null;
  output_tokens?: number | null;
  cache_creation_input_tokens?: number | null;
  cache_read_input_tokens?: number | null;
  server_tool_use?: { web_search_requests?: number | null } | null;
}

export function monthKey(date = new Date()): string {
  return date.toISOString().slice(0, 7);
}

/** Dollar cost of one response's usage, at Opus 5.5 prices unless others are given. */
export function usageCostUsd(u: UsageLike | null | undefined, prices: typeof PRICES = PRICES): number {
  if (!u) return 0;
  const m = 1_000_000;
  return (
    ((u.input_tokens ?? 0) * prices.input) / m +
    ((u.output_tokens ?? 0) * prices.output) / m +
    ((u.cache_creation_input_tokens ?? 0) * prices.cacheWrite) / m +
    ((u.cache_read_input_tokens ?? 0) * prices.cacheRead) / m +
    (u.server_tool_use?.web_search_requests ?? 0) * prices.webSearch
  );
}

/**
 * Most a run of `job` may spend now: the smallest of its per-run cap, what is
 * left of the job's month, and what is left before STOP_AT_USD. 0 means skip.
 */
export function allowanceUsd(spend: MonthSpend, job: string, perRunCapUsd: number): number {
  const jobLeft = (JOB_BUDGETS_USD[job] ?? 0) - (spend.jobs[job] ?? 0);
  const totalLeft = STOP_AT_USD - spend.totalUsd;
  const left = Math.min(perRunCapUsd, jobLeft, totalLeft);
  return left >= MIN_RUN_USD ? Math.floor(left * 100) / 100 : 0;
}

/** Sums total_cost_usd over the result messages of a Claude Code run (the action's execution file). */
export function claudeCodeRunCostUsd(execution: unknown): number {
  const items = Array.isArray(execution) ? execution : [execution];
  let sum = 0;
  for (const item of items) {
    if (item && typeof item === 'object' && (item as { type?: string }).type === 'result') {
      const cost = (item as { total_cost_usd?: unknown }).total_cost_usd;
      if (typeof cost === 'number' && Number.isFinite(cost)) sum += cost;
    }
  }
  return sum;
}
