"use client";

import "@/lib/banks/ngfrsc";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function NgfrscTrainingPage() {
  return <ExamTrainingPage exam={getExamById("ngfrsc")!} />;
}
