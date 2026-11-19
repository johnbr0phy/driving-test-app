"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function R410aDashboardPage() {
  return <ExamDashboard exam={getExamById("r410a")!} />;
}
