"use client";

import "@/lib/banks/rbt";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function RbtTrainingPage() {
  return <ExamTrainingPage exam={getExamById("rbt")!} />;
}
