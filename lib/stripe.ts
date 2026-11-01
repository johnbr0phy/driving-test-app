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

// Premium product metadata (used as fallback if no STRIPE_PRICE_ID configured)
export const PREMIUM_PRODUCT = {
  name: 'Tigertest Premium',
  description: 'One-time unlock: DMV Training Sets 3-4 and Practice Tests 3-4, plus full stats on every exam',
};
