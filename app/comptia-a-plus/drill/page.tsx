"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function AplusDrillPage() {
  return <ExamDrillPage exam={getExamById("aplus")!} />;
}
