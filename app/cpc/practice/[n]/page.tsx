"use client";

import "@/lib/banks/cpc";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function CpcTrainingPage() {
  return <ExamTrainingPage exam={getExamById("cpc")!} />;
}
