"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function PhltoDashboardPage() {
  return <ExamDashboard exam={getExamById("phlto")!} />;
}
