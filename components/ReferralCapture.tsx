"use client";

import { useEffect } from "react";
import { normalizeReferralCode } from "@/lib/referral";

export const PENDING_REFERRAL_KEY = "tigertest:pendingReferral";

// Tiny client-side capture: when a visitor lands with `?ref=XXX`, stash the
// code in localStorage so it survives the auth roundtrip. Cleared by
// AuthContext after a successful claim.
//
// Reads from window.location directly (not next/navigation's useSearchParams)
// to avoid forcing every page into a Suspense boundary just for this side effect.
export function ReferralCapture() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const params = new URLSearchParams(window.location.search);
      const raw = params.get("ref");
      if (!raw) return;
      const code = normalizeReferralCode(raw);
      if (!code) return;
      localStorage.setItem(PENDING_REFERRAL_KEY, code);
    } catch {
      // localStorage can throw in private mode - non-fatal
    }
  }, []);

  return null;
}
