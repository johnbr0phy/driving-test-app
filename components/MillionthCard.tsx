"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import { MILLIONTH_EVENT, MILLIONTH_KEY, saveMillionthWin } from "@/lib/analytics";
import { getBrowserId } from "@/lib/enrollment";
import { isTestBrowser } from "@/lib/internal";

// The 1,000,000th question (lib/server/millionth). Shown only on the browser
// that answered it. A guest is asked to sign up or log in; Premium then lands
// on that account. Mounted once in the root layout.

type Win = { claimToken: string; signedIn: boolean; claimed?: boolean; dismissed?: boolean };

const CHECKED_KEY = "tigertest-millionth-checked";
// After this the card and its once-a-session status check stop.
const ENDS = Date.parse("2027-03-01T00:00:00Z");

function load(): Win | null {
  try {
    const parsed = JSON.parse(localStorage.getItem(MILLIONTH_KEY) || "null") as Win | null;
    return parsed && typeof parsed.claimToken === "string" ? parsed : null;
  } catch {
    return null;
  }
}

function store(win: Win) {
  try {
    localStorage.setItem(MILLIONTH_KEY, JSON.stringify(win));
  } catch {
    // Best effort.
  }
}

async function hashId(browserId: string): Promise<string> {
  const bytes = new TextEncoder().encode(`millionth:${browserId}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 24);
}

/** Once a session: did this browser win while the response never arrived? */
async function checkStatus() {
  if (Date.now() > ENDS || isTestBrowser() || load()) return;
  try {
    if (sessionStorage.getItem(CHECKED_KEY)) return;
    sessionStorage.setItem(CHECKED_KEY, "1");
  } catch {
    return;
  }
  const browserId = getBrowserId();
  if (!browserId) return;
  try {
    const status = (await (await fetch("/api/millionth/status")).json()) as { state?: string; h?: string | null };
    if ((status.state !== "won" && status.state !== "claimed") || !status.h) return;
    if (status.h !== (await hashId(browserId))) return;
    const res = await fetch("/api/millionth/recover", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ browserId }),
    });
    const body = (await res.json()) as { won?: boolean; claimToken?: string; signedIn?: boolean; claimed?: boolean };
    if (body.won && body.claimToken) {
      saveMillionthWin({ claimToken: body.claimToken, signedIn: !!body.signedIn, claimed: !!body.claimed });
    }
  } catch {
    // Tried again next session.
  }
}

export function MillionthCard() {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const [win, setWin] = useState<Win | null>(null);
  const [claiming, setClaiming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // "Later" hides an unclaimed card for this page view only.
  const [later, setLater] = useState(false);

  useEffect(() => {
    if (Date.now() > ENDS) return;
    const sync = () => setWin(load());
    sync();
    window.addEventListener(MILLIONTH_EVENT, sync);
    void checkStatus();
    return () => window.removeEventListener(MILLIONTH_EVENT, sync);
  }, []);

  const claim = useCallback(async () => {
    if (!user || !win || claiming) return;
    setClaiming(true);
    setError(null);
    try {
      const res = await fetch("/api/millionth/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${await user.getIdToken()}` },
        body: JSON.stringify({ claimToken: win.claimToken }),
      });
      if (res.ok) {
        const next = { ...win, claimed: true };
        store(next);
        setWin(next);
        // Shown at once; the account already holds it (saves never write subscription).
        useStore.setState((s) => ({ subscription: { ...s.subscription, isPremium: true } }));
      } else {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        setError(body.error || "Something went wrong. Try again.");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setClaiming(false);
    }
  }, [user, win, claiming]);

  // A guest who has just signed up or logged in claims straight away.
  useEffect(() => {
    if (win && !win.signedIn && !win.claimed && !loading && user) void claim();
  }, [win, user, loading, claim]);

  if (!win || win.dismissed || later) return null;
  const done = win.signedIn || win.claimed;
  const here = pathname || "/";

  return (
    <div
      role="dialog"
      aria-label="You answered our 1,000,000th question"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md rounded-2xl border border-amber-300 bg-white p-5 shadow-2xl dark:border-amber-700 dark:bg-gray-900"
    >
      <p className="text-3xl">🎉🐯</p>
      <h2 className="mt-2 text-lg font-bold text-gray-900 dark:text-gray-50">You answered our 1,000,000th question!</h2>
      {done ? (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          People have answered a million questions on Tigertest, and the one that got us there was yours. Premium is now
          on your account, free, as our thank you. Check your email too.
        </p>
      ) : (
        <>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            People have answered a million questions on Tigertest, and the one that got us there was yours. As a thank
            you, Premium is yours free. Make a free account (or log in) to claim it.
          </p>
          {user ? (
            <button
              type="button"
              onClick={() => void claim()}
              disabled={claiming}
              className="mt-4 w-full rounded-full bg-black px-4 py-3 font-semibold text-white disabled:opacity-60 dark:bg-white dark:text-gray-900"
            >
              {claiming ? "Adding Premium..." : "Claim Premium"}
            </button>
          ) : (
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href={`/signup?redirect=${encodeURIComponent(here)}`}
                className="w-full rounded-full bg-black px-4 py-3 text-center font-semibold text-white dark:bg-white dark:text-gray-900"
              >
                Sign up free to claim
              </Link>
              <Link
                href={`/login?redirect=${encodeURIComponent(here)}`}
                className="text-center text-sm font-semibold text-gray-700 underline dark:text-gray-200"
              >
                I already have an account
              </Link>
            </div>
          )}
          <button
            type="button"
            onClick={() => setLater(true)}
            className="mt-2 w-full text-center text-sm text-gray-500 dark:text-gray-400"
          >
            Later
          </button>
          {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
        </>
      )}
      {done && (
        <button
          type="button"
          onClick={() => {
            const next = { ...win, dismissed: true };
            store(next);
            setWin(next);
          }}
          className="mt-4 w-full rounded-full bg-black px-4 py-3 font-semibold text-white dark:bg-white dark:text-gray-900"
        >
          Keep practicing
        </button>
      )}
    </div>
  );
}
