"use client";

import "@/lib/banks/ngarmy";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function NgarmyTrainingPage() {
  return <ExamTrainingPage exam={getExamById("ngarmy")!} />;
}
