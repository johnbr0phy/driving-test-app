"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CbspdCspdtDashboardPage() {
  return <ExamDashboard exam={getExamById("cbspd")!} />;
}
