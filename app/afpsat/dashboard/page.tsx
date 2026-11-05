"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AfpsatDashboardPage() {
  return <ExamDashboard exam={getExamById("afpsat")!} />;
}
