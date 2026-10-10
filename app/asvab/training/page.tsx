"use client";

import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function AsvabTrainingPage() {
  return <ExamTrainingPage exam={getExamById("asvab")!} />;
}
