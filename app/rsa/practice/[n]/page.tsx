"use client";

import "@/lib/banks/aursa";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function AursaTrainingPage() {
  return <ExamTrainingPage exam={getExamById("aursa")!} />;
}
