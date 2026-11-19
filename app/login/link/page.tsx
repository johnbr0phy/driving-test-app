"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

type State = "working" | "expired" | "invalid" | "error";

/**
 * The one-tap sign-in link from a guest buyer's receipt
 * (app/api/account/guest-link). The token is in the URL's fragment, so it
 * never reaches a server log or analytics; it is read here and then cleared
 * from the address bar.
 */
export default function LoginLinkPage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [state, setState] = useState<State>("working");
  const started = useRef(false);

  useEffect(() => {
    if (loading || started.current) return;
    started.current = true;
    const params = new URLSearchParams(window.location.hash.slice(1));
    const s = params.get("s");
    const t = params.get("t");
    window.history.replaceState(null, "", window.location.pathname);
    if (!s || !t) {
      setState("invalid");
      return;
    }
    (async () => {
      try {
        const res = await fetch("/api/account/guest-link", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ s, t }),
        });
        const data = await res.json().catch(() => ({}));
        if (data?.status === "expired") return setState("expired");
        if (data?.status !== "sign_in" || !data.customToken) return setState(res.status >= 500 ? "error" : "invalid");
        // Someone else's account on this device: sign it out properly first,
        // so its progress is not mixed into this one.
        if (user && user.uid !== data.uid) await logout();
        if (!user || user.uid !== data.uid) await signInWithCustomToken(auth, data.customToken);
        router.replace("/");
      } catch (err) {
        console.error("Sign-in link failed:", err);
        setState("error");
      }
    })();
  }, [loading, user, logout, router]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-white px-4 dark:bg-gray-900">
      <div className="max-w-sm text-center text-gray-700 dark:text-gray-300">
        {state === "working" ? (
          <p className="animate-pulse text-gray-500 dark:text-gray-400">Signing you in...</p>
        ) : (
          <>
            <p className="mb-4">
              {state === "expired"
                ? "This sign-in link has expired."
                : state === "invalid"
                  ? "This sign-in link doesn't work."
                  : "We couldn't sign you in just now."}{" "}
              Sign in with the email you paid with: tap Forgot password to set a password (or use Sign in with Google if
              it is a Google address).
            </p>
            <Link
              href="/login"
              className="inline-block rounded-lg bg-black px-4 py-2 font-semibold text-white dark:bg-white dark:text-gray-900"
            >
              Go to sign in
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
