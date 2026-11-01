"use client";

import { Suspense, useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { examForAppSlug, loadExamBank } from "@/lib/examAppRoute";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { ExamRunner } from "@/components/v2/ExamRunner";
import { V2TestGate } from "@/components/v2/V2TestGate";
import { ResultsV2 } from "@/components/v2/ResultsV2";
import { TrainPage } from "@/components/v2/TrainPage";

export type SharedExamPageKind = "test" | "results" | "practice";

function Loading({ v2 }: { v2: boolean }) {
  return <div className={v2 ? "v2-focus items-center justify-center text-gray-600 dark:text-gray-300" : "p-8 text-center text-gray-600 dark:text-gray-300"}>Loading...</div>;
}

/**
 * The test, results and practice pages of every v1 and v2 exam, behind the
 * shared app/[slug] routes. It loads the exam's question bank on demand
 * (the per-exam pages imported it statically) and then renders exactly what
 * the per-exam page did. V2TestGate wraps every v2 test: it lets a test
 * through unless the exam's config locks it for Premium.
 */
export function SharedExamAppPage({ kind }: { kind: SharedExamPageKind }) {
  const params = useParams();
  const route = examForAppSlug(String(params.slug ?? ""));
  // v1 results read stored answers only, so they need no bank.
  const needsBank = !!route && !(route.kind === "v1" && kind === "results");
  const [ready, setReady] = useState(!needsBank);

  useEffect(() => {
    if (!route || !needsBank) return;
    let live = true;
    loadExamBank(route).then(() => live && setReady(true));
    return () => {
      live = false;
    };
    // The route is fixed by the URL; reload only when the slug changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug, needsBank]);

  if (!route) notFound();
  if (!ready) return <Loading v2={route.kind === "v2"} />;

  if (route.kind === "v1") {
    if (kind === "test") return <ExamTestPage exam={route.exam} />;
    if (kind === "results") return <ExamResultsPage exam={route.exam} />;
    return <ExamTrainingPage exam={route.exam} />;
  }

  const exam = route.exam;
  const testNumber = parseInt(String(params.id ?? ""), 10) || 0;
  if (kind === "test") {
    return (
      <V2TestGate exam={exam} testNumber={testNumber}>
        <ExamRunner exam={exam} testNumber={testNumber} />
      </V2TestGate>
    );
  }
  if (kind === "results") return <ResultsV2 exam={exam} testNumber={testNumber} />;
  return (
    <Suspense fallback={<Loading v2={false} />}>
      <TrainPage exam={exam} />
    </Suspense>
  );
}
