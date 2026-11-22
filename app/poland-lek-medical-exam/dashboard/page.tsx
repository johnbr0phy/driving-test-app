"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function PllekDashboardPage() {
  return <ExamDashboard exam={getExamById("pllek")!} />;
}
