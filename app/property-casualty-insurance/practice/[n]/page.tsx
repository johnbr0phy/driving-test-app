"use client";

import "@/lib/banks/pnc";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function PncTrainingPage() {
  return <ExamTrainingPage exam={getExamById("pnc")!} />;
}
