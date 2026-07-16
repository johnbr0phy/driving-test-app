"use client";

import { useParams } from "next/navigation";
import { useTestResults } from "@/hooks/useTestResults";
import { useUpgradeFlow } from "@/hooks/useUpgradeFlow";
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

  return (
    <div className="flex-1 bg-gray-50">
      <ResultsHeroDebrief
        results={results}
        onDrill={scrollToDrill}
        onNextLocked={() => upgrade.openPaywall("practice_test_4", "test_4", "Practice Test 4")}
      />
      <ResultsDebriefBody results={results} upgrade={upgrade} />
    </div>
  );
}
