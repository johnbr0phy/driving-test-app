"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function HspaCerDashboardPage() {
  return <ExamDashboard exam={getExamById("hspacer")!} />;
}
