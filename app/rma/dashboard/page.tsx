"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function RmaDashboardPage() {
  return <ExamDashboard exam={getExamById("rma")!} />;
}
