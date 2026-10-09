"use client";

import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function Epa608TrainingPage() {
  return <ExamTrainingPage exam={getExamById("epa608")!} />;
}
