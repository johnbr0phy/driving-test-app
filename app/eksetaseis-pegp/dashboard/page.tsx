"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function GrcitizenDashboardPage() {
  return <ExamDashboard exam={getExamById("grcitizen")!} />;
}
