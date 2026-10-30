"use client";

import "@/lib/banks/auqld";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function AuqldTrainingPage() {
  return <ExamTrainingPage exam={getExamById("auqld")!} />;
}
