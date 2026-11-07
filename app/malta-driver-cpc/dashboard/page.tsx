"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function MtcpcDashboardPage() {
  return <ExamDashboard exam={getExamById("mtcpc")!} />;
}
