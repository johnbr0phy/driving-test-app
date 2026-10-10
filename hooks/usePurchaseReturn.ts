"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { useStore } from "@/store/useStore";
import { trackPurchase } from "@/lib/analytics";

/**
 * Handles the Stripe return on a page other than the DMV dashboard (which
 * has its own copy of this flow): verifies ?session_id=...&success=true,
 * flips the Premium flag locally, and cleans the URL. Returns true once the
 * purchase is confirmed so the page can show a thank-you.
 */
export function usePurchaseReturn(): { justPurchased: boolean; dismiss: () => void } {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  const setPremiumStatus = useStore((s) => s.setPremiumStatus);
  const [justPurchased, setJustPurchased] = useState(false);

  useEffect(() => {
    const sessionId = params.get("session_id");
    const success = params.get("success");

    if (params.get("canceled") === "true") {
      router.replace(pathname);
      return;
    }
    if (!sessionId || success !== "true" || !user?.uid) return;

    let cancelled = false;
    (async () => {
      try {
        const idToken = await auth.currentUser?.getIdToken();
        if (!idToken) return;
        const res = await fetch("/api/stripe/verify-purchase", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json();
        if (cancelled || !data?.isPremium) return;
        trackPurchase(sessionId);
        setPremiumStatus({
          isPremium: true,
          purchasedAt: data.purchasedAt || new Date().toISOString(),
          stripeCustomerId: "",
          stripePaymentId: sessionId,
        });
        setJustPurchased(true);
        router.replace(pathname);
      } catch (err) {
        console.error("Failed to verify purchase:", err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [params, user?.uid, setPremiumStatus, router, pathname]);

  return { justPurchased, dismiss: () => setJustPurchased(false) };
}
