"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function Epa608DrillPage() {
  return <ExamDrillPage exam={getExamById("epa608")!} />;
}
