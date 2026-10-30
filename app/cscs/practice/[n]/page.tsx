"use client";

import "@/lib/banks/cscs";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function CscsTrainingPage() {
  return <ExamTrainingPage exam={getExamById("cscs")!} />;
}
