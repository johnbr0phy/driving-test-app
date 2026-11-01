"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function BedrivingDashboardPage() {
  return <ExamDashboard exam={getExamById("bedriving")!} />;
}
