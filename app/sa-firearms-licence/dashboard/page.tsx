"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function SaFirearmsDashboardPage() {
  return <ExamDashboard exam={getExamById("aufasa")!} />;
}
