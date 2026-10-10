"use client";

import Image from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";
import { ExamV2Config } from "@/lib/v2/types";
import { v2Routes } from "@/lib/v2/registry";
import { sessionKey } from "@/lib/v2/session";
import { isTestLocked, otherPremiumExams } from "@/lib/v2/premium";
import { useV2Store, resultsForExam } from "@/store/useV2Store";
import { useHydration } from "@/hooks/useHydration";
import { useIsPremium } from "@/hooks/useIsPremium";
import { useIsNativeApp } from "@/hooks/useIsNativeApp";
import { getTigerAsset } from "@/lib/tigerAssets";
import { useV2Paywall, V2Paywall } from "./V2Paywall";

/**
 * Stands in front of ExamRunner for a Premium test. A test the person
 * already started, or already sat, stays open: the lock is for starting
 * fresh, never for taking away work they have.
 */
export function V2TestGate({
  exam,
  testNumber,
  children,
}: {
  exam: ExamV2Config;
  testNumber: number;
  children: React.ReactNode;
}) {
  const hydrated = useHydration();
  const { isPremium, ready } = useIsPremium();
  const session = useV2Store((s) => s.sessions[sessionKey(exam.id, testNumber)]);
  const sat = useV2Store((s) => resultsForExam(s.results, exam.id).some((r) => r.testNumber === testNumber));
  const paywall = useV2Paywall(exam, "test");
  const isNative = useIsNativeApp();
  const routes = v2Routes(exam);

  if (!isTestLocked(exam, testNumber, isPremium)) return <>{children}</>;
  if (!hydrated || !ready) {
    return <div className="v2-focus items-center justify-center text-gray-600">Loading...</div>;
  }
  if (session || sat) return <>{children}</>;

  const test = exam.tests.find((t) => t.number === testNumber);
  return (
    <div className="flex flex-1 items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md text-center">
        <Image src={getTigerAsset(exam.id, 3)} alt="" width={112} height={112} className="mx-auto h-28 w-28 object-contain" />
        <h1 className="mt-3 flex items-center justify-center gap-2 text-2xl font-bold text-gray-900">
          <Lock className="h-5 w-5 text-gray-400" /> {exam.shortName} {test?.name ?? `Practice Test ${testNumber}`}
        </h1>
        <p className="mt-2 text-gray-600">
          This test never appears in the drills, so it shows how ready you really are. It&apos;s part of TigerTest
          Premium, along with every drill question and {otherPremiumExams(exam)}.
        </p>
        <button
          type="button"
          onClick={() => paywall.open(`test_${testNumber}`, test?.name ?? `Practice Test ${testNumber}`)}
          className="mt-6 w-full rounded-xl bg-brand py-3.5 text-base font-bold text-white"
        >
          Unlock with Premium{isNative ? "" : " · $9.99"}
        </button>
        <Link href={routes.dashboard} className="mt-3 block text-sm font-semibold text-gray-500">
          Back to the dashboard
        </Link>
      </div>
      <V2Paywall exam={exam} {...paywall.modalProps} />
    </div>
  );
}
