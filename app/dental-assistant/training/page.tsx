"use client";

import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function DanbTrainingPage() {
  return <ExamTrainingPage exam={getExamById("danb")!} />;
}
