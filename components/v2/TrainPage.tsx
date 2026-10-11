"use client";

import { useSearchParams } from "next/navigation";
import { ExamV2Config } from "@/lib/v2/types";
import { basicsFor } from "@/lib/v2/basics";
import { DrillRunner } from "./DrillRunner";
import { DrillOverview } from "./DrillOverview";
import { BasicsRunner } from "./BasicsRunner";

/**
 * /<exam>/train routing by query string:
 *   ?drill=key              the drill's front door (Basics overview when it has one)
 *   ?drill=key&skill=id     one Basics skill
 *   ?drill=key&level=exam   the exam-level questions
 */
export function TrainPage({ exam }: { exam: ExamV2Config }) {
  const params = useSearchParams();
  const drillKey = params.get("drill");
  const skill = params.get("skill");
  const drill = exam.drills.find((d) => d.key === drillKey);
  const hasBasics = !!drill && basicsFor(drill).length > 0;

  if (hasBasics && skill) return <BasicsRunner exam={exam} drillKeyParam={drillKey} skillIdParam={skill} />;
  if (hasBasics && params.get("level") !== "exam") return <DrillOverview exam={exam} drillKeyParam={drillKey} />;
  return <DrillRunner exam={exam} drillKeyParam={drillKey} />;
}
