"use client";

import "@/lib/banks/zak53";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function Zak53TrainingPage() {
  return <ExamTrainingPage exam={getExamById("zak53")!} />;
}
