import { getAdminDb } from '@/lib/firebase-admin';
import { cachedAdminPayload } from '@/lib/server/adminCache';
import { getInternalUids } from '@/lib/server/internalUsers';
import { buildOpportunities, type OpportunitiesPayload } from '@/lib/server/opportunities';
import { getStripe } from '@/lib/stripe';

// The Today tab's numbers (lib/server/opportunities), cached under one key so
// the Today and Tests tabs share one rebuild. Each rebuild lists Stripe
// checkouts, so it is kept five minutes and an older copy is served while a
// rebuild runs after the response.
async function build(): Promise<OpportunitiesPayload> {
  let stripe = null;
  try {
    stripe = getStripe();
  } catch {
    // Not configured: the tabs show Firestore data and say Stripe is missing.
  }
  return buildOpportunities(getAdminDb(), stripe, await getInternalUids());
}

export function cachedOpportunities(refresh: boolean) {
  return cachedAdminPayload({
    key: 'opportunities',
    ttlMs: 5 * 60_000,
    staleMs: 24 * 3_600_000,
    refresh,
    build,
  });
}
