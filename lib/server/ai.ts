import type { Firestore } from 'firebase-admin/firestore';
import { HAIKU_PRICES, SONNET_PRICES, PRICES, usageCostUsd } from '@/lib/apiBudget';
import { AiUnavailable, mayFallback, type Provider } from '@/lib/ai/budget';
import { toResponses, fromResponses, type Ask, type Reply } from '@/lib/ai/protocol';
import { AiLedger } from '@/lib/server/aiBudget';

export function hasAiKey() { return !!(process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY); }
export interface Ledger {
  available(provider: Provider): Promise<number>;
  reserve(provider: Provider, usd: number, deadlineMs: number): Promise<(actual: number) => Promise<void>>;
}
const DEADLINE_MS = 180_000;
function openaiRates() {
  const input = Number(process.env.OPENAI_INPUT_USD_PER_MTOK), output = Number(process.env.OPENAI_OUTPUT_USD_PER_MTOK);
  if (!(input > 0 && output > 0) || !process.env.OPENAI_TEXT_MODEL) throw new AiUnavailable('OpenAI model and verified prices are not configured');
  return { input: input * 2, output: output * 1.5, cacheWrite: input * 2.5, cacheRead: input * 2, webSearch: 0.01 };
}
export function claudePrices(model: string) { return model.includes('haiku') ? HAIKU_PRICES : model.includes('sonnet') ? SONNET_PRICES : PRICES; }

/** Budgeted regular Messages/Responses calls, including the CLI's tool loop. Never calls the Codex API. */
export class AiSession {
  private ledger: Ledger;
  private heldUsd = 0;
  private queue: Promise<unknown> = Promise.resolve();
  readonly disabled = new Set<Provider>();
  lastProvider: Provider = 'claude';
  lastModel = '';
  constructor(db: Firestore | Ledger, readonly job: string, readonly capUsd: number, private fetcher: typeof fetch = fetch) {
    this.ledger = 'available' in db ? db : new AiLedger(db, job);
  }
  async allowance(): Promise<number> {
    let total = 0;
    for (const p of ['claude', 'openai'] as const) {
      if (!this.key(p) || this.disabled.has(p)) continue;
      if (p === 'openai') { try { openaiRates(); } catch { continue; } }
      total += await this.ledger.available(p);
    }
    return Math.max(0, Math.min(this.capUsd - this.heldUsd, total));
  }
  private key(p: Provider) { return p === 'claude' ? process.env.ANTHROPIC_API_KEY : process.env.OPENAI_API_KEY; }
  create(ask: Ask): Promise<Reply> {
    const next = this.queue.then(() => this.request(ask));
    this.queue = next.catch(() => undefined);
    return next;
  }
  private async request(ask: Ask): Promise<Reply> {
    ask = { ...ask, tools: ask.tools?.map((t) => String(t.type).startsWith('web_search_') ? { ...t, max_uses: 1 } : t) };
    let unavailable = 'No provider has budget';
    for (const provider of ['claude', 'openai'] as const) {
      const key = this.key(provider);
      if (!key || this.disabled.has(provider)) continue;
      let prices: typeof PRICES;
      try { prices = provider === 'claude' ? claudePrices(ask.model) : openaiRates(); }
      catch (e) { if (e instanceof AiUnavailable) continue; throw e; }
      // Images/documents require separate token metering. Refuse them rather than undercount.
      if (/"type":"(?:image|document)"/.test(JSON.stringify(ask))) throw new Error('This gateway budgets text requests only');
      const body = provider === 'openai' ? toResponses(ask, process.env.OPENAI_TEXT_MODEL!) : {
        ...ask, stream: false,
        // No provider-side model fallback: an unpriced model could exceed the reservation.
      };
      const searches = (ask.tools ?? []).reduce((n, t) => n + (String(t.type).startsWith('web_search_') ? Number(t.max_uses ?? 1) : 0), 0);
      // UTF-8 bytes bound text tokens. Tool results can add a full context window per search.
      const inputBound = Buffer.byteLength(JSON.stringify(body)) + 8192 + searches * 200_000;
      const inputRate = provider === 'claude' ? Math.max(prices.input, prices.cacheWrite) * 2 : Math.max(prices.input, prices.cacheWrite);
      const outputRate = provider === 'claude' ? prices.output * 1.5 : prices.output;
      const reserveUsd = Math.ceil((inputBound * inputRate / 1e6 + ask.max_tokens * outputRate / 1e6 + searches * prices.webSearch) * 1e6) / 1e6;
      if (reserveUsd > this.capUsd - this.heldUsd) { unavailable = 'Run budget cannot cover another request'; continue; }
      let settle: (actual: number) => Promise<void>;
      try { settle = await this.ledger.reserve(provider, reserveUsd, DEADLINE_MS); }
      catch (e) { if (e instanceof AiUnavailable) { unavailable = e.message; continue; } throw e; }
      // Count unresolved requests against the run as well as the shared provider ledger.
      this.heldUsd += reserveUsd;
      let res: Response;
      try {
        res = await this.fetcher(provider === 'claude' ? 'https://api.anthropic.com/v1/messages' : 'https://api.openai.com/v1/responses', {
          method: 'POST', signal: AbortSignal.timeout(DEADLINE_MS),
          headers: { 'Content-Type': 'application/json', ...(provider === 'claude' ? { 'x-api-key': key, 'anthropic-version': '2023-06-01' } : { Authorization: `Bearer ${key}` }) },
          body: JSON.stringify(body),
        });
      } catch {
        // The provider may have processed a timed-out request. Keep its reservation.
        this.disabled.add(provider); unavailable = `${provider} connection failed`; continue;
      }
      if (!res.ok) {
        // An error without a completed response is not a billable completion.
        // 5xx/timeout outcomes are uncertain, so retain those reservations.
        if (res.status < 500 && res.status !== 408) { await settle(0); this.heldUsd -= reserveUsd; }
        const errorBody = await res.text();
        const creditError = res.status === 400 && /credit balance|insufficient.quota|billing/i.test(errorBody);
        if (!mayFallback(res.status) && !creditError) throw new Error(`${provider} rejected the request (${res.status})`);
        this.disabled.add(provider); unavailable = `${provider} unavailable (${res.status})`; continue;
      }
      const raw = await res.json();
      // Read usage BEFORE parsing content. Invalid/truncated replies still cost money.
      const usage = raw.usage;
      if (!usage || !Number.isFinite(usage.input_tokens) || !Number.isFinite(usage.output_tokens)) throw new Error('Missing API usage; reservation retained');
      const billedUsage = provider === 'openai' ? { ...usage, server_tool_use: { web_search_requests: (raw.output ?? []).filter((o: { type: string }) => o.type === 'web_search_call').length } } : usage;
      const actual = usageCostUsd(billedUsage, { ...prices, input: inputRate, output: outputRate, cacheWrite: inputRate, cacheRead: inputRate });
      await settle(actual); this.heldUsd -= reserveUsd - actual;
      if (provider === 'claude' && raw.stop_reason === 'max_tokens') throw new Error('AI response was truncated');
      this.lastProvider = provider; this.lastModel = raw.model;
      return provider === 'openai' ? fromResponses(raw) : raw as Reply;
    }
    throw new AiUnavailable(unavailable);
  }
}
