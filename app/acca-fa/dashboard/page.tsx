"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AccaFaDashboardPage() {
  return <ExamDashboard exam={getExamById("accafa")!} />;
}
