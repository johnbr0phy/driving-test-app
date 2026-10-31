"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function MykppDashboardPage() {
  return <ExamDashboard exam={getExamById("mykpp")!} />;
}
