"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function UkpcvDashboardPage() {
  return <ExamDashboard exam={getExamById("ukpcv")!} />;
}
