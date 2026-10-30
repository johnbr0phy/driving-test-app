"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CaqcDashboardPage() {
  return <ExamDashboard exam={getExamById("caqc")!} />;
}
