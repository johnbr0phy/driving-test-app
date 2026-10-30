"use client";

import "@/lib/banks/cask";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function CaskTrainingPage() {
  return <ExamTrainingPage exam={getExamById("cask")!} />;
}
