"use client";

import "@/lib/banks/auwah";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function AuwahTrainingPage() {
  return <ExamTrainingPage exam={getExamById("auwah")!} />;
}
