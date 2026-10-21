"use client";

import "@/lib/banks/vtne";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function VtneTrainingPage() {
  return <ExamTrainingPage exam={getExamById("vtne")!} />;
}
