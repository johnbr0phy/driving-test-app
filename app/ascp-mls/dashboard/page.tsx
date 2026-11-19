"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AscpMlsDashboardPage() {
  return <ExamDashboard exam={getExamById("ascpmls")!} />;
}
