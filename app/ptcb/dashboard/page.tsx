"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function PtcbDashboardPage() {
  return <ExamDashboard exam={getExamById("ptcb")!} />;
}
