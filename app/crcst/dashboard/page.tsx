"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CRCSTDashboardPage() {
  return <ExamDashboard exam={getExamById("crcst")!} />;
}
