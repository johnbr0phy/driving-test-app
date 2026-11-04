"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function Praxis5001DrillPage() {
  return <ExamDrillPage exam={getExamById("praxis5001")!} />;
}
