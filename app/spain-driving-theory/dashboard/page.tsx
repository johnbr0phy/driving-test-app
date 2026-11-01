"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function EsdgtDashboardPage() {
  return <ExamDashboard exam={getExamById("esdgt")!} />;
}
