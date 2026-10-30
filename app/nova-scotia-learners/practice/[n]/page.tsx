"use client";

import "@/lib/banks/cans";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function CansTrainingPage() {
  return <ExamTrainingPage exam={getExamById("cans")!} />;
}
