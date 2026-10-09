"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CSTDrillPage() {
  return <ExamDrillPage exam={getExamById("cst")!} />;
}
