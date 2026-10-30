"use client";

import "@/lib/banks/gulfrn";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function GulfrnTrainingPage() {
  return <ExamTrainingPage exam={getExamById("gulfrn")!} />;
}
