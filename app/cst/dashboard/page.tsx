"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CSTDashboardPage() {
  return <ExamDashboard exam={getExamById("cst")!} />;
}
