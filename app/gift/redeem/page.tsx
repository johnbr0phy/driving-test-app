"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Gift, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Demo code that "works" in the prototype
const DEMO_CODE = "TIGER-GIFT-DEMO";

export default function RedeemPage() {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"enter" | "success" | "invalid">("enter");
  const [loading, setLoading] = useState(false);

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    if (code.trim().toUpperCase() === DEMO_CODE) {
      setStep("success");
    } else {
      setStep("invalid");
    }
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full p-8 text-center shadow-lg">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 relative">
              <Image src="/tiger_face_01.png" alt="TigerTest" fill className="object-contain" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-brand fill-brand" />
            <span className="text-brand font-bold uppercase tracking-widest text-sm">Premium Unlocked</span>
            <Sparkles className="h-5 w-5 text-brand fill-brand" />
          </div>
          <h1 className="text-2xl font-black mb-2">You&apos;re all set! 🎉</h1>
          <p className="text-gray-600 mb-6">
            TigerTest Premium has been added to <strong>{email || "your account"}</strong>. All 4 practice tests and full training mode are now unlocked.
          </p>
          <div className="bg-brand-light border border-brand-border-light rounded-xl p-4 mb-6 text-left space-y-2">
            {[
              "All 4 Practice Tests",
              "Full Training Mode",
              "Weak-area analytics",
              "Lifetime access",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle className="h-4 w-4 text-green-600 fill-green-100 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
          <Link href="/dashboard">
            <Button className="w-full bg-brand text-white hover:bg-brand-hover h-12 font-bold uppercase tracking-wide text-base">
              Start studying <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="max-w-md w-full p-8 shadow-lg">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center">
            <Gift className="h-8 w-8 text-brand" />
          </div>
        </div>
        <h1 className="text-2xl font-black text-center mb-1">Redeem your gift</h1>
        <p className="text-gray-500 text-sm text-center mb-6">
          Enter the gift code you received by email to unlock TigerTest Premium.
        </p>

        {step === "invalid" && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
            That code doesn&apos;t look right. Double-check your email and try again.
            <br />
            <span className="text-xs text-gray-400 mt-1 block">(Prototype tip: try <strong>TIGER-GIFT-DEMO</strong>)</span>
          </div>
        )}

        <form onSubmit={handleRedeem} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Gift code</label>
            <Input
              placeholder="TIGER-XXXX-XXXX"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="font-mono tracking-widest uppercase"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Your email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className="text-xs text-gray-400 mt-1">We&apos;ll link Premium to this account.</p>
          </div>

          <Button
            type="submit"
            className="w-full bg-brand text-white hover:bg-brand-hover h-12 font-bold uppercase tracking-wide text-base"
            disabled={loading}
          >
            {loading ? "Checking…" : "Redeem gift"}
          </Button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-4">
          Need to buy a gift for someone?{" "}
          <Link href="/gift" className="text-brand underline">
            Head here
          </Link>
        </p>
      </Card>
    </div>
  );
}
