"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function DkindfoedDashboardPage() {
  return <ExamDashboard exam={getExamById("dkindfoed")!} />;
}
