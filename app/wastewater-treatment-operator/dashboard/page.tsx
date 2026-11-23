"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function WastewaterOpDashboardPage() {
  return <ExamDashboard exam={getExamById("wastewaterop")!} />;
}
