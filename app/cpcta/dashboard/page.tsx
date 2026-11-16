"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CpctaDashboardPage() {
  return <ExamDashboard exam={getExamById("cpcta")!} />;
}
