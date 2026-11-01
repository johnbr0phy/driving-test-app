"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function FitheoryDashboardPage() {
  return <ExamDashboard exam={getExamById("fitheory")!} />;
}
