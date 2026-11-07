"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function SemotoDrillPage() {
  return <ExamDrillPage exam={getExamById("semoto")!} />;
}
