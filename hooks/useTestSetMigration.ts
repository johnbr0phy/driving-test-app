"use client";

import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { ExamConfig } from "@/lib/exams";
import { mayNeedTestSetMigration, migrateTestSets } from "@/lib/testSetMigration";

/**
 * Moves progress from an exam's old sets into its current ones by question
 * (lib/testSetMigration.ts: content-area sets to DMV-style test sets, or
 * back for Phlebotomy). Loads the exam's bank on demand, so
 * the dashboard, which does not bundle it, only fetches it for someone who
 * has set progress in this exam. A no-op once the sets are migrated.
 */
export function useTestSetMigration(exam: ExamConfig) {
  const hydrated = useHydration();
  const trainingSets = useStore((s) => s.trainingSets);
  const needed = hydrated && mayNeedTestSetMigration(exam, trainingSets);

  useEffect(() => {
    if (!needed) return;
    let cancelled = false;
    import(`@/lib/banks/${exam.id}`).then(() => {
      if (cancelled) return;
      const patch = migrateTestSets(exam, useStore.getState().trainingSets);
      if (patch) useStore.getState().patchTrainingSets(patch);
    });
    return () => {
      cancelled = true;
    };
  }, [needed, exam, trainingSets]);
}
