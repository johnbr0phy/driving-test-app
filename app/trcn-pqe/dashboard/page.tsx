"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function TrcnpqeDashboardPage() {
  return <ExamDashboard exam={getExamById("trcnpqe")!} />;
}
