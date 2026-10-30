"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function InrtoDashboardPage() {
  return <ExamDashboard exam={getExamById("inrto")!} />;
}
