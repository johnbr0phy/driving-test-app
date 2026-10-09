"use client";

// Shared results page for registry exams: the DMV "Debrief" (coach line,
// readiness meter, plan, re-answerable miss drill) routed through the
// exam's ExamRoutes. Nothing is premium-gated, so the paywall never opens.

import { useParams } from "next/navigation";
import { useTestResults } from "@/hooks/useTestResults";
import { useUpgradeFlow } from "@/hooks/useUpgradeFlow";
import { TestPageHeader } from "@/components/TestPageHeader";
import { ResultsHeroDebrief } from "@/components/results/ResultsHeroDebrief";
import { ResultsDebriefBody } from "@/components/results/ResultsDebriefBody";
import { getExamRoutes } from "@/lib/examRoutes";
import { ExamConfig } from "@/lib/exams";

export function ExamResultsPage({ exam }: { exam: ExamConfig }) {
  const routes = getExamRoutes(exam.id);
  const params = useParams();
  const testId = parseInt(params.id as string);
  const results = useTestResults(testId, routes);
  const upgrade = useUpgradeFlow("results_page");

  if (!results.ready) {
    return (
      <div className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="text-xl font-semibold mb-2">{results.t("results.loadingResults")}</div>
      </div>
    );
  }

  const scrollToDrill = () =>
    document.getElementById("miss-drill")?.scrollIntoView({ behavior: "smooth" });

  const { stateName, attemptNumber, displayTestNumber, t } = results;

  return (
    <div className="flex-1 bg-gray-50">
      <TestPageHeader
        backHref={routes.dashboard}
        sticky
        right={
          <span className="text-sm text-gray-500">
            {stateName} · Test {displayTestNumber(testId)} ·{" "}
            {attemptNumber === 1 ? t("results.firstAttempt") : `${t("results.attempt")} ${attemptNumber}`}
          </span>
        }
      />
      <ResultsHeroDebrief results={results} onDrill={scrollToDrill} onNextLocked={() => {}} />
      <ResultsDebriefBody results={results} upgrade={upgrade} />
    </div>
  );
}
