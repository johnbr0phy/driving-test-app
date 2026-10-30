"use client";

import "@/lib/banks/ukaplh";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function UkaplhTrainingPage() {
  return <ExamTrainingPage exam={getExamById("ukaplh")!} />;
}
