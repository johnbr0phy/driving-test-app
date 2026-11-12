"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function UkplumbDashboardPage() {
  return <ExamDashboard exam={getExamById("ukplumb")!} />;
}
