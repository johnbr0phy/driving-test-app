"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function BcbaDashboardPage() {
  return <ExamDashboard exam={getExamById("bcba")!} />;
}
