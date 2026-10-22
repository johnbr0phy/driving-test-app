import { ExamV2Config } from "./types";

/** Shared by dashboard completion and results; fixed goals never use stale saves. */
export function goalFor(exam: ExamV2Config, savedGoal: number | undefined): number {
  return exam.fixedGoal ?? savedGoal ?? exam.defaultGoal;
}
