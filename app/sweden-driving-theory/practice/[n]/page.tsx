"use client";

import "@/lib/banks/setrafik";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function SetrafikTrainingPage() {
  return <ExamTrainingPage exam={getExamById("setrafik")!} />;
}
