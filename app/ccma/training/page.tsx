"use client";

import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function CcmaTrainingPage() {
  return <ExamTrainingPage exam={getExamById("ccma")!} />;
}
