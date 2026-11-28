import { JOB_BUDGETS_USD, STOP_AT_USD, UNTRACKED_USD, monthKey } from '@/lib/apiBudget';

export type Provider = 'claude' | 'openai';
export interface CreditGrant { id: string; startsAt: string; expiresAt: string; usd: number }
export interface BudgetWindow { path: string; limit: number; untracked: number; expiresAt: number }

/** Only an explicitly verified grant enables OpenAI. Never assumes the next renewal was paid. */
export function budgetWindow(provider: Provider, grant: CreditGrant | null, now = new Date()): BudgetWindow | null {
  if (provider === 'claude') {
    const month = monthKey(now);
    return { path: `apiSpend/${month}`, limit: STOP_AT_USD, untracked: UNTRACKED_USD[month] ?? 0,
      expiresAt: Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1) };
  }
  if (!grant || !/^[a-zA-Z0-9_-]{1,100}$/.test(grant.id) || !Number.isFinite(grant.usd) || grant.usd <= 0 || grant.usd > 200) return null;
  const start = Date.parse(grant.startsAt), end = Date.parse(grant.expiresAt);
  if (!(start <= now.getTime() && now.getTime() < end)) return null;
  // Separate namespace: a new month must never reset a subscription-cycle grant.
  return { path: `openaiSpend/${grant.id}`, limit: grant.usd, untracked: 0, expiresAt: end };
}

export function remainingUsd(window: BudgetWindow, data: { totalUsd?: number; jobs?: Record<string, number> }, job: string): number {
  return Math.max(0, Math.min(window.limit - window.untracked - (data.totalUsd ?? 0),
    (JOB_BUDGETS_USD[job] ?? 0) - (data.jobs?.[job] ?? 0)));
}

export class AiUnavailable extends Error {}
export function mayFallback(status: number): boolean {
  return [401, 402, 403, 408, 429].includes(status) || status >= 500;
}
