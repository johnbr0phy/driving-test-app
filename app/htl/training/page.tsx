"use client";

import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function HTLTrainingPage() {
  return <ExamTrainingPage exam={getExamById("htl")!} />;
}
