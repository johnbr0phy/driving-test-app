"use client";

import { useEffect } from "react";
import type { ExamV2Config } from "@/lib/v2/types";
import { getBank } from "@/lib/v2/bank";
import { v1CarryOverPatch } from "@/lib/v2/training";
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
    const patch = v1CarryOverPatch(exam, getBank(exam.id).questions, trainingSets, drills);
    if (Object.keys(patch).length) seedDrills(patch);
  }, [hydrated, exam, trainingSets, drills, seedDrills]);

  return null;
}
