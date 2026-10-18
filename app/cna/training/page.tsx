"use client";

import "@/lib/banks/cna";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function CnaTrainingPage() {
  return <ExamTrainingPage exam={getExamById("cna")!} />;
}
