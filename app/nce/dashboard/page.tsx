"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function NceDashboardPage() {
  return <ExamDashboard exam={getExamById("nce")!} />;
}
