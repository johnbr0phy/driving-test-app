"use client";

import { useState } from "react";
import { PaywallModal } from "@/components/PaywallModal";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export default function DemoPaywallPage() {
  const [open, setOpen] = useState(false);

  const handleUpgrade = async () => {
    // Simulate Stripe redirect
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Would redirect to Stripe checkout here!");
    setOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-8 p-6">
      <div className="text-center max-w-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          🧪 Prototype: Price Anchor Toggle
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          Adds a Monthly vs Lifetime toggle to the paywall. The monthly option
          anchors the lifetime price as a steal — 3 months of monthly costs
          more than the lifetime plan.
        </p>
        <Button
          onClick={() => setOpen(true)}
          className="bg-brand hover:bg-brand-hover text-white font-bold px-8 py-6 text-lg rounded-full gap-2"
        >
          <Zap className="h-5 w-5" />
          Open Paywall Modal
        </Button>
        <p className="text-xs text-gray-400 mt-4">
          Try switching between Monthly and Lifetime tabs
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5 max-w-sm w-full">
        <h2 className="font-bold text-gray-800 mb-3 text-sm">What&apos;s new in this prototype</h2>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex gap-2">
            <span className="text-green-500 font-bold flex-shrink-0">✓</span>
            Monthly/Lifetime plan toggle with clear visual states
          </li>
          <li className="flex gap-2">
            <span className="text-green-500 font-bold flex-shrink-0">✓</span>
            Lifetime shows strikethrough &quot;retail&quot; price ($17.99 → $9.99)
          </li>
          <li className="flex gap-2">
            <span className="text-green-500 font-bold flex-shrink-0">✓</span>
            &quot;BEST&quot; badge on lifetime tab to anchor attention
          </li>
          <li className="flex gap-2">
            <span className="text-green-500 font-bold flex-shrink-0">✓</span>
            Monthly view shows &quot;switch to lifetime and save&quot; nudge below CTA
          </li>
          <li className="flex gap-2">
            <span className="text-green-500 font-bold flex-shrink-0">✓</span>
            Lifetime defaults pre-selected (most users convert on default)
          </li>
        </ul>
      </div>

      <PaywallModal
        open={open}
        onOpenChange={setOpen}
        feature="practice_test_4"
        onUpgrade={handleUpgrade}
      />
    </div>
  );
}
