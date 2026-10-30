"use client";

import "@/lib/banks/caguard";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function CaguardTrainingPage() {
  return <ExamTrainingPage exam={getExamById("caguard")!} />;
}
