import Stripe from 'stripe';
import { purchaseExam } from '@/lib/purchaseAttribution';
import { voiceFor } from '@/lib/email-voice';

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

// Premium product name on the Stripe checkout page.
export const PREMIUM_PRODUCT = {
  name: 'Tigertest Premium',
};

const unescape = (s: string) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

/**
 * The checkout page's description, about the exam whose paywall the buyer
 * came from (the `location` the paywall sends, lib/purchaseAttribution.ts),
 * so a CDL buyer is told what CDL Premium adds, not the DMV's sets and tests.
 */
export function premiumDescription(location: string | null | undefined): string {
  const voice = voiceFor(purchaseExam(location));
  const benefits = voice.premiumBenefits
    .map((b) => unescape(b).replace(/^The /, 'the '))
    .filter((b) => !/\bstats\b/i.test(b));
  const lead = benefits.length
    ? `One-time unlock, no subscription. ${voice.shortName}: ${benefits.join('; ')}. `
    : 'One-time unlock, no subscription. ';
  const text = `${lead}Plus full stats and the Premium steps on every other exam.`;
  return text.length > 480 ? `${text.slice(0, 477)}...` : text;
}
