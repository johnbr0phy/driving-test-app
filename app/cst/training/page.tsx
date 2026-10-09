"use client";

import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function CSTTrainingPage() {
  return <ExamTrainingPage exam={getExamById("cst")!} />;
}
