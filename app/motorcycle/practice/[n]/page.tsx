"use client";

import "@/lib/banks/moto";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function MotorcycleTrainingPage() {
  return <ExamTrainingPage exam={getExamById("moto")!} />;
}
