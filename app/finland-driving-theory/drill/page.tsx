"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function FitheoryDrillPage() {
  return <ExamDrillPage exam={getExamById("fitheory")!} />;
}
