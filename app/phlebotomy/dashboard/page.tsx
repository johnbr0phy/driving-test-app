"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function PhlebDashboardPage() {
  return <ExamDashboard exam={getExamById("phleb")!} />;
}
