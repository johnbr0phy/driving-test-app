"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function OacpDashboardPage() {
  return <ExamDashboard exam={getExamById("oacp")!} />;
}
