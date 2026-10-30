"use client";

import "@/lib/banks/cacarp";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function RedSealCarpenterTrainingPage() {
  return <ExamTrainingPage exam={getExamById("cacarp")!} />;
}
