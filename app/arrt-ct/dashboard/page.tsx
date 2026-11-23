"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function ArrtCtDashboardPage() {
  return <ExamDashboard exam={getExamById("arrtct")!} />;
}
