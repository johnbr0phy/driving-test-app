"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function SieDashboardPage() {
  return <ExamDashboard exam={getExamById("sie")!} />;
}
