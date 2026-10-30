"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AucitDashboardPage() {
  return <ExamDashboard exam={getExamById("aucit")!} />;
}
