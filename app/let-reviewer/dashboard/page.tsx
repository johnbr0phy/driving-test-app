"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function PhletDashboardPage() {
  return <ExamDashboard exam={getExamById("phlet")!} />;
}
