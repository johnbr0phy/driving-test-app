"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function SejaktDashboardPage() {
  return <ExamDashboard exam={getExamById("sejakt")!} />;
}
