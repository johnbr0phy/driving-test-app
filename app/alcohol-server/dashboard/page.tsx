"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AlcoholDashboardPage() {
  return <ExamDashboard exam={getExamById("alcohol")!} />;
}
