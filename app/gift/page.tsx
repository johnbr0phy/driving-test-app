"use client";

import { useState } from "react";
import Image from "next/image";
import { Gift, Send, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { auth } from "@/lib/firebase";

const STEPS = ["Enter details", "Review", "Pay"];

export default function GiftPage() {
  const hydrated = useHydration();
  const hasPremiumAccess = useStore((s) => s.hasPremiumAccess);
  const isPremium = hydrated ? hasPremiumAccess() : false;

  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand bg-white text-gray-900 placeholder-gray-400";

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!recipientEmail || !recipientName || !senderName) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) {
      setError("Please enter a valid email address.");
      return;
    }
    setStep(1);
  };

  const handleCheckout = async () => {
    setLoading(true);
    setError("");
    try {
      // Get auth token if logged in, or use guest flow
      let idToken: string | null = null;
      const user = auth.currentUser;
      if (user) {
        idToken = await user.getIdToken();
      }

      const res = await fetch("/api/stripe/gift-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
        },
        body: JSON.stringify({
          recipientEmail,
          recipientName,
          senderName,
          note,
          returnUrl: `${window.location.origin}/gift/success`,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-b from-brand to-brand-dark text-white">
        <div className="max-w-2xl mx-auto px-6 py-14 text-center">
          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
              <Gift className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Give the gift of confidence
          </h1>
          <p className="text-blue-100 text-lg max-w-md mx-auto">
            Help someone pass their DMV permit test first try. One payment, full
            premium access — no subscription, no renewal.
          </p>
        </div>
      </div>

      {/* What they get */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-6 py-8">
          <h2 className="text-center text-sm font-semibold text-gray-500 uppercase tracking-widest mb-5">
            What they get
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            {[
              { icon: "📚", label: "All 4 practice tests", sub: "200+ questions per state" },
              { icon: "🎯", label: "Full training mode", sub: "State Laws + all categories" },
              { icon: "📊", label: "Progress tracking", sub: "Stats, weak areas, history" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="font-semibold text-gray-900">{item.label}</div>
                  <div className="text-gray-500 text-xs">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Steps indicator */}
      <div className="max-w-2xl mx-auto px-6 pt-8 pb-2">
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  i < step
                    ? "bg-green-500 text-white"
                    : i === step
                    ? "bg-brand text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span
                className={`text-sm font-medium ${
                  i === step ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {s}
              </span>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-px bg-gray-200 mx-1" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form area */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        {step === 0 && (
          <form onSubmit={handleNext} className="space-y-5">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Your name <span className="text-red-400">*</span>
                  </label>
                  <input
                    className={inputClass}
                    placeholder="e.g. Sarah (Mum)"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Recipient&apos;s name <span className="text-red-400">*</span>
                  </label>
                  <input
                    className={inputClass}
                    placeholder="e.g. Jake"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Recipient&apos;s email <span className="text-red-400">*</span>
                  </label>
                  <input
                    className={inputClass}
                    type="email"
                    placeholder="jake@email.com"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1.5">
                    We&apos;ll send their access code here after payment.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Personal note{" "}
                    <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    className={`${inputClass} resize-none`}
                    rows={3}
                    placeholder="e.g. Good luck on your test! You've got this 🚗"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    maxLength={200}
                  />
                  <p className="text-xs text-gray-400 mt-1 text-right">{note.length}/200</p>
                </div>
              </CardContent>
            </Card>

            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-brand text-white hover:bg-brand-dark h-12 text-base font-bold"
            >
              Review gift →
            </Button>
          </form>
        )}

        {step === 1 && (
          <div className="space-y-5">
            {/* Gift preview card */}
            <Card className="border-2 border-brand-border-light bg-gradient-to-br from-brand-light to-white overflow-hidden">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center">
                    <Gift className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">Gift from</div>
                    <div className="font-bold text-gray-900">{senderName}</div>
                  </div>
                </div>

                {note && (
                  <div className="bg-white rounded-xl p-4 mb-4 border border-gray-100 italic text-gray-700 text-sm">
                    &ldquo;{note}&rdquo;
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Send className="w-4 h-4 text-brand shrink-0" />
                  Sending to: <span className="font-semibold text-gray-900">{recipientName}</span> ({recipientEmail})
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-gray-900">TigerTest Premium</div>
                      <div className="text-xs text-gray-500">Lifetime access · All 50 states</div>
                    </div>
                    <div className="text-2xl font-black text-brand">$9.99</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust signals */}
            <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-green-500" /> Secure checkout
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-green-500" /> Instant delivery
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-yellow-400" /> No subscription
              </span>
            </div>

            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            <Button
              className="w-full bg-brand text-white hover:bg-brand-dark h-12 text-base font-bold"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Redirecting to checkout…" : "Buy gift for $9.99 →"}
            </Button>
            <button
              className="w-full text-sm text-gray-400 hover:text-gray-600 py-2"
              onClick={() => setStep(0)}
            >
              ← Edit details
            </button>
          </div>
        )}
      </div>

      {/* Social proof footer */}
      <div className="max-w-2xl mx-auto px-6 pb-16">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-3">Great gift for</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Teen getting their permit",
              "New driver in the family",
              "International license conversion",
              "Someone who failed their test",
            ].map((tag) => (
              <span
                key={tag}
                className="bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs text-gray-600 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
