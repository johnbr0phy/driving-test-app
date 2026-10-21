"use client";

import "@/lib/banks/cosmetology";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function CosmetologyTrainingPage() {
  return <ExamTrainingPage exam={getExamById("cosmetology")!} />;
}
