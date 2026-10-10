"use client";

import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function CprTrainingPage() {
  return <ExamTrainingPage exam={getExamById("cpr")!} />;
}
