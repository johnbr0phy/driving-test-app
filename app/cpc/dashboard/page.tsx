"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CpcDashboardPage() {
  return <ExamDashboard exam={getExamById("cpc")!} />;
}
