"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function QldFirearmsDashboardPage() {
  return <ExamDashboard exam={getExamById("aufirearmsqld")!} />;
}
