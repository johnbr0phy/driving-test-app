"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CetDashboardPage() {
  return <ExamDashboard exam={getExamById("cet")!} />;
}
