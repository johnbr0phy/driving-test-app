"use client";

import "@/lib/banks/jelec";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function JelecTrainingPage() {
  return <ExamTrainingPage exam={getExamById("jelec")!} />;
}
