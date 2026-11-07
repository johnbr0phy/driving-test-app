"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function PtmotoDashboardPage() {
  return <ExamDashboard exam={getExamById("ptmoto")!} />;
}
