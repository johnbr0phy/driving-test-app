"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function MttheoryDrillPage() {
  return <ExamDrillPage exam={getExamById("mttheory")!} />;
}
