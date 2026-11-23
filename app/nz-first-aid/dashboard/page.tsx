"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function NzFirstAidDashboardPage() {
  return <ExamDashboard exam={getExamById("nzfirstaid")!} />;
}
