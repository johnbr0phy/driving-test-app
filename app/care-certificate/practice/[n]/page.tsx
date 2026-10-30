"use client";

import "@/lib/banks/ukcare";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function UkcareTrainingPage() {
  return <ExamTrainingPage exam={getExamById("ukcare")!} />;
}
