"use client";

import "@/lib/banks/cacit";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function CacitTrainingPage() {
  return <ExamTrainingPage exam={getExamById("cacit")!} />;
}
