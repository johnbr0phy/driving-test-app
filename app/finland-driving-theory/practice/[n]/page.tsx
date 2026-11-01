"use client";

import "@/lib/banks/fitheory";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function FitheoryTrainingPage() {
  return <ExamTrainingPage exam={getExamById("fitheory")!} />;
}
