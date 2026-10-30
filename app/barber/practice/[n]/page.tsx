"use client";

import "@/lib/banks/barber";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { getExamById } from "@/lib/exams";

export default function BarberTrainingPage() {
  return <ExamTrainingPage exam={getExamById("barber")!} />;
}
