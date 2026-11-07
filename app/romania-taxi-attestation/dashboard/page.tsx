"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function RotaxiDashboardPage() {
  return <ExamDashboard exam={getExamById("rotaxi")!} />;
}
