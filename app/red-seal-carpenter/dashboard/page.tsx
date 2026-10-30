"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function RedSealCarpenterDashboardPage() {
  return <ExamDashboard exam={getExamById("cacarp")!} />;
}
