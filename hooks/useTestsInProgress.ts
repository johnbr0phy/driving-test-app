"use client";

import { useMemo } from "react";
import { useStore } from "@/store/useStore";
import { useV2Store } from "@/store/useV2Store";
import { useHydration } from "@/hooks/useHydration";
import { examFamilyId, getExamForSetId, getExamForTestId } from "@/lib/exams";
import { getCatalogEntry, TestCatalogEntry } from "@/lib/testCatalog";

export interface TestInProgress {
  test: TestCatalogEntry;
  /** Questions mastered in training sets or drills. */
  mastered: number;
  /** Practice tests finished. */
  testsTaken: number;
}

// DMV store ids are below every registry exam's id base; state variants count toward their family.
const v1ExamId = (exam: ReturnType<typeof getExamForTestId>) => (exam ? examFamilyId(exam) : "dmv");

/**
 * Every test this browser (or synced account) has started, with how far
 * along it is: the current test first, then by questions mastered. Empty
 * until the stores hydrate. "Started" uses the same signals as
 * useStartedTests (the settings list), so a test opened but not yet
 * mastered or finished shows here too, with zero counts.
 */
export function useTestsInProgress(): TestInProgress[] {
  const hydrated = useHydration();
  const primaryExam = useStore((s) => s.primaryExam);
  const selectedState = useStore((s) => s.selectedState);
  const startedExams = useStore((s) => s.startedExams);
  const trainingSets = useStore((s) => s.trainingSets);
  const currentTests = useStore((s) => s.currentTests);
  const completedTests = useStore((s) => s.completedTests);
  const sessions = useV2Store((s) => s.sessions);
  const drills = useV2Store((s) => s.drills);
  const results = useV2Store((s) => s.results);

  return useMemo(() => {
    if (!hydrated) return [];
    const by = new Map<string, { mastered: number; testsTaken: number }>();
    const add = (id: string, mastered: number, tests: number) => {
      const cur = by.get(id) ?? { mastered: 0, testsTaken: 0 };
      by.set(id, { mastered: cur.mastered + mastered, testsTaken: cur.testsTaken + tests });
    };
    // DMV progress counts only once a state is chosen, as in settings.
    const v1Add = (exam: ReturnType<typeof getExamForTestId>, mastered: number, tests: number) => {
      const id = v1ExamId(exam);
      if (id !== "dmv" || selectedState) add(id, mastered, tests);
    };
    if (selectedState) add("dmv", 0, 0);
    for (const id of startedExams) add(id, 0, 0);
    for (const [setId, set] of Object.entries(trainingSets)) {
      v1Add(getExamForSetId(Number(setId)), set.masteredIds?.length ?? 0, 0);
    }
    for (const k of Object.keys(currentTests)) v1Add(getExamForTestId(Number(k)), 0, 0);
    for (const t of completedTests) v1Add(getExamForTestId(t.testNumber), 0, 1);
    for (const s of Object.values(sessions)) add(s.examId, 0, 0);
    for (const [key, d] of Object.entries(drills)) {
      const n = d.masteredIds?.length ?? 0;
      if (n > 0 || d.seen > 0) add(key.split(":")[0], n, 0);
    }
    for (const r of results) add(r.examId, 0, 1);

    return [...by.entries()]
      .map(([id, v]) => ({ test: getCatalogEntry(id), ...v }))
      .filter((x): x is TestInProgress => !!x.test)
      .sort((a, b) => Number(b.test.id === primaryExam) - Number(a.test.id === primaryExam) || b.mastered - a.mastered || b.testsTaken - a.testsTaken);
  }, [hydrated, primaryExam, selectedState, startedExams, trainingSets, currentTests, completedTests, sessions, drills, results]);
}
