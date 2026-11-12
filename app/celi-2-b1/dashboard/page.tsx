"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function ItceliDashboardPage() {
  return <ExamDashboard exam={getExamById("itceli")!} />;
}
