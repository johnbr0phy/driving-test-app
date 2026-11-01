"use client";

import "@/lib/banks/grdriving";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function GrdrivingTrainingPage() {
  return <ExamTrainingPage exam={getExamById("grdriving")!} />;
}
