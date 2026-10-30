"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function RbtDashboardPage() {
  return <ExamDashboard exam={getExamById("rbt")!} />;
}
