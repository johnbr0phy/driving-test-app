"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function Ukdsc1DashboardPage() {
  return <ExamDashboard exam={getExamById("ukdsc1")!} />;
}
