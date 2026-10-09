"use client";

import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function SecplusTrainingPage() {
  return <ExamTrainingPage exam={getExamById("secplus")!} />;
}
