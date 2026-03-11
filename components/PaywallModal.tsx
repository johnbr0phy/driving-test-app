"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star, Zap, Repeat } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";
import { en, es } from "@/i18n";
import Image from "next/image";

interface PaywallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feature: "training_set_4" | "practice_test_4" | "full_stats";
  onUpgrade: () => Promise<void>;
  isGuest?: boolean;
  onSignUp?: () => void;
}

type PlanType = "lifetime" | "monthly";

export function PaywallModal({
  open,
  onOpenChange,
  feature,
  onUpgrade,
  isGuest = false,
  onSignUp,
}: PaywallModalProps) {
  const { t, language } = useTranslation();
  const dict = language === "es" ? es : en;
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("lifetime");

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      await onUpgrade();
    } finally {
      setLoading(false);
    }
  };

  const monthlyPrice = "$2.99";
  const lifetimePrice = "$9.99";
  const lifetimeStrikethrough = "$17.99";

  // Equivalent monthly cost if paying lifetime (3.3 months breaks even)
  const lifetimeEquivalent = "$3.33/mo";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-6 gap-0">
        <DialogHeader className="pb-4">
          <div className="flex items-center gap-3">
            <Image
              src="/tiger_face_01.png"
              alt="TigerTest"
              width={56}
              height={56}
              className="flex-shrink-0"
            />
            <DialogTitle className="text-2xl font-bold leading-tight text-gray-900">
              {t("paywall.studySmart")}
              <br />
              {t("paywall.passFirstTime")}
            </DialogTitle>
          </div>
          <DialogDescription className="sr-only">
            {t("paywall.unlockPremiumContent")}
          </DialogDescription>
        </DialogHeader>

        {/* Plan Toggle */}
        <div className="flex rounded-xl border border-gray-200 p-1 mb-5 gap-1 bg-gray-50">
          <button
            onClick={() => setSelectedPlan("monthly")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
              selectedPlan === "monthly"
                ? "bg-white shadow-sm text-gray-900 border border-gray-200"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Repeat className="h-3.5 w-3.5" />
            Monthly
          </button>
          <button
            onClick={() => setSelectedPlan("lifetime")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all relative ${
              selectedPlan === "lifetime"
                ? "bg-brand shadow-sm text-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Zap className="h-3.5 w-3.5" />
            Lifetime
            {/* Best Value badge */}
            <span className={`absolute -top-2.5 -right-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none ${
              selectedPlan === "lifetime" ? "bg-yellow-400 text-yellow-900" : "bg-yellow-100 text-yellow-700 border border-yellow-300"
            }`}>
              BEST
            </span>
          </button>
        </div>

        {/* Pricing Display */}
        <div className={`rounded-xl border-2 p-5 mb-5 transition-all ${
          selectedPlan === "lifetime"
            ? "bg-gradient-to-br from-brand-light to-white border-brand-border-light"
            : "bg-gray-50 border-gray-200"
        }`}>
          {selectedPlan === "lifetime" ? (
            <div>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-4xl font-black text-gray-900">{lifetimePrice}</span>
                <span className="text-xl text-gray-400 line-through font-medium">{lifetimeStrikethrough}</span>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full border border-green-200">
                  SAVE 44%
                </span>
              </div>
              <div className="text-sm text-gray-500 mb-3">
                one-time payment · yours forever
              </div>
              <div className="flex items-center gap-1.5 bg-white rounded-lg px-3 py-2 border border-brand-border-light">
                <Zap className="h-4 w-4 text-brand flex-shrink-0" />
                <span className="text-xs text-brand font-semibold">
                  Cheaper than 3 months of monthly — and you never pay again
                </span>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-4xl font-black text-gray-900">{monthlyPrice}</span>
                <span className="text-gray-500 text-base font-medium">/ month</span>
              </div>
              <div className="text-sm text-gray-500 mb-3">
                cancel anytime · billed monthly
              </div>
              <div className="flex items-center gap-1.5 bg-white rounded-lg px-3 py-2 border border-gray-200">
                <Repeat className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-xs text-gray-600">
                  After 3 months you&apos;ve paid more than Lifetime. Switch any time.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* What you get section */}
        <div className="rounded-xl border border-brand-border-light overflow-hidden mb-5 bg-brand-light">
          <div className="p-4 pb-3">
            <div className="text-xs font-bold text-brand tracking-wider mb-3">
              {t("paywall.whatYouGet")}
            </div>
            <ul className="space-y-2.5">
              {dict.paywall.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2.5 text-sm text-gray-800">
                  <CheckCircle className="h-5 w-5 text-green-600 fill-green-100 flex-shrink-0" />
                  <span>{selectedPlan === "lifetime" && index === dict.paywall.benefits.length - 1
                    ? "One payment, yours forever ✓"
                    : benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA section */}
        {isGuest ? (
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-gray-600 text-center mb-1">
              {t("paywall.createFreeAccountPrompt")}
            </p>
            <Button
              onClick={onSignUp}
              className="w-full bg-brand hover:bg-brand-hover text-white font-semibold py-6 text-base rounded-full"
            >
              {t("common.createAccount")}
            </Button>
            <button
              onClick={() => onOpenChange(false)}
              className="text-sm text-gray-400 hover:text-gray-600 py-2 transition-colors"
            >
              {t("paywall.illTakeMyChances")}
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Button
              onClick={handleUpgrade}
              disabled={loading}
              className="w-full bg-brand hover:bg-brand-hover text-white font-semibold py-6 text-base rounded-full"
            >
              {loading
                ? t("common.loading")
                : selectedPlan === "lifetime"
                ? `Get Lifetime Access — ${lifetimePrice}`
                : `Get Monthly Access — ${monthlyPrice}/mo`}
            </Button>
            {selectedPlan === "monthly" && (
              <button
                onClick={() => setSelectedPlan("lifetime")}
                className="text-xs text-brand font-semibold hover:underline py-1"
              >
                Switch to Lifetime and save {lifetimeEquivalent} equivalent →
              </button>
            )}
            <button
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="text-sm text-gray-400 hover:text-gray-600 py-2 transition-colors disabled:opacity-50"
            >
              {t("paywall.illTakeMyChances")}
            </button>
          </div>
        )}

        {/* Social proof */}
        <div className="flex items-center justify-center gap-1.5 mt-4 pt-3 border-t border-gray-100">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <span className="text-xs text-gray-500">{t("paywall.socialProof")}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
