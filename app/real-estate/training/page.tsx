"use client";

import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function RealestateTrainingPage() {
  return <ExamTrainingPage exam={getExamById("realestate")!} />;
}
