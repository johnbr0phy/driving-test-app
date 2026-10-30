"use client";

import "@/lib/banks/caelec";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function CaelecTrainingPage() {
  return <ExamTrainingPage exam={getExamById("caelec")!} />;
}
