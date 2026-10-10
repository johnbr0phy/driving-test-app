"use client";

import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function AccuplacerTrainingPage() {
  return <ExamTrainingPage exam={getExamById("accuplacer")!} />;
}
