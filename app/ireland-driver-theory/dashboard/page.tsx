"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function IedttDashboardPage() {
  return <ExamDashboard exam={getExamById("iedtt")!} />;
}
