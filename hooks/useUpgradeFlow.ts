"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import {
  trackBeginCheckout,
  trackPaywallDismissed,
  trackPaywallHit,
  trackViewItem,
} from "@/lib/analytics";

type PaywallFeature = "training_set_4" | "practice_test_4" | "full_stats";

// Same open-paywall / Stripe-checkout flow used on the dashboard and stats
// page, factored out so both results prototypes can trigger it in place
// instead of redirecting to /dashboard.
export function useUpgradeFlow(location: string) {
  const router = useRouter();
  const { user } = useAuth();
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [paywallFeature, setPaywallFeature] = useState<PaywallFeature>("practice_test_4");

  const openPaywall = (feature: PaywallFeature, itemId: string, itemLabel: string) => {
    trackViewItem(feature);
    trackPaywallHit(itemId, itemLabel, location);
    setPaywallFeature(feature);
    setPaywallOpen(true);
  };

  const onOpenChange = (open: boolean) => {
    if (!open && paywallOpen) trackPaywallDismissed(location);
    setPaywallOpen(open);
  };

  const handleUpgrade = async () => {
    if (!user?.email || !user?.uid) {
      router.push("/signup");
      return;
    }
    try {
      const idToken = await auth.currentUser?.getIdToken();
      if (!idToken) {
        alert("Authentication error. Please sign in again.");
        return;
      }
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
        body: JSON.stringify({ email: user.email, returnUrl: window.location.origin, location }),
      });
      const data = await response.json();
      if (data.error) {
        console.error("Checkout error:", data.error);
        alert(`Error: ${data.error}`);
        return;
      }
      if (data.checkoutUrl) {
        trackBeginCheckout(paywallFeature);
        window.location.href = data.checkoutUrl;
      } else {
        console.error("No checkout URL returned:", data);
        alert("Failed to start checkout. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to start checkout. Please check your connection and try again.");
    }
  };

  return { paywallOpen, paywallFeature, openPaywall, onOpenChange, handleUpgrade };
}
