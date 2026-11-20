import { FieldValue, type Firestore } from 'firebase-admin/firestore';
import { UNTRACKED_USD, monthKey, type MonthSpend } from '@/lib/apiBudget';

/** This month's spend from apiSpend/{YYYY-MM}, plus any spend from before the ledger. */
export async function readSpend(db: Firestore, month = monthKey()): Promise<MonthSpend> {
  const data = (await db.doc(`apiSpend/${month}`).get()).data() as Partial<MonthSpend> | undefined;
  return {
    totalUsd: (data?.totalUsd ?? 0) + (UNTRACKED_USD[month] ?? 0),
    jobs: { ...(data?.jobs ?? {}) },
  };
}

export async function recordSpend(db: Firestore, job: string, usd: number, month = monthKey()): Promise<void> {
  if (!(usd > 0)) return;
  await db.doc(`apiSpend/${month}`).set(
    {
      totalUsd: FieldValue.increment(usd),
      jobs: { [job]: FieldValue.increment(usd) },
      updatedAt: new Date().toISOString(),
    },
    { merge: true },
  );
}
