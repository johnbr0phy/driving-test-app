"use client";

import "@/lib/banks/security";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function SecurityGuardTrainingPage() {
  return <ExamTrainingPage exam={getExamById("security")!} />;
}
