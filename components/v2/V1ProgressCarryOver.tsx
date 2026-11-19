"use client";

import { useEffect } from "react";
import type { ExamV2Config } from "@/lib/v2/types";
import { getBank } from "@/lib/v2/bank";
import { drillKey, drillQuestions } from "@/lib/v2/training";
import { useV2Store } from "@/store/useV2Store";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";

/**
 * For an exam that moved from the v1 engine (ExamV2Config.fromV1): copies each
 * v1 training set's mastered and wrong-queue questions into the matching v2
 * drill, the first time that drill has no v2 state. The v1 progress stays
 * where it is, and a drill with any v2 state is never touched, so this is safe
 * to run on every dashboard visit (it waits for an account's v1 data to load
 * on a new device). Question ids are the same in both engines; questions of a
 * held-out test are left out, as drills never show them. Renders nothing.
 */
export function V1ProgressCarryOver({ exam }: { exam: ExamV2Config }) {
  const hydrated = useHydration();
  const trainingSets = useStore((s) => s.trainingSets);
  const drills = useV2Store((s) => s.drills);
  const seedDrills = useV2Store((s) => s.seedDrills);

  useEffect(() => {
    if (!hydrated || !exam.fromV1) return;
    const patch: Record<string, { masteredIds: string[]; wrongQueue: string[]; seen: number; correct: number }> = {};
    for (const drill of exam.drills) {
      const key = drillKey(exam.id, drill.key);
      const setIds = exam.fromV1.drills[drill.key];
      if (!setIds || drills[key]) continue;
      const ids = new Set(drillQuestions(getBank(exam.id).questions, drill, exam).map((q) => q.id));
      const mastered = new Set<string>();
      const wrong = new Set<string>();
      for (const id of setIds) {
        const v1 = trainingSets[id];
        if (!v1) continue;
        v1.masteredIds.forEach((q) => ids.has(q) && mastered.add(q));
        v1.wrongQueue.forEach((q) => ids.has(q) && !mastered.has(q) && wrong.add(q));
      }
      if (mastered.size === 0 && wrong.size === 0) continue;
      patch[key] = { masteredIds: [...mastered], wrongQueue: [...wrong], seen: mastered.size + wrong.size, correct: mastered.size };
    }
    if (Object.keys(patch).length) seedDrills(patch);
  }, [hydrated, exam, trainingSets, drills, seedDrills]);

  return null;
}
