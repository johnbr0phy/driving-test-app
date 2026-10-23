"use client";

import Link from "next/link";
import Image from "next/image";
import { Lock, X } from "lucide-react";
import { DrillDef, ExamV2Config } from "@/lib/v2/types";
import { v2Routes } from "@/lib/v2/registry";
import { getTigerAsset } from "@/lib/tigerAssets";
import { useIsNativeApp } from "@/hooks/useIsNativeApp";
import { otherPremiumExams } from "@/lib/v2/premium";
import { useV2Paywall, V2Paywall } from "./V2Paywall";

/**
 * Full-screen lock for a Premium drill, shared by the Basics overview, the
 * Basics runner and the exam-level runner so a direct URL to any of them
 * meets the same wall.
 */
export function DrillLockScreen({ exam, drill, detail, backHref }: { exam: ExamV2Config; drill: DrillDef; detail: string; backHref?: string }) {
  const routes = v2Routes(exam);
  const paywall = useV2Paywall(exam, "drill");
  const isNative = useIsNativeApp();
  return (
    <div className="v2-focus">
      <div className="v2-safe-top shrink-0 bg-white dark:bg-gray-900 px-3 pb-2">
        <Link href={backHref ?? routes.dashboard} className="v2-tap -ml-1 flex w-10 items-center justify-center rounded-full text-gray-500 dark:text-gray-400" aria-label="Back">
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
            {drill.blurb} {detail}, part of Tigertest Premium along with Practice Test 2 and {otherPremiumExams(exam)}.
          </p>
          <button
            type="button"
            onClick={() => paywall.open(`drill_${drill.key}`, `${drill.name} drill`)}
            className="v2-tap mt-6 w-full rounded-xl bg-brand text-base font-bold text-white"
          >
            Unlock with Premium{isNative ? "" : " · $9.99"}
          </button>
          <Link href={routes.dashboard} className="mt-3 block text-sm font-semibold text-gray-500 dark:text-gray-400">Back to the dashboard</Link>
        </div>
      </div>
      <V2Paywall exam={exam} {...paywall.modalProps} />
    </div>
  );
}
