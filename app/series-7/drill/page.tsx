"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function Series7DrillPage() {
  return <ExamDrillPage exam={getExamById("series7")!} />;
}
