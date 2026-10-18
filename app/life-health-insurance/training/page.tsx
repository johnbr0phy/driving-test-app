"use client";

import "@/lib/banks/insurance";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function InsuranceTrainingPage() {
  return <ExamTrainingPage exam={getExamById("insurance")!} />;
}
