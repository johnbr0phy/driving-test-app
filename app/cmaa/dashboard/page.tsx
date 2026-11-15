"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CmaaDashboardPage() {
  return <ExamDashboard exam={getExamById("cmaa")!} />;
}
