"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function HukreszDashboardPage() {
  return <ExamDashboard exam={getExamById("hukresz")!} />;
}
