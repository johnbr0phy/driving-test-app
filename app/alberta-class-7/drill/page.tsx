"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CaabDrillPage() {
  return <ExamDrillPage exam={getExamById("caab")!} />;
}
