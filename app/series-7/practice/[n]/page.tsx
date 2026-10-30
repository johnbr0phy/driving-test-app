"use client";

import "@/lib/banks/series7";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function Series7TrainingPage() {
  return <ExamTrainingPage exam={getExamById("series7")!} />;
}
