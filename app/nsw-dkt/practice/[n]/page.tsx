"use client";

import "@/lib/banks/aunsw";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function AunswTrainingPage() {
  return <ExamTrainingPage exam={getExamById("aunsw")!} />;
}
