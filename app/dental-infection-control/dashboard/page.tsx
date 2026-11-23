"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function DanbiceDashboardPage() {
  return <ExamDashboard exam={getExamById("danbice")!} />;
}
