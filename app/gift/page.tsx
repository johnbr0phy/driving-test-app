"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Gift, CheckCircle, Star, ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BENEFITS = [
  "All 4 Practice Tests (200 questions)",
  "Full Training Mode with explanations",
  "Weak-area analytics & progress tracking",
  "All 50 US states covered",
  "Spanish language support",
  "Lifetime access — no subscription",
];

function GiftCardPreview({
  recipientName,
  giftFrom,
}: {
  recipientName: string;
  giftFrom: string;
}) {
  const displayTo = recipientName.trim() || "Your new driver";
  const displayFrom = giftFrom.trim() || "Someone who cares";

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-brand-darker shadow-2xl select-none p-6 sm:p-8">
      {/* Top branding */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Image src="/tiger_face_01.png" alt="TigerTest" width={36} height={36} />
          <span className="text-white font-bold text-base tracking-wide">TigerTest</span>
        </div>
        <Badge className="bg-brand text-white text-xs px-3 py-1 font-bold uppercase tracking-wider">
          Premium
        </Badge>
      </div>

      {/* Main message */}
      <div className="text-brand text-sm font-bold uppercase tracking-widest mb-1">🎁 This is your gift</div>
      <div className="text-white text-2xl sm:text-3xl font-black mb-1 leading-tight">
        Pass your driving test.
      </div>
      <div className="text-gray-400 text-base sm:text-lg mb-6">First time. No retakes.</div>

      {/* To / From */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">To</div>
          <div className="text-white font-semibold text-sm truncate">{displayTo}</div>
        </div>
        <div>
          <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">From</div>
          <div className="text-white font-semibold text-sm truncate">{displayFrom}</div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 pt-4 flex items-center justify-between">
        <div className="text-gray-500 text-xs">tigertest.io</div>
        <div className="text-gray-400 text-xs font-mono tracking-widest">LIFETIME ACCESS</div>
      </div>
    </div>
  );
}

export default function GiftPage() {
  const [recipientName, setRecipientName] = useState("");
  const [giftFrom, setGiftFrom] = useState("");
  const [gifteeEmail, setGifteeEmail] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showFAQ, setShowFAQ] = useState<number | null>(null);

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate checkout flow — in production this would call /api/stripe/checkout with gift metadata
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
    setLoading(false);
  };

  const faqs = [
    {
      q: "How does my teen receive it?",
      a: "Once you complete checkout, we email a personalised gift code to the recipient email you provide. They enter it at tigertest.io/gift/redeem to unlock Premium instantly.",
    },
    {
      q: "Does it expire?",
      a: "Never. TigerTest Premium is a one-time purchase — lifetime access, no subscription.",
    },
    {
      q: "What if they already have a TigerTest account?",
      a: "No problem. The code upgrades any existing free account or creates a new one.",
    },
    {
      q: "Can I buy it as a last-minute gift?",
      a: "Yes — the gift code arrives by email in minutes.",
    },
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full p-8 text-center shadow-lg">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">Gift sent! 🎉</h1>
          <p className="text-gray-600 mb-2">
            A personalised gift code is on its way to <strong>{gifteeEmail || "your recipient"}</strong>.
          </p>
          <p className="text-gray-500 text-sm mb-6">
            They can redeem it anytime at <span className="font-mono text-brand">tigertest.io/gift/redeem</span>
          </p>
          <GiftCardPreview recipientName={recipientName} giftFrom={giftFrom} />
          <Link href="/" className="block mt-6">
            <Button variant="outline" className="w-full">Back to TigerTest</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-b from-gray-950 to-brand-darker text-white px-4 pt-10 pb-14">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Gift className="h-5 w-5 text-brand" />
            <span className="text-brand text-sm font-bold uppercase tracking-widest">Gift a Learner Driver</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 leading-tight">
            Give them the best shot<br className="hidden sm:block" /> at passing first time.
          </h1>
          <p className="text-gray-300 text-lg mb-6 max-w-xl">
            TigerTest Premium — 200 state-specific questions, full analytics, lifetime access. One purchase. Perfect for learner drivers.
          </p>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-black text-brand">$9.99</span>
            <span className="text-gray-400 text-lg">one-time · no subscription</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: form */}
        <div>
          <h2 className="text-2xl font-bold mb-1">Personalise your gift</h2>
          <p className="text-gray-500 text-sm mb-6">We&apos;ll send a gift code to your recipient by email.</p>

          <form onSubmit={handlePurchase} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Recipient&apos;s name</label>
              <Input
                placeholder="e.g. Alex"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Recipient&apos;s email</label>
              <Input
                type="email"
                placeholder="alex@example.com"
                value={gifteeEmail}
                onChange={(e) => setGifteeEmail(e.target.value)}
                required
              />
              <p className="text-xs text-gray-400 mt-1">We&apos;ll send the gift code here.</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">From (your name)</label>
              <Input
                placeholder="e.g. Mum & Dad"
                value={giftFrom}
                onChange={(e) => setGiftFrom(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Your email (receipt)</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-brand text-white hover:bg-brand-hover h-12 text-base font-bold uppercase tracking-wide"
              disabled={loading}
            >
              {loading ? "Redirecting to checkout…" : (
                <span className="flex items-center gap-2">
                  Buy the gift — $9.99 <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
            <p className="text-xs text-center text-gray-400">Secure checkout via Stripe. No account needed to buy.</p>
          </form>

          {/* What they get */}
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-3">
              <Star className="h-4 w-4 text-brand fill-brand" />
              <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">What they unlock</span>
            </div>
            <ul className="space-y-2">
              {BENEFITS.map((b, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-green-600 fill-green-100 flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: card preview + FAQ */}
        <div>
          <h2 className="text-2xl font-bold mb-1">Preview</h2>
          <p className="text-gray-500 text-sm mb-5">This is what your gift code email will look like.</p>
          <GiftCardPreview recipientName={recipientName} giftFrom={giftFrom} />

          {/* FAQ */}
          <div className="mt-8 space-y-2">
            <div className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">FAQs</div>
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="w-full text-left px-4 py-3 flex items-center justify-between font-medium text-sm text-gray-800 hover:bg-gray-50"
                  onClick={() => setShowFAQ(showFAQ === i ? null : i)}
                >
                  {faq.q}
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${showFAQ === i ? "rotate-180" : ""}`} />
                </button>
                {showFAQ === i && (
                  <div className="px-4 pb-3 text-sm text-gray-600 border-t border-gray-100 pt-2">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
