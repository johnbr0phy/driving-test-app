"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function TexasPersonalLinesDashboardPage() {
  return <ExamDashboard exam={getExamById("txpersonal")!} />;
}
