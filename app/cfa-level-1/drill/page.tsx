"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CfaLevel1DrillPage() {
  return <ExamDrillPage exam={getExamById("cfal1")!} />;
}
