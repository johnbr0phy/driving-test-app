"use client";

import "@/lib/banks/ukcar";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function UkcarTrainingPage() {
  return <ExamTrainingPage exam={getExamById("ukcar")!} />;
}
