"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function FpcDashboardPage() {
  return <ExamDashboard exam={getExamById("fpc")!} />;
}
