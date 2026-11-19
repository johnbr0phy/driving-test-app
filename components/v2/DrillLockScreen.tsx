"use client";

import Link from "next/link";
import Image from "next/image";
import { Lock, X } from "lucide-react";
import { DrillDef, ExamV2Config } from "@/lib/v2/types";
import { v2Routes } from "@/lib/v2/registry";
import { getTigerAsset } from "@/lib/tigerAssets";
import { useIsNativeApp } from "@/hooks/useIsNativeApp";
import { useV2Paywall, V2Paywall } from "./V2Paywall";
import { usePremiumPrice } from "@/hooks/usePremiumPrice";
import { useV2Ui } from "@/lib/v2/ui";

/**
 * Full-screen lock for a Premium drill, shared by the Basics overview, the
 * Basics runner and the exam-level runner so a direct URL to any of them
 * meets the same wall.
 */
export function DrillLockScreen({ exam, drill, detail, backHref }: { exam: ExamV2Config; drill: DrillDef; detail: string; backHref?: string }) {
  const price = usePremiumPrice();
  const allUi = useV2Ui();
  const ui = allUi.dashboard;
  // The Premium test's name ("Practice Test 2"), for the lock copy.
  const lockedTest = exam.premium?.lockedTests[0];
  const premiumTest = lockedTest === undefined ? null : exam.tests.find((t) => t.number === lockedTest)?.name ?? ui.practiceTestN(lockedTest);
  const routes = v2Routes(exam);
  const paywall = useV2Paywall(exam, "drill");
  const isNative = useIsNativeApp();
  return (
    <div className="v2-focus">
      <div className="v2-safe-top shrink-0 bg-white dark:bg-gray-900 px-3 pb-2">
        <Link href={backHref ?? routes.dashboard} className="v2-tap -ml-1 flex w-10 items-center justify-center rounded-full text-gray-500 dark:text-gray-400" aria-label={allUi.common.back}>
          <X className="h-5 w-5" />
        </Link>
      </div>
      <div className="v2-scroll">
        <div className="mx-auto max-w-md px-6 py-8 text-center">
          <Image src={getTigerAsset(exam.id, 3)} alt="" width={112} height={112} className="mx-auto h-28 w-28 object-contain" />
          <h1 className="mt-3 flex items-center justify-center gap-2 text-xl font-bold text-gray-900 dark:text-gray-50">
            <Lock className="h-5 w-5 text-gray-500 dark:text-gray-400" /> {drill.name}
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {ui.drillLockBody(drill.blurb, detail, premiumTest, ui.otherPremiumExams)}
          </p>
          <button
            type="button"
            onClick={() => paywall.open(`drill_${drill.key}`, ui.drillItemLabel(drill.name))}
            className="v2-tap mt-6 w-full rounded-xl bg-brand text-base font-bold text-white"
          >
            {ui.unlockWithPremium(isNative ? null : price)}
          </button>
          <Link href={routes.dashboard} className="mt-3 block text-sm font-semibold text-gray-500 dark:text-gray-400">{ui.backToDashboardLink}</Link>
        </div>
      </div>
      <V2Paywall exam={exam} {...paywall.modalProps} />
    </div>
  );
}
