"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CpaTcpDashboardPage() {
  return <ExamDashboard exam={getExamById("cpatcp")!} />;
}
