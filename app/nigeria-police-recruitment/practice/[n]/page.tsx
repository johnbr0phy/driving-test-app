"use client";

import "@/lib/banks/ngpolice";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function NgpoliceTrainingPage() {
  return <ExamTrainingPage exam={getExamById("ngpolice")!} />;
}
