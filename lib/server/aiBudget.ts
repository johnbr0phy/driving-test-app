import { randomUUID } from 'node:crypto';
import type { Firestore } from 'firebase-admin/firestore';
import { AiUnavailable, budgetWindow, remainingUsd, type CreditGrant, type Provider } from '@/lib/ai/budget';

export class AiLedger {
  constructor(private db: Firestore, readonly job: string) {}
  private async window(provider: Provider) {
    const grant = provider === 'openai' ? (await this.db.doc('apiCreditGrants/openai').get()).data() as CreditGrant | undefined : null;
    return budgetWindow(provider, grant ?? null);
  }
  async available(provider: Provider): Promise<number> {
    const w = await this.window(provider);
    return w ? remainingUsd(w, (await this.db.doc(w.path).get()).data() ?? {}, this.job) : 0;
  }
  /** Reserve BEFORE making a request. Unknown outcomes keep the whole reservation charged. */
  async reserve(provider: Provider, usd: number, deadlineMs: number): Promise<(actualUsd: number) => Promise<void>> {
    const w = await this.window(provider);
    if (!w || w.expiresAt - Date.now() < deadlineMs || !Number.isFinite(usd) || usd <= 0) throw new AiUnavailable('Provider has no active credit window');
    const ref = this.db.doc(w.path), receipt = ref.collection('reservations').doc(randomUUID());
    await this.db.runTransaction(async (tx) => {
      const data = (await tx.get(ref)).data() ?? {};
      if (w.expiresAt - Date.now() < deadlineMs || remainingUsd(w, data, this.job) < usd) throw new AiUnavailable('Provider budget exhausted');
      tx.set(ref, { totalUsd: (data.totalUsd ?? 0) + usd, jobs: { ...(data.jobs ?? {}), [this.job]: (data.jobs?.[this.job] ?? 0) + usd }, updatedAt: new Date().toISOString() }, { merge: true });
      tx.set(receipt, { job: this.job, reservedUsd: usd, at: new Date().toISOString() });
    });
    return async (actualUsd) => {
      if (!Number.isFinite(actualUsd) || actualUsd < 0 || actualUsd > usd) throw new Error('Invalid API usage settlement; reservation retained');
      await this.db.runTransaction(async (tx) => {
        const [snap, r] = await Promise.all([tx.get(ref), tx.get(receipt)]);
        if (r.data()?.settled) return;
        const data = snap.data()!;
        const refund = usd - actualUsd;
        tx.set(ref, { totalUsd: data.totalUsd - refund, jobs: { ...data.jobs, [this.job]: data.jobs[this.job] - refund }, updatedAt: new Date().toISOString() }, { merge: true });
        tx.set(receipt, { actualUsd, settled: true }, { merge: true });
      });
    };
  }
}
