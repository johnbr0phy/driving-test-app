"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CpbDashboardPage() {
  return <ExamDashboard exam={getExamById("cpb")!} />;
}
