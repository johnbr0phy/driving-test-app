"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function IeHcapDashboardPage() {
  return <ExamDashboard exam={getExamById("iehcap")!} />;
}
