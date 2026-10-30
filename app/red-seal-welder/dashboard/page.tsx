"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CaweldDashboardPage() {
  return <ExamDashboard exam={getExamById("caweld")!} />;
}
