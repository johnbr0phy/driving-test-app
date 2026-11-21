"use client";

import { auth } from "@/lib/firebase";
import { trackBeginCheckout } from "@/lib/analytics";
import { checkoutAttribution } from "@/lib/funnel";
import { lockArmForCheckout } from "@/lib/lockTest";
import { paywallHitForCheckout, paywallReturnForCheckout, paywallVariantForCheckout } from "@/lib/paywallTest";

/**
 * Sends the buyer to Stripe Checkout for Premium. Signed in, the purchase
 * goes to their account. Signed out, Stripe asks for their email and the
 * account is found or made from it (lib/server/guestCheckout.ts); the page
 * they come back to signs them in (components/GuestPurchaseReturn.tsx).
 *
 * returnPath is where Stripe sends them back and the purchase is verified;
 * the server falls back to the DMV dashboard when it is left out.
 */
export async function startCheckout(opts: {
  location: string;
  returnPath?: string | null;
  /** What GA4 records as the item; defaults to the location. */
  feature?: string;
}): Promise<void> {
  try {
    // Wait for Firebase to restore a session: a signed-in buyer tapping
    // during page load must not go down the guest path.
    await auth.authStateReady();
    const current = auth.currentUser;
    const idToken = current ? await current.getIdToken() : null;
    const response = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
      },
      body: JSON.stringify({
        email: current?.email ?? undefined,
        returnUrl: window.location.origin,
        ...checkoutAttribution(),
        ...(opts.returnPath ? { returnPath: opts.returnPath } : {}),
        location: opts.location,
        paywallVariant: paywallVariantForCheckout(),
        paywallHit: paywallHitForCheckout(),
        paywallReturn: paywallReturnForCheckout(),
        lockArm: lockArmForCheckout(),
      }),
    });
    const data = await response.json();
    if (data.error) {
      console.error("Checkout error:", data.error);
      alert(`Error: ${data.error}`);
      return;
    }
    if (data.checkoutUrl) {
      trackBeginCheckout(opts.feature ?? opts.location);
      window.location.href = data.checkoutUrl;
    } else {
      console.error("No checkout URL returned:", data);
      alert("Failed to start checkout. Please try again.");
    }
  } catch (error) {
    console.error("Checkout error:", error);
    alert("Failed to start checkout. Please check your connection and try again.");
  }
}
