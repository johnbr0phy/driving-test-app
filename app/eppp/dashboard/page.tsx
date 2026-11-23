"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function EpppDashboardPage() {
  return <ExamDashboard exam={getExamById("eppp")!} />;
}
