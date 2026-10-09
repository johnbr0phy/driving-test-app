"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CitizenshipDashboardPage() {
  return <ExamDashboard exam={getExamById("civics")!} />;
}
