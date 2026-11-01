"use client";

// Shared results page for registry exams: the DMV "Debrief" (coach line,
// readiness meter, plan, re-answerable miss drill) routed through the
// exam's ExamRoutes. Nothing is premium-gated, so the paywall never opens.

import { useExamTestParam } from "@/hooks/useExamTestParam";
import { useTestResults } from "@/hooks/useTestResults";
import { useUpgradeFlow } from "@/hooks/useUpgradeFlow";
import { TestPageHeader } from "@/components/TestPageHeader";
import { ResultsHeroDebrief } from "@/components/results/ResultsHeroDebrief";
import { ResultsDebriefBody } from "@/components/results/ResultsDebriefBody";
import { ExamConfig } from "@/lib/exams";
import { useLocalizedExam } from "@/hooks/useLocalizedExam";

export function ExamResultsPage({ exam }: { exam: ExamConfig }) {
  const { exam: localized, routes, ui } = useLocalizedExam(exam);
  const testId = useExamTestParam(routes, "results");
  const results = useTestResults(testId, routes);
  const upgrade = useUpgradeFlow("results_page");

  if (!results.ready) {
    return (
      <div className="flex-1 bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-xl font-semibold mb-2">{results.t("results.loadingResults")}</div>
      </div>
    );
  }

  const scrollToDrill = () =>
    document.getElementById("miss-drill")?.scrollIntoView({ behavior: "smooth" });

  const { stateName, attemptNumber, displayTestNumber, t } = results;

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      <TestPageHeader
        backHref={routes.dashboard}
        sticky
        right={
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {stateName} · {ui.testN(displayTestNumber(testId)).replace("🎯 ", "")} ·{" "}
            {attemptNumber === 1 ? t("results.firstAttempt") : `${t("results.attempt")} ${attemptNumber}`}
          </span>
        }
      />
      <ResultsHeroDebrief results={results} onDrill={scrollToDrill} onNextLocked={() => {}} categoryLabels={localized.categoryLabels} />
      <ResultsDebriefBody results={results} upgrade={upgrade} />
    </div>
  );
}
