"use client";

// /upgrade: the one TigerTest Premium purchase ($9.99 one-time), opened as a
// page so links from the quiz limits (and the MCP tools' LIMIT_REACHED hint)
// have somewhere to go. It shows the same PaywallModal the DMV dashboard
// uses, with quiz benefits listed, and sends the buyer back to ?redirect
// (default /create) after Stripe.

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PaywallModal } from "@/components/PaywallModal";
import { useUpgradeFlow } from "@/hooks/useUpgradeFlow";
import { useIsPremium } from "@/hooks/useIsPremium";
import { useAuth } from "@/contexts/AuthContext";
import { QUIZ_LIMITS } from "@/lib/quizzes";

const BENEFITS = [
  `Up to ${QUIZ_LIMITS.premium.quizzes} quizzes with ${QUIZ_LIMITS.premium.questions} questions each`,
  "All four DMV practice tests and training sets",
  "One-time purchase, no subscription",
];

function UpgradeContent() {
  const params = useSearchParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const { isPremium, ready } = useIsPremium();
  const redirect = params.get("redirect") ?? "/create";
  const returnPath = redirect.startsWith("/") && !redirect.startsWith("//") ? redirect : "/create";
  const { paywallOpen, openPaywall, onOpenChange, handleUpgrade } = useUpgradeFlow("upgrade_page", returnPath);
  const open = () => openPaywall("quizzes", "quizzes_premium", "Quizzes Premium");

  useEffect(() => {
    if (loading || !ready) return;
    if (isPremium) router.replace(returnPath);
    else openPaywall("quizzes", "quizzes_premium", "Quizzes Premium");
    // openPaywall is recreated each render; the page opens the modal once auth settles.
  }, [loading, ready, isPremium, router, returnPath]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950 px-4 py-12">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">TigerTest Premium</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {isPremium ? "You already have Premium. Taking you back." : "One purchase unlocks more quizzes, more questions and the full DMV course."}
        </p>
        {!isPremium && (
          <button
            type="button"
            onClick={open}
            className="inline-flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 px-6 py-3 font-semibold"
          >
            See what&apos;s included
          </button>
        )}
        <p className="mt-6 text-sm">
          <Link href={returnPath} className="underline text-gray-700 dark:text-gray-200">Not now</Link>
        </p>
      </div>
      <PaywallModal
        open={paywallOpen}
        onOpenChange={(open) => {
          onOpenChange(open);
          if (!open) router.push(returnPath);
        }}
        feature="quizzes"
        onUpgrade={handleUpgrade}
        benefits={BENEFITS}
        isGuest={!user}
        onSignUp={() => router.push(`/signup?redirect=${encodeURIComponent(`/upgrade?redirect=${returnPath}`)}`)}
      />
    </div>
  );
}

export default function UpgradePage() {
  return (
    <Suspense fallback={<div className="flex-1 bg-gray-50 dark:bg-gray-950" />}>
      <UpgradeContent />
    </Suspense>
  );
}
