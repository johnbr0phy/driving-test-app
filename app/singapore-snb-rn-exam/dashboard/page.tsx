"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function SgsnbDashboardPage() {
  return <ExamDashboard exam={getExamById("sgsnb")!} />;
}
