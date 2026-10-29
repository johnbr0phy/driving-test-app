"use client";

import "@/lib/banks/ausa";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function AusaTrainingPage() {
  return <ExamTrainingPage exam={getExamById("ausa")!} />;
}
