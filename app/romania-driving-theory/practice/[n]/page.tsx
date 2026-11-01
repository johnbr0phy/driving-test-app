"use client";

import "@/lib/banks/rodrpciv";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function RodrpcivTrainingPage() {
  return <ExamTrainingPage exam={getExamById("rodrpciv")!} />;
}
