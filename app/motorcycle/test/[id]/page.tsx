"use client";

import "@/lib/banks/moto";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function MotorcycleTestPage() {
  return <ExamTestPage exam={getExamById("moto")!} />;
}
