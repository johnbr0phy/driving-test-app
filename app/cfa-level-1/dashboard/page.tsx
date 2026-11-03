"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CfaLevel1DashboardPage() {
  return <ExamDashboard exam={getExamById("cfal1")!} />;
}
