"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CfpDashboardPage() {
  return <ExamDashboard exam={getExamById("cfp")!} />;
}
