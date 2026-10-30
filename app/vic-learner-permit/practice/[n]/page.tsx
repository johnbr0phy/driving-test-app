"use client";

import "@/lib/banks/auvic";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function AuvicTrainingPage() {
  return <ExamTrainingPage exam={getExamById("auvic")!} />;
}
