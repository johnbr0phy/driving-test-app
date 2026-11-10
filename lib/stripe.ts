import Stripe from 'stripe';

// Lazy-initialized Stripe instance (to avoid build-time errors)
let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not set');
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripeInstance;
}

// Price for premium access in US dollars ($9.99); other currencies are priced
// inline from lib/pricing.ts.
export const PREMIUM_PRICE_ID = process.env.STRIPE_SINGLE_PRICE_ID;

// Premium product metadata: what the Stripe checkout page shows for every
// non-dollar price (inline price_data). Dollar checkouts show the product
// behind STRIPE_SINGLE_PRICE_ID, whose description is edited in the Stripe
// dashboard: keep the two in step.
export const PREMIUM_PRODUCT = {
  name: 'Tigertest Premium',
  description: 'One-time unlock, no subscription: the final training set and practice test on every exam (DMV sets and tests 3-4), plus full stats on every exam',
};
