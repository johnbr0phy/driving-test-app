"use client";

import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function EmtTrainingPage() {
  return <ExamTrainingPage exam={getExamById("emt")!} />;
}
