"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function SgrttDashboardPage() {
  return <ExamDashboard exam={getExamById("sgrtt")!} />;
}
