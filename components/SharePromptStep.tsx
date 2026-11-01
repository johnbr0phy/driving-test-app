"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { JohnFace } from "@/components/JohnFace";
import { isInternalBrowser } from "@/lib/internal";

const MESSAGE = "I've been practicing on Tigertest. Free practice tests, worth a look:";

/** John's "tell a friend" ask, shown in place of a question in training sets
 *  and drills (timing in hooks/useSharePrompt). English only, like his paywall. */
export function SharePromptStep({
  onShared,
  onSkip,
}: {
  onShared: (how: "share" | "copy") => void;
  onSkip: () => void;
}) {
  const [canShare, setCanShare] = useState(false);
  const [done, setDone] = useState<null | "share" | "copy">(null);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
    // It replaces the question whose Next button had focus.
    heading.current?.focus({ preventScroll: true });
  }, []);

  // Tagged so a friend's first visit counts as "Friend's link" (lib/funnel.ts visitSource).
  const url = `${typeof window !== "undefined" ? window.location.origin : "https://tigertest.io"}/?utm_source=friend`;

  const count = (how: "share" | "copy") => {
    setDone(how);
    onShared(how);
    if (!isInternalBrowser()) fetch("/api/analytics/share", { method: "POST" }).catch(() => {});
  };

  const share = async () => {
    try {
      await navigator.share({ title: "Tigertest", text: MESSAGE, url });
      count("share");
    } catch {
      // closed the sheet: leave the buttons as they are
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${MESSAGE} ${url}`);
      count("copy");
    } catch {
      // clipboard blocked
    }
  };

  return (
    <div className="animate-in fade-in duration-200 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 sm:p-6">
      <div className="flex items-center gap-3 mb-3">
        <JohnFace size={64} />
        <h2 ref={heading} tabIndex={-1} className="text-2xl font-bold leading-tight text-gray-900 dark:text-gray-50 outline-none">
          {done ? "Thank you!" : "Do me a favor?"}
        </h2>
      </div>
      {done ? (
        <p className="text-base text-gray-800 dark:text-gray-100 mb-5">
          {done === "copy" ? "Link copied. Send it to someone who's studying. " : ""}That really helps. Now back to the questions.
        </p>
      ) : (
        <p className="text-base text-gray-800 dark:text-gray-100 mb-5">
          You&apos;re on a roll! If Tigertest is helping, tell a friend about it. Word of mouth is how the site grows. Thanks!
          <span className="block mt-2 text-sm font-medium text-gray-600 dark:text-gray-300">John from Tigertest</span>
        </p>
      )}
      {!done && (
        <button
          type="button"
          onClick={canShare ? share : copy}
          className="w-full h-12 rounded-full bg-brand hover:bg-brand-hover text-white text-base font-semibold inline-flex items-center justify-center gap-2"
        >
          {canShare ? <Share2 className="h-5 w-5" aria-hidden="true" /> : <Link2 className="h-5 w-5" aria-hidden="true" />}
          {canShare ? "Tell a friend" : "Copy the link"}
        </button>
      )}
      <button
        type="button"
        onClick={onSkip}
        className={`${done ? "" : "mt-3 "}w-full h-11 rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 inline-flex items-center justify-center gap-2`}
      >
        {done && <Check className="h-4 w-4" aria-hidden="true" />}
        {done ? "Back to the questions" : "Keep practicing"}
      </button>
    </div>
  );
}
