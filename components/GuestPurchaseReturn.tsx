"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import { trackFunnelSignup } from "@/lib/funnel";
import { clearGuestPurchaseSignIn, markGuestPurchaseSignIn } from "@/lib/guestPurchaseSignIn";
import { defaultEmailConsent } from "@/lib/privacyRegion";

type Notice =
  | { kind: "existing"; email: string }
  | { kind: "used"; email: string }
  | { kind: "pending" }
  | { kind: "elsewhere" }
  | { kind: "error" };

/**
 * Back from a guest checkout (paid without being signed in; root layout).
 * The page still carries ?session_id=...&success=true. The server finds or
 * makes the buyer's account (app/api/stripe/guest-session):
 *  - made for this purchase, in the browser that paid: sign them straight in,
 *    move their guest progress onto it, and confirm Premium;
 *  - an account they already had: say which address and offer Sign in,
 *    which brings them back here, URL and all, to verify the purchase;
 *  - anything else gets a plain message rather than silence.
 */
export function GuestPurchaseReturn() {
  const params = useSearchParams();
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const loadedUid = useStore((s) => s.loadedUid);
  const setPremiumStatus = useStore((s) => s.setPremiumStatus);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [attempt, setAttempt] = useState(0);
  const tried = useRef<string | null>(null);
  const verified = useRef<string | null>(null);

  const sessionId = params.get("session_id");
  const success = params.get("success") === "true";

  // Signed out on return: ask the server who this purchase belongs to.
  useEffect(() => {
    const key = `${sessionId}:${attempt}`;
    if (loading || user || !sessionId || !success || tried.current === key) return;
    tried.current = key;
    (async () => {
      try {
        const res = await fetch("/api/stripe/guest-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json();
        if (data?.status === "sign_in" && data.customToken && data.uid) {
          // Whatever this browser practised as a guest goes onto the new
          // account (AuthContext converts a guest store on sign-in), with the
          // marketing choice this region starts from, since they never saw
          // the sign-up page's box.
          useStore.setState({ isGuest: true, emailConsent: defaultEmailConsent() });
          markGuestPurchaseSignIn(data.uid);
          try {
            await signInWithCustomToken(auth, data.customToken);
          } catch (err) {
            clearGuestPurchaseSignIn();
            throw err;
          }
          trackFunnelSignup();
        } else if (data?.status === "existing_account" && data.email) {
          setNotice({ kind: "existing", email: data.email });
        } else if (data?.status === "sign_in_used" && data.email) {
          setNotice({ kind: "used", email: data.email });
        } else if (data?.status === "unpaid") {
          setNotice({ kind: "pending" });
        } else if (data?.status === "other_browser") {
          setNotice({ kind: "elsewhere" });
        } else if (data?.status !== "not_guest") {
          setNotice({ kind: "error" });
        }
      } catch (err) {
        console.error("Guest purchase sign-in failed:", err);
        setNotice({ kind: "error" });
      }
    })();
  }, [loading, user, sessionId, success, attempt]);

  // Signed in (straight away, or through the banner): confirm Premium once
  // this account has loaded, so the load cannot undo it. Pages with their own
  // check do the same; this covers the ones without.
  useEffect(() => {
    if (!sessionId || !success || !user?.uid || loadedUid !== user.uid || verified.current === sessionId) return;
    verified.current = sessionId;
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
        if (!data?.isPremium || useStore.getState().subscription?.isPremium) return;
        setPremiumStatus({
          isPremium: true,
          purchasedAt: data.purchasedAt || new Date().toISOString(),
          stripeCustomerId: "",
          stripePaymentId: sessionId,
        });
      } catch (err) {
        console.error("Failed to verify purchase:", err);
      }
    })();
  }, [sessionId, success, user?.uid, loadedUid, setPremiumStatus]);

  const retry = useCallback(() => {
    setNotice(null);
    setAttempt((n) => n + 1);
  }, []);

  if (!notice || user) return null;

  const back = `${pathname}?${params.toString()}`;
  const signIn = (
    <Link
      href={`/login?redirect=${encodeURIComponent(back)}`}
      className="rounded-lg bg-black px-3 py-1.5 font-semibold text-white dark:bg-white dark:text-gray-900"
    >
      Sign in
    </Link>
  );
  const message =
    notice.kind === "existing" ? (
      <>
        <strong>Thanks, your payment went through.</strong> Premium is on the Tigertest account you already
        have with {notice.email}. Sign in with that email to use it.
      </>
    ) : notice.kind === "used" ? (
      <>
        <strong>Thanks, your payment went through.</strong> Premium is on your account, {notice.email}. Sign in
        with Google using that email, or tap Forgot password on the sign-in page to set one.
      </>
    ) : notice.kind === "pending" ? (
      <>
        <strong>Thanks.</strong> Your payment is still being confirmed. We&apos;ll email you when Premium is on,
        or try again in a minute.
      </>
    ) : notice.kind === "elsewhere" ? (
      <>
        This purchase was made in another browser. Sign in with the email you paid with to use Premium here.
      </>
    ) : (
      <>
        <strong>Your payment went through</strong>, but we couldn&apos;t sign you in just now. Try again, or
        check your email for how to sign in.
      </>
    );
  const canRetry = notice.kind === "pending" || notice.kind === "error";
  const canSignIn = notice.kind !== "pending";

  return (
    <div
      role="status"
      className="fixed top-4 left-4 right-4 z-50 mx-auto flex max-w-md flex-col gap-3 rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-900 shadow-lg dark:border-green-700 dark:bg-green-950 dark:text-green-100"
    >
      <p>{message}</p>
      <div className="flex gap-2">
        {canRetry && (
          <button
            type="button"
            onClick={retry}
            className="rounded-lg bg-black px-3 py-1.5 font-semibold text-white dark:bg-white dark:text-gray-900"
          >
            Try again
          </button>
        )}
        {canSignIn && !canRetry && signIn}
        <button type="button" onClick={() => setNotice(null)} className="rounded-lg px-3 py-1.5 font-semibold">
          Later
        </button>
      </div>
    </div>
  );
}
