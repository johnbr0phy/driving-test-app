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

// Premium's price lives in lib/pricing.ts and its Checkout line item in
// checkoutLineItem() (lib/purchaseAttribution.ts); STRIPE_SINGLE_PRICE_ID is no
// longer read.
