"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CocDashboardPage() {
  return <ExamDashboard exam={getExamById("coc")!} />;
}
