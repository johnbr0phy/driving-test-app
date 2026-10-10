"use client";

import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function ForkliftTrainingPage() {
  return <ExamTrainingPage exam={getExamById("forklift")!} />;
}
