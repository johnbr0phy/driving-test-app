"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TestPageHeader } from "@/components/TestPageHeader";
import { Fireworks } from "@/components/Fireworks";
import { ShareButton } from "@/components/ShareButton";
import { getTigerFace } from "@/lib/resultsCopy";
import type { ReadyTestResults } from "@/hooks/useTestResults";

// Results hero — "The Debrief": no PASSED/FAILED stamp anywhere. The tiger
// speaks as a coach, the score is a needle on a readiness meter (Building →
// Close → Ready), and the fail headline is always distance-to-pass in
// answers, not a percentage. A first attempt that doesn't pass gets the
// "Baseline set" frame instead — a baseline can't be failed.
export function ResultsHeroDebrief({
  results,
  onDrill,
  onNextLocked,
}: {
  results: ReadyTestResults;
  onDrill: () => void;
  onNextLocked: () => void;
}) {
  const router = useRouter();
  const [showFireworks, setShowFireworks] = useState(false);

  const {
    testId,
    score,
    totalQuestions,
    percentage,
    passed,
    testSession,
    stateName,
    attemptNumber,
    improvement,
    isNewBest,
    bestPercentage,
    weakCategories,
    hasNextTest,
    nextTestId,
    nextTestIsLocked,
    language,
    t,
  } = results;

  useEffect(() => {
    if (passed) setShowFireworks(true);
  }, [passed]);

  const passThreshold = Math.ceil(totalQuestions * 0.7);
  const answersFromPass = Math.max(passThreshold - score, 1);
  const missCount = totalQuestions - score;
  const isBaseline = !passed && attemptNumber === 1;

  // Coach line + supporting sentence, picked from what the data supports.
  const byWrong = [...weakCategories].sort((a, b) => b.wrong - a.wrong);
  const topTwoWrong = byWrong.slice(0, 2).reduce((sum, c) => sum + c.wrong, 0);
  const concentrated =
    missCount >= 5 && weakCategories.length > 2 && topTwoWrong >= Math.ceil(missCount * 0.6);

  let coachLine: string;
  let coachSub: string;
  if (passed) {
    coachLine = percentage >= 100 ? t("results.debriefPerfectCoach") : t("results.debriefPassCoach");
    coachSub =
      missCount > 0 && weakCategories[0]
        ? t("results.debriefPassSubWeak").replace("{{cat}}", t(`categories.${weakCategories[0].category}`))
        : t("results.debriefPassSubClean");
  } else {
    coachLine =
      answersFromPass === 1
        ? t("results.debriefFailCoachOne")
        : t("results.debriefFailCoach").replace("{{n}}", String(answersFromPass));
    coachSub = concentrated
      ? t("results.debriefFailSubConcentrated")
          .replace("{{m}}", String(topTwoWrong))
          .replace("{{k}}", String(missCount))
      : attemptNumber > 1 && improvement > 0
        ? t("results.debriefFailSubImproved").replace("{{imp}}", String(improvement))
        : t("results.debriefFailSubGeneric");
  }

  const drillLabel =
    missCount === 1 ? t("results.drillCtaOne") : t("results.drillCta").replace("{{n}}", String(missCount));
  const passGhostLabel =
    missCount === 1 ? t("results.passGhostOne") : t("results.passGhost").replace("{{n}}", String(missCount));

  const startNext = () => {
    if (!hasNextTest) router.push("/stats");
    else if (nextTestIsLocked) onNextLocked();
    else router.push(`/test/${nextTestId}`);
  };
  const passCtaLabel = !hasNextTest
    ? t("results.viewFullStats")
    : nextTestIsLocked
      ? t("results.nextTestUnlockButton")
      : t("results.passCta").replace("{{n}}", String(nextTestId));

  return (
    <div className="bg-gray-50">
      {showFireworks && (
        <Fireworks duration={3000} intensity="full" onComplete={() => setShowFireworks(false)} />
      )}

      <TestPageHeader
        backHref="/dashboard"
        sticky
        right={
          <span className="text-sm text-gray-500">
            {stateName} · {language === "es" ? `Examen ${testId}` : `Test ${testId}`} ·{" "}
            {attemptNumber === 1 ? t("results.firstAttempt") : `${t("results.attempt")} ${attemptNumber}`}
          </span>
        }
      />

      <div className="container mx-auto px-4 pt-8 pb-4 max-w-lg md:max-w-2xl lg:max-w-4xl space-y-3">
        <div className="rounded-xl bg-white border border-gray-100 px-4 pt-4 pb-5 shadow-sm">
          {isBaseline ? (
            <>
              <div className="text-[11px] font-bold uppercase tracking-widest text-brand">
                {t("results.baselineEyebrow")}
              </div>
              <div className="flex items-start gap-3 mt-1">
                <div className="flex-1">
                  <div className="text-4xl font-black tracking-tight text-gray-900 leading-none">
                    {percentage}
                    <span className="text-2xl font-bold text-gray-400">%</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 leading-snug">{t("results.baselineSub")}</p>
                </div>
                <Image
                  src={getTigerFace(percentage)}
                  alt="Tiger coach"
                  width={56}
                  height={56}
                  className="w-14 h-14 shrink-0"
                  priority
                />
              </div>
            </>
          ) : (
            <div className="flex items-start gap-3">
              <Image
                src={getTigerFace(percentage)}
                alt="Tiger coach"
                width={48}
                height={48}
                className="w-12 h-12 shrink-0"
                priority
              />
              <div className="flex-1 min-w-0">
                <h1 className="text-lg font-bold text-gray-900 leading-snug">{coachLine}</h1>
                <p className="text-sm text-gray-500 mt-1 leading-snug">{coachSub}</p>
              </div>
            </div>
          )}

          {/* Readiness meter — the score is a position, not a verdict */}
          <div className="mt-10">
            <div className="relative">
              <div className="flex h-2.5 rounded-full overflow-hidden">
                <div className="w-[55%] bg-red-100" />
                <div className="w-[15%] bg-amber-100" />
                <div className="w-[30%] bg-green-100" />
              </div>
              <div className="absolute left-[70%] top-2.5 w-px h-2.5 bg-gray-300" />
              <div
                className="absolute -top-7 flex flex-col items-center -translate-x-1/2"
                style={{ left: `${Math.min(Math.max(percentage, 4), 96)}%` }}
              >
                <div className="bg-gray-900 text-white text-[11px] font-bold rounded-md px-1.5 py-0.5 tabular-nums whitespace-nowrap">
                  {percentage}%
                </div>
                <div className="w-0.5 h-[18px] bg-gray-900 rounded-full" />
              </div>
            </div>
            <div className="flex justify-between text-[9px] uppercase tracking-wider text-gray-400 mt-1.5">
              <span>{t("results.meterBuilding")}</span>
              <span className="pl-8">{t("results.meterClose")}</span>
              <span>{t("results.meterReady")}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-1.5 flex-wrap">
          <span className="rounded-full bg-white border border-gray-200 px-2.5 py-1 text-[11px] font-medium text-gray-600">
            {t("results.chipCorrect")
              .replace("{{score}}", String(score))
              .replace("{{total}}", String(totalQuestions))}
          </span>
          {attemptNumber > 1 && improvement > 0 && (
            <span className="rounded-full bg-green-50 border border-green-200 px-2.5 py-1 text-[11px] font-medium text-green-700">
              {t("results.chipVsFirst").replace("{{n}}", String(improvement))}
            </span>
          )}
          {isNewBest ? (
            <span className="rounded-full bg-brand-light border border-brand-border-light px-2.5 py-1 text-[11px] font-medium text-brand-dark">
              {t("results.chipNewBest")}
            </span>
          ) : (
            attemptNumber > 1 && (
              <span className="rounded-full bg-white border border-gray-200 px-2.5 py-1 text-[11px] font-medium text-gray-600">
                {t("results.chipBest").replace("{{pct}}", String(bestPercentage))}
              </span>
            )
          )}
        </div>

        {passed ? (
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={startNext}
              className="w-full sm:flex-1 h-12 bg-brand text-white hover:bg-brand-hover font-bold text-base"
            >
              {passCtaLabel}
            </Button>
            <div className="flex gap-2 sm:flex-1">
              {missCount > 0 && (
                <Button
                  variant="outline"
                  onClick={onDrill}
                  className="flex-1 h-12 bg-white font-semibold text-gray-700"
                >
                  {passGhostLabel}
                </Button>
              )}
              <ShareButton
                score={score}
                totalQuestions={totalQuestions}
                percentage={percentage}
                passed={passed}
                testId={testId}
                stateCode={testSession.state}
                className="flex-1 h-12 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold"
              />
            </div>
          </div>
        ) : isBaseline ? (
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={() => router.push(`/test/${testId}`)}
              className="w-full sm:flex-1 h-12 bg-brand text-white hover:bg-brand-hover font-bold text-base"
            >
              {t("results.baselineCta").replace("{{pct}}", String(percentage))}
            </Button>
            <Button
              variant="outline"
              onClick={onDrill}
              className="w-full sm:flex-1 h-12 bg-white font-semibold text-gray-700"
            >
              {t("results.baselineGhost")}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={onDrill}
              className="w-full sm:flex-1 h-12 bg-brand text-white hover:bg-brand-hover font-bold text-base"
            >
              {drillLabel}
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push(`/test/${testId}`)}
              className="w-full sm:flex-1 h-12 bg-white font-semibold text-gray-700"
            >
              {t("results.retakeGhost")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
