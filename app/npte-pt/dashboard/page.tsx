"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function NptePtDashboardPage() {
  return <ExamDashboard exam={getExamById("nptept")!} />;
}
