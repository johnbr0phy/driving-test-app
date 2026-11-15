"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AscpPbtDashboardPage() {
  return <ExamDashboard exam={getExamById("ascppbt")!} />;
}
