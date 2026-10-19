"use client";

import "@/lib/banks/alcohol";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function AlcoholTrainingPage() {
  return <ExamTrainingPage exam={getExamById("alcohol")!} />;
}
