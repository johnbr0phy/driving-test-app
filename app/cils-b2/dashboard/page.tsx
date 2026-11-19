"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function Itcilsb2DashboardPage() {
  return <ExamDashboard exam={getExamById("itcilsb2")!} />;
}
