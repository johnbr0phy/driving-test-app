"use client";

import "@/lib/banks/barber";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function BarberTestPage() {
  return <ExamTestPage exam={getExamById("barber")!} />;
}
