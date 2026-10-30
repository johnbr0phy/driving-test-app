"use client";

import "@/lib/banks/casfa";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function CasfaTrainingPage() {
  return <ExamTrainingPage exam={getExamById("casfa")!} />;
}
