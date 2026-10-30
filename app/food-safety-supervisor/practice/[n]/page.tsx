"use client";

import "@/lib/banks/aufss";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function AufssTrainingPage() {
  return <ExamTrainingPage exam={getExamById("aufss")!} />;
}
