"use client";

import "@/lib/banks/capsw";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function CapswTrainingPage() {
  return <ExamTrainingPage exam={getExamById("capsw")!} />;
}
