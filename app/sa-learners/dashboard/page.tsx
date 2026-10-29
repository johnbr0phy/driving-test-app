"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AusaDashboardPage() {
  return <ExamDashboard exam={getExamById("ausa")!} />;
}
