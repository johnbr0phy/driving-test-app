"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AuFirstAidDashboardPage() {
  return <ExamDashboard exam={getExamById("aufirstaid")!} />;
}
