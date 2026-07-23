"use client";

import { useParams } from "next/navigation";
import { useTestResults } from "@/hooks/useTestResults";
import { useUpgradeFlow } from "@/hooks/useUpgradeFlow";
import { TestPageHeader } from "@/components/TestPageHeader";
import { ResultsHeroDebrief } from "@/components/results/ResultsHeroDebrief";
import { ResultsDebriefBody } from "@/components/results/ResultsDebriefBody";

// Test results — "The Debrief". No PASSED/FAILED stamp anywhere: a coach
// line + readiness meter replaces the verdict, first-attempt fails get a
// "baseline" frame instead, the review is a re-answerable miss drill, and
// the premium ask lives inside the user's plan (or after drill engagement)
// — never beside a bad score.
export default function ResultsPage() {
  const params = useParams();
  const testId = parseInt(params.id as string);
  const results = useTestResults(testId);
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

  const { stateName, language, attemptNumber, t } = results;

  return (
    <div className="flex-1 bg-gray-50">
      {/* Rendered at page level (not inside the hero) so its sticky context is
          the whole page — it stays pinned all the way down the miss drill. */}
      <TestPageHeader
        backHref="/dashboard"
        sticky
        right={
          <span className="text-sm text-gray-500">
            {stateName} · {language === "es" ? `Examen ${testId}` : language === "vi" ? `Bài Thi ${testId}` : `Test ${testId}`} ·{" "}
            {attemptNumber === 1 ? t("results.firstAttempt") : `${t("results.attempt")} ${attemptNumber}`}
          </span>
        }
      />
      <ResultsHeroDebrief
        results={results}
        onDrill={scrollToDrill}
        onNextLocked={() => upgrade.openPaywall("practice_test_4", "test_4", "Practice Test 4")}
      />
      <ResultsDebriefBody results={results} upgrade={upgrade} />
    </div>
  );
}
