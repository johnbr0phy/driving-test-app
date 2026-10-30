"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AuForkliftDashboardPage() {
  return <ExamDashboard exam={getExamById("auforklift")!} />;
}
