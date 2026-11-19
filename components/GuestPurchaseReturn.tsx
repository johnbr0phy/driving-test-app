"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import { trackFunnelSignup } from "@/lib/funnel";
import { markGuestPurchaseSignIn } from "@/lib/guestPurchaseSignIn";

/**
 * Back from a guest checkout (paid without being signed in; root layout).
 * The page still carries ?session_id=...&success=true. The server finds or
 * makes the buyer's account (app/api/stripe/guest-session):
 *  - made for this purchase: sign them straight in. The page's own purchase
 *    check then runs as for any buyer (usePurchaseReturn, the DMV dashboard);
 *  - an account they already had: say which address and offer Sign in,
 *    which brings them back here, URL and all, to verify the purchase.
 */
export function GuestPurchaseReturn() {
  const params = useSearchParams();
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const [existingEmail, setExistingEmail] = useState<string | null>(null);
  const tried = useRef<string | null>(null);

  const sessionId = params.get("session_id");
  const success = params.get("success") === "true";

  useEffect(() => {
    if (loading || user || !sessionId || !success || tried.current === sessionId) return;
    tried.current = sessionId;
    (async () => {
      try {
        const res = await fetch("/api/stripe/guest-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json();
        if (data?.status === "sign_in" && data.customToken) {
          // Whatever this browser practised as a guest goes onto the new
          // account (AuthContext converts a guest store on sign-in).
          useStore.setState({ isGuest: true });
          markGuestPurchaseSignIn();
          await signInWithCustomToken(auth, data.customToken);
          trackFunnelSignup();
        } else if (data?.status === "existing_account" && data.email) {
          setExistingEmail(data.email);
        }
      } catch (err) {
        console.error("Guest purchase sign-in failed:", err);
      }
    })();
  }, [loading, user, sessionId, success]);

  if (!existingEmail || user) return null;

  const back = `${pathname}?${params.toString()}`;
  return (
    <div
      role="status"
      className="fixed top-4 left-4 right-4 z-50 mx-auto flex max-w-md flex-col gap-3 rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-900 shadow-lg dark:border-green-700 dark:bg-green-950 dark:text-green-100"
    >
      <p>
        <strong>Thanks, your payment went through.</strong> Premium is on the Tigertest account you
        already have with {existingEmail}. Sign in with that email to use it.
      </p>
      <div className="flex gap-2">
        <Link
          href={`/login?redirect=${encodeURIComponent(back)}`}
          className="rounded-lg bg-black px-3 py-1.5 font-semibold text-white dark:bg-white dark:text-gray-900"
        >
          Sign in
        </Link>
        <button
          type="button"
          onClick={() => setExistingEmail(null)}
          className="rounded-lg px-3 py-1.5 font-semibold"
        >
          Later
        </button>
      </div>
    </div>
  );
}
