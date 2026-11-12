"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function ItpatenteDashboardPage() {
  return <ExamDashboard exam={getExamById("itpatente")!} />;
}
