"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock, Sparkles, CheckCircle, Star } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";
import { en, es } from "@/i18n";
import { SocialProofTicker } from "@/components/SocialProofTicker";

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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-brand-light rounded-full">
              <Lock className="h-5 w-5 text-brand" />
            </div>
            <DialogTitle className="text-xl">{t("paywall.unlockPremiumContent")}</DialogTitle>
          </div>
          <DialogDescription className="pt-2 text-base">
            {t("paywall.getAccessTo")} <strong>{dict.paywall.featureNames[feature]}</strong> {t("paywall.andCompleteDMVPrep")}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {/* Social proof ticker */}
          <div className="mb-4">
            <SocialProofTicker />
          </div>

          {/* Star rating strip */}
          <div className="flex items-center justify-center gap-1.5 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-sm text-gray-600 ml-1">
              <span className="font-semibold text-gray-900">4.8</span> · 1,200+ students passed
            </span>
          </div>

          <div className="bg-gradient-to-r from-brand-light to-brand-gradient-to rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-brand" />
              <span className="font-semibold text-gray-900">{t("paywall.tigerTestPremium")}</span>
            </div>
            <ul className="space-y-2">
              {dict.paywall.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">$9.99</div>
            <div className="text-sm text-gray-500">{t("paywall.oneTimePayment")}</div>
            <div className="mt-1 text-xs text-green-600 font-medium">
              ✓ Less than the cost of failing and rebooking
            </div>
          </div>
        </div>

        {isGuest ? (
          <DialogFooter className="flex flex-col gap-2 sm:flex-col">
            <p className="text-sm text-gray-600 text-center mb-2">
              {t("paywall.createFreeAccountPrompt")}
            </p>
            <Button
              onClick={onSignUp}
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              {t("common.createAccount")}
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full"
            >
              {t("common.maybeLater")}
            </Button>
          </DialogFooter>
        ) : (
          <DialogFooter className="flex flex-col gap-2 sm:flex-col">
            <Button
              onClick={handleUpgrade}
              disabled={loading}
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              {loading ? t("common.loading") : t("paywall.upgradeNow")}
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full"
              disabled={loading}
            >
              {t("common.maybeLater")}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
