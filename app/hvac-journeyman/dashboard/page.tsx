"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function HvacJourneymanDashboardPage() {
  return <ExamDashboard exam={getExamById("hvacjourney")!} />;
}
