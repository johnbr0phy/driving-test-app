"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function UksiaDashboardPage() {
  return <ExamDashboard exam={getExamById("uksia")!} />;
}
