"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function PkpnmcDashboardPage() {
  return <ExamDashboard exam={getExamById("pkpnmc")!} />;
}
