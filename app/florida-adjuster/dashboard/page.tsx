"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function FlAdjusterDashboardPage() {
  return <ExamDashboard exam={getExamById("fladjuster")!} />;
}
