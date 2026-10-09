"use client";

import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function HamTrainingPage() {
  return <ExamTrainingPage exam={getExamById("ham")!} />;
}
