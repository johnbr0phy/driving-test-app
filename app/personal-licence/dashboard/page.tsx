"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function UkaplhDashboardPage() {
  return <ExamDashboard exam={getExamById("ukaplh")!} />;
}
