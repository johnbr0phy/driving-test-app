"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function FrcodeDashboardPage() {
  return <ExamDashboard exam={getExamById("frcode")!} />;
}
