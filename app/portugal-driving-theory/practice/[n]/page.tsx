"use client";

import "@/lib/banks/ptimt";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function PtimtTrainingPage() {
  return <ExamTrainingPage exam={getExamById("ptimt")!} />;
}
