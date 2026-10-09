"use client";

import { useParams } from "next/navigation";
import { useTestResults } from "@/hooks/useTestResults";
import { useUpgradeFlow } from "@/hooks/useUpgradeFlow";
import { TestPageHeader } from "@/components/TestPageHeader";
import { ResultsHeroDebrief } from "@/components/results/ResultsHeroDebrief";
import { ResultsDebriefBody } from "@/components/results/ResultsDebriefBody";
import { HTL_ROUTES } from "@/lib/examRoutes";

// HTL test results — the same "Debrief" as the DMV flow (coach line,
// readiness meter, plan, re-answerable miss drill), routed through the HTL
// exam config. Nothing is premium-gated on HTL, so the paywall never opens.
export default function HTLResultsPage() {
  const params = useParams();
  const testId = parseInt(params.id as string);
  const results = useTestResults(testId, HTL_ROUTES);
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
        backHref={HTL_ROUTES.dashboard}
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
