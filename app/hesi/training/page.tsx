"use client";

import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function HesiTrainingPage() {
  return <ExamTrainingPage exam={getExamById("hesi")!} />;
}
