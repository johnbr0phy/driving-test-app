"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function HamextraDashboardPage() {
  return <ExamDashboard exam={getExamById("hamextra")!} />;
}
