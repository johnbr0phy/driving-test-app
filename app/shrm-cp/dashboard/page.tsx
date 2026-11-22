"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function ShrmCpDashboardPage() {
  return <ExamDashboard exam={getExamById("shrmcp")!} />;
}
