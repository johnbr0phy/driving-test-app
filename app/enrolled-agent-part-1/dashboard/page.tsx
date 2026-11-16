"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function EnrolledAgentPart1DashboardPage() {
  return <ExamDashboard exam={getExamById("ea1")!} />;
}
