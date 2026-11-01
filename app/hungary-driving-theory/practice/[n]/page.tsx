"use client";

import "@/lib/banks/hukresz";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function HukreszTrainingPage() {
  return <ExamTrainingPage exam={getExamById("hukresz")!} />;
}
