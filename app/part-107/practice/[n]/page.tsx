"use client";

import "@/lib/banks/part107";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function Part107TrainingPage() {
  return <ExamTrainingPage exam={getExamById("part107")!} />;
}
