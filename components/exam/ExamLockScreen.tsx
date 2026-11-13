"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { ExamConfig, examFamilyId } from "@/lib/exams";
import { EXAM_PAYWALL_PREFIX } from "@/lib/examLocks";
import type { ExamRoutes } from "@/lib/examRoutes";
import type { ExamUi } from "@/lib/examUi";
import { getTigerAsset } from "@/lib/tigerAssets";
import { useStore } from "@/store/useStore";
import { useUpgradeFlow } from "@/hooks/useUpgradeFlow";
import { useIsNativeApp } from "@/hooks/useIsNativeApp";
import { usePremiumPrice } from "@/hooks/usePremiumPrice";
import { PaywallModal } from "@/components/PaywallModal";
import { useTranslation } from "@/contexts/LanguageContext";
import { examPaywallCopy } from "@/lib/examPaywallCopy";
import type { Language } from "@/i18n";

/** What the paywall lists for a v1 exam's Premium steps, in the page's language. */
export function examPremiumBenefits(exam: ExamConfig, lang: Language = "en"): string[] {
  return examPaywallCopy(lang).premium(exam.shortName);
}

/**
 * The Premium paywall for a v1 exam's locked step. `where` names the page
 * ("dashboard", "test", "set") so hits and checkouts line up per paywall;
 * checkout returns to the exam dashboard, which verifies the purchase.
 * Keys use the family id (analytics keys allow no hyphens).
 */
export function useExamPaywall(exam: ExamConfig, routes: ExamRoutes, where: "dashboard" | "test" | "set") {
  const family = examFamilyId(exam);
  const upgrade = useUpgradeFlow(`${family}_${where}`, routes.dashboard);
  const router = useRouter();
  const { language } = useTranslation();
  const isGuest = useStore((s) => s.isGuest || !s.userId);
  return {
    open: (itemKey: string, itemLabel: string) =>
      upgrade.openPaywall(`${family}_premium`, `${EXAM_PAYWALL_PREFIX}${family}_${itemKey}`, `${exam.shortName} ${itemLabel}`),
    modal: (
      <PaywallModal
        open={upgrade.paywallOpen}
        onOpenChange={upgrade.onOpenChange}
        feature={`${family}_premium`}
        onUpgrade={upgrade.handleUpgrade}
        benefits={examPremiumBenefits(exam, language)}
        isGuest={isGuest}
        onSignUp={() => router.push(routes.signup)}
        hideSocialProof
      />
    ),
  };
}

/**
 * Stands in for a Premium test or training step opened by its URL. The
 * dashboard shows the same lock on the step's card.
 */
export function ExamLockScreen({
  exam,
  routes,
  ui,
  title,
  where,
  itemKey,
}: {
  exam: ExamConfig;
  routes: ExamRoutes;
  ui: ExamUi;
  title: string;
  where: "test" | "set";
  itemKey: string;
}) {
  const price = usePremiumPrice();
  const isNative = useIsNativeApp();
  const paywall = useExamPaywall(exam, routes, where);
  return (
    <div className="flex flex-1 items-center justify-center bg-gray-50 dark:bg-gray-950 px-6 py-12">
      <div className="w-full max-w-md text-center">
        <Image src={getTigerAsset(exam.id, 3)} alt="" width={112} height={112} className="mx-auto h-28 w-28 object-contain" />
        <h1 className="mt-3 flex items-center justify-center gap-2 text-2xl font-bold text-gray-900 dark:text-gray-50">
          <Lock className="h-5 w-5 flex-shrink-0 text-gray-500 dark:text-gray-400" aria-hidden="true" /> {title}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{ui.premiumStep}</p>
        <button
          type="button"
          onClick={() => paywall.open(itemKey, title)}
          className="mt-6 w-full rounded-xl bg-brand py-3.5 text-base font-bold text-white hover:bg-brand-hover transition-colors"
        >
          {ui.unlockPremium}{isNative ? "" : ` · ${price}`}
        </button>
        <Link href={routes.dashboard} className="mt-3 block text-sm font-semibold text-gray-500 dark:text-gray-400">
          {ui.backToDashboard}
        </Link>
      </div>
      {paywall.modal}
    </div>
  );
}
