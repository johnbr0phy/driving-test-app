"use client";

import "@/lib/banks/mykpp";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function MykppTrainingPage() {
  return <ExamTrainingPage exam={getExamById("mykpp")!} />;
}
