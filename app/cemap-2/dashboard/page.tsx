"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function Cemap2DashboardPage() {
  return <ExamDashboard exam={getExamById("ukcemap2")!} />;
}
