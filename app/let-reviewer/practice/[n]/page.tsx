"use client";

import "@/lib/banks/phlet";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function PhletTrainingPage() {
  return <ExamTrainingPage exam={getExamById("phlet")!} />;
}
