"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/contexts/LanguageContext";

/**
 * Stands in for the buy button on a paywall when this signed-out browser
 * already paid as a guest for an account it is not signed in to
 * (lib/guestPaidHint.ts). Signing in opens the Premium they bought; selling
 * again would only end in a refund or a second charge.
 */
export function GuestPaidNotice({ email, onClose }: { email: string; onClose: () => void }) {
  const { t } = useTranslation();
  const signIn = () => {
    const back = `${window.location.pathname}${window.location.search}`;
    window.location.href = `/login?redirect=${encodeURIComponent(back)}`;
  };
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm text-gray-700 dark:text-gray-200 text-center mb-1">
        {t("paywall.alreadyBought").replace("{email}", email)}
      </p>
      <Button
        onClick={signIn}
        className="w-full bg-brand hover:bg-brand-hover text-white font-semibold py-6 text-base rounded-full"
      >
        {t("paywall.signInToUse")}
      </Button>
      <button
        onClick={onClose}
        className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 py-2 transition-colors"
      >
        {t("paywall.okGotIt")}
      </button>
    </div>
  );
}
