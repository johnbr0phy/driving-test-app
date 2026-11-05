"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function ZaPsiraDashboardPage() {
  return <ExamDashboard exam={getExamById("zapsira")!} />;
}
