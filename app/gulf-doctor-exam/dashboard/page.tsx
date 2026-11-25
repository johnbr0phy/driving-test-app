"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function GulfmdDashboardPage() {
  return <ExamDashboard exam={getExamById("gulfmd")!} />;
}
