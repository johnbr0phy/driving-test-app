"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CrcDashboardPage() {
  return <ExamDashboard exam={getExamById("crc")!} />;
}
