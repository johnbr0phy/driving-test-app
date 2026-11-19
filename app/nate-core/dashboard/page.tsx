"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function NateCoreDashboardPage() {
  return <ExamDashboard exam={getExamById("natecore")!} />;
}
