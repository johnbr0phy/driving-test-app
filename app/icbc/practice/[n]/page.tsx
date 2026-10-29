"use client";

import "@/lib/banks/cabc";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function CabcTrainingPage() {
  return <ExamTrainingPage exam={getExamById("cabc")!} />;
}
