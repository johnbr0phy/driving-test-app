"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function Uk18edDashboardPage() {
  return <ExamDashboard exam={getExamById("uk18ed")!} />;
}
