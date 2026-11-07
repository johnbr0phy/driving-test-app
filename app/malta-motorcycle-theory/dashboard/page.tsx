"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function MtmotoDashboardPage() {
  return <ExamDashboard exam={getExamById("mtmoto")!} />;
}
