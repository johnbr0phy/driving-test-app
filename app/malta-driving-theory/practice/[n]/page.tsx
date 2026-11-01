"use client";

import "@/lib/banks/mttheory";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function MttheoryTrainingPage() {
  return <ExamTrainingPage exam={getExamById("mttheory")!} />;
}
