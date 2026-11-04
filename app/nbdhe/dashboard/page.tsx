"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function NbdheDashboardPage() {
  return <ExamDashboard exam={getExamById("nbdhe")!} />;
}
