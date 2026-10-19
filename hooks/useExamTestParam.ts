"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ExamRoutes, testIdFromParam } from "@/lib/examRoutes";

/**
 * The store test ID for a /<exam>/test/[id] page. URLs number tests from 1;
 * an old link with the store ID in it (/cdl/test/101) still opens the test
 * and the address bar is swapped for the numbered URL. -1 when unknown.
 */
export function useExamTestParam(routes: ExamRoutes, page: "test" | "results"): number {
  const params = useParams();
  const router = useRouter();
  const raw = params.id as string;
  const testId = testIdFromParam(routes, raw) ?? -1;

  useEffect(() => {
    if (testId < 0) return;
    const canonical = page === "test" ? routes.test(testId) : routes.results(testId);
    if (canonical !== window.location.pathname) router.replace(canonical + window.location.search);
  }, [testId, page, routes, router]);

  return testId;
}
