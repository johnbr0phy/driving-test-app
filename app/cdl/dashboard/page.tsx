"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CDLDashboardPage() {
  return <ExamDashboard exam={getExamById("cdl")!} />;
}
