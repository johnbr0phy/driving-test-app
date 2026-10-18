"use client";

import "@/lib/banks/htl";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function HTLTrainingPage() {
  return <ExamTrainingPage exam={getExamById("htl")!} />;
}
