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

// Price for premium access ($9.99)
export const PREMIUM_PRICE_ID = process.env.STRIPE_SINGLE_PRICE_ID;

// Premium product metadata (used as fallback if no STRIPE_PRICE_ID configured)
export const PREMIUM_PRODUCT = {
  name: 'TigerTest Premium',
  description: 'One-time unlock for every TigerTest exam: DMV Training Sets 3-4 and Practice Tests 3-4, plus SAT and ACT Practice Test 2 and every drill question',
  price: 999, // $9.99 in cents
};
