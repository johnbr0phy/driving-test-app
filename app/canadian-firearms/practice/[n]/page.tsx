"use client";

import "@/lib/banks/capal";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function CapalTrainingPage() {
  return <ExamTrainingPage exam={getExamById("capal")!} />;
}
