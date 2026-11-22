"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function PlcpcDashboardPage() {
  return <ExamDashboard exam={getExamById("plcpc")!} />;
}
