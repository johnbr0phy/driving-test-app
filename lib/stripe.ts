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

// Premium on the Stripe checkout page, the same for every exam. Set here, not
// on a Stripe Price, so the dashboard's product text can never drift.
export const PREMIUM_PRODUCT = {
  name: 'Tigertest Premium',
  description: 'One-time unlock, no subscription: everything on every test on Tigertest, every training set, practice test and full stats.',
};
