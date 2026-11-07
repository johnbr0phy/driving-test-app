"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function FihygieneDashboardPage() {
  return <ExamDashboard exam={getExamById("fihygiene")!} />;
}
