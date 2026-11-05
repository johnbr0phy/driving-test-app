"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function PhpharmDashboardPage() {
  return <ExamDashboard exam={getExamById("phpharm")!} />;
}
