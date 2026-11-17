"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function NcccoDashboardPage() {
  return <ExamDashboard exam={getExamById("nccco")!} />;
}
