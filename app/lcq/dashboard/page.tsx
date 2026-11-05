"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function NzlcqDashboardPage() {
  return <ExamDashboard exam={getExamById("nzlcq")!} />;
}
