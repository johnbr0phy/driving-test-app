"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function BcabaDashboardPage() {
  return <ExamDashboard exam={getExamById("bcaba")!} />;
}
