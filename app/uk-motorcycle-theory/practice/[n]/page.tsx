"use client";

import "@/lib/banks/ukmoto";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function UkmotoTrainingPage() {
  return <ExamTrainingPage exam={getExamById("ukmoto")!} />;
}
