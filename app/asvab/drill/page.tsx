"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function AsvabDrillPage() {
  return <ExamDrillPage exam={getExamById("asvab")!} />;
}
