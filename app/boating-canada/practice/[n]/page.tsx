"use client";

import "@/lib/banks/pcoc";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function PcocTrainingPage() {
  return <ExamTrainingPage exam={getExamById("pcoc")!} />;
}
