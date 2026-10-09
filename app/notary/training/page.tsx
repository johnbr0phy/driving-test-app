"use client";

import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function NotaryTrainingPage() {
  return <ExamTrainingPage exam={getExamById("notary")!} />;
}
