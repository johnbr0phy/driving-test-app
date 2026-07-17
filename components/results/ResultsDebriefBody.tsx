"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, ChevronRight, Cloud, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PaywallModal } from "@/components/PaywallModal";
import { QuizRow } from "@/components/QuizRow";
import { QuestionImage } from "@/components/QuestionImage";
import { getSignIdForQuestion } from "@/lib/signImages";
import { trackDailyQuizAnswer } from "@/lib/analytics";
import { Question } from "@/types";
import type { ReadyTestResults } from "@/hooks/useTestResults";
import type { useUpgradeFlow } from "@/hooks/useUpgradeFlow";

function optionText(q: Question, letter: string): string {
  const map: Record<string, string> = { A: q.optionA, B: q.optionB, C: q.optionC, D: q.optionD };
  return map[letter] ?? "";
}

interface Props {
  results: ReadyTestResults;
  upgrade: ReturnType<typeof useUpgradeFlow>;
}

// The Debrief's below-the-fold structure:
//   1. "Your plan" — three steps generated from this attempt; for free users
//      facing Test 4 the paywall lives inside step 3, not beside the score.
//   2. The miss drill — missed questions as re-answerable QuizRows (no
//      initialAnswer) with a running fixed-counter. Competence repair.
//   3. A momentum/upgrade card that only appears AFTER the user has actually
//      fixed some misses — a fail state never shows an ask before engagement.
//   4. Correct answers collapsed behind one expander.
//   5. Guest save banner, after they've seen what there is to lose.
export function ResultsDebriefBody({ results, upgrade }: Props) {
  const router = useRouter();
  const {
    t,
    testId,
    questions,
    answers,
    score,
    totalQuestions,
    isGuest,
    isPremium,
    hasNextTest,
    nextTestId,
    nextTestIsLocked,
    communityMap,
  } = results;

  const [fixedCount, setFixedCount] = useState(0);
  const [showCorrect, setShowCorrect] = useState(false);

  const missIndices = questions
    .map((_, i) => i)
    .filter((i) => answers[i] !== questions[i].correctAnswer);
  const correctIndices = questions
    .map((_, i) => i)
    .filter((i) => answers[i] === questions[i].correctAnswer);
  const missCount = missIndices.length;

  const allFixed = missCount > 0 && fixedCount >= missCount;
  // The post-drill ask is earned: it renders only once real misses have been
  // re-answered correctly (all of them when there are fewer than 3).
  const drillEngaged = missCount > 0 && fixedCount >= Math.min(3, missCount);

  // Community miss-rate chips on drill rows: the first few are free, the rest
  // blur behind a premium upsell.
  const FREE_RATE_LIMIT = 3;
  const hasCommunityRates = missIndices.some((i) => communityMap.has(questions[i].questionId));

  const openTest4Paywall = () =>
    upgrade.openPaywall("practice_test_4", "test_4", "Practice Test 4");

  const scrollToDrill = () =>
    document.getElementById("miss-drill")?.scrollIntoView({ behavior: "smooth" });

  const planSteps: {
    key: string;
    label: string;
    done?: boolean;
    locked?: boolean;
    onClick: () => void;
  }[] = [];
  if (missCount > 0) {
    planSteps.push({
      key: "drill",
      label: allFixed
        ? t("results.planStep1Done")
        : missCount === 1
          ? t("results.planStep1One")
          : t("results.planStep1").replace("{{n}}", String(missCount)),
      done: allFixed,
      onClick: scrollToDrill,
    });
  }
  planSteps.push({
    key: "train",
    label: t("results.planStep2").replace("{{n}}", String(testId)),
    onClick: () => router.push(`/training?set=${testId}`),
  });
  planSteps.push(
    hasNextTest
      ? nextTestIsLocked
        ? { key: "next", label: t("results.planStep3Locked"), locked: true, onClick: openTest4Paywall }
        : {
            key: "next",
            label: t("results.planStep3").replace("{{n}}", String(nextTestId)),
            onClick: () => router.push(`/test/${nextTestId}`),
          }
      : { key: "next", label: t("results.planStep3AllDone"), onClick: () => router.push("/stats") }
  );

  return (
    <div className="container mx-auto px-4 pb-10 max-w-lg md:max-w-2xl lg:max-w-4xl space-y-6">
      <PaywallModal
        open={upgrade.paywallOpen}
        onOpenChange={upgrade.onOpenChange}
        feature={upgrade.paywallFeature}
        onUpgrade={upgrade.handleUpgrade}
        isGuest={isGuest}
        onSignUp={() => router.push("/signup")}
      />

      {/* ── Your plan ─────────────────────────────────────────────── */}
      <div className="rounded-xl bg-white border border-gray-100 px-4 py-3 shadow-sm">
        <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 py-1">
          {t("results.planHeading")}
        </h2>
        <div className="divide-y divide-gray-50">
          {planSteps.map((step, i) => (
            <button
              key={step.key}
              onClick={step.onClick}
              className="w-full flex items-center gap-3 py-3 text-left group"
            >
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                  step.done ? "bg-green-100 text-green-700" : "bg-brand-light text-brand"
                }`}
              >
                {step.done ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
              </span>
              <span
                className={`flex-1 text-sm font-medium ${step.done ? "text-gray-400 line-through" : "text-gray-800"}`}
              >
                {step.label}
              </span>
              {step.locked ? (
                <span className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[11px] font-bold text-brand-dark bg-brand-light border border-brand-border-light rounded-full px-2 py-0.5">
                    $9.99
                  </span>
                  <Lock className="h-3.5 w-3.5 text-gray-400" />
                </span>
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-400 shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── The miss drill ────────────────────────────────────────── */}
      {missCount > 0 && (
        <div id="miss-drill" className="scroll-mt-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">{t("results.drillHeading")}</h2>
            <span
              className={`text-xs font-semibold tabular-nums rounded-full px-2.5 py-1 ${
                allFixed
                  ? "bg-green-100 text-green-700"
                  : "bg-white border border-gray-200 text-gray-500"
              }`}
            >
              {t("results.drillProgress")
                .replace("{{fixed}}", String(fixedCount))
                .replace("{{total}}", String(missCount))}
            </span>
          </div>

          <div className="space-y-2">
            {missIndices.map((index, drillIdx) => {
              const question = questions[index];
              const userAnswerLetter = answers[index];
              const communityQ = communityMap.get(question.questionId);
              const signId = getSignIdForQuestion(question.questionId);
              const rateLocked = !isPremium && drillIdx >= FREE_RATE_LIMIT;
              const rateText = communityQ
                ? t("results.communityAlsoMissed").replace("{{pct}}", String(communityQ.errorRate))
                : undefined;
              const chip = userAnswerLetter
                ? { value: "✗", label: t("results.wrong"), color: "text-red-500" }
                : { value: "–", label: t("results.notAnswered"), color: "text-gray-400" };
              return (
                <Fragment key={index}>
                {drillIdx === FREE_RATE_LIMIT && !isPremium && hasCommunityRates && (
                  <button
                    onClick={() =>
                      upgrade.openPaywall("full_stats", "results_drill_rates", "Results Miss Rates")
                    }
                    className="w-full flex items-center gap-3 rounded-xl border border-brand-border-light bg-brand-light px-4 py-2.5 text-left hover:shadow-md transition-shadow"
                  >
                    <Lock className="h-4 w-4 text-brand shrink-0" />
                    <span className="flex-1 text-sm font-medium text-gray-800">
                      {t("results.drillRatesUpsell")}
                    </span>
                    <span className="text-sm font-semibold text-brand whitespace-nowrap">
                      {t("common.unlockWithPremium")}
                    </span>
                  </button>
                )}
                <QuizRow
                  chipValue={chip.value}
                  chipLabel={chip.label}
                  chipColorClass={chip.color}
                  subtitle={
                    rateText ? (
                      rateLocked ? (
                        <span className="blur-[3px] select-none" aria-hidden="true">
                          {rateText}
                        </span>
                      ) : (
                        rateText
                      )
                    ) : undefined
                  }
                  question={question.question}
                  options={[question.optionA, question.optionB, question.optionC, question.optionD].filter(Boolean)}
                  correctAnswer={optionText(question, question.correctAnswer)}
                  media={signId ? <QuestionImage questionId={question.questionId} /> : undefined}
                  onAnswer={(correct) => {
                    if (correct) setFixedCount((n) => n + 1);
                    trackDailyQuizAnswer(correct, "results_review");
                  }}
                  renderFooter={({ answered }) => (
                    <div className="pt-1 px-1 space-y-1.5">
                      <p className="text-xs text-gray-400">
                        {userAnswerLetter
                          ? t("results.drillPickedBefore").replace("{{letter}}", userAnswerLetter)
                          : t("results.drillSkippedBefore")}
                      </p>
                      {answered && question.explanation && (
                        <p className="text-xs text-gray-500 leading-relaxed animate-in fade-in duration-300">
                          {question.explanation}
                        </p>
                      )}
                    </div>
                  )}
                />
                </Fragment>
              );
            })}
          </div>

          {allFixed && (
            <div className="mt-3 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm font-semibold text-green-800 text-center">
              {t("results.drillAllFixed").replace("{{n}}", String(missCount))}
            </div>
          )}
        </div>
      )}

      {/* ── Earned momentum / upgrade card (never before engagement) ── */}
      {!isGuest && hasNextTest && drillEngaged && (
        <Card className="border-2 bg-gradient-to-r from-brand-light to-brand-gradient-to border-brand-border-light">
          <CardContent className="py-5 text-center">
            <h3 className="text-base font-bold text-gray-900 mb-1">
              {t("results.postDrillHeading")
                .replace("{{fixed}}", String(fixedCount))
                .replace("{{total}}", String(missCount))}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {nextTestIsLocked
                ? t("results.postDrillUpgradeSub")
                : t("results.postDrillNextSub").replace("{{n}}", String(nextTestId))}
            </p>
            <Button
              className="font-bold bg-brand text-white hover:bg-brand-hover px-6"
              onClick={() =>
                nextTestIsLocked ? openTest4Paywall() : router.push(`/test/${nextTestId}`)
              }
            >
              {nextTestIsLocked
                ? t("results.nextTestUnlockButton")
                : t("results.nextTestButton").replace("{{n}}", String(nextTestId))}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* ── What you got right, out of the way but present ─────────── */}
      {correctIndices.length > 0 && (
        <div>
          <button
            onClick={() => setShowCorrect((s) => !s)}
            className="w-full flex items-center justify-between rounded-xl bg-white border border-gray-100 px-4 py-3 hover:shadow-md transition-shadow"
          >
            <span className="text-sm font-semibold text-gray-700">
              {t("results.correctHeading").replace("{{n}}", String(score))}
            </span>
            <span className="text-xs font-medium text-brand">
              {showCorrect ? t("results.correctHide") : t("results.correctShow")}
            </span>
          </button>
          {showCorrect && (
            <div className="space-y-2 mt-2">
              {correctIndices.map((index) => {
                const question = questions[index];
                const signId = getSignIdForQuestion(question.questionId);
                return (
                  <QuizRow
                    key={index}
                    chipValue={String(index + 1)}
                    chipLabel={t("results.correctAnswer")}
                    chipColorClass="text-green-600"
                    question={question.question}
                    options={[question.optionA, question.optionB, question.optionC, question.optionD].filter(Boolean)}
                    correctAnswer={optionText(question, question.correctAnswer)}
                    initialAnswer={optionText(question, answers[index])}
                    media={signId ? <QuestionImage questionId={question.questionId} /> : undefined}
                    renderFooter={({ answered }) =>
                      answered && question.explanation ? (
                        <p className="pt-1 px-1 text-xs text-gray-500 leading-relaxed">
                          {question.explanation}
                        </p>
                      ) : null
                    }
                  />
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Guest save banner — after they've seen what they'd lose ── */}
      {isGuest && (
        <Card className="bg-gradient-to-r from-brand-light to-brand-gradient-to border-brand-border-light">
          <CardContent className="py-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center shrink-0">
                <Cloud className="w-6 h-6 text-brand" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {t("results.saveYourProgress")}
                </h3>
                <p className="text-gray-600 text-sm">{t("results.scoreOnlyOnDevice")}</p>
              </div>
              <Link href="/signup">
                <Button className="bg-brand text-white hover:bg-brand-hover whitespace-nowrap">
                  {t("results.signUpFree")}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Full total for orientation, without verdict framing */}
      <p className="text-center text-xs text-gray-400">
        {score}/{totalQuestions} {t("results.correctLabel")} ·{" "}
        {results.stateName}
      </p>
    </div>
  );
}
