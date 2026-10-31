"use client";

import "@/lib/banks/aerta";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function AertaTrainingPage() {
  return <ExamTrainingPage exam={getExamById("aerta")!} />;
}
