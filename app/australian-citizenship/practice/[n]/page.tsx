"use client";

import "@/lib/banks/aucit";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function AucitTrainingPage() {
  return <ExamTrainingPage exam={getExamById("aucit")!} />;
}
