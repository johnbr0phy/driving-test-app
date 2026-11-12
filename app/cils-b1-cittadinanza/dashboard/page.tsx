"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function ItcilsDashboardPage() {
  return <ExamDashboard exam={getExamById("itcils")!} />;
}
