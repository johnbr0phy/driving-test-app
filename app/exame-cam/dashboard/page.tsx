"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function PtcamDashboardPage() {
  return <ExamDashboard exam={getExamById("ptcam")!} />;
}
