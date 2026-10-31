"use client";

import "@/lib/banks/phlto";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function PhltoTrainingPage() {
  return <ExamTrainingPage exam={getExamById("phlto")!} />;
}
