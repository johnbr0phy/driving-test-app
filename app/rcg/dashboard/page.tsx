"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AurcgDashboardPage() {
  return <ExamDashboard exam={getExamById("aurcg")!} />;
}
