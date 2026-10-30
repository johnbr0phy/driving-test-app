"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function BarberDrillPage() {
  return <ExamDrillPage exam={getExamById("barber")!} />;
}
