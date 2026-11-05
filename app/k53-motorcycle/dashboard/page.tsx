"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function Zak53motoDashboardPage() {
  return <ExamDashboard exam={getExamById("zak53moto")!} />;
}
