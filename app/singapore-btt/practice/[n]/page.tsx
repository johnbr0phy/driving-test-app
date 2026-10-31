"use client";

import "@/lib/banks/sgbtt";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function SgbttTrainingPage() {
  return <ExamTrainingPage exam={getExamById("sgbtt")!} />;
}
