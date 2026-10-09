"use client";

import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function AplusTrainingPage() {
  return <ExamTrainingPage exam={getExamById("aplus")!} />;
}
