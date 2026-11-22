"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function NlVcaDashboardPage() {
  return <ExamDashboard exam={getExamById("nlvca")!} />;
}
