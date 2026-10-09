"use client";

import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function TeasTrainingPage() {
  return <ExamTrainingPage exam={getExamById("teas")!} />;
}
