"use client";

import "@/lib/banks/camb";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function CambTrainingPage() {
  return <ExamTrainingPage exam={getExamById("camb")!} />;
}
