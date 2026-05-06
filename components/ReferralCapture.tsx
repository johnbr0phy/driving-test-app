"use client";

import { useEffect } from "react";
import { normalizeReferralCode } from "@/lib/referral";

export const PENDING_REFERRAL_KEY = "tigertest:pendingReferral";
const VISIT_TRACKED_KEY = "tigertest:referralVisitTracked";

// Tiny client-side capture: when a visitor lands with `?ref=XXX`, stash the
// code in localStorage so it survives the auth roundtrip. Cleared by
// AuthContext after a successful claim.
//
// Also pings /api/referrals/track-visit once per session so we can measure
// top-of-funnel referral traffic independent of whether the visitor signs up.
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

      // Dedupe per browser session so refreshes don't inflate the count.
      let alreadyTracked = false;
      try {
        alreadyTracked = sessionStorage.getItem(VISIT_TRACKED_KEY) === code;
      } catch {
        // sessionStorage can throw in private mode - fall through and count it
      }
      if (!alreadyTracked) {
        try {
          sessionStorage.setItem(VISIT_TRACKED_KEY, code);
        } catch {
          // non-fatal
        }
        fetch("/api/referrals/track-visit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
          keepalive: true,
        }).catch(() => {
          // Fire and forget; don't block UX on analytics
        });
      }
    } catch {
      // localStorage can throw in private mode - non-fatal
    }
  }, []);

  return null;
}
