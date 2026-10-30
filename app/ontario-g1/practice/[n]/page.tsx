"use client";

import "@/lib/banks/caon";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function CaonTrainingPage() {
  return <ExamTrainingPage exam={getExamById("caon")!} />;
}
