"use client";

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star } from "lucide-react";
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
  const tracked = useRef(false);

  useEffect(() => {
    if (open && !tracked.current) {
      tracked.current = true;
      fetch('/api/analytics/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'paywall_view' }),
      }).catch(() => {});
    }
    if (!open) tracked.current = false;
  }, [open]);

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
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Price section */}
        <div className="mb-5">
          <div className="flex items-baseline justify-between">
            <span className="text-4xl font-bold text-gray-900">$9.99</span>
            <span className="border border-brand text-brand text-xs font-semibold px-3 py-1 rounded-full">
              {t("paywall.cheaperThanRetest")}
            </span>
          </div>
          <div className="text-sm text-gray-500 mt-1">{t("paywall.oneTimePayment")}</div>
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
              {loading ? t("common.loading") : t("paywall.getPremium")}
            </Button>
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
