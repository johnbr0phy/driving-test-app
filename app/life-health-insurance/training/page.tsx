"use client";

import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function InsuranceTrainingPage() {
  return <ExamTrainingPage exam={getExamById("insurance")!} />;
}
