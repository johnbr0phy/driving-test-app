"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CratDrillPage() {
  return <ExamDrillPage exam={getExamById("crat")!} />;
}
