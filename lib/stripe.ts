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
// inline from lib/pricing.ts against the same Stripe product.
export const PREMIUM_PRICE_ID = process.env.STRIPE_SINGLE_PRICE_ID;

// Used only when no Stripe price is configured. The checkout page's text and
// image otherwise come from the Stripe product, edited in the Stripe dashboard.
export const PREMIUM_PRODUCT = {
  name: 'Tigertest Premium',
  description: 'One-time unlock, no subscription: everything on every test on Tigertest, every training set, practice test and full stats.',
};

let premiumProductId: Promise<string | null> | null = null;

/**
 * The Stripe product behind the dollar price, so a checkout in another
 * currency shows the same name, description and image. Cached per instance.
 */
export function getPremiumProductId(): Promise<string | null> {
  if (!PREMIUM_PRICE_ID) return Promise.resolve(null);
  if (!premiumProductId) {
    premiumProductId = getStripe()
      .prices.retrieve(PREMIUM_PRICE_ID)
      .then((p) => (typeof p.product === 'string' ? p.product : p.product.id))
      .catch(() => {
        premiumProductId = null;
        return null;
      });
  }
  return premiumProductId;
}
