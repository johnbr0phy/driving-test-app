"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function HhaDashboardPage() {
  return <ExamDashboard exam={getExamById("hha")!} />;
}
