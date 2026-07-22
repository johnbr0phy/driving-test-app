"use client";

// The miss drill: every question the user is still getting wrong across all
// practice-test attempts, as re-answerable QuizRows. Reached from the
// dashboard's per-test drop-down (premium-gated button); `?test=N` scopes to
// one test. Free users can drill the first few, the rest sit behind Premium.

import { Fragment, Suspense, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ChevronRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PaywallModal } from "@/components/PaywallModal";
import { QuizRow } from "@/components/QuizRow";
import { QuestionImage } from "@/components/QuestionImage";
import { getSignIdForQuestion } from "@/lib/signImages";
import { computeMissSummary } from "@/lib/missedQuestions";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { useCommunityStats } from "@/hooks/useCommunityStats";
import { useUpgradeFlow } from "@/hooks/useUpgradeFlow";
import { useTranslation } from "@/contexts/LanguageContext";
import { Question } from "@/types";

const FREE_DRILL_LIMIT = 3;

function optionText(q: Question, letter: string): string {
  const map: Record<string, string> = { A: q.optionA, B: q.optionB, C: q.optionC, D: q.optionD };
  return map[letter] ?? "";
}

function DrillContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hydrated = useHydration();
  const { t } = useTranslation();
  const completedTests = useStore((state) => state.completedTests);
  const selectedState = useStore((state) => state.selectedState);
  const hasPremiumAccess = useStore((state) => state.hasPremiumAccess);
  const isGuest = useStore((state) => state.isGuest);
  const upgrade = useUpgradeFlow("drill");
  const { data: communityData } = useCommunityStats();

  const testFilter = Number(searchParams.get("test")) || null;
  const backHref = "/dashboard";

  const [fixedCount, setFixedCount] = useState(0);

  const summary = useMemo(
    () => computeMissSummary(hydrated ? completedTests : [], selectedState),
    [hydrated, completedTests, selectedState]
  );
  const communityMap = useMemo(
    () => new Map((communityData?.questions ?? []).map((q) => [q.questionId, q])),
    [communityData]
  );

  const misses = testFilter
    ? summary.stillMissed.filter((e) => e.testNumber === testFilter)
    : summary.stillMissed;

  const isPremium = hydrated ? hasPremiumAccess() : true;
  const unlockedCount = isPremium ? misses.length : Math.min(FREE_DRILL_LIMIT, misses.length);
  const lockedCount = misses.length - unlockedCount;
  const allFixed = misses.length > 0 && fixedCount >= unlockedCount;

  if (!hydrated) return <div className="flex-1 bg-gray-50" />;

  return (
    <div className="flex-1 bg-gray-50 relative">
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-brand-light to-transparent pointer-events-none" />
      <div className="relative container mx-auto px-4 sm:px-6 py-6 pb-10 max-w-lg md:max-w-2xl lg:max-w-4xl">
        <PaywallModal
          open={upgrade.paywallOpen}
          onOpenChange={upgrade.onOpenChange}
          feature={upgrade.paywallFeature}
          onUpgrade={upgrade.handleUpgrade}
          isGuest={isGuest}
          onSignUp={() => router.push("/signup")}
        />

        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4" /> {t("common.back")}
        </Link>

        {/* Hero */}
        <div className="rounded-xl bg-white border border-gray-100 p-4 mb-6">
          <div className="flex items-center gap-4">
            <Image
              src="/tiger_face_06.png"
              alt="Tiger mascot"
              width={48}
              height={48}
              className="w-12 h-12 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-gray-900">
                {testFilter
                  ? t("drill.titleTest").replace("{{n}}", String(testFilter))
                  : t("drill.title")}
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                {misses.length === 0
                  ? t("drill.subEmpty")
                  : misses.length === 1
                    ? t("drill.subOne")
                    : t("drill.sub")
                        .replace("{{n}}", String(misses.length))
                        .replace("{{m}}", String(summary.attemptCount))}
              </p>
            </div>
            {misses.length > 0 && (
              <span
                className={`text-xs font-semibold tabular-nums rounded-full px-2.5 py-1 flex-shrink-0 ${
                  allFixed
                    ? "bg-green-100 text-green-700"
                    : "bg-white border border-gray-200 text-gray-500"
                }`}
              >
                {t("drill.fixedChip")
                  .replace("{{fixed}}", String(fixedCount))
                  .replace("{{total}}", String(unlockedCount))}
              </span>
            )}
          </div>
        </div>

        {/* Empty states */}
        {misses.length === 0 && (
          <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-6 text-center">
            <p className="text-base font-bold text-green-800 mb-1">
              {summary.attemptCount === 0
                ? t("drill.emptyNoAttemptsTitle")
                : summary.everMissedCount > 0
                  ? t("drill.emptyAllFixedTitle").replace(
                      "{{n}}",
                      String(summary.everMissedCount)
                    )
                  : t("drill.emptyCleanTitle")}
            </p>
            <p className="text-sm text-green-700 mb-4">
              {summary.attemptCount === 0
                ? t("drill.emptyNoAttemptsBody")
                : t("drill.emptyFixedBody")}
            </p>
            <Button
              className="bg-brand text-white hover:bg-brand-hover font-bold"
              onClick={() => router.push(backHref)}
            >
              {t("common.back")}
            </Button>
          </div>
        )}

        {/* Drill rows */}
        <div className="space-y-2">
          {misses.map((entry, idx) => {
            const q = entry.question;
            const locked = idx >= unlockedCount;
            const communityQ = communityMap.get(q.questionId);
            const signId = getSignIdForQuestion(q.questionId);
            const missedLabel =
              entry.timesMissed >= entry.timesSeen
                ? t("drill.missedEvery").replace("{{n}}", String(entry.timesMissed))
                : t("drill.missedOf")
                    .replace("{{a}}", String(entry.timesMissed))
                    .replace("{{b}}", String(entry.timesSeen));
            const subtitleBits = [
              testFilter ? null : `${t("testCard.test")} ${entry.testNumber}`,
              communityQ
                ? t("results.communityAlsoMissed").replace(
                    "{{pct}}",
                    String(communityQ.errorRate)
                  )
                : null,
            ].filter(Boolean);

            if (locked) {
              return (
                <Fragment key={q.questionId}>
                  {idx === unlockedCount && (
                    <button
                      onClick={() =>
                        upgrade.openPaywall("full_stats", "drill_locked", "Drill Locked Misses")
                      }
                      className="w-full flex items-center gap-3 rounded-xl border border-brand-border-light bg-brand-light px-4 py-2.5 text-left hover:shadow-md transition-shadow"
                    >
                      <Lock className="h-4 w-4 text-brand shrink-0" />
                      <span className="flex-1 text-sm font-medium text-gray-800">
                        {lockedCount === 1
                          ? t("drill.lockedUpsellOne")
                          : t("drill.lockedUpsell").replace("{{n}}", String(lockedCount))}
                      </span>
                      <span className="text-sm font-semibold text-brand whitespace-nowrap">
                        {t("drill.unlock")}
                      </span>
                    </button>
                  )}
                  <button
                    onClick={() =>
                      upgrade.openPaywall("full_stats", "drill_locked_row", "Drill Locked Row")
                    }
                    className="w-full rounded-xl bg-white border border-gray-100 px-4 py-3 text-left hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="shrink-0 text-center min-w-[3rem]">
                        <div className="text-lg font-bold text-red-500">✗</div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-wide">
                          {t("drill.missedTimes").replace("{{n}}", String(entry.timesMissed))}
                        </div>
                      </div>
                      <p
                        className="flex-1 text-sm text-gray-700 blur-[4px] select-none"
                        aria-hidden="true"
                      >
                        {q.question}
                      </p>
                      <Lock className="h-4 w-4 text-gray-300 shrink-0" />
                    </div>
                  </button>
                </Fragment>
              );
            }

            return (
              <QuizRow
                key={q.questionId}
                chipValue="✗"
                chipLabel={t("drill.missedTimes").replace("{{n}}", String(entry.timesMissed))}
                chipColorClass="text-red-500"
                subtitle={subtitleBits.length > 0 ? subtitleBits.join(" · ") : undefined}
                question={q.question}
                options={[q.optionA, q.optionB, q.optionC, q.optionD].filter(Boolean)}
                correctAnswer={optionText(q, q.correctAnswer)}
                media={signId ? <QuestionImage questionId={q.questionId} /> : undefined}
                onAnswer={(correct) => {
                  if (correct) setFixedCount((n) => n + 1);
                }}
                renderFooter={({ answered }) => (
                  <div className="pt-1 px-1 space-y-1.5">
                    <p className="text-xs text-gray-400">
                      {entry.lastAnswer
                        ? t("drill.lastPicked")
                            .replace("{{context}}", missedLabel)
                            .replace("{{letter}}", entry.lastAnswer)
                        : t("drill.lastSkipped").replace("{{context}}", missedLabel)}
                    </p>
                    {answered && q.explanation && (
                      <p className="text-xs text-gray-500 leading-relaxed animate-in fade-in duration-300">
                        {q.explanation}
                      </p>
                    )}
                  </div>
                )}
              />
            );
          })}
        </div>

        {allFixed && (
          <div className="mt-3 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm font-semibold text-green-800 text-center">
            {lockedCount > 0
              ? t("drill.allFixedFree")
                  .replace("{{n}}", String(unlockedCount))
                  .replace("{{m}}", String(lockedCount))
              : t("drill.allFixedAll").replace("{{n}}", String(unlockedCount))}
          </div>
        )}

        {testFilter && misses.length > 0 && (
          <button
            onClick={() => router.push(`/test/${testFilter}`)}
            className="mt-4 w-full flex items-center justify-center gap-1.5 rounded-lg bg-brand text-white font-bold text-sm px-4 py-3 hover:bg-brand-hover transition-colors"
          >
            {t("drill.readyRetake")}
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export default function DrillPage() {
  return (
    <Suspense fallback={<div className="flex-1 bg-gray-50" />}>
      <DrillContent />
    </Suspense>
  );
}
