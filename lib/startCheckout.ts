"use client";

import { auth } from "@/lib/firebase";
import { checkoutContext, trackCheckoutStep } from "@/lib/analytics";
import { checkoutHttpFailure, type CheckoutBuyer, type CheckoutFailure } from "@/lib/checkoutSteps";
import { checkoutAttribution } from "@/lib/funnel";
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
  itemId?: string;
}): Promise<void> {
  const feature = opts.feature ?? opts.location;
  let buyer: CheckoutBuyer = "unknown";
  let failure: CheckoutFailure = "auth_restore";
  const context = () => checkoutContext(opts.location, opts.itemId, buyer);
  try {
    // Wait for Firebase to restore a session: a signed-in buyer tapping
    // during page load must not go down the guest path.
    await auth.authStateReady();
    const current = auth.currentUser;
    buyer = current ? "signed_in" : "guest";
    trackCheckoutStep("checkout_click", context(), feature);
    failure = "auth_token";
    const idToken = current ? await current.getIdToken() : null;
    const measurement = context();
    failure = "network";
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
        ...(measurement && { checkoutDevice: measurement.checkout_device, checkoutItem: measurement.checkout_item }),
        paywallVariant: paywallVariantForCheckout(),
        paywallHit: paywallHitForCheckout(),
        paywallReturn: paywallReturnForCheckout(),
      }),
    });
    failure = response.ok ? "invalid_response" : checkoutHttpFailure(response.status);
    const data = await response.json();
    if (!response.ok || data?.error) {
      trackCheckoutStep("checkout_error", context(), feature, failure);
      console.error("Checkout error:", data?.error);
      alert(data?.error ? `Error: ${data.error}` : "Failed to start checkout. Please try again.");
      return;
    }
    if (typeof data?.checkoutUrl === "string" && data.checkoutUrl) {
      trackCheckoutStep("begin_checkout", context(), feature);
      failure = "redirect";
      window.location.href = data.checkoutUrl;
    } else {
      trackCheckoutStep("checkout_error", context(), feature, "invalid_response");
      console.error("No checkout URL returned:", data);
      alert("Failed to start checkout. Please try again.");
    }
  } catch (error) {
    if (failure === "auth_restore") trackCheckoutStep("checkout_click", context(), feature);
    trackCheckoutStep("checkout_error", context(), feature, failure);
    console.error("Checkout error:", error);
    alert("Failed to start checkout. Please check your connection and try again.");
  }
}
