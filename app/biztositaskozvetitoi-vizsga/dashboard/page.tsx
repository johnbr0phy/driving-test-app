"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function HubiztDashboardPage() {
  return <ExamDashboard exam={getExamById("hubizt")!} />;
}
