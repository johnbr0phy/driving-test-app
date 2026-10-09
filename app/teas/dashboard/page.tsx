"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function TeasDashboardPage() {
  return <ExamDashboard exam={getExamById("teas")!} />;
}
