"use client";

import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function PncTrainingPage() {
  return <ExamTrainingPage exam={getExamById("pnc")!} />;
}
