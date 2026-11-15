"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AscpMltDashboardPage() {
  return <ExamDashboard exam={getExamById("ascpmlt")!} />;
}
