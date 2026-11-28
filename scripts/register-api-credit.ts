/** Register a grant only AFTER verifying its amount and exact expiry in the provider's billing UI.
 * Usage: npx tsx scripts/register-api-credit.ts <grant-id> <usd> <starts-at-ISO> <expires-at-ISO>
 * New credits are never inferred from a calendar date. Re-registering an ID never resets spend.
 */
import { getAdminDb } from '@/lib/firebase-admin';
import { budgetWindow, type CreditGrant } from '@/lib/ai/budget';

async function main() {
  const [id, amount, startsAt, expiresAt] = process.argv.slice(2);
  const grant: CreditGrant = { id, usd: Number(amount), startsAt, expiresAt };
  if (!budgetWindow('openai', grant)) throw new Error('Grant must be active, have a safe ID, and be at most $200');
  const db = getAdminDb();
  await db.runTransaction(async (tx) => {
    const current = db.doc('apiCreditGrants/openai');
    const old = (await tx.get(current)).data() as CreditGrant | undefined;
    // Do not manufacture another allowance by changing the ID of the same period.
    if (old && old.id !== id && Date.parse(old.expiresAt) > Date.parse(startsAt)) throw new Error('Grant overlaps the previous grant');
    const history = db.doc(`apiCreditGrantHistory/${id}`);
    const saved = (await tx.get(history)).data();
    if (saved && ['id', 'usd', 'startsAt', 'expiresAt'].some((key) => saved[key] !== grant[key as keyof CreditGrant])) throw new Error('Grant IDs are immutable');
    tx.set(history, grant);
    tx.set(current, grant);
  });
  console.log('Verified API grant registered. Existing spend is retained.');
}
main().catch((e) => { console.error(e instanceof Error ? e.message : 'Registration failed'); process.exitCode = 1; });
