"use client";

// "Hi, I'm John" paywall: the same Premium (local price, lib/pricing.ts), pitched as chipping in to
// keep Tigertest running, with the Premium features as the thank-you.
// PaywallModal renders it for English readers (same props).

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { en } from "@/i18n";
import { useIsNativeApp } from "@/hooks/useIsNativeApp";
import { JohnFace } from "@/components/JohnFace";
import { usePremiumPrice } from "@/hooks/usePremiumPrice";
import type { PaywallHit } from "@/lib/paywallTestIds";

interface SupportPaywallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feature: string;
  onUpgrade: () => Promise<void>;
  /** Exam-specific bullets (SAT, ACT). Defaults to the short DMV list. */
  benefits?: string[];
  isGuest?: boolean;
  onSignUp?: () => void;
  /** Which paywall visit this is for the browser: the message changes on the second and third. */
  hit?: PaywallHit;
}

const DMV_BENEFITS = [
  "Safety & Emergencies and State Laws",
  "Tests C and D",
  "The 50 questions most people fail",
  "Full stats on every exam",
];

// One message per visit: the ask the first time, then shorter and more direct.
const MESSAGES: Record<PaywallHit, { title: string; body: (price: string) => string }> = {
  1: {
    title: "Hi, I'm John!",
    body: () =>
      "I run Tigertest by myself. It's getting a bit expensive. Please chip in. It helps me cover the costs.",
  },
  2: {
    title: "Me again!",
    body: (price) =>
      `Looks like you want the good stuff. It's ${price}, one time, and it keeps Tigertest running for everyone.`,
  },
  3: {
    title: "Third time lucky?",
    body: (price) =>
      `You keep landing here, so I'll keep it short: ${price}, once, no subscription. It unlocks everything below and pays my server bill.`,
  },
};

export function SupportPaywallModal({
  open,
  onOpenChange,
  onUpgrade,
  isGuest = false,
  onSignUp,
  benefits,
  hit = 1,
}: SupportPaywallModalProps) {
  const price = usePremiumPrice();
  const message = MESSAGES[hit];
  const [loading, setLoading] = useState(false);
  const isNative = useIsNativeApp();

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      await onUpgrade();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm p-6 gap-0">
        <div className="flex items-center gap-3 mb-3">
          <JohnFace size={64} />
          <DialogTitle className="text-2xl font-bold leading-tight text-gray-900 dark:text-gray-50">
            {message.title}
          </DialogTitle>
        </div>

        <DialogDescription className="!text-base !text-gray-800 dark:!text-gray-100 mb-4">
          {message.body(price)}
        </DialogDescription>

        <ul className="space-y-2 mb-5">
          {(benefits ?? DMV_BENEFITS).map((benefit, index) => (
            <li key={index} className="flex items-center gap-2.5 text-sm text-gray-800 dark:text-gray-100">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 fill-green-100 dark:fill-green-900 flex-shrink-0" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        {isNative && !isGuest ? (
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-1">
              {en.paywall.notAvailableInApp}
            </p>
            <Button
              onClick={() => onOpenChange(false)}
              className="w-full bg-brand hover:bg-brand-hover text-white font-semibold py-6 text-base rounded-full"
            >
              {en.paywall.okGotIt}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <Button
              onClick={isGuest ? onSignUp : handleUpgrade}
              disabled={loading}
              className="w-full bg-brand hover:bg-brand-hover text-white font-semibold py-6 text-base rounded-full"
            >
              {loading ? (
                "Loading..."
              ) : (
                isGuest ? "Sign up free to chip in" : `Chip in ${price}`
              )}
            </Button>
            {!isGuest && (
              <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                One-time payment
              </div>
            )}
            <button
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 py-2 transition-colors disabled:opacity-50"
            >
              Maybe later
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
