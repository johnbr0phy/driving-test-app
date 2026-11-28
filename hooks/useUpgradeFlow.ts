"use client";

import { startCheckout } from "@/lib/startCheckout";
import { useState } from "react";
import { trackPaywallDismissed, trackPaywallHit, trackViewItem } from "@/lib/analytics";

export type PaywallFeature = string;

// Same open-paywall / Stripe-checkout flow used on the dashboard and stats
// page, factored out so both results prototypes can trigger it in place
// instead of redirecting to /dashboard. Signed out, checkout runs as a guest
// (lib/startCheckout.ts).
//
// returnPath is where Stripe sends the buyer back, and where the purchase is
// verified (/dashboard for the DMV, the exam dashboard for SAT and ACT).
export function useUpgradeFlow(location: string, returnPath = "/dmv/dashboard") {
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [paywallItem, setPaywallItem] = useState<string>();
  const [paywallFeature, setPaywallFeature] = useState<PaywallFeature>("practice_test_4");

  const openPaywall = (feature: PaywallFeature, itemId: string, itemLabel: string) => {
    trackViewItem(feature);
    trackPaywallHit(itemId, itemLabel, location);
    setPaywallFeature(feature);
    setPaywallItem(itemId);
    setPaywallOpen(true);
  };

  const onOpenChange = (open: boolean) => {
    if (!open && paywallOpen) trackPaywallDismissed(location, paywallItem);
    setPaywallOpen(open);
  };

  const handleUpgrade = () => startCheckout({ location, returnPath, feature: paywallFeature, itemId: paywallItem });

  return { paywallOpen, paywallFeature, openPaywall, onOpenChange, handleUpgrade };
}
