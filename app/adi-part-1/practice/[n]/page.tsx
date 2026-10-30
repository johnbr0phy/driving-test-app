"use client";

import "@/lib/banks/ukadi";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function UkadiTrainingPage() {
  return <ExamTrainingPage exam={getExamById("ukadi")!} />;
}
