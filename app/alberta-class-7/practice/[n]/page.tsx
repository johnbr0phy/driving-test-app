"use client";

import "@/lib/banks/caab";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function CaabTrainingPage() {
  return <ExamTrainingPage exam={getExamById("caab")!} />;
}
