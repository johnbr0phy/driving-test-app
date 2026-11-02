"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Status = "loading" | "did-you-pass" | "celebration" | "standard-exit" | "error";

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  // /api/unsubscribe GET (the List-Unsubscribe URL) already did the work and
  // redirected here with done=1 and the exam name, so don't do it twice.
  const alreadyDone = searchParams.get("done") === "1";
  const [status, setStatus] = useState<Status>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [testName, setTestName] = useState(searchParams.get("test") || "DMV test");

  useEffect(() => {
    if (!token) {
      setErrorMessage("Invalid unsubscribe link. Please use the link from your email.");
      setStatus("error");
      return;
    }
    if (alreadyDone) {
      setStatus("did-you-pass");
      return;
    }

    async function unsubscribe() {
      try {
        const response = await fetch("/api/unsubscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = await response.json();
        if (data.success) {
          if (data.testName) setTestName(data.testName);
          setStatus("did-you-pass");
        } else {
          setErrorMessage(data.error || "Failed to unsubscribe. Please try again.");
          setStatus("error");
        }
      } catch {
        setErrorMessage("Something went wrong. Please try again later.");
        setStatus("error");
      }
    }

    unsubscribe();
  }, [token, alreadyDone]);

  async function handlePassed() {
    try {
      await fetch("/api/record-pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
    } catch {
      // fire and forget
    }
    setStatus("celebration");
  }

  const isDmv = testName === "DMV test";
  const tweetText = encodeURIComponent(
    `Just passed my ${isDmv ? "driving test" : testName}! 🎉 Studied with Tigertest — free practice tests that actually work. tigertest.io`
  );
  const requestHref = `/request-test?t=${encodeURIComponent(token ?? "")}&src=unsubscribe`;

  return (
    <div className="flex-1 bg-white dark:bg-gray-900 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">

        {/* State 1: Loading */}
        {status === "loading" && (
          <>
            <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-800 border-t-brand rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300">Unsubscribing...</p>
          </>
        )}

        {/* State 2: Did you pass? */}
        {status === "did-you-pass" && (
          <>
            <div className="text-5xl mb-6">🎓</div>
            <h1 className="text-2xl font-semibold mb-3">Before you go...</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Did you pass your {testName}?
            </p>
            <button
              onClick={handlePassed}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold text-lg rounded-xl py-4 px-6 mb-4 transition-colors"
            >
              🎉 Yes, I passed!
            </button>
            <button
              onClick={() => setStatus("standard-exit")}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 underline underline-offset-2 transition-colors"
            >
              Not yet, just unsubscribing
            </button>
          </>
        )}

        {/* State 3: Celebration */}
        {status === "celebration" && (
          <>
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-2xl font-semibold mb-3">Congratulations!</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-2">That&apos;s what Tigertest is all about.</p>
            <p className="text-gray-500 dark:text-gray-400 mb-8">{isDmv ? "Go enjoy the open road. 🚗" : "Go celebrate. You earned it."}</p>
            <a
              href={`https://twitter.com/intent/tweet?text=${tweetText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 font-medium rounded-xl py-3 px-6 mb-4 transition-colors"
            >
              <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Share the win
            </a>
            <div className="mt-4">
              <Link href={requestHref} className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline underline-offset-2">
                Studying for something else next? Tell us what to build
              </Link>
            </div>
          </>
        )}

        {/* State 4: Standard exit */}
        {status === "standard-exit" && (
          <>
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg aria-hidden="true" className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold mb-3">You&apos;re unsubscribed</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              No more emails from us. Good luck with the test — you&apos;ve got this.
            </p>
            <Button asChild className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200">
              <Link href="/dmv/dashboard">
                Back to Tigertest
              </Link>
            </Button>
            <div className="mt-6">
              <Link href={requestHref} className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline underline-offset-2">
                One last thing: what test should we build next?
              </Link>
            </div>
          </>
        )}

        {/* Error */}
        {status === "error" && (
          <>
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg aria-hidden="true" className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold mb-3">Something went wrong</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">{errorMessage}</p>
            <Button asChild className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200">
              <Link href="/">
                Go Home
              </Link>
            </Button>
          </>
        )}

      </div>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={
      <div className="flex-1 bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-800 border-t-brand rounded-full animate-spin"></div>
      </div>
    }>
      <UnsubscribeContent />
    </Suspense>
  );
}
