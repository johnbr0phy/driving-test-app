"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function EnrolledAgentPart1DrillPage() {
  return <ExamDrillPage exam={getExamById("ea1")!} />;
}
