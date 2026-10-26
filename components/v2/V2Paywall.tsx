"use client";

import { useRouter } from "next/navigation";
import { PaywallModal } from "@/components/PaywallModal";
import { useStore } from "@/store/useStore";
import { useUpgradeFlow } from "@/hooks/useUpgradeFlow";
import { ExamV2Config } from "@/lib/v2/types";
import { v2Routes } from "@/lib/v2/registry";
import { V2_PAYWALL_PREFIX } from "@/lib/v2/premium";

/**
 * The shared Tigertest Premium paywall, worded for a v2 exam. Checkout
 * returns to the exam's dashboard, which verifies the purchase.
 */
export function useV2Paywall(exam: ExamV2Config, location: string) {
  const routes = v2Routes(exam);
  const upgrade = useUpgradeFlow(`${exam.id}_${location}`, routes.dashboard);
  return {
    open: (itemKey: string, itemLabel: string) =>
      upgrade.openPaywall(`${exam.id}_premium`, `${V2_PAYWALL_PREFIX}${exam.id}_${itemKey}`, `${exam.shortName} ${itemLabel}`),
    modalProps: {
      open: upgrade.paywallOpen,
      onOpenChange: upgrade.onOpenChange,
      onUpgrade: upgrade.handleUpgrade,
    },
  };
}

export function V2Paywall({
  exam,
  open,
  onOpenChange,
  onUpgrade,
}: {
  exam: ExamV2Config;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpgrade: () => Promise<void>;
}) {
  const router = useRouter();
  const isGuest = useStore((s) => s.isGuest || !s.userId);
  const routes = v2Routes(exam);
  return (
    <PaywallModal
      open={open}
      onOpenChange={onOpenChange}
      feature={`${exam.id}_premium`}
      onUpgrade={onUpgrade}
      isGuest={isGuest}
      onSignUp={() => router.push(`/signup?redirect=${encodeURIComponent(routes.dashboard)}`)}
      benefits={exam.premium?.benefits}
    />
  );
}
