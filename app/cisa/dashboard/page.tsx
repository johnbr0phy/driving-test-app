"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CisaDashboardPage() {
  return <ExamDashboard exam={getExamById("cisa")!} />;
}
