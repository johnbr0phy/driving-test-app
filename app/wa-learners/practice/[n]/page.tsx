"use client";

import "@/lib/banks/auwa";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function AuwaTrainingPage() {
  return <ExamTrainingPage exam={getExamById("auwa")!} />;
}
