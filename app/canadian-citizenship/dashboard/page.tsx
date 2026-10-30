"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CacitDashboardPage() {
  return <ExamDashboard exam={getExamById("cacit")!} />;
}
